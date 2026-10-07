import React, { useState } from 'react';
import { staysStore } from '../lib/staysStore';
import { Property, Reservation } from '../types/database.types';
import {
  ShieldAlert,
  Building,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  FileText,
  DollarSign,
  TrendingUp,
  AlertTriangle,
} from 'lucide-react';

export const AdminDashboardView: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>(staysStore.getProperties('all'));
  const [reservations] = useState<Reservation[]>(staysStore.getReservationsForGuest('guest-current-user'));
  const [activeTab, setActiveTab] = useState<'properties' | 'financials' | 'system'>('properties');

  const handleApprove = (propId: string) => {
    staysStore.approveProperty(propId);
    setProperties(staysStore.getProperties('all'));
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-stone-900 pb-20">
      {/* Admin Banner */}
      <section className="bg-stone-900 text-white py-10 px-4 sm:px-6 lg:px-8 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-amber-400 font-bold flex items-center gap-1.5">
              <ShieldAlert size={14} />
              <span>Uttarkunth Internal Admin Console • Staging</span>
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
              Platform Administration & Verification
            </h1>
          </div>

          <div className="flex items-center gap-1 bg-stone-800 p-1.5 rounded-xl border border-stone-700">
            <button
              onClick={() => setActiveTab('properties')}
              className={`px-3 py-1.5 rounded text-xs font-semibold ${
                activeTab === 'properties' ? 'bg-[#B85D28] text-white' : 'text-stone-300'
              }`}
            >
              Listings ({properties.length})
            </button>
            <button
              onClick={() => setActiveTab('financials')}
              className={`px-3 py-1.5 rounded text-xs font-semibold ${
                activeTab === 'financials' ? 'bg-[#B85D28] text-white' : 'text-stone-300'
              }`}
            >
              Commission Ledger
            </button>
            <button
              onClick={() => setActiveTab('system')}
              className={`px-3 py-1.5 rounded text-xs font-semibold ${
                activeTab === 'system' ? 'bg-[#B85D28] text-white' : 'text-stone-300'
              }`}
            >
              Readiness Audit
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {activeTab === 'properties' && (
          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden space-y-4 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif font-bold text-lg text-stone-900">Submitted Properties</h3>
                <p className="text-xs text-stone-500">Review homestays and verify before making them publicly bookable.</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FBF9F5] text-stone-500 uppercase tracking-wider border-b border-stone-100 font-semibold">
                  <tr>
                    <th className="py-3 px-4">Property</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Location</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-stone-700">
                  {properties.map((prop) => (
                    <tr key={prop.id}>
                      <td className="py-3.5 px-4 font-bold text-stone-900">{prop.property_name}</td>
                      <td className="py-3.5 px-4 capitalize">{prop.property_type.replace('_', ' ')}</td>
                      <td className="py-3.5 px-4">{prop.locality}, {prop.city}</td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            prop.status === 'approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {prop.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        {prop.status !== 'approved' ? (
                          <button
                            onClick={() => handleApprove(prop.id)}
                            className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-semibold text-[11px] uppercase tracking-wider"
                          >
                            Approve Listing
                          </button>
                        ) : (
                          <span className="text-emerald-700 font-semibold flex items-center gap-1">
                            <CheckCircle size={14} />
                            <span>Live on Stays</span>
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'financials' && (
          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 space-y-6">
            <div>
              <h3 className="font-serif font-bold text-lg text-stone-900">Platform Commission & Payouts Ledger</h3>
              <p className="text-xs text-stone-500">Track 0% Year 1 introductory exemptions and upcoming 10% standard transitions.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                <span className="text-[10px] uppercase tracking-wider text-stone-500 font-bold">Introductory Host Cohort</span>
                <span className="text-xl font-serif font-bold text-[#163E2E] block mt-1">100% at 0% Commission</span>
                <span className="text-[11px] text-stone-500 mt-1 block">Yash Homestay (Year 1 active)</span>
              </div>
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                <span className="text-[10px] uppercase tracking-wider text-stone-500 font-bold">Standard Commission (Year 2+)</span>
                <span className="text-xl font-serif font-bold text-stone-900 block mt-1">10.0% Configured</span>
                <span className="text-[11px] text-stone-500 mt-1 block">Scheduled automated transition</span>
              </div>
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                <span className="text-[10px] uppercase tracking-wider text-stone-500 font-bold">Payment Gateway</span>
                <span className="text-xl font-serif font-bold text-amber-700 block mt-1">Razorpay Sandbox</span>
                <span className="text-[11px] text-stone-500 mt-1 block">Zero live customer cards charged</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'system' && (
          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 space-y-4">
            <h3 className="font-serif font-bold text-lg text-stone-900">Production Activation Checklist</h3>
            <div className="space-y-2 text-xs text-stone-700">
              <div className="flex items-center gap-2 p-2.5 bg-emerald-50 text-emerald-800 rounded-lg">
                <CheckCircle size={16} />
                <span>Backend Database: Supabase PostgreSQL migration script generated (`supabase/schema.sql`).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-emerald-50 text-emerald-800 rounded-lg">
                <CheckCircle size={16} />
                <span>Double Booking Protection: Atomic inventory check procedure with row locks tested.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-amber-50 text-amber-800 rounded-lg">
                <AlertTriangle size={16} />
                <span>Legal & Tax: Retain test mode until company registration & GST structure is finalized.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-amber-50 text-amber-800 rounded-lg">
                <AlertTriangle size={16} />
                <span>Razorpay Production: Switch keys only after business verification.</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
