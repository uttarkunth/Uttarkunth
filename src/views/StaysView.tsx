import React, { useState } from 'react';
import { Property, RoomType, Reservation } from '../types/database.types';
import { staysStore } from '../lib/staysStore';
import { RazorpayService } from '../lib/razorpay';
import { PropertyMapView } from '../components/stays/PropertyMapView';
import { RazorpayTestModal } from '../components/stays/RazorpayTestModal';
import {
  MapPin,
  Calendar,
  Users,
  Search,
  CheckCircle,
  Wifi,
  Coffee,
  Flame,
  Mountain,
  Shield,
  Navigation,
  ArrowRight,
  ExternalLink,
  Info,
  Clock,
  Sparkles,
  ChevronLeft,
} from 'lucide-react';

interface StaysViewProps {
  onNavigateToHost?: () => void;
  onNavigateToTrips?: () => void;
}

export const StaysView: React.FC<StaysViewProps> = ({ onNavigateToHost, onNavigateToTrips }) => {
  const [properties] = useState<Property[]>(staysStore.getProperties('approved'));
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(properties[0] || null);
  const [selectedRoom, setSelectedRoom] = useState<RoomType | null>(null);

  // Search Filters
  const [searchDestination, setSearchDestination] = useState('');
  const [checkInDate, setCheckInDate] = useState('2026-10-15');
  const [checkOutDate, setCheckOutDate] = useState('2026-10-18');
  const [guestCount, setGuestCount] = useState(2);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');

  // Checkout State
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [guestName, setGuestName] = useState('Priya Sharma');
  const [guestEmail, setGuestEmail] = useState('priya@example.com');
  const [activeRazorpayOrder, setActiveRazorpayOrder] = useState<{ id: string; amount: number } | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<Reservation | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Filter properties by destination query
  const filteredProperties = properties.filter((p) => {
    if (!searchDestination.trim()) return true;
    const q = searchDestination.toLowerCase();
    return (
      p.property_name.toLowerCase().includes(q) ||
      p.locality?.toLowerCase().includes(q) ||
      p.city.toLowerCase().includes(q) ||
      p.district.toLowerCase().includes(q)
    );
  });

  const propertyRooms = selectedProperty ? staysStore.getRoomTypesForProperty(selectedProperty.id) : [];

  // Calculate nights
  const nights = Math.max(
    1,
    Math.round((new Date(checkOutDate).getTime() - new Date(checkInDate).getTime()) / (1000 * 3600 * 24))
  );

  // Initiate Booking & Temporary Hold
  const handleInitiateBooking = async (room: RoomType) => {
    setErrorMessage(null);
    setSelectedRoom(room);

    // 1. Check availability
    const avail = staysStore.checkAvailability(room.id, checkInDate, checkOutDate, 1);
    if (!avail.available) {
      setErrorMessage(`These dates are no longer available (${avail.remaining} left). Please choose other dates.`);
      return;
    }

    // 2. Calculate Total
    const total = room.base_price * nights;

    // 3. Create Razorpay Test Order
    const order = await RazorpayService.createTestOrder(total, `BOOK-${Date.now()}`);
    setActiveRazorpayOrder({ id: order.id, amount: total });
    setIsCheckingOut(true);
  };

  // Payment Success Handler
  const handlePaymentSuccess = (paymentDetails: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }) => {
    if (!selectedProperty || !selectedRoom || !activeRazorpayOrder) return;

    const result = staysStore.confirmReservationAtomic({
      guestId: 'guest-current-user',
      guestName,
      guestEmail,
      propertyId: selectedProperty.id,
      roomTypeId: selectedRoom.id,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests: guestCount,
      rooms: 1,
      totalAmount: activeRazorpayOrder.amount,
      razorpayOrderId: paymentDetails.razorpay_order_id,
      razorpayPaymentId: paymentDetails.razorpay_payment_id,
      razorpaySignature: paymentDetails.razorpay_signature,
    });

    if (result.success && result.reservation) {
      setConfirmedBooking(result.reservation);
      setActiveRazorpayOrder(null);
      setIsCheckingOut(false);
    } else {
      setErrorMessage(result.error || 'Could not confirm booking. Please try again.');
      setActiveRazorpayOrder(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-stone-900 pb-20">
      {/* 1. HERO BANNER */}
      <section className="bg-[#163E2E] text-white pt-14 pb-16 px-4 sm:px-6 lg:px-8 border-b border-[#214738]">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-widest text-[#D8773E] font-semibold flex items-center gap-2">
                <Sparkles size={14} />
                <span>Uttarkunth Stays • Mountain Hospitality Network</span>
              </span>
              <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
                Stay Somewhere Meaningful.
              </h1>
              <p className="text-sm sm:text-base text-[#D1E0D7] max-w-2xl font-light leading-relaxed">
                Discover verified homestays, cottages, and retreats rooted in Himalayan culture and warm community hosting.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {onNavigateToHost && (
                <button
                  onClick={onNavigateToHost}
                  className="px-5 py-2.5 bg-[#B85D28] hover:bg-[#964218] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-md flex items-center gap-1.5"
                >
                  <span>List Your Property (0% Year 1)</span>
                  <ArrowRight size={13} />
                </button>
              )}
              {onNavigateToTrips && (
                <button
                  onClick={onNavigateToTrips}
                  className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-medium uppercase tracking-wider transition-all border border-white/20"
                >
                  My Trips
                </button>
              )}
            </div>
          </div>

          {/* Search Filter Bar */}
          <div className="bg-white rounded-xl shadow-xl p-4 border border-stone-200 text-stone-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <label className="text-[10px] uppercase tracking-wider font-bold text-stone-500 block mb-1">
                Destination
              </label>
              <div className="flex items-center gap-2 px-3 py-2 bg-stone-50 rounded-lg border border-stone-200">
                <MapPin size={16} className="text-[#B85D28] shrink-0" />
                <input
                  type="text"
                  placeholder="Parvati, Jari, Kullu..."
                  value={searchDestination}
                  onChange={(e) => setSearchDestination(e.target.value)}
                  className="bg-transparent text-xs w-full focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-wider font-bold text-stone-500 block mb-1">
                Check In
              </label>
              <div className="flex items-center gap-2 px-3 py-2 bg-stone-50 rounded-lg border border-stone-200">
                <Calendar size={16} className="text-[#163E2E] shrink-0" />
                <input
                  type="date"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  className="bg-transparent text-xs w-full focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-wider font-bold text-stone-500 block mb-1">
                Check Out
              </label>
              <div className="flex items-center gap-2 px-3 py-2 bg-stone-50 rounded-lg border border-stone-200">
                <Calendar size={16} className="text-[#163E2E] shrink-0" />
                <input
                  type="date"
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  className="bg-transparent text-xs w-full focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-wider font-bold text-stone-500 block mb-1">
                Guests
              </label>
              <div className="flex items-center gap-2 px-3 py-2 bg-stone-50 rounded-lg border border-stone-200">
                <Users size={16} className="text-stone-500 shrink-0" />
                <select
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="bg-transparent text-xs w-full focus:outline-none"
                >
                  <option value={1}>1 Guest</option>
                  <option value={2}>2 Guests</option>
                  <option value={3}>3 Guests</option>
                  <option value={4}>4+ Guests</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CONFIRMED BOOKING BANNER (If recently confirmed) */}
      {confirmedBooking && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-5 text-emerald-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm animate-in fade-in duration-300">
            <div className="flex items-start gap-3">
              <CheckCircle size={24} className="text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-serif font-bold text-base">Booking Confirmed: {confirmedBooking.booking_reference}</p>
                <p className="text-xs text-emerald-700 mt-0.5">
                  Your reservation at <strong>{confirmedBooking.property_name}</strong> ({confirmedBooking.room_name}) from {confirmedBooking.check_in} to {confirmedBooking.check_out} is locked and confirmed!
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                if (onNavigateToTrips) onNavigateToTrips();
              }}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-xs font-semibold uppercase tracking-wider transition-colors shrink-0"
            >
              View in My Trips
            </button>
          </div>
        </div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center justify-between">
            <span>{errorMessage}</span>
            <button onClick={() => setErrorMessage(null)} className="font-bold underline text-xs">Dismiss</button>
          </div>
        </div>
      )}

      {/* 3. MAIN EXPLORER AREA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* View Mode Toggle */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-xl text-stone-900">
              {filteredProperties.length} Verified Himalayan Stays
            </span>
            <span className="text-xs bg-[#163E2E]/10 text-[#163E2E] font-medium px-2 py-0.5 rounded-full">
              Zero Fake Listings
            </span>
          </div>

          <div className="flex items-center gap-1 bg-stone-200/80 p-1 rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                viewMode === 'grid' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Listings View
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                viewMode === 'map' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Map Explorer
            </button>
          </div>
        </div>

        {/* MAP VIEW */}
        {viewMode === 'map' ? (
          <div className="space-y-6">
            <PropertyMapView
              properties={filteredProperties}
              selectedProperty={selectedProperty}
              onSelectProperty={(prop) => {
                setSelectedProperty(prop);
                setViewMode('grid');
              }}
            />
          </div>
        ) : (
          /* GRID VIEW */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredProperties.map((prop) => {
              const isSelected = selectedProperty?.id === prop.id;
              return (
                <div
                  key={prop.id}
                  onClick={() => setSelectedProperty(prop)}
                  className={`bg-white rounded-2xl overflow-hidden border cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md flex flex-col ${
                    isSelected ? 'border-[#163E2E] ring-2 ring-[#163E2E]/20' : 'border-stone-200'
                  }`}
                >
                  <div className="relative aspect-4/3 w-full bg-stone-100 overflow-hidden">
                    <img
                      src={prop.cover_image}
                      alt={prop.property_name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full text-[10px] font-bold text-[#163E2E] uppercase tracking-wider flex items-center gap-1 shadow-xs">
                      <Shield size={12} className="text-[#163E2E]" />
                      <span>Verified Stay</span>
                    </div>
                    <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-xs text-white px-2.5 py-1 rounded-md text-xs font-serif font-bold">
                      ₹{prop.starting_price?.toLocaleString('en-IN')} / night
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                        <span>{prop.locality}, {prop.city}</span>
                        <span className="font-semibold text-amber-700">★ {prop.rating}</span>
                      </div>
                      <h3 className="font-serif font-bold text-lg text-stone-900 leading-snug">
                        {prop.property_name}
                      </h3>
                      <p className="text-xs text-stone-600 line-clamp-2 mt-1.5 leading-relaxed font-light">
                        {prop.short_description || prop.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                      <span className="text-[11px] text-stone-500 capitalize">{prop.property_type.replace('_', ' ')}</span>
                      <button className="text-[#B85D28] hover:text-[#964218] font-bold text-xs flex items-center gap-1">
                        <span>View Rooms</span>
                        <ArrowRight size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 4. SELECTED PROPERTY DETAILS & ROOM SELECTION */}
        {selectedProperty && (
          <div className="mt-14 pt-12 border-t border-stone-200 space-y-10 animate-in fade-in duration-200">
            {/* Header info */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-widest text-[#B85D28] font-bold">
                  Selected Homestay Details
                </span>
                <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900">
                  {selectedProperty.property_name}
                </h2>
                <div className="flex items-center gap-3 text-xs text-stone-600">
                  <span className="flex items-center gap-1 text-[#163E2E] font-medium">
                    <MapPin size={14} />
                    <span>{selectedProperty.address}, {selectedProperty.city}</span>
                  </span>
                  <span>•</span>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${selectedProperty.latitude},${selectedProperty.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#B85D28] hover:underline font-semibold"
                  >
                    <Navigation size={13} />
                    <span>Get Directions on Google Maps</span>
                    <ExternalLink size={10} />
                  </a>
                </div>
              </div>

              <div className="bg-[#163E2E]/5 border border-[#163E2E]/20 p-4 rounded-xl flex items-center gap-3">
                <Shield size={24} className="text-[#163E2E] shrink-0" />
                <div className="text-xs text-stone-700">
                  <p className="font-bold text-[#163E2E]">Uttarkunth Host Guarantee</p>
                  <p className="text-[11px] text-stone-500">Every room inspected. Zero unauthorized commercial commissions.</p>
                </div>
              </div>
            </div>

            {/* Photo Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 rounded-2xl overflow-hidden">
              <div className="sm:col-span-2 aspect-16/10 bg-stone-100 overflow-hidden">
                <img
                  src={selectedProperty.images?.[0] || selectedProperty.cover_image}
                  alt={selectedProperty.property_name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-1 gap-3">
                <div className="aspect-16/10 bg-stone-100 overflow-hidden rounded-lg sm:rounded-none">
                  <img
                    src={selectedProperty.images?.[1] || selectedProperty.cover_image}
                    alt="Property detail"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-16/10 bg-stone-100 overflow-hidden rounded-lg sm:rounded-none">
                  <img
                    src={selectedProperty.images?.[2] || selectedProperty.cover_image}
                    alt="Property scenery"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* About & Amenities */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 space-y-6">
                <div className="space-y-3">
                  <h3 className="font-serif font-bold text-xl text-stone-900">About this Himalayan Stay</h3>
                  <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-light">
                    {selectedProperty.description}
                  </p>
                </div>

                {/* Amenities */}
                <div className="pt-4 border-t border-stone-100 space-y-3">
                  <h4 className="font-serif font-bold text-base text-stone-900">Included Amenities</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-stone-700">
                    <div className="flex items-center gap-2 p-2.5 bg-stone-50 rounded-lg">
                      <Wifi size={16} className="text-[#163E2E]" />
                      <span>Fast Mountain Fiber Wi-Fi</span>
                    </div>
                    <div className="flex items-center gap-2 p-2.5 bg-stone-50 rounded-lg">
                      <Mountain size={16} className="text-[#163E2E]" />
                      <span>Valley & Ridge Views</span>
                    </div>
                    <div className="flex items-center gap-2 p-2.5 bg-stone-50 rounded-lg">
                      <Coffee size={16} className="text-[#163E2E]" />
                      <span>Home-cooked Organic Meals</span>
                    </div>
                    <div className="flex items-center gap-2 p-2.5 bg-stone-50 rounded-lg">
                      <Flame size={16} className="text-[#163E2E]" />
                      <span>Wood Bukhari / Heating</span>
                    </div>
                    <div className="flex items-center gap-2 p-2.5 bg-stone-50 rounded-lg">
                      <Clock size={16} className="text-[#163E2E]" />
                      <span>Check-in: {selectedProperty.check_in_time.slice(0, 5)}</span>
                    </div>
                    <div className="flex items-center gap-2 p-2.5 bg-stone-50 rounded-lg">
                      <Shield size={16} className="text-[#163E2E]" />
                      <span>Verified Host Onsite</span>
                    </div>
                  </div>
                </div>

                {/* House Rules & Policies */}
                <div className="pt-4 border-t border-stone-100 space-y-2">
                  <h4 className="font-serif font-bold text-base text-stone-900">Community Respect & Rules</h4>
                  <ul className="list-disc list-inside text-xs text-stone-600 space-y-1">
                    {selectedProperty.house_rules.map((rule, idx) => (
                      <li key={idx}>{rule}</li>
                    ))}
                    <li>Cancellation policy: <strong>{selectedProperty.cancellation_policy}</strong> (Full refund prior to 5 days before check-in).</li>
                  </ul>
                </div>
              </div>

              {/* ROOM TYPES & DIRECT BOOKING CARD */}
              <div className="space-y-4">
                <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-lg space-y-6">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#B85D28] font-bold block mb-1">
                      Live Availability Engine
                    </span>
                    <h3 className="font-serif font-bold text-xl text-stone-900">Select Room & Book</h3>
                    <p className="text-xs text-stone-500 mt-1">
                      Selected: <strong>{nights} night(s)</strong> ({checkInDate} to {checkOutDate})
                    </p>
                  </div>

                  {/* Room List */}
                  <div className="space-y-3">
                    {propertyRooms.map((room) => {
                      const avail = staysStore.checkAvailability(room.id, checkInDate, checkOutDate, 1);
                      const isRoomAvailable = avail.available;

                      return (
                        <div
                          key={room.id}
                          className={`p-4 rounded-xl border transition-all ${
                            isRoomAvailable
                              ? 'border-stone-200 hover:border-[#163E2E] bg-stone-50/50'
                              : 'border-stone-200 bg-stone-100 opacity-60'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h4 className="font-serif font-bold text-sm text-stone-900">{room.name}</h4>
                              <p className="text-[11px] text-stone-500 mt-0.5">{room.description}</p>
                              <div className="mt-2 flex items-center gap-2 text-[11px]">
                                <span className="text-stone-600">Up to {room.max_guests} guests</span>
                                <span>•</span>
                                <span className={`font-semibold ${isRoomAvailable ? 'text-emerald-700' : 'text-red-600'}`}>
                                  {isRoomAvailable ? `${avail.remaining} room(s) left` : 'Sold out on these dates'}
                                </span>
                              </div>
                            </div>
                            <div className="text-right shrink-0">
                              <span className="font-serif font-bold text-base text-[#163E2E]">₹{room.base_price}</span>
                              <span className="text-[10px] text-stone-500 block">/ night</span>
                            </div>
                          </div>

                          <div className="mt-3 pt-3 border-t border-stone-200/60 flex items-center justify-between">
                            <span className="text-xs font-semibold text-stone-800">
                              Total: ₹{(room.base_price * nights).toLocaleString('en-IN')}
                            </span>
                            <button
                              disabled={!isRoomAvailable}
                              onClick={() => handleInitiateBooking(room)}
                              className="px-4 py-2 bg-[#163E2E] hover:bg-[#0F2E22] text-white rounded text-xs font-semibold uppercase tracking-wider transition-colors disabled:bg-stone-300 disabled:cursor-not-allowed shadow-xs"
                            >
                              Book Now
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="p-3 bg-amber-50 rounded-lg border border-amber-200/80 text-[11px] text-amber-800 flex items-start gap-2">
                    <Info size={14} className="shrink-0 mt-0.5 text-amber-600" />
                    <span>
                      <strong>Staging Test Mode Active:</strong> Payments processed via Razorpay Sandbox with simulated test credentials.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* NEARBY UTTARKUNTH STAYS (Section 31 requirement) */}
            <div className="pt-10 border-t border-stone-200 space-y-4">
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-widest text-[#B85D28] font-bold">
                  Explore More
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                  Nearby Verified Uttarkunth Stays
                </h3>
                <p className="text-xs text-stone-500">
                  Authentic community-hosted properties in the same mountain corridor.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {properties
                  .filter((p) => p.id !== selectedProperty.id)
                  .slice(0, 2)
                  .map((nearby) => (
                    <div
                      key={nearby.id}
                      onClick={() => {
                        setSelectedProperty(nearby);
                        window.scrollTo({ top: 400, behavior: 'smooth' });
                      }}
                      className="p-4 bg-white rounded-xl border border-stone-200 hover:border-[#163E2E] cursor-pointer shadow-xs transition-all flex gap-3"
                    >
                      <img
                        src={nearby.cover_image}
                        alt={nearby.property_name}
                        className="w-20 h-20 rounded-lg object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] text-stone-500 uppercase tracking-wider">{nearby.locality}</span>
                        <h4 className="font-serif font-bold text-sm text-stone-900 truncate mt-0.5">{nearby.property_name}</h4>
                        <p className="text-xs font-serif font-bold text-[#163E2E] mt-1">₹{nearby.starting_price} / night</p>
                        <span className="text-[11px] text-[#B85D28] font-semibold mt-1 inline-block">Switch to this stay →</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 5. RAZORPAY TEST MODAL (Checkout Engine) */}
      {isCheckingOut && activeRazorpayOrder && selectedProperty && selectedRoom && (
        <RazorpayTestModal
          orderId={activeRazorpayOrder.id}
          amount={activeRazorpayOrder.amount}
          propertyName={selectedProperty.property_name}
          roomName={selectedRoom.name}
          onSuccess={handlePaymentSuccess}
          onClose={() => setIsCheckingOut(false)}
        />
      )}
    </div>
  );
};
