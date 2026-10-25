import React, { useState } from 'react';
import { ArrowLeft, CalendarDays, CheckCircle2, KeyRound, LoaderCircle, MapPin, Search, ShieldCheck, XCircle } from 'lucide-react';
import { staysApi } from '../lib/staysApi';

interface GuestTripsViewProps { onNavigateToExplore: () => void; }
type TrackedBooking = Record<string, unknown>;
const display = (value: unknown) => value == null || value === '' ? '—' : String(value);
const money = (value: unknown) => new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(Number(value || 0));

export const GuestTripsView: React.FC<GuestTripsViewProps> = ({ onNavigateToExplore }) => {
  const [reference, setReference] = useState('');
  const [token, setToken] = useState('');
  const [booking, setBooking] = useState<TrackedBooking | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');

  const lookup = async (event: React.FormEvent) => {
    event.preventDefault(); setBusy(true); setError(''); setNotice(''); setBooking(null);
    try { const result = await staysApi.trackBooking(reference, token); setBooking(result.booking); }
    catch (e) { setError(e instanceof Error ? e.message : 'Could not find that booking.'); }
    finally { setBusy(false); }
  };
  const cancel = async () => {
    if (!booking || !window.confirm('Cancel this pending booking request?')) return;
    setBusy(true); setError(''); setNotice('');
    try {
      await staysApi.cancelPendingBooking(display(booking.booking_reference), token, 'Cancelled by guest');
      setNotice('Your pending request has been cancelled.');
      const result = await staysApi.trackBooking(reference, token); setBooking(result.booking);
    } catch (e) { setError(e instanceof Error ? e.message : 'Could not cancel this request.'); }
    finally { setBusy(false); }
  };
  const property = booking?.property as Record<string, unknown> | undefined;
  const room = booking?.room as Record<string, unknown> | undefined;
  const status = display(booking?.status).toLowerCase();

  return <div className="min-h-screen bg-[#FBF9F5] text-stone-900 pb-20">
    <section className="bg-[#163E2E] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-[#214738]"><div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-5"><div><span className="text-xs uppercase tracking-[0.18em] text-[#E9A16F] font-semibold">Guest portal</span><h1 className="text-3xl sm:text-4xl font-serif font-semibold mt-2">Your Himalayan trips</h1><p className="text-sm text-[#D1E0D7] mt-2 max-w-xl">Look up a request securely using the booking reference and private tracking token shown when you submitted it.</p></div><button onClick={onNavigateToExplore} className="px-5 py-3 bg-white text-[#163E2E] text-xs font-bold uppercase tracking-wider rounded-lg self-start sm:self-auto"><ArrowLeft size={14} className="inline mr-2"/>Explore stays</button></div></section>
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-9 space-y-6">
      <div className="bg-white border border-stone-200 rounded-2xl p-5 sm:p-7 shadow-sm"><div className="flex gap-3 items-start mb-5"><div className="p-3 bg-[#EEF2EA] rounded-xl text-[#163E2E]"><KeyRound size={22}/></div><div><h2 className="font-serif text-xl font-semibold">Find a booking request</h2><p className="text-sm text-stone-500 mt-1">Your token is private. Uttarkunth stores only a secure hash of it.</p></div></div>
        <form onSubmit={lookup} className="space-y-4"><label className="block text-xs font-semibold text-stone-700">Booking reference<input required value={reference} onChange={e=>setReference(e.target.value)} className="block w-full mt-1 p-3 border border-stone-200 rounded-lg bg-stone-50 font-mono text-sm" placeholder="UK-…"/></label><label className="block text-xs font-semibold text-stone-700">Private tracking token<input required value={token} onChange={e=>setToken(e.target.value)} className="block w-full mt-1 p-3 border border-stone-200 rounded-lg bg-stone-50 font-mono text-xs" placeholder="Paste the token from your confirmation"/></label><button disabled={busy} className="w-full py-3 bg-[#163E2E] hover:bg-[#0F2E22] disabled:opacity-60 text-white rounded-lg text-xs font-bold uppercase tracking-wider">{busy?<><LoaderCircle size={14} className="inline mr-2 animate-spin"/>Checking…</>:<><Search size={14} className="inline mr-2"/>Find my request</>}</button></form>
        {error && <p role="alert" className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">{error}</p>}{notice && <p role="status" className="mt-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-sm text-emerald-800">{notice}</p>}
      </div>
      {booking && <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm"><div className="p-5 sm:p-6 bg-[#F3F5F0] border-b border-stone-200 flex items-start justify-between gap-4"><div><p className="text-[10px] uppercase tracking-wider text-stone-500">Booking reference</p><p className="font-mono font-bold text-[#163E2E] mt-1">{display(booking.booking_reference)}</p><h2 className="font-serif text-2xl font-semibold mt-3">{display(property?.name)}</h2><p className="text-sm text-stone-500 mt-1">{[property?.village,property?.district,property?.state].filter(Boolean).join(', ')}</p></div><span className={`px-3 py-1.5 rounded-full text-xs font-bold capitalize ${status==='confirmed'?'bg-emerald-100 text-emerald-800':status==='cancelled'?'bg-stone-200 text-stone-700':status==='rejected'?'bg-red-100 text-red-800':'bg-amber-100 text-amber-800'}`}>{display(booking.status)}</span></div>
        <div className="p-5 sm:p-6 space-y-5"><div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><div className="p-4 rounded-xl bg-stone-50"><p className="text-xs text-stone-500 flex items-center gap-2"><CalendarDays size={14}/> Check-in</p><p className="font-semibold mt-2">{display(booking.check_in)}</p></div><div className="p-4 rounded-xl bg-stone-50"><p className="text-xs text-stone-500 flex items-center gap-2"><CalendarDays size={14}/> Check-out</p><p className="font-semibold mt-2">{display(booking.check_out)}</p></div></div><div className="flex flex-col sm:flex-row justify-between gap-4"><div><p className="text-xs text-stone-500">Room</p><p className="font-semibold mt-1">{display(room?.room_name)}</p><p className="text-xs text-stone-500 mt-1">{display(booking.adults)} adult(s) · {display(booking.children)} child(ren)</p></div><div className="sm:text-right"><p className="text-xs text-stone-500">Estimated total · pay at property after confirmation</p><p className="font-serif text-2xl font-semibold text-[#163E2E] mt-1">{money(booking.estimated_total)}</p></div></div><div className="p-4 rounded-xl bg-[#EEF2EA] text-sm text-stone-700 flex gap-3"><ShieldCheck size={20} className="text-[#163E2E] shrink-0"/><p>{status==='confirmed'?'Your host has confirmed this stay. Contact the property directly for any changes.':status==='cancelled'?'This request has been cancelled.':status==='rejected'?'The host could not accept this request. You can explore other available stays.':'Your request is awaiting host confirmation. This is not a confirmed reservation yet.'}</p></div>{status==='pending' && <button disabled={busy} onClick={cancel} className="px-4 py-2.5 border border-red-200 text-red-700 hover:bg-red-50 rounded-lg text-xs font-bold uppercase tracking-wider"><XCircle size={14} className="inline mr-2"/>Cancel pending request</button>}</div></div>}
      <p className="text-xs text-stone-500 text-center leading-relaxed">Lost your token? For your privacy, it cannot be recovered from the database. Contact Uttarkunth support for assistance.</p>
    </main>
  </div>;
};
