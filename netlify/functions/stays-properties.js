const headers = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
};

function response(statusCode, payload) {
  return { statusCode, headers, body: JSON.stringify(payload) };
}

exports.handler = async (event) => {
  if (event.httpMethod !== "GET") return response(405, { ok: false, error: "Method not allowed." });

  const baseUrl = process.env.SUPABASE_URL;
  // Intentionally server-only: the live restrictive RLS policy blocks anonymous direct reads.
  // We use the privileged key only here, and return an explicit public-field allow-list.
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!baseUrl || !serviceKey) return response(503, { ok: false, error: "Stay search is temporarily unavailable." });

  try {
    const apiHeaders = {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      Accept: "application/json",
    };
    const request = async (path) => {
      const result = await fetch(new URL(path, baseUrl), { headers: apiHeaders });
      if (!result.ok) throw new Error("upstream");
      return result.json();
    };

    // Never select host contact, moderation notes, ownership assignments or other private columns.
    const propertyPath = "/rest/v1/properties?select=id,slug,name,description,address,village,district,state,latitude,longitude,amenities,photos,booking_mode,property_type&published=eq.true&moderation_status=eq.approved&order=name.asc";
    const properties = await request(propertyPath);
    if (!properties.length) return response(200, { ok: true, count: 0, properties: [] });

    const ids = properties.map((p) => p.id);
    const roomPath = "/rest/v1/room_units?select=id,property_id,room_name,description,max_guests,base_price&active=eq.true&property_id=in.(" +
      ids.map(encodeURIComponent).join(",") + ")";
    const rooms = await request(roomPath);
    const attached = properties.map((property) => ({
      ...property,
      rooms: rooms.filter((room) => room.property_id === property.id).map((room) => ({
        id: room.id,
        room_name: room.room_name,
        description: room.description,
        max_guests: room.max_guests,
        base_price: room.base_price,
      })),
    })).filter((p) => p.rooms.length > 0);

    return response(200, { ok: true, count: attached.length, properties: attached });
  } catch (_) {
    return response(502, { ok: false, error: "We couldn't load stays right now. Please try again shortly." });
  }
};
