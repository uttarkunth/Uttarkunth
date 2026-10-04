import React, { useState } from 'react';
import { PageId, Venture, FutureSector } from '../types';
import { CURRENT_VENTURES, FUTURE_SECTORS } from '../data/uttarkunthData';
import { VentureDetailModal } from '../components/VentureDetailModal';
import { Layers, ArrowDown, ArrowRight, Compass, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';

interface EcosystemViewProps {
  onNavigate: (page: PageId) => void;
}

export const EcosystemView: React.FC<EcosystemViewProps> = ({ onNavigate }) => {
  const [selectedItem, setSelectedItem] = useState<Venture | FutureSector | null>(null);

  return (
    <div className="py-12 sm:py-20 space-y-16">
      {/* Header Banner */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <span className="text-xs uppercase tracking-widest text-[#B85D28] font-semibold">
          Parent Brand Architecture
        </span>
        <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[#1C1917] tracking-tight leading-tight">
          The Uttarkunth Ecosystem
        </h1>
        <p className="text-lg sm:text-xl font-serif italic text-[#645E59]">
          A structured framework uniting diverse commercial vehicles around an enduring community mission.
        </p>
        <div className="h-0.5 w-24 bg-[#B85D28] pt-0.5 mt-4" />
      </div>

      {/* Visual Hierarchy Diagram */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#163E2E] text-white p-8 sm:p-12 space-y-8 shadow-md">
          <div className="text-center space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#9AE6B4] font-semibold">
              The Structural Hierarchy
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
              How the Ecosystem Connects
            </h2>
          </div>

          <div className="flex flex-col items-center space-y-4 max-w-lg mx-auto">
            {/* Level 1: Uttarkunth */}
            <div className="w-full bg-white text-[#163E2E] p-4 text-center border-2 border-white shadow-md">
              <span className="text-xs uppercase tracking-widest font-mono text-[#645E59] block">
                PARENT ECOSYSTEM
              </span>
              <h3 className="text-2xl font-serif font-bold">UTTARKUNTH</h3>
              <p className="text-xs text-[#5A544E] mt-1">
                Philosophy, Governance, Brand Stewardship & Long-term Vision
              </p>
            </div>

            <div className="text-[#9AE6B4] flex items-center justify-center">
              <ArrowDown size={22} />
            </div>

            {/* Level 2: Ventures */}
            <div className="w-full bg-[#1F543F] text-white p-4 text-center border border-[#2E6850]">
              <span className="text-xs uppercase tracking-widest font-mono text-[#9AE6B4] block">
                COMMERCIAL VEHICLES
              </span>
              <h3 className="text-xl font-serif font-bold">VENTURES</h3>
              <p className="text-xs text-[#D1E0D7] mt-1">
                Financially Self-Sustaining For-Profit Businesses Operating in the Real Economy
              </p>
            </div>

            <div className="text-[#9AE6B4] flex items-center justify-center">
              <ArrowDown size={22} />
            </div>

            {/* Level 3: Projects */}
            <div className="w-full bg-[#27664D] text-white p-4 text-center border border-[#3A7E62]">
              <span className="text-xs uppercase tracking-widest font-mono text-[#9AE6B4] block">
                TARGETED INITIATIVES
              </span>
              <h3 className="text-xl font-serif font-bold">PROJECTS</h3>
              <p className="text-xs text-[#D1E0D7] mt-1">
                Specific Explorations, Digital Broadcasts, Field Labs & Apprenticeships
              </p>
            </div>

            <div className="text-[#9AE6B4] flex items-center justify-center">
              <ArrowDown size={22} />
            </div>

            {/* Level 4: Community Development */}
            <div className="w-full bg-[#0F2E22] text-[#9AE6B4] p-4 text-center border-2 border-[#9AE6B4]">
              <span className="text-xs uppercase tracking-widest font-mono text-[#9AE6B4] block">
                ULTIMATE PURPOSE
              </span>
              <h3 className="text-2xl font-serif font-bold text-white">COMMUNITY DEVELOPMENT</h3>
              <p className="text-xs text-[#C5D7CE] mt-1">
                Local Youth Capabilities, Soil & Water Stewardship, Architectural Heritage & Autonomy
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Distinction Section: Current vs Future */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="border-b border-[#E8E2D9] pb-6 space-y-2">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#163E2E] font-bold">
            <span className="w-2 h-2 rounded-full bg-[#163E2E]" />
            <span>Active Operations</span>
          </div>
          <h2 className="text-3xl font-serif font-bold text-[#1C1917]">
            Current Operational Vehicles
          </h2>
          <p className="text-sm text-[#645E59]">
            The grounded commercial engines currently active in our ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CURRENT_VENTURES.map((v) => (
            <div
              key={v.id}
              className="bg-white border border-[#E8E2D9] flex flex-col justify-between p-6 space-y-4 hover:border-[#163E2E] transition-all"
            >
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-wider text-[#645E59] font-medium">
                  {v.category} · {v.status}
                </span>
                <h3 className="text-2xl font-serif font-bold text-[#163E2E]">
                  {v.name}
                </h3>
                <p className="text-xs font-medium text-[#1C1917]">
                  {v.tagline}
                </p>
                <p className="text-xs text-[#5A544E] leading-relaxed">
                  {v.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#F5EFEB] flex items-center justify-between">
                <span className="text-[11px] text-[#8C827A]">{v.location}</span>
                <button
                  onClick={() => setSelectedItem(v)}
                  className="text-xs font-semibold uppercase tracking-wider text-[#163E2E] hover:underline"
                >
                  Explore Details →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Future Horizons: Clearly Distinguishing Exploratory Sectors */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="bg-[#F5EFEB] border border-[#E8E2D9] p-6 sm:p-8 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#163E2E] font-bold">
            <span className="w-2 h-2 rounded-full bg-[#3B82F6]" />
            <span>Explicit Transparency Notice</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C1917]">
            Potential Future Sectors (Exploratory & Concept Stage)
          </h2>
          <p className="text-sm text-[#4A453F] leading-relaxed">
            The sectors below represent <strong>future horizons</strong> that fit the parent philosophy. Uttarkunth intends to enter new fields gradually and responsibly, determined strictly by available capabilities, local readiness, and financial self-sustainability. <em>These are not active operational businesses today.</em>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FUTURE_SECTORS.map((sector) => (
            <div
              key={sector.id}
              className="bg-white border border-[#E8E2D9] p-6 flex flex-col justify-between space-y-4 hover:border-[#163E2E] transition-all"
            >
              <div className="space-y-3">
                <span className="text-[11px] uppercase tracking-widest text-[#3B82F6] font-semibold">
                  Status: {sector.readiness} Horizon
                </span>
                <h3 className="text-xl font-serif font-bold text-[#1C1917]">
                  {sector.title}
                </h3>
                <p className="text-xs text-[#5A544E] leading-relaxed">
                  {sector.rationale}
                </p>
              </div>

              <div className="pt-4 border-t border-[#F5EFEB] flex items-center justify-between">
                <span className="text-[11px] text-[#8C827A]">
                  {sector.potentialActivities.length} target programs
                </span>
                <button
                  onClick={() => setSelectedItem(sector)}
                  className="text-xs font-semibold uppercase tracking-wider text-[#163E2E] hover:underline"
                >
                  View Horizon →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Call to Action */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#E8E2D9]">
        <button
          onClick={() => onNavigate('ventures')}
          className="text-xs font-semibold uppercase tracking-widest text-[#163E2E] hover:underline"
        >
          Next: Deep-Dive into Our Current Ventures →
        </button>
        <button
          onClick={() => onNavigate('join')}
          className="px-6 py-3 text-xs font-semibold uppercase tracking-widest bg-[#B85D28] text-white hover:bg-[#964218] transition-colors shadow-sm"
        >
          Join the Journey
        </button>
      </div>

      {/* Modal View for Ecosystem Item */}
      {selectedItem && (
        <VentureDetailModal
          venture={selectedItem}
          onClose={() => setSelectedItem(null)}
          onInquire={onNavigate}
        />
      )}
    </div>
  );
};
