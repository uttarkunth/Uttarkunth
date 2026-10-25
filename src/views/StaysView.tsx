import React, { useEffect, useMemo, useState } from 'react';
import { ArrowRight, CalendarDays, CheckCircle2, Clock3, MapPin, Search, ShieldCheck, Users, Wifi, Coffee, Mountain, X, KeyRound, LoaderCircle } from 'lucide-react';
import { staysApi, PublicProperty, PublicRoom, BookingRequestReceipt } from '../lib/staysApi';

interface StaysViewProps {
  onNavigateToHost?: () => void;
  onNavigateToTrips?: () => void;
}
type BookingForm = { name: string; email: string; phone: string; adults: number; children: number; notes: string };
const initialForm: BookingForm = { name: '', email: '', phone: '', adults: 2, children: 0, notes: '' };
function dateOffset(days: number) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}
function photoUrl(property: PublicProperty) {
  const photo = property.photos?.[0];
  if (typeof photo === 'string') return photo;
  return photo?.url || photo?.public_url || photo?.src || '';
}
function money(value: number) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);
}

export const StaysView: React.FC<StaysViewProps> = ({ onNavigateToHost, onNavigateToTrips }) => {
  const [properties, setProperties] = useState<PublicProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [query, setQuery] = useState('');
  const [checkIn, setCheckIn] = useState(dateOffset(7));
  const [checkOut, setCheckOut] = useState(dateOffset(9));
  const [guestCount, setGuestCount] = useState(2);
  const [selectedRoom, setSelectedRoom] = useState<{ property: PublicProperty; room: PublicRoom } | null>(null);
  const [form, setForm] = useState<BookingForm>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [receipt, setReceipt] = useState<BookingRequestReceipt | null>(null);
  const [trackingOpen, setTrackingOpen] = useState(false);
  const [trackingReference, setTrackingReference] = useState('');
  const [trackingToken, setTrackingToken] = useState('');
  const [trackingResult, setTrackingResult] = useState<Record<string, unknown> | null>(null);
  const [trackingError, setTrackingError] = useState('');
  const [trackingBusy, setTrackingBusy] = useState(false);

  useEffect(() => {
    let active = true;
    staysApi.listProperties()
      .then((result) => { if (active) setProperties(result.properties); })
      .catch((error: Error) => { if (active) setLoadError(error.message || 'Unable to load stays.'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return properties;
    return properties.filter((p) => [p.name, p.village, p.district, p.state, p.address, p.description].some((v) => String(v || '').toLowerCase().includes(term)));
  }, [properties, query]);
  const nights = Math.max(0, Math.round((Date.parse(checkOut + 'T00:00:00Z') - Date.parse(checkIn + 'T00:00:00Z')) / 86400000));

  const openRequest = (property: PublicProperty, room: PublicRoom) => {
    setSelectedRoom({ property, room });
    setForm((current) => ({ ...current, adults: Math.min(current.adults, room.max_guests), children: Math.min(current.children, Math.max(0, room.max_guests - current.adults)) }));
    setFormError('');
    setReceipt(null);
  };

  const submitRequest = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedRoom) return;
    if (!checkIn || !checkOut || nights < 1 || checkIn < dateOffset(0)) {
      setFormError('Please choose valid future check-in and check-out dates.');
      return;
    }
    if (form.adults + form.children > selectedRoom.room.max_guests) {
      setFormError(`This room can accommodate up to ${selectedRoom.room.max_guests} guests.`);
      return;
    }
    setSubmitting(true);
    setFormError('');
    try {
      const result = await staysApi.requestBooking({
        room_unit_id: selectedRoom.room.id,
        guest_name: form.name,
        guest_email: form.email,
        guest_phone: form.phone,
        check_in: checkIn,
        check_out: checkOut,
        adults: form.adults,
        children: form.children,
        special_requests: form.notes,
      });
      setReceipt(result.booking);
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Could not submit your request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const trackRequest = async (event: React.FormEvent) => {
    event.preventDefault();
    setTrackingBusy(true);
    setTrackingError('');
    setTrackingResult(null);
    try {
      const result = await staysApi.trackBooking(trackingReference, trackingToken);
      setTrackingResult(result.booking);
    } catch (error) {
      setTrackingError(error instanceof Error ? error.message : 'Could not find that request.');
    } finally {
      setTrackingBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-stone-900 pb-20">
      <section className="bg-[#163E2E] text-white px-4 sm:px-6 lg:px-8 pt-12 pb-14 border-b border-[#214738]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-3xl space-y-4">
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#E9A16F] font-semibold"><Mountain size={15}/> Uttarkunth Stays · Himalayan Hospitality</span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-semibold leading-tight">Stay somewhere<br/><span className="text-[#D9E6DB] italic">meaningful.</span></h1>
              <p className="text-sm sm:text-base text-[#D1E0D7] max-w-xl leading-relaxed">Find welcoming homestays and mountain retreats, hosted by people who know these places as home. Browse openly, request directly, and travel thoughtfully.</p>
              <div className="flex flex-wrap gap-4 pt-1 text-xs text-[#D1E0D7]">
                <span className="flex items-center gap-2"><ShieldCheck size={15}/> Reviewed listings</span>
                <span className="flex items-center gap-2"><Coffee size={15}/> Local hospitality</span>
                <span className="flex items-center gap-2"><Wifi size={15}/> Work-from-mountains friendly</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => setTrackingOpen(true)} className="px-4 py-3 border border-white/30 hover:bg-white/10 text-white text-xs font-semibold uppercase tracking-wider">Track a request</button>
              {onNavigateToTrips && <button onClick={onNavigateToTrips} className="px-4 py-3 bg-white text-[#163E2E] hover:bg-[#E8EEE8] text-xs font-semibold uppercase tracking-wider">My Trips <ArrowRight size={14} className="inline ml-1"/></button>}
              {onNavigateToHost && <button onClick={onNavigateToHost} className="px-4 py-3 bg-[#B85D28] hover:bg-[#964218] text-white text-xs font-semibold uppercase tracking-wider">List your property</button>}
            </div>
          </div>
          <div className="mt-9 bg-white rounded-xl p-3 sm:p-4 shadow-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_0.8fr_auto] gap-3">
            <label className="flex items-center gap-3 px-3 py-2 border border-stone-200 rounded-lg text-stone-500"><Search size={17}/><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Where would you like to go?" className="w-full text-sm outline-none text-stone-900 placeholder:text-stone-400"/></label>
            <label className="flex items-center gap-2 px-3 py-2 border border-stone-200 rounded-lg text-stone-500"><CalendarDays size={16}/><span className="text-[10px] uppercase tracking-wider">Check in</span><input type="date" min={dateOffset(0)} value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="w-full min-w-0 text-xs text-stone-900 outline-none"/></label>
            <label className="flex items-center gap-2 px-3 py-2 border border-stone-200 rounded-lg text-stone-500"><CalendarDays size={16}/><span className="text-[10px] uppercase tracking-wider">Check out</span><input type="date" min={checkIn || dateOffset(0)} value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="w-full min-w-0 text-xs text-stone-900 outline-none"/></label>
            <label className="flex items-center gap-2 px-3 py-2 border border-stone-200 rounded-lg text-stone-500"><Users size={16}/><select value={guestCount} onChange={(e) => setGuestCount(Number(e.target.value))} className="w-full text-sm text-stone-900 outline-none bg-transparent">{[1,2,3,4,5,6,7,8].map((n) => <option key={n} value={n}>{n} guest{n > 1 ? 's' : ''}</option>)}</select></label>
            <button onClick={() => document.getElementById('stays-results')?.scrollIntoView({ behavior: 'smooth' })} className="px-6 py-3 bg-[#163E2E] hover:bg-[#0F2E22] rounded-lg text-white text-xs font-semibold uppercase tracking-wider">Explore stays</button>
          </div>
        </div>
      </section>

      <main id="stays-results" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div><span className="text-xs uppercase tracking-[0.18em] text-[#B85D28] font-semibold">Thoughtfully hosted</span><h2 className="text-2xl sm:text-3xl font-serif font-semibold mt-1">Find your mountain stay</h2></div>
          <p className="text-xs text-stone-500">{filtered.length} {filtered.length === 1 ? 'property' : 'properties'} · {nights > 0 ? `${nights} nights selected` : 'Choose your dates'}</p>
        </div>

        {loading && <div className="py-20 flex items-center justify-center gap-3 text-stone-500"><LoaderCircle className="animate-spin" size={20}/> Loading verified stays…</div>}
        {!loading && loadError && <div className="p-6 rounded-xl bg-white border border-stone-200"><p className="font-semibold text-stone-900">Stays are temporarily unavailable</p><p className="text-sm text-stone-600 mt-1">{loadError}</p><button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-[#163E2E] text-white text-xs uppercase tracking-wider">Try again</button></div>}
        {!loading && !loadError && filtered.length === 0 && <div className="text-center py-16 bg-white rounded-xl border border-stone-200"><Mountain className="mx-auto text-stone-400" size={36}/><h3 className="font-serif text-xl font-semibold mt-4">No listed stays match that search yet</h3><p className="text-sm text-stone-500 mt-2">Try a nearby village or clear your search.</p><button onClick={() => setQuery('')} className="mt-4 text-sm underline text-[#163E2E]">Clear search</button></div>}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((property) => {
            const image = photoUrl(property);
            const rooms = property.rooms.filter((room) => room.max_guests >= guestCount);
            const lowest = property.rooms.length ? Math.min(...property.rooms.map((room) => Number(room.base_price))) : 0;
            return <article key={property.id} className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
              <div className="relative h-56 bg-[#E5E7DF]">{image ? <img src={image} alt={property.name} className="w-full h-full object-cover"/> : <div className="w-full h-full flex items-center justify-center text-[#163E2E]"><Mountain size={44}/></div>}<span className="absolute left-4 top-4 px-3 py-1.5 rounded-full bg-white/95 text-[10px] uppercase tracking-wider font-bold text-[#163E2E]">Reviewed listing</span></div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3"><div><p className="flex items-center gap-1 text-xs text-stone-500"><MapPin size={13}/>{[property.village, property.district, property.state].filter(Boolean).join(', ')}</p><h3 className="font-serif text-xl font-semibold mt-1">{property.name}</h3></div><div className="text-right shrink-0"><span className="text-lg font-serif font-bold text-[#163E2E]">{money(lowest)}</span><span className="block text-[10px] text-stone-500">starting / night</span></div></div>
                <p className="text-sm text-stone-600 leading-relaxed mt-3 line-clamp-3">{property.description || 'A locally hosted stay in the Himalayas.'}</p>
                {property.amenities?.length > 0 && <div className="flex flex-wrap gap-2 mt-4">{property.amenities.slice(0,4).map((amenity, i) => <span key={i} className="px-2.5 py-1 bg-[#F3F5F0] text-stone-600 text-[10px] rounded-full">{typeof amenity === 'string' ? amenity : String((amenity as {name?:string}).name || 'Amenity')}</span>)}</div>}
                <div className="border-t border-stone-100 mt-5 pt-4 space-y-3">
                  {rooms.length === 0 ? <p className="text-xs text-stone-500">No room currently matches {guestCount} guests. Adjust guest count to see other room options.</p> : rooms.map((room) => <div key={room.id} className="flex items-center justify-between gap-3 p-3 rounded-xl bg-[#F8F8F4] border border-stone-100"><div className="min-w-0"><p className="font-semibold text-sm truncate">{room.room_name}</p><p className="text-[11px] text-stone-500 mt-0.5">Up to {room.max_guests} guests · {money(Number(room.base_price))}/night</p>{nights > 0 && <p className="text-[11px] text-[#163E2E] font-semibold mt-1">Estimate: {money(Number(room.base_price) * nights)}</p>}</div><button onClick={() => openRequest(property, room)} className="shrink-0 px-3 py-2 bg-[#163E2E] hover:bg-[#0F2E22] text-white rounded-lg text-[10px] font-bold uppercase tracking-wider">Request</button></div>)}
                </div>
              </div>
            </article>;
          })}
        </div>
        <div className="mt-10 p-5 sm:p-6 bg-[#EEF2EA] rounded-2xl border border-[#D7E1D4] flex flex-col sm:flex-row sm:items-center gap-4"><ShieldCheck className="text-[#163E2E] shrink-0" size={28}/><div className="flex-1"><h3 className="font-serif font-semibold text-lg text-[#163E2E]">A more thoughtful way to stay</h3><p className="text-sm text-stone-600 mt-1">Your request goes to the host for confirmation. No online payment is collected on this first release. Please keep your booking reference and private tracking token safe.</p></div><span className="text-xs font-bold text-[#163E2E] whitespace-nowrap">0% introductory commission*</span></div>
      </main>

      {selectedRoom && <div className="fixed inset-0 z-50 bg-black/55 p-3 sm:p-6 overflow-y-auto flex items-center justify-center" role="dialog" aria-modal="true" aria-label="Request a stay">
        <div className="bg-[#FBF9F5] w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-[#163E2E] text-white p-5 sm:p-6 flex items-start justify-between gap-4"><div><p className="text-[10px] uppercase tracking-[0.18em] text-[#E9A16F]">Request to book</p><h2 className="font-serif text-2xl font-semibold mt-1">{selectedRoom.property.name}</h2><p className="text-xs text-[#D1E0D7] mt-1">{selectedRoom.room.room_name}</p></div><button onClick={() => { setSelectedRoom(null); setReceipt(null); }} aria-label="Close" className="p-2 hover:bg-white/10 rounded-lg"><X size={19}/></button></div>
          <div className="p-5 sm:p-6">
            {receipt ? <div className="space-y-5"><div className="flex items-center gap-3 text-[#166534]"><CheckCircle2 size={30}/><div><h3 className="font-serif text-xl font-semibold">Request sent successfully</h3><p className="text-sm text-stone-600">Your booking is pending host confirmation.</p></div></div><div className="bg-white border border-stone-200 rounded-xl p-4 space-y-3"><div className="flex justify-between gap-4"><span className="text-xs text-stone-500">Booking reference</span><strong className="font-mono text-sm">{receipt.reference}</strong></div><div className="flex justify-between gap-4"><span className="text-xs text-stone-500">Status</span><strong className="text-amber-700 text-sm">Pending</strong></div><div className="flex justify-between gap-4"><span className="text-xs text-stone-500">Estimated total</span><strong>{money(receipt.estimated_total)}</strong></div><div className="pt-3 border-t border-stone-100"><p className="text-xs font-semibold flex items-center gap-2"><KeyRound size={14}/> Private tracking token — copy and save it now</p><p className="font-mono text-xs break-all bg-stone-50 p-3 rounded-lg mt-2 select-all">{receipt.access_token}</p><button onClick={() => navigator.clipboard?.writeText(`Reference: ${receipt.reference}\nTracking token: ${receipt.access_token}`)} className="mt-2 text-xs font-semibold underline text-[#163E2E]">Copy reference and token</button></div></div><p className="text-xs text-stone-500">Keep both the reference and token private. They are required to check the status of this request. No payment has been taken.</p><button onClick={() => { setTrackingReference(receipt.reference); setTrackingToken(receipt.access_token); setSelectedRoom(null); setReceipt(null); setTrackingOpen(true); }} className="w-full py-3 bg-[#163E2E] text-white rounded-lg text-xs font-bold uppercase tracking-wider">Track this request</button></div> : <form onSubmit={submitRequest} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3"><label className="text-xs font-semibold text-stone-700">Check-in<input required type="date" min={dateOffset(0)} value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="block mt-1 w-full p-3 rounded-lg border border-stone-200 bg-white text-sm"/></label><label className="text-xs font-semibold text-stone-700">Check-out<input required type="date" min={checkIn || dateOffset(0)} value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="block mt-1 w-full p-3 rounded-lg border border-stone-200 bg-white text-sm"/></label></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3"><label className="text-xs font-semibold text-stone-700">Your full name<input required maxLength={120} value={form.name} onChange={(e) => setForm({...form,name:e.target.value})} className="block mt-1 w-full p-3 rounded-lg border border-stone-200 bg-white text-sm" placeholder="Full name"/></label><label className="text-xs font-semibold text-stone-700">Email address<input required type="email" maxLength={254} value={form.email} onChange={(e) => setForm({...form,email:e.target.value})} className="block mt-1 w-full p-3 rounded-lg border border-stone-200 bg-white text-sm" placeholder="you@example.com"/></label></div>
              <label className="block text-xs font-semibold text-stone-700">Phone number<input required type="tel" maxLength={40} value={form.phone} onChange={(e) => setForm({...form,phone:e.target.value})} className="block mt-1 w-full p-3 rounded-lg border border-stone-200 bg-white text-sm" placeholder="+91"/></label>
              <div className="grid grid-cols-2 gap-3"><label className="text-xs font-semibold text-stone-700">Adults<select value={form.adults} onChange={(e) => setForm({...form,adults:Number(e.target.value)})} className="block mt-1 w-full p-3 rounded-lg border border-stone-200 bg-white text-sm">{Array.from({length:selectedRoom.room.max_guests},(_,i)=>i+1).map(n=><option key={n} value={n}>{n}</option>)}</select></label><label className="text-xs font-semibold text-stone-700">Children<select value={form.children} onChange={(e) => setForm({...form,children:Number(e.target.value)})} className="block mt-1 w-full p-3 rounded-lg border border-stone-200 bg-white text-sm">{Array.from({length:Math.max(0,selectedRoom.room.max_guests-form.adults)+1},(_,i)=>i).map(n=><option key={n} value={n}>{n}</option>)}</select></label></div>
              <label className="block text-xs font-semibold text-stone-700">Special requests (optional)<textarea maxLength={1500} value={form.notes} onChange={(e) => setForm({...form,notes:e.target.value})} className="block mt-1 w-full p-3 rounded-lg border border-stone-200 bg-white text-sm min-h-20" placeholder="Arrival time, meal preferences, or questions"/></label>
              {formError && <p role="alert" className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{formError}</p>}
              <div className="bg-[#EEF2EA] p-3 rounded-lg text-xs text-stone-600"><p className="flex items-center gap-2 font-semibold text-[#163E2E]"><Clock3 size={14}/> {nights} night(s) · Estimated {money(Number(selectedRoom.room.base_price) * Math.max(0,nights))}</p><p className="mt-1">This is a request, not an instant confirmation. Pay at the property only after the host confirms your stay.</p></div>
              <button disabled={submitting} className="w-full py-3.5 bg-[#163E2E] hover:bg-[#0F2E22] disabled:opacity-60 text-white rounded-lg text-xs font-bold uppercase tracking-[0.15em]">{submitting ? 'Sending request…' : 'Send booking request'}</button>
            </form>}
          </div>
        </div>
      </div>}

      {trackingOpen && <div className="fixed inset-0 z-50 bg-black/55 p-3 sm:p-6 overflow-y-auto flex items-center justify-center" role="dialog" aria-modal="true" aria-label="Track booking request"><div className="bg-[#FBF9F5] w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden"><div className="bg-[#163E2E] text-white p-5 flex justify-between items-center"><div><h2 className="font-serif text-xl font-semibold">Track your request</h2><p className="text-xs text-[#D1E0D7] mt-1">Use the reference and private token from your confirmation.</p></div><button onClick={() => {setTrackingOpen(false);setTrackingResult(null);setTrackingError('');}} aria-label="Close"><X size={19}/></button></div><div className="p-5 space-y-4"><form onSubmit={trackRequest} className="space-y-3"><label className="block text-xs font-semibold">Booking reference<input required value={trackingReference} onChange={(e)=>setTrackingReference(e.target.value)} className="block mt-1 w-full p-3 rounded-lg border border-stone-200 bg-white font-mono text-sm" placeholder="UK-…"/></label><label className="block text-xs font-semibold">Private tracking token<input required value={trackingToken} onChange={(e)=>setTrackingToken(e.target.value)} className="block mt-1 w-full p-3 rounded-lg border border-stone-200 bg-white font-mono text-xs" placeholder="Paste your token"/></label><button disabled={trackingBusy} className="w-full py-3 bg-[#163E2E] text-white rounded-lg text-xs font-bold uppercase tracking-wider">{trackingBusy?'Checking…':'Check request status'}</button></form>{trackingError && <p role="alert" className="text-sm text-red-700 bg-red-50 border border-red-200 p-3 rounded-lg">{trackingError}</p>}{trackingResult && <div className="bg-white border border-stone-200 rounded-xl p-4 text-sm space-y-2"><p className="font-semibold">{String(trackingResult.booking_reference || '')}</p><p>Status: <strong className="capitalize">{String(trackingResult.status || 'pending')}</strong></p><p>Dates: {String(trackingResult.check_in || '')} → {String(trackingResult.check_out || '')}</p><p>Estimated total: {money(Number(trackingResult.estimated_total || 0))}</p><p className="text-xs text-stone-500">Contact the host if you need to change a confirmed booking.</p></div>}</div></div></div>}
    </div>
  );
};
