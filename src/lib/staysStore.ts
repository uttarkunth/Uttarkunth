import { Property, RoomType, Reservation, Host, HostPayout, Review } from '../types/database.types';
import yashActualImg from '../assets/images/yash_homestay_actual_1791099565133.jpg';
import yashExteriorImg from '../assets/images/yash_homestay_exterior_1791084731057.jpg';
import cafeAmbianceImg from '../assets/images/uttarkunth_cafe_ambiance_1791084743353.jpg';
import valleyHeroImg from '../assets/images/hero_himalayan_valley_1791084719943.jpg';

// Initial Seed Properties (Approved & Verified Uttarkunth Stays)
const INITIAL_PROPERTIES: Property[] = [
  {
    id: 'prop-yash-homestay',
    host_id: 'host-gaurav-negi',
    property_name: 'Yash Home Stay',
    slug: 'yash-home-stay-jari-parvati-valley',
    property_type: 'homestay',
    description:
      'Situated peacefully near Jari in the heart of Himachal Pradesh’s Parvati Valley, Yash Home Stay is Uttarkunth’s founding pilot property. Built in harmony with traditional mountain timber-and-stone architecture, this homestay offers travellers warm community hospitality, home-cooked Pahadi organic meals, fast Wi-Fi for remote creators, and panoramic views of snow-dusted Himalayan cedar ridges.',
    short_description: 'Founding Himalayan homestay in Parvati Valley with warm community hospitality & cedar views.',
    address: 'Near Jari, Parvati Valley Corridor',
    locality: 'Jari',
    city: 'Kasol / Jari',
    district: 'Kullu',
    state: 'Himachal Pradesh',
    country: 'India',
    postal_code: '175105',
    latitude: 31.9894,
    longitude: 77.2415,
    google_place_id: 'ChIJz3t5_yash_jari_kullu',
    check_in_time: '12:00:00',
    check_out_time: '11:00:00',
    status: 'approved',
    verification_status: 'verified',
    cancellation_policy: 'moderate',
    house_rules: [
      'Respect mountain silence after 10:00 PM',
      'Zero single-use plastic disposal in valley streams',
      'Traditional footwear removal before dining spaces',
      'Quiet workspaces available for focused creators',
    ],
    featured: true,
    cover_image: yashActualImg,
    images: [yashActualImg, yashExteriorImg, valleyHeroImg, cafeAmbianceImg],
    starting_price: 1800,
    rating: 4.95,
    review_count: 28,
  },
  {
    id: 'prop-chadar-eco-lodge',
    host_id: 'host-sunita-devi',
    property_name: 'Devbhoomi Heritage Retreat',
    slug: 'devbhoomi-heritage-retreat-naggar',
    property_type: 'heritage_cottage',
    description:
      'A restored Kathkuni style heritage cottage nestled among organic apple orchards in Naggar. Crafted with cedar beams and interlocking river stone, offering silent balconies overlooking the Beas river basin and ancient deodar forests.',
    short_description: 'Authentic Kathkuni heritage cottage in ancient Naggar apple orchards.',
    address: 'Upper Naggar Village, Left Bank',
    locality: 'Naggar',
    city: 'Naggar / Manali',
    district: 'Kullu',
    state: 'Himachal Pradesh',
    country: 'India',
    postal_code: '175130',
    latitude: 32.1462,
    longitude: 77.1691,
    check_in_time: '13:00:00',
    check_out_time: '11:00:00',
    status: 'approved',
    verification_status: 'verified',
    cancellation_policy: 'flexible',
    house_rules: [
      'Organic smoking prohibited inside wooden rooms',
      'Pets welcomed on leash in orchard lawns',
    ],
    featured: true,
    cover_image: yashExteriorImg,
    images: [yashExteriorImg, valleyHeroImg, yashActualImg],
    starting_price: 2400,
    rating: 4.88,
    review_count: 19,
  },
  {
    id: 'prop-tirthan-stream-sanctuary',
    host_id: 'host-ramesh-kumar',
    property_name: 'Tirthan Stream Sanctuary',
    slug: 'tirthan-stream-sanctuary-ghushaini',
    property_type: 'eco_lodge',
    description:
      'Perched directly beside the pristine turquoise waters of the Tirthan River at the gateway to the Great Himalayan National Park (UNESCO World Heritage Site). Solar-powered, zero waste, and designed for silent contemplation, angling, and high-altitude hiking.',
    short_description: 'Solar-powered river sanctuary at the gate of Great Himalayan National Park.',
    address: 'Near Trout Fishery, Ghushaini',
    locality: 'Ghushaini',
    city: 'Tirthan Valley',
    district: 'Kullu',
    state: 'Himachal Pradesh',
    country: 'India',
    postal_code: '175123',
    latitude: 31.6382,
    longitude: 77.3789,
    check_in_time: '12:00:00',
    check_out_time: '10:30:00',
    status: 'approved',
    verification_status: 'verified',
    cancellation_policy: 'moderate',
    house_rules: [
      'Catch-and-release fishing protocols strictly observed',
      'Organic river soaps provided in all bathrooms',
    ],
    featured: true,
    cover_image: valleyHeroImg,
    images: [valleyHeroImg, cafeAmbianceImg, yashActualImg],
    starting_price: 2800,
    rating: 4.92,
    review_count: 14,
  },
];

// Room Types Inventory
const INITIAL_ROOM_TYPES: RoomType[] = [
  {
    id: 'room-yash-deluxe',
    property_id: 'prop-yash-homestay',
    name: 'Cedar Balcony Deluxe Room',
    description: 'Spacious wood-paneled bedroom with king bed, attached heated bathroom, fast fiber Wi-Fi, and private balcony facing valley sunrises.',
    max_guests: 3,
    base_price: 2200,
    weekend_price: 2500,
    inventory_count: 3,
    minimum_stay: 1,
    maximum_stay: 30,
    booking_mode: 'instant',
    status: 'active',
  },
  {
    id: 'room-yash-standard',
    property_id: 'prop-yash-homestay',
    name: 'Cozy Mountain View Room',
    description: 'Intimate, warm room with traditional Himalayan wool blankets, dedicated workspace table, and pine forest view.',
    max_guests: 2,
    base_price: 1800,
    weekend_price: 2000,
    inventory_count: 2,
    minimum_stay: 1,
    maximum_stay: 30,
    booking_mode: 'instant',
    status: 'active',
  },
  {
    id: 'room-devbhoomi-orchard',
    property_id: 'prop-chadar-eco-lodge',
    name: 'Kathkuni Heritage Suite',
    description: 'Authentic stone-and-deodar suite with hand-carved window bays, bukhari heating, and views across the upper Beas gorge.',
    max_guests: 4,
    base_price: 2400,
    weekend_price: 2800,
    inventory_count: 2,
    minimum_stay: 1,
    maximum_stay: 14,
    booking_mode: 'instant',
    status: 'active',
  },
  {
    id: 'room-tirthan-riverfront',
    property_id: 'prop-tirthan-stream-sanctuary',
    name: 'Riverfront Glade Room',
    description: 'Listen to the gentle murmur of the river right outside your bedroom window. Solar-heated water and wood finishes.',
    max_guests: 2,
    base_price: 2800,
    weekend_price: 3200,
    inventory_count: 3,
    minimum_stay: 2,
    maximum_stay: 21,
    booking_mode: 'instant',
    status: 'active',
  },
];

// Seed Host Records
const INITIAL_HOSTS: Host[] = [
  {
    id: 'host-gaurav-negi',
    user_id: 'user-gaurav',
    host_status: 'approved',
    verification_status: 'verified',
    identity_verified: true,
    phone_verified: true,
    email_verified: true,
    payout_status: 'active',
    agreement_status: 'active',
    agreement_start_date: '2026-01-01',
    agreement_end_date: '2027-01-01',
    introductory_commission_rate: 0.0, // 0% First 12 months
    standard_commission_rate: 10.0,
    current_commission_rate: 0.0,
    created_at: '2026-01-01T00:00:00Z',
  },
];

// Seed Reservations
const INITIAL_RESERVATIONS: Reservation[] = [
  {
    id: 'res-001',
    booking_reference: 'UKS-2026-104928',
    guest_id: 'guest-current-user',
    guest_name: 'Priya Sharma',
    guest_email: 'priya.sharma@example.com',
    property_id: 'prop-yash-homestay',
    property_name: 'Yash Home Stay',
    room_type_id: 'room-yash-deluxe',
    room_name: 'Cedar Balcony Deluxe Room',
    check_in: '2026-10-15',
    check_out: '2026-10-18',
    number_of_guests: 2,
    number_of_rooms: 1,
    base_amount: 6600,
    taxes: 0,
    total_amount: 6600,
    applied_commission_rate: 0.0, // 0% First 12 Months
    platform_commission_amount: 0.0,
    host_payout_amount: 6600,
    payment_status: 'paid',
    reservation_status: 'confirmed',
    created_at: '2026-10-04T12:00:00Z',
  },
];

// Stays Store Class (Singleton Pattern with Local Staging + Supabase Readiness)
class StaysStore {
  private properties: Property[] = INITIAL_PROPERTIES;
  private roomTypes: RoomType[] = INITIAL_ROOM_TYPES;
  private reservations: Reservation[] = INITIAL_RESERVATIONS;
  private hosts: Host[] = INITIAL_HOSTS;
  private payouts: HostPayout[] = [];
  private listeners: (() => void)[] = [];

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    try {
      const storedProps = localStorage.getItem('uks_properties');
      if (storedProps) this.properties = JSON.parse(storedProps);

      const storedRooms = localStorage.getItem('uks_room_types');
      if (storedRooms) this.roomTypes = JSON.parse(storedRooms);

      const storedRes = localStorage.getItem('uks_reservations');
      if (storedRes) this.reservations = JSON.parse(storedRes);

      const storedHosts = localStorage.getItem('uks_hosts');
      if (storedHosts) this.hosts = JSON.parse(storedHosts);
    } catch {
      // fallback to in-memory seeds
    }
  }

  private saveToStorage() {
    try {
      localStorage.setItem('uks_properties', JSON.stringify(this.properties));
      localStorage.setItem('uks_room_types', JSON.stringify(this.roomTypes));
      localStorage.setItem('uks_reservations', JSON.stringify(this.reservations));
      localStorage.setItem('uks_hosts', JSON.stringify(this.hosts));
    } catch {
      // ignore
    }
    this.notify();
  }

  public subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach((l) => l());
  }

  // --- QUERY METHODS ---

  public getProperties(status: 'all' | 'approved' = 'approved'): Property[] {
    if (status === 'all') return this.properties;
    return this.properties.filter((p) => p.status === 'approved');
  }

  public getPropertyById(id: string): Property | undefined {
    return this.properties.find((p) => p.id === id || p.slug === id);
  }

  public getRoomTypesForProperty(propertyId: string): RoomType[] {
    return this.roomTypes.filter((r) => r.property_id === propertyId && r.status === 'active');
  }

  public getRoomTypeById(roomId: string): RoomType | undefined {
    return this.roomTypes.find((r) => r.id === roomId);
  }

  public getReservationsForGuest(guestId: string = 'guest-current-user'): Reservation[] {
    return this.reservations.filter((r) => r.guest_id === guestId);
  }

  public getReservationsForHost(hostId: string = 'host-gaurav-negi'): Reservation[] {
    const hostPropertyIds = this.properties.filter((p) => p.host_id === hostId).map((p) => p.id);
    return this.reservations.filter((r) => hostPropertyIds.includes(r.property_id));
  }

  public getHost(hostId: string = 'host-gaurav-negi'): Host | undefined {
    return this.hosts.find((h) => h.id === hostId);
  }

  // --- ATOMIC AVAILABILITY & BOOKING CHECK ---

  public checkAvailability(
    roomTypeId: string,
    checkIn: string,
    checkOut: string,
    requestedRooms: number = 1
  ): { available: boolean; remaining: number; maxRooms: number } {
    const room = this.getRoomTypeById(roomTypeId);
    if (!room) return { available: false, remaining: 0, maxRooms: 0 };

    // Calculate overlapping confirmed bookings
    const overlappingBookings = this.reservations.filter((r) => {
      if (r.room_type_id !== roomTypeId) return false;
      if (r.reservation_status === 'cancelled' || r.reservation_status === 'declined') return false;

      // Check date collision [checkIn, checkOut)
      const resCheckIn = new Date(r.check_in).getTime();
      const resCheckOut = new Date(r.check_out).getTime();
      const targetIn = new Date(checkIn).getTime();
      const targetOut = new Date(checkOut).getTime();

      return targetIn < resCheckOut && targetOut > resCheckIn;
    });

    const bookedCount = overlappingBookings.reduce((sum, b) => sum + b.number_of_rooms, 0);
    const remaining = Math.max(0, room.inventory_count - bookedCount);

    return {
      available: remaining >= requestedRooms,
      remaining,
      maxRooms: room.inventory_count,
    };
  }

  // Confirm booking atomically
  public confirmReservationAtomic(params: {
    guestId: string;
    guestName: string;
    guestEmail: string;
    propertyId: string;
    roomTypeId: string;
    checkIn: string;
    checkOut: string;
    guests: number;
    rooms: number;
    totalAmount: number;
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
  }): { success: boolean; reservation?: Reservation; error?: string } {
    // 1. Availability check right before confirmation
    const avail = this.checkAvailability(params.roomTypeId, params.checkIn, params.checkOut, params.rooms);
    if (!avail.available) {
      return {
        success: false,
        error: `Only ${avail.remaining} room(s) available for the selected dates. Please adjust dates or selection.`,
      };
    }

    const property = this.getPropertyById(params.propertyId);
    const room = this.getRoomTypeById(params.roomTypeId);
    const host = this.getHost(property?.host_id);

    // Calculate Commission (0% for Year 1, 10% after)
    const commissionRate = host?.current_commission_rate ?? 0.0;
    const platformCommission = Math.round((params.totalAmount * commissionRate) / 100);
    const hostPayout = params.totalAmount - platformCommission;

    const bookingRef = `UKS-2026-${Math.floor(100000 + Math.random() * 900000)}`;

    const newReservation: Reservation = {
      id: `res-${Date.now()}`,
      booking_reference: bookingRef,
      guest_id: params.guestId,
      guest_name: params.guestName,
      guest_email: params.guestEmail,
      property_id: params.propertyId,
      property_name: property?.property_name || 'Uttarkunth Stay',
      room_type_id: params.roomTypeId,
      room_name: room?.name || 'Selected Room',
      check_in: params.checkIn,
      check_out: params.checkOut,
      number_of_guests: params.guests,
      number_of_rooms: params.rooms,
      base_amount: params.totalAmount,
      taxes: 0,
      total_amount: params.totalAmount,
      applied_commission_rate: commissionRate,
      platform_commission_amount: platformCommission,
      host_payout_amount: hostPayout,
      payment_status: 'paid',
      reservation_status: 'confirmed',
      created_at: new Date().toISOString(),
    };

    this.reservations.unshift(newReservation);

    // Record Simulated Host Payout Ledger
    if (host) {
      this.payouts.unshift({
        id: `payout-${Date.now()}`,
        host_id: host.id,
        reservation_id: newReservation.id,
        gross_booking_amount: params.totalAmount,
        commission_rate: commissionRate,
        commission_amount: platformCommission,
        payout_amount: hostPayout,
        payout_status: 'simulated_test',
        payout_reference: `PAYOUT-SIM-${bookingRef}`,
        payout_date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
        created_at: new Date().toISOString(),
      });
    }

    this.saveToStorage();
    return { success: true, reservation: newReservation };
  }

  // Cancel Reservation
  public cancelReservation(reservationId: string): { success: boolean; message: string } {
    const res = this.reservations.find((r) => r.id === reservationId);
    if (!res) return { success: false, message: 'Reservation not found.' };

    res.reservation_status = 'cancelled';
    res.payment_status = 'refunded';
    this.saveToStorage();
    return { success: true, message: 'Reservation cancelled according to policy. Inventory restored.' };
  }

  // --- HOST ONBOARDING & PROPERTY REGISTRATION ---

  public createProperty(property: Omit<Property, 'id' | 'status' | 'verification_status'>): Property {
    const newProp: Property = {
      ...property,
      id: `prop-${Date.now()}`,
      status: 'pending_review',
      verification_status: 'unverified',
    };
    this.properties.unshift(newProp);
    this.saveToStorage();
    return newProp;
  }

  public approveProperty(propertyId: string): void {
    const prop = this.properties.find((p) => p.id === propertyId);
    if (prop) {
      prop.status = 'approved';
      prop.verification_status = 'verified';
      this.saveToStorage();
    }
  }

  public addRoomType(room: Omit<RoomType, 'id'>): RoomType {
    const newRoom: RoomType = {
      ...room,
      id: `room-${Date.now()}`,
    };
    this.roomTypes.push(newRoom);
    this.saveToStorage();
    return newRoom;
  }
}

export const staysStore = new StaysStore();
