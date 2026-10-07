import React, { useState } from 'react';
import { staysStore } from '../lib/staysStore';
import { Reservation } from '../types/database.types';
import {
  Calendar,
  MapPin,
  Clock,
  ShieldCheck,
  Navigation,
  ExternalLink,
  AlertCircle,
  CheckCircle,
  XCircle,
  ArrowRight,
} from 'lucide-react';

interface GuestTripsViewProps {
  onNavigateToExplore: () => void;
}

export const GuestTripsView: React.FC<GuestTripsViewProps> = ({ onNavigateToExplore }) => {
  const [reservations, setReservations] = useState<Reservation[]>(
    staysStore.getReservationsForGuest('guest-current-user')
  );
  const [cancellationNotice, setCancellationNotice] = useState<string | null>(null);

  const handleCancelBooking = (bookingId: string) => {
    const res = staysStore.cancelReservation(bookingId);
    if (res.success) {
      setCancellationNotice(res.message);
      setReservations(staysStore.getReservationsForGuest('guest-current-user'));
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-stone-900 pb-20">
      {/* Header */}
      <section className="bg-[#163E2E] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-[#214738]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#D8773E] font-semibold">
              Guest Portal
            </span>
            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-white">
              My Himalayan Trips
            </h1>
            <p className="text-xs sm:text-sm text-[#D1E0D7] font-light">
              Review your bookings, access property coordinates, and manage stay itineraries.
            </p>
          </div>

          <button
            onClick={onNavigateToExplore}
            className="px-5 py-2.5 bg-[#B85D28] hover:bg-[#964218] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-md flex items-center gap-1.5 shrink-0"
          >
            <span>Explore More Stays</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-6">
        {cancellationNotice && (
          <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-900 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-emerald-600 shrink-0" />
              <span>{cancellationNotice}</span>
            </div>
            <button onClick={() => setCancellationNotice(null)} className="font-bold underline">Dismiss</button>
          </div>
        )}

        {reservations.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 p-8 space-y-4 shadow-xs">
            <Calendar size={40} className="text-stone-400 mx-auto" />
            <h3 className="font-serif font-bold text-xl text-stone-900">No Trips Booked Yet</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Discover verified homestays in Parvati Valley, Naggar, or Tirthan and experience community hospitality.
            </p>
            <button
              onClick={onNavigateToExplore}
              className="px-6 py-2.5 bg-[#163E2E] text-white text-xs font-semibold uppercase tracking-wider rounded-lg shadow-sm"
            >
              Discover Stays
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {reservations.map((res) => {
              const isCancelled = res.reservation_status === 'cancelled';
              return (
                <div
                  key={res.id}
                  className={`bg-white rounded-2xl border transition-all p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 ${
                    isCancelled ? 'border-stone-200 opacity-60 bg-stone-50' : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#163E2E] bg-[#163E2E]/10 px-2 py-0.5 rounded">
                        {res.booking_reference}
                      </span>
                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                          isCancelled
                            ? 'bg-red-100 text-red-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {res.reservation_status}
                      </span>
                      <span className="text-[10px] text-stone-400">
                        Paid via Razorpay Sandbox
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-xl text-stone-900">
                      {res.property_name}
                    </h3>
                    <p className="text-xs text-stone-600 font-medium">
                      {res.room_name} • {res.number_of_guests} Guest(s)
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 pt-1">
                      <span className="flex items-center gap-1 text-stone-700">
                        <Calendar size={13} className="text-[#163E2E]" />
                        <span>Check-in: {res.check_in}</span>
                      </span>
                      <span>→</span>
                      <span className="flex items-center gap-1 text-stone-700">
                        <Calendar size={13} className="text-[#163E2E]" />
                        <span>Check-out: {res.check_out}</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col md:items-end justify-between gap-4 pt-4 md:pt-0 border-t md:border-t-0 border-stone-100">
                    <div className="md:text-right">
                      <span className="text-xl font-serif font-bold text-stone-900">
                        ₹{res.total_amount.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[11px] text-stone-500 block">Total Paid</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <a
                        href="https://www.google.com/maps/dir/?api=1&destination=31.9894,77.2415"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-medium rounded-lg flex items-center gap-1 transition-colors"
                      >
                        <Navigation size={13} />
                        <span>Google Maps</span>
                        <ExternalLink size={11} className="opacity-60" />
                      </a>

                      {!isCancelled && (
                        <button
                          onClick={() => handleCancelBooking(res.id)}
                          className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-medium rounded-lg transition-colors"
                        >
                          Cancel Stay
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
