export type UserRole = 'guest' | 'host' | 'admin' | 'super_admin';

export type PropertyStatus =
  | 'draft'
  | 'pending_review'
  | 'approved'
  | 'rejected'
  | 'suspended'
  | 'archived';

export type PropertyType =
  | 'homestay'
  | 'eco_lodge'
  | 'heritage_cottage'
  | 'retreat'
  | 'farmstay';

export type ReservationStatus =
  | 'pending_payment'
  | 'booking_requested'
  | 'confirmed'
  | 'checked_in'
  | 'completed'
  | 'cancelled'
  | 'declined'
  | 'expired'
  | 'no_show';

export type CancellationPolicy = 'flexible' | 'moderate' | 'strict' | 'custom';

export interface Profile {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  profile_photo_url?: string;
  role: UserRole;
  country: string;
  state?: string;
  city?: string;
  status: 'active' | 'suspended' | 'deactivated';
  created_at: string;
}

export interface Host {
  id: string;
  user_id: string;
  host_status: 'pending' | 'approved' | 'rejected' | 'suspended';
  verification_status: 'unverified' | 'submitted' | 'verified';
  identity_verified: boolean;
  phone_verified: boolean;
  email_verified: boolean;
  payout_status: 'not_configured' | 'pending' | 'active';
  agreement_status: 'none' | 'pending' | 'active' | 'expired';
  agreement_start_date?: string;
  agreement_end_date?: string;
  introductory_commission_rate: number; // 0%
  standard_commission_rate: number;     // 10%
  current_commission_rate: number;
  created_at: string;
}

export interface HostAgreement {
  id: string;
  host_id: string;
  agreement_version: string;
  agreement_status: 'draft' | 'active' | 'superseded' | 'terminated';
  start_date: string;
  end_date: string;
  introductory_commission_rate: number;
  standard_commission_rate: number;
  accepted_at: string;
}

export interface Property {
  id: string;
  host_id: string;
  property_name: string;
  slug: string;
  property_type: PropertyType;
  description: string;
  short_description?: string;
  address: string;
  locality?: string;
  city: string;
  district: string;
  state: string;
  country: string;
  postal_code?: string;
  latitude: number;
  longitude: number;
  google_place_id?: string;
  check_in_time: string;
  check_out_time: string;
  status: PropertyStatus;
  verification_status: 'unverified' | 'inspected' | 'verified';
  cancellation_policy: CancellationPolicy;
  house_rules: string[];
  featured: boolean;
  cover_image?: string;
  images?: string[];
  starting_price?: number;
  rating?: number;
  review_count?: number;
}

export interface RoomType {
  id: string;
  property_id: string;
  name: string;
  description?: string;
  max_guests: number;
  base_price: number;
  weekend_price?: number;
  extra_guest_price?: number;
  inventory_count: number;
  minimum_stay: number;
  maximum_stay: number;
  booking_mode: 'instant' | 'request_to_book';
  status: 'active' | 'inactive';
}

export interface Amenity {
  id: string;
  name: string;
  icon_name: string;
  category: 'general' | 'view' | 'kitchen' | 'workspace' | 'outdoors' | 'heating';
}

export interface Reservation {
  id: string;
  booking_reference: string; // UKS-2026-XXXXXX
  guest_id: string;
  guest_name?: string;
  guest_email?: string;
  property_id: string;
  property_name?: string;
  room_type_id: string;
  room_name?: string;
  check_in: string;
  check_out: string;
  number_of_guests: number;
  number_of_rooms: number;
  base_amount: number;
  taxes: number;
  total_amount: number;
  applied_commission_rate: number;
  platform_commission_amount: number;
  host_payout_amount: number;
  payment_status: 'pending' | 'processing' | 'paid' | 'failed' | 'refunded';
  reservation_status: ReservationStatus;
  created_at: string;
}

export interface HostPayout {
  id: string;
  host_id: string;
  reservation_id: string;
  gross_booking_amount: number;
  commission_rate: number;
  commission_amount: number;
  payout_amount: number;
  payout_status: 'simulated_test' | 'pending' | 'processed' | 'on_hold' | 'failed';
  payout_reference: string;
  payout_date: string;
  created_at: string;
}

export interface Review {
  id: string;
  reservation_id: string;
  guest_id: string;
  guest_name?: string;
  property_id: string;
  rating: number;
  title: string;
  review: string;
  host_response?: string;
  created_at: string;
}
