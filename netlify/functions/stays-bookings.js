const crypto = require("crypto");

const headers = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
};

function response(statusCode, payload) {
  return { statusCode, headers, body: JSON.stringify(payload) };
}
function validDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(value || ""))) return false;
  const d = new Date(value + "T00:00:00Z");
  return Number.isFinite(d.getTime()) && d.toISOString().slice(0, 10) === value;
}
function nightsBetween(start, end) {
  return Math.round((Date.parse(end + "T00:00:00Z") - Date.parse(start + "T00:00:00Z")) / 86400000);
}
function tokenHash(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}
function safeText(value, max) {
  return String(value || "").trim().slice(0, max);
}

exports.handler = async (event) => {
  if (!["GET", "POST", "PATCH"].includes(event.httpMethod)) {
    return response(405, { ok: false, error: "Method not allowed." });
  }
  const baseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!baseUrl || !serviceKey) return response(503, { ok: false, error: "Booking service is temporarily unavailable." });

  const apiHeaders = {
    apikey: serviceKey,
    Authorization: `Bearer ${serviceKey}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  async function db(path, options = {}) {
    return fetch(new URL(path, baseUrl), { ...options, headers: { ...apiHeaders, ...(options.headers || {}) } });
  }
  async function rows(path) {
    const r = await db(path);
    if (!r.ok) throw new Error("database");
    return r.json();
  }
  function parseBody() {
    try { return JSON.parse(event.body || "{}"); } catch (_) { return null; }
  }

  try {
    if (event.httpMethod === "GET") {
      const q = event.queryStringParameters || {};
      if (q.availability === "1") {
        const roomId = safeText(q.room_unit_id, 80);
        const checkIn = safeText(q.check_in, 10), checkOut = safeText(q.check_out, 10);
        const nights = nightsBetween(checkIn, checkOut);
        if (!roomId || !validDate(checkIn) || !validDate(checkOut) || nights < 1) {
          return response(400, { ok: false, error: "Provide a room and valid check-in/check-out dates." });
        }
        const roomRows = await rows("/rest/v1/room_units?select=id,property_id,room_name,max_guests,base_price,active&id=eq." + encodeURIComponent(roomId) + "&active=eq.true&limit=1");
        if (!roomRows.length) return response(404, { ok: false, error: "Room not found or inactive." });
        const room = roomRows[0];
        const propertyRows = await rows("/rest/v1/properties?select=id&published=eq.true&moderation_status=eq.approved&id=eq." + encodeURIComponent(room.property_id) + "&limit=1");
        if (!propertyRows.length) return response(404, { ok: false, error: "Property is not currently bookable." });
        const blocks = await rows("/rest/v1/room_availability_blocks?select=id&room_unit_id=eq." + encodeURIComponent(room.id) + "&blocked_from=lt." + encodeURIComponent(checkOut) + "&blocked_until=gt." + encodeURIComponent(checkIn) + "&limit=1");
        const bookings = await rows("/rest/v1/stay_bookings?select=id&room_unit_id=eq." + encodeURIComponent(room.id) + "&status=in.(pending,confirmed)&check_in=lt." + encodeURIComponent(checkOut) + "&check_out=gt." + encodeURIComponent(checkIn) + "&limit=1");
        return response(200, { ok: true, available: !blocks.length && !bookings.length, nights, estimated_total: Number(room.base_price) * nights, message: blocks.length || bookings.length ? "Dates are not currently available." : "Dates look available; the host must confirm your request." });
      }

      const ref = safeText(q.reference, 40).toUpperCase();
      const token = safeText(q.token, 200);
      if (!/^UK-[A-Z0-9-]{10,36}$/.test(ref) || token.length < 32) {
        return response(400, { ok: false, error: "Enter a valid booking reference and access token." });
      }
      const found = await rows("/rest/v1/booking_requests?select=booking_reference,property_id,room_unit_id,check_in,check_out,adults,children,special_requests,estimated_total,status,created_at&booking_reference=eq." + encodeURIComponent(ref) + "&guest_access_token_hash=eq." + tokenHash(token) + "&limit=1");
      if (!found.length) return response(404, { ok: false, error: "We couldn't find a booking with those details." });
      const booking = found[0];
      const property = await rows("/rest/v1/properties?select=name,village,district,state&id=eq." + encodeURIComponent(booking.property_id) + "&limit=1");
      const room = await rows("/rest/v1/room_units?select=room_name&id=eq." + encodeURIComponent(booking.room_unit_id) + "&limit=1");
      return response(200, { ok: true, booking: { ...booking, property: property[0] || null, room: room[0] || null } });
    }

    const body = parseBody();
    if (!body) return response(400, { ok: false, error: "Please submit valid booking details." });

    if (event.httpMethod === "PATCH") {
      const reference = safeText(body.reference, 40).toUpperCase();
      const token = safeText(body.token, 200);
      const reason = safeText(body.reason, 500);
      if (!/^UK-[A-Z0-9-]{10,36}$/.test(reference) || token.length < 32) {
        return response(400, { ok: false, error: "Booking reference or access token is invalid." });
      }
      const patch = await db("/rest/v1/booking_requests?booking_reference=eq." + encodeURIComponent(reference) + "&guest_access_token_hash=eq." + tokenHash(token) + "&status=eq.pending", {
        method: "PATCH", headers: { Prefer: "return=representation" },
        body: JSON.stringify({ status: "cancelled", cancellation_reason: reason || "Cancelled by guest", updated_at: new Date().toISOString() }),
      });
      if (!patch.ok) throw new Error("database");
      const changed = await patch.json();
      if (!changed.length) return response(409, { ok: false, error: "Only pending requests can be cancelled online. Contact the host if you need help with a confirmed stay." });
      return response(200, { ok: true, status: "cancelled" });
    }

    const required = ["room_unit_id", "guest_name", "guest_email", "guest_phone", "check_in", "check_out"];
    if (required.some((key) => !String(body[key] || "").trim())) return response(400, { ok: false, error: "Please complete all required fields." });
    const checkIn = safeText(body.check_in, 10), checkOut = safeText(body.check_out, 10);
    const nights = nightsBetween(checkIn, checkOut);
    if (!validDate(checkIn) || !validDate(checkOut) || nights < 1 || checkIn < new Date().toISOString().slice(0, 10)) {
      return response(400, { ok: false, error: "Choose valid future check-in and check-out dates." });
    }
    const adults = Number(body.adults ?? 1), children = Number(body.children ?? 0);
    if (!Number.isInteger(adults) || adults < 1 || adults > 20 || !Number.isInteger(children) || children < 0 || children > 20) {
      return response(400, { ok: false, error: "Please enter valid guest counts." });
    }
    const email = safeText(body.guest_email, 254).toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return response(400, { ok: false, error: "Please enter a valid email address." });

    const roomRows = await rows("/rest/v1/room_units?select=id,property_id,room_name,max_guests,base_price,active&id=eq." + encodeURIComponent(body.room_unit_id) + "&active=eq.true&limit=1");
    const room = roomRows[0];
    if (!room) return response(404, { ok: false, error: "That room is no longer available for requests." });
    if (adults + children > Number(room.max_guests)) return response(400, { ok: false, error: "Guest count exceeds this room's capacity." });
    const propertyRows = await rows("/rest/v1/properties?select=id,name,published,moderation_status&id=eq." + encodeURIComponent(room.property_id) + "&published=eq.true&moderation_status=eq.approved&limit=1");
    if (!propertyRows.length) return response(404, { ok: false, error: "This property is not currently bookable." });

    const blockRows = await rows("/rest/v1/room_availability_blocks?select=id&room_unit_id=eq." + encodeURIComponent(room.id) + "&blocked_from=lt." + encodeURIComponent(checkOut) + "&blocked_until=gt." + encodeURIComponent(checkIn) + "&limit=1");
    if (blockRows.length) return response(409, { ok: false, error: "The room is blocked for at least part of those dates. Please choose different dates." });

    // Pending requests are not reservations; the host confirmation RPC performs the final
    // transactional overlap check before moving a request into stay_bookings.
    const activeRows = await rows("/rest/v1/stay_bookings?select=id&room_unit_id=eq." + encodeURIComponent(room.id) + "&status=in.(pending,confirmed)&check_in=lt." + encodeURIComponent(checkOut) + "&check_out=gt." + encodeURIComponent(checkIn) + "&limit=1");
    if (activeRows.length) return response(409, { ok: false, error: "Those dates are no longer available. Please choose another date range." });

    const duplicate = await rows("/rest/v1/booking_requests?select=id&room_unit_id=eq." + encodeURIComponent(room.id) + "&guest_email=eq." + encodeURIComponent(email) + "&status=eq.pending&check_in=lt." + encodeURIComponent(checkOut) + "&check_out=gt." + encodeURIComponent(checkIn) + "&limit=1");
    if (duplicate.length) return response(409, { ok: false, error: "You already have a pending request for overlapping dates at this property." });

    const reference = "UK-" + crypto.randomBytes(9).toString("hex").toUpperCase();
    const accessToken = crypto.randomBytes(32).toString("base64url");
    const estimatedTotal = Number(room.base_price) * nights;
    const insert = await db("/rest/v1/booking_requests", {
      method: "POST", headers: { Prefer: "return=minimal" },
      body: JSON.stringify({
        booking_reference: reference, property_id: room.property_id, room_unit_id: room.id,
        guest_name: safeText(body.guest_name, 120), guest_email: email,
        guest_phone: safeText(body.guest_phone, 40), check_in: checkIn, check_out: checkOut,
        adults, children, special_requests: safeText(body.special_requests, 1500) || null,
        estimated_total: estimatedTotal, status: "pending", guest_access_token_hash: tokenHash(accessToken),
      }),
    });
    if (!insert.ok) throw new Error("database");
    // The token is shown only once. The database stores only its SHA-256 hash.
    return response(201, { ok: true, booking: { reference, access_token: accessToken, status: "pending", property_name: propertyRows[0].name, room_name: room.room_name, check_in: checkIn, check_out: checkOut, nights, adults, children, estimated_total: estimatedTotal, payment_method: "Pay at property after host confirmation" } });
  } catch (_) {
    return response(502, { ok: false, error: "We couldn't process that request. Please retry shortly." });
  }
};
