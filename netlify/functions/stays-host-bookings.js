const headers = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
};
function response(statusCode, payload) { return { statusCode, headers, body: JSON.stringify(payload) }; }
function clean(value, max = 1000) { return String(value || "").trim().slice(0, max); }

export const handler = async (event) => {
  if (!["GET", "POST"].includes(event.httpMethod)) return response(405, { ok: false, error: "Method not allowed." });
  const baseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!baseUrl || !serviceKey) return response(503, { ok: false, error: "Host portal is temporarily unavailable." });
  const authHeader = Object.entries(event.headers || {})
    .find(([key]) => key.toLowerCase() === "authorization")?.[1] || "";
  const match = authHeader.match(/^Bearer\s+(.+)$/i);
  if (!match) return response(401, { ok: false, error: "Please sign in to access the host portal." });
  const token = match[1];
  const apiHeaders = { apikey: serviceKey, Authorization: `Bearer ${serviceKey}`, "Content-Type": "application/json", Accept: "application/json" };
  async function db(path, options = {}) { return fetch(new URL(path, baseUrl), { ...options, headers: { ...apiHeaders, ...(options.headers || {}) } }); }
  async function rows(path) { const r = await db(path); if (!r.ok) throw new Error("database"); return r.json(); }

  try {
    // Ask Supabase Auth to validate the user token; never trust a user ID sent by the browser.
    const auth = await fetch(new URL("/auth/v1/user", baseUrl), { headers: { apikey: serviceKey, Authorization: `Bearer ${token}` } });
    if (!auth.ok) return response(401, { ok: false, error: "Your session has expired. Please sign in again." });
    const user = await auth.json();
    if (!user?.id || !user?.email_confirmed_at) return response(403, { ok: false, error: "Please verify your email before managing bookings." });
    const assignments = await rows("/rest/v1/property_hosts?select=property_id&user_id=eq." + encodeURIComponent(user.id));
    const assignedIds = assignments.map((x) => x.property_id);
    const propertyFilter = assignedIds.length
      ? "or=(host_id.eq." + encodeURIComponent(user.id) + ",id.in.(" + assignedIds.map(encodeURIComponent).join(",") + "))"
      : "host_id=eq." + encodeURIComponent(user.id);
    const properties = await rows("/rest/v1/properties?select=id,name,village,district,state,published,moderation_status&" + propertyFilter);
    const propertyIds = [...new Set(properties.map((p) => p.id))];
    if (event.httpMethod === "GET") {
      if (!propertyIds.length) return response(200, { ok: true, properties: [], requests: [] });
      const requests = await rows("/rest/v1/booking_requests?select=id,booking_reference,property_id,room_unit_id,guest_name,guest_email,guest_phone,check_in,check_out,adults,children,special_requests,estimated_total,status,created_at,host_notes&property_id=in.(" + propertyIds.map(encodeURIComponent).join(",") + ")&order=created_at.desc");
      const rooms = await rows("/rest/v1/room_units?select=id,property_id,room_name,max_guests,base_price,active&property_id=in.(" + propertyIds.map(encodeURIComponent).join(",") + ")");
      return response(200, { ok: true, properties, requests: requests.map((r) => ({ ...r, property: properties.find((p) => p.id === r.property_id) || null, room: rooms.find((room) => room.id === r.room_unit_id) || null })) });
    }

    let body;
    try { body = JSON.parse(event.body || "{}"); } catch (_) { return response(400, { ok: false, error: "Invalid request body." }); }
    const requestId = clean(body.booking_request_id, 80);
    const action = clean(body.action, 20);
    const notes = clean(body.host_notes, 1000);
    if (!/^[0-9a-f-]{36}$/i.test(requestId) || !["confirm", "decline"].includes(action)) {
      return response(400, { ok: false, error: "Choose a valid booking request and decision." });
    }
    const rpc = await db("/rest/v1/rpc/respond_to_booking_request", {
      method: "POST",
      body: JSON.stringify({ p_booking_request_id: requestId, p_action: action, p_host_notes: notes || null, p_actor_user_id: user.id }),
    });
    if (!rpc.ok) {
      // Keep database internals private; the RPC itself checks ownership and concurrent conflicts.
      return response(rpc.status === 401 || rpc.status === 403 ? rpc.status : 409, { ok: false, error: "The request could not be updated. It may no longer be pending, you may not manage this property, or the dates may conflict with another reservation." });
    }
    return response(200, { ok: true, result: await rpc.json() });
  } catch (_) {
    return response(502, { ok: false, error: "We couldn't load or update host bookings. Please retry shortly." });
  }
};
