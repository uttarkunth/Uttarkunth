export interface PublicRoom {
  id: string;
  property_id: string;
  room_name: string;
  description?: string | null;
  max_guests: number;
  base_price: number;
}
export interface PublicProperty {
  id: string;
  slug: string;
  name: string;
  description?: string | null;
  address?: string | null;
  village?: string | null;
  district?: string | null;
  state?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  amenities: string[];
  photos: Array<string | { url?: string; public_url?: string; src?: string }>;
  booking_mode: string;
  property_type: string;
  rooms: PublicRoom[];
}
export interface BookingRequestInput {
  room_unit_id: string;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  check_in: string;
  check_out: string;
  adults: number;
  children: number;
  special_requests?: string;
}
export interface BookingRequestReceipt {
  reference: string;
  access_token: string;
  status: 'pending';
  property_name: string;
  room_name: string;
  check_in: string;
  check_out: string;
  nights: number;
  adults: number;
  children: number;
  estimated_total: number;
  payment_method: string;
}
async function api<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) },
    cache: 'no-store',
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || payload.ok === false) {
    throw new Error(payload.error || 'The request could not be completed. Please try again.');
  }
  return payload as T;
}
export const staysApi = {
  async listProperties() {
    return api<{ ok: true; count: number; properties: PublicProperty[] }>('/.netlify/functions/stays-properties');
  },
  async requestBooking(input: BookingRequestInput) {
    return api<{ ok: true; booking: BookingRequestReceipt }>('/.netlify/functions/stays-bookings', {
      method: 'POST',
      body: JSON.stringify(input),
    });
  },
  async trackBooking(reference: string, token: string) {
    return api<{ ok: true; booking: Record<string, unknown> }>(
      '/.netlify/functions/stays-bookings?reference=' + encodeURIComponent(reference) + '&token=' + encodeURIComponent(token),
    );
  },
  async cancelPendingBooking(reference: string, token: string, reason?: string) {
    return api<{ ok: true; status: 'cancelled' }>('/.netlify/functions/stays-bookings', {
      method: 'PATCH',
      body: JSON.stringify({ reference, token, reason }),
    });
  },
};
