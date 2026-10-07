import React, { useState } from 'react';
import { staysStore } from '../lib/staysStore';
import { Host, Property, RoomType } from '../types/database.types';
import {
  ShieldCheck,
  Building,
  Calendar,
  CheckCircle,
  FileText,
  Clock,
  Sparkles,
  MapPin,
  Camera,
  Coins,
  ChevronRight,
  TrendingUp,
  AlertCircle,
} from 'lucide-react';

interface HostOnboardingViewProps {
  onNavigateToStays: () => void;
}

export const HostOnboardingView: React.FC<HostOnboardingViewProps> = ({ onNavigateToStays }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'onboarding'>('dashboard');
  const [host] = useState<Host | undefined>(staysStore.getHost('host-gaurav-negi'));
  const hostReservations = staysStore.getReservationsForHost('host-gaurav-negi');

  // Form State for Listing a New Property
  const [step, setStep] = useState(1);
  const [propertyName, setPropertyName] = useState('');
  const [propertyType, setPropertyType] = useState<'homestay' | 'eco_lodge' | 'heritage_cottage'>('homestay');
  const [city, setCity] = useState('Parvati Valley');
  const [locality, setLocality] = useState('Kasol');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [roomName, setRoomName] = useState('Cedar Wood Private Room');
  const [basePrice, setBasePrice] = useState(2000);
  const [inventoryCount, setInventoryCount] = useState(2);
  const [acceptedAgreement, setAcceptedAgreement] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Financial calculations
  const totalGrossRevenue = hostReservations.reduce((sum, r) => sum + r.total_amount, 0);
  const currentCommissionRate = host?.current_commission_rate ?? 0.0;
  const totalCommissionPaid = Math.round((totalGrossRevenue * currentCommissionRate) / 100);
  const totalHostEarnings = totalGrossRevenue - totalCommissionPaid;

  const handleSubmitProperty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptedAgreement) return;

    const newProp = staysStore.createProperty({
      host_id: host?.id || 'host-gaurav-negi',
      property_name: propertyName,
      slug: propertyName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      property_type: propertyType,
      description,
      short_description: description.slice(0, 100),
      address,
      locality,
      city,
      district: 'Kullu',
      state: 'Himachal Pradesh',
      country: 'India',
      latitude: 31.989,
      longitude: 77.241,
      check_in_time: '12:00:00',
      check_out_time: '11:00:00',
      cancellation_policy: 'moderate',
      house_rules: ['Respect mountain silence', 'No single-use plastics'],
      featured: false,
      starting_price: basePrice,
    });

    staysStore.addRoomType({
      property_id: newProp.id,
      name: roomName,
      max_guests: 2,
      base_price: basePrice,
      inventory_count: inventoryCount,
      minimum_stay: 1,
      maximum_stay: 30,
      booking_mode: 'instant',
      status: 'active',
    });

    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-stone-900 pb-20">
      {/* Top Header */}
      <section className="bg-[#163E2E] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-[#214738]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#D8773E] font-semibold flex items-center gap-1.5">
              <Sparkles size={14} />
              <span>Uttarkunth Host Portal</span>
            </span>
            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-white">
              Host Management & Onboarding
            </h1>
            <p className="text-xs sm:text-sm text-[#D1E0D7] font-light">
              Empowering Himalayan property owners through community-backed hosting and transparent technology.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-[#0F2E22] p-1.5 rounded-xl border border-white/10 shrink-0">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                activeTab === 'dashboard' ? 'bg-[#B85D28] text-white shadow-sm' : 'text-[#D1E0D7] hover:text-white'
              }`}
            >
              Host Dashboard
            </button>
            <button
              onClick={() => setActiveTab('onboarding')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                activeTab === 'onboarding' ? 'bg-[#B85D28] text-white shadow-sm' : 'text-[#D1E0D7] hover:text-white'
              }`}
            >
              List New Property
            </button>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* TAB 1: HOST DASHBOARD */}
        {activeTab === 'dashboard' ? (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* 1. COMMISSION GUARANTEE BANNER */}
            <div className="bg-emerald-900/90 text-white rounded-2xl p-6 border border-emerald-700/60 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-emerald-800 text-emerald-200 rounded-full text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck size={14} />
                  <span>0% Platform Commission Guarantee Active</span>
                </div>
                <h3 className="text-xl font-serif font-bold text-white mt-1">
                  First 12 Months Introductory Period: 0% Uttarkunth Commission
                </h3>
                <p className="text-xs text-emerald-100/90 max-w-2xl font-light leading-relaxed">
                  Active agreement for <strong>Yash Home Stay</strong>. 100% of your booking proceeds go directly to you without platform deductions during this introductory window.
                </p>
              </div>

              <div className="bg-emerald-950/80 p-4 rounded-xl border border-emerald-800/80 text-right shrink-0">
                <span className="text-[10px] text-emerald-400 uppercase tracking-widest block font-bold">Standard Transition</span>
                <span className="text-xl font-serif font-bold text-white">10% Afterward</span>
                <span className="text-[10px] text-emerald-300 block mt-0.5">Renews Jan 2027</span>
              </div>
            </div>

            {/* 2. STATS CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs">
                <span className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold block">Total Booking Value</span>
                <span className="text-2xl font-serif font-bold text-stone-900 mt-1 block">
                  ₹{totalGrossRevenue.toLocaleString('en-IN')}
                </span>
                <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1 mt-1">
                  <TrendingUp size={12} />
                  <span>Across {hostReservations.length} confirmed bookings</span>
                </span>
              </div>

              <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs">
                <span className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold block">Platform Commission</span>
                <span className="text-2xl font-serif font-bold text-stone-900 mt-1 block">
                  0% (₹{totalCommissionPaid})
                </span>
                <span className="text-[11px] text-emerald-700 font-medium mt-1 block">
                  Zero commission deducted
                </span>
              </div>

              <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs">
                <span className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold block">Net Payout to Host</span>
                <span className="text-2xl font-serif font-bold text-[#163E2E] mt-1 block">
                  ₹{totalHostEarnings.toLocaleString('en-IN')}
                </span>
                <span className="text-[11px] text-stone-500 mt-1 block">
                  Direct to bank ledger
                </span>
              </div>

              <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs">
                <span className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold block">KYC & Agreement Status</span>
                <span className="text-lg font-serif font-bold text-emerald-800 mt-1 block flex items-center gap-1.5">
                  <CheckCircle size={18} className="text-emerald-600" />
                  <span>Fully Verified</span>
                </span>
                <span className="text-[11px] text-stone-500 mt-1 block">
                  Agreement v1.0 Active
                </span>
              </div>
            </div>

            {/* 3. RECENT RESERVATIONS LEDGER */}
            <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-stone-100 flex items-center justify-between">
                <div>
                  <h3 className="font-serif font-bold text-lg text-stone-900">Upcoming & Confirmed Bookings</h3>
                  <p className="text-xs text-stone-500">Live guest reservations synced with room inventory.</p>
                </div>
                <span className="text-xs bg-stone-100 text-stone-600 px-3 py-1 rounded-full font-medium">
                  {hostReservations.length} Active
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FBF9F5] text-stone-500 uppercase tracking-wider border-b border-stone-100 font-semibold">
                    <tr>
                      <th className="py-3 px-4">Booking Ref</th>
                      <th className="py-3 px-4">Guest</th>
                      <th className="py-3 px-4">Dates</th>
                      <th className="py-3 px-4">Room Type</th>
                      <th className="py-3 px-4">Amount</th>
                      <th className="py-3 px-4">Commission</th>
                      <th className="py-3 px-4">Host Payout</th>
                      <th className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 text-stone-700">
                    {hostReservations.map((res) => (
                      <tr key={res.id} className="hover:bg-stone-50/50 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-stone-900">{res.booking_reference}</td>
                        <td className="py-3.5 px-4 font-medium">{res.guest_name}</td>
                        <td className="py-3.5 px-4">{res.check_in} → {res.check_out}</td>
                        <td className="py-3.5 px-4">{res.room_name}</td>
                        <td className="py-3.5 px-4 font-serif font-bold text-stone-900">₹{res.total_amount}</td>
                        <td className="py-3.5 px-4 text-emerald-700 font-medium">0% (₹0)</td>
                        <td className="py-3.5 px-4 font-serif font-bold text-[#163E2E]">₹{res.host_payout_amount}</td>
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800">
                            {res.reservation_status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          /* TAB 2: LIST YOUR PROPERTY (ONBOARDING FLOW) */
          <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-stone-200 shadow-xl p-6 sm:p-10 animate-in fade-in duration-200">
            {isSubmitted ? (
              <div className="text-center py-10 space-y-4">
                <CheckCircle size={48} className="text-emerald-600 mx-auto" />
                <h3 className="text-2xl font-serif font-bold text-stone-900">Application Submitted for Verification!</h3>
                <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                  Thank you for submitting <strong>{propertyName}</strong>. Our Himalayan team will review your photos, coordinates, and room details.
                </p>
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-800 max-w-md mx-auto">
                  <strong>0% Commission Agreement v1.0:</strong> Your 12-month introductory period will activate upon approval.
                </div>
                <div className="pt-4 flex items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setActiveTab('dashboard');
                    }}
                    className="px-6 py-2.5 bg-[#163E2E] text-white rounded text-xs font-semibold uppercase tracking-wider"
                  >
                    Go to Host Dashboard
                  </button>
                  <button
                    onClick={onNavigateToStays}
                    className="px-6 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded text-xs font-semibold uppercase tracking-wider"
                  >
                    View Public Stays
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitProperty} className="space-y-8">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#B85D28] font-bold block mb-1">
                    Step {step} of 3
                  </span>
                  <h2 className="text-2xl font-serif font-bold text-stone-900">
                    List Your Property & Start Hosting
                  </h2>
                  <p className="text-xs text-stone-500 mt-1">
                    Join Uttarkunth Stays with 0% platform commission for your first 12 months.
                  </p>
                </div>

                {/* Step 1: Basic Information */}
                {step === 1 && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div>
                      <label className="text-xs font-semibold text-stone-700 block mb-1">Property Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Parvati Riverside Homestay"
                        value={propertyName}
                        onChange={(e) => setPropertyName(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-stone-300 focus:outline-none focus:border-[#163E2E]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-semibold text-stone-700 block mb-1">Property Type</label>
                        <select
                          value={propertyType}
                          onChange={(e) => setPropertyType(e.target.value as any)}
                          className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-stone-300 focus:outline-none focus:border-[#163E2E]"
                        >
                          <option value="homestay">Homestay</option>
                          <option value="eco_lodge">Eco Lodge</option>
                          <option value="heritage_cottage">Heritage Cottage</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-stone-700 block mb-1">Locality / Village</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Jari, Manikaran Road"
                          value={locality}
                          onChange={(e) => setLocality(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-stone-300 focus:outline-none focus:border-[#163E2E]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-stone-700 block mb-1">Full Mountain Address</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Near Old Bridge, Village Jari, Kullu, HP 175105"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-stone-300 focus:outline-none focus:border-[#163E2E]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-stone-700 block mb-1">About Your Stay & Hospitality</label>
                      <textarea
                        rows={4}
                        required
                        placeholder="Describe the peaceful location, cedar wood architecture, mountain views, and organic meals..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-stone-300 focus:outline-none focus:border-[#163E2E]"
                      />
                    </div>

                    <div className="pt-4 flex justify-end">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        disabled={!propertyName || !address || !description}
                        className="px-6 py-2.5 bg-[#163E2E] hover:bg-[#0F2E22] text-white rounded text-xs font-semibold uppercase tracking-wider transition-colors disabled:opacity-50"
                      >
                        Next: Rooms & Inventory →
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2: Rooms & Inventory */}
                {step === 2 && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-4">
                      <h4 className="font-serif font-bold text-sm text-stone-900">Add Primary Room Type</h4>
                      <div>
                        <label className="text-xs font-semibold text-stone-700 block mb-1">Room Name</label>
                        <input
                          type="text"
                          required
                          value={roomName}
                          onChange={(e) => setRoomName(e.target.value)}
                          className="w-full px-3.5 py-2 text-xs rounded-lg border border-stone-300 focus:outline-none bg-white"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-semibold text-stone-700 block mb-1">Base Price / Night (₹)</label>
                          <input
                            type="number"
                            required
                            min={500}
                            value={basePrice}
                            onChange={(e) => setBasePrice(Number(e.target.value))}
                            className="w-full px-3.5 py-2 text-xs rounded-lg border border-stone-300 focus:outline-none bg-white"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-stone-700 block mb-1">Total Rooms of this Type</label>
                          <input
                            type="number"
                            required
                            min={1}
                            max={20}
                            value={inventoryCount}
                            onChange={(e) => setInventoryCount(Number(e.target.value))}
                            className="w-full px-3.5 py-2 text-xs rounded-lg border border-stone-300 focus:outline-none bg-white"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="text-xs text-stone-600 hover:text-stone-900 font-semibold"
                      >
                        ← Back
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="px-6 py-2.5 bg-[#163E2E] hover:bg-[#0F2E22] text-white rounded text-xs font-semibold uppercase tracking-wider"
                      >
                        Next: Host Agreement →
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Agreement & 0% Commission */}
                {step === 3 && (
                  <div className="space-y-5 animate-in fade-in duration-200">
                    <div className="bg-[#FBF9F5] p-5 rounded-xl border border-stone-200 space-y-3">
                      <h4 className="font-serif font-bold text-base text-stone-900">
                        Uttarkunth Host Agreement (v1.0-2026)
                      </h4>
                      <div className="text-xs text-stone-600 space-y-2 leading-relaxed">
                        <p>
                          <strong>1. 0% Platform Commission for the First 12 Months:</strong> Uttarkunth charges zero (0%) platform commission on all eligible bookings hosted during your first 12 months from activation.
                        </p>
                        <p>
                          <strong>2. 10% Standard Platform Commission Afterward:</strong> Following the completion of the 12-month introductory period, a transparent 10% standard platform commission will apply to new bookings.
                        </p>
                        <p>
                          <strong>3. Payment Processing & Compliance:</strong> Third-party payment gateway fees (Razorpay) and applicable taxes remain distinct and will be processed according to Indian compliance standards upon commercial launch.
                        </p>
                        <p>
                          <strong>4. Community Respect:</strong> Hosts agree to uphold traditional Pahadi warmth, environmental cleanliness, and zero harassment.
                        </p>
                      </div>

                      <div className="pt-3 border-t border-stone-200">
                        <label className="flex items-start gap-2.5 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={acceptedAgreement}
                            onChange={(e) => setAcceptedAgreement(e.target.checked)}
                            className="mt-1 h-4 w-4 text-[#163E2E] rounded border-stone-300 focus:ring-[#163E2E]"
                          />
                          <span className="text-xs text-stone-800 font-medium leading-snug">
                            I accept the Uttarkunth Host Agreement terms, 0% introductory commission period, and agree to verify property credentials before public listing.
                          </span>
                        </label>
                      </div>
                    </div>

                    <div className="pt-4 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="text-xs text-stone-600 hover:text-stone-900 font-semibold"
                      >
                        ← Back
                      </button>
                      <button
                        type="submit"
                        disabled={!acceptedAgreement}
                        className="px-6 py-2.5 bg-[#B85D28] hover:bg-[#964218] text-white rounded text-xs font-semibold uppercase tracking-wider transition-colors disabled:opacity-50 shadow-md"
                      >
                        Submit Property for Review
                      </button>
                    </div>
                  </div>
                )}
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
