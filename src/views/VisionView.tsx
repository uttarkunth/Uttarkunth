import React, { useState } from 'react';
import { PageId, FutureSector } from '../types';
import { FUTURE_SECTORS } from '../data/uttarkunthData';
import { VentureDetailModal } from '../components/VentureDetailModal';
import { Mountain, Compass, ArrowRight, CheckCircle2, TrendingUp, Sparkles, ShieldCheck } from 'lucide-react';

interface VisionViewProps {
  onNavigate: (page: PageId) => void;
}

export const VisionView: React.FC<VisionViewProps> = ({ onNavigate }) => {
  const [activeSector, setActiveSector] = useState<FutureSector | null>(null);

  return (
    <div className="py-12 sm:py-20 space-y-16">
      {/* Header Banner */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <span className="text-xs uppercase tracking-widest text-[#B85D28] font-semibold">
          Multi-Decade Horizon
        </span>
        <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[#1C1917] tracking-tight leading-tight">
          Start Local. Learn Continuously.<br />Build for the Long Term.
        </h1>
        <p className="text-lg sm:text-xl font-serif italic text-[#645E59]">
          The long-term roadmap: transitioning from a single mountain valley to open frameworks adaptable across India.
        </p>
        <div className="h-0.5 w-24 bg-[#B85D28] pt-0.5 mt-4" />
      </div>

      {/* Narrative: The Multi-Stage Progression */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="bg-[#163E2E] text-white p-8 sm:p-12 space-y-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#9AE6B4] font-semibold">
              The Progression Framework
            </span>
            <h2 className="text-3xl font-serif font-bold text-white">
              Village → Region → India → Wider Impact
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#D1E0D7] leading-relaxed max-w-3xl">
            Uttarkunth is not conceived as a proprietary empire. It is designed to be a living, reproducible framework where businesses, youth capability, and community purpose operate in harmony.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4 border-t border-[#2E6850]">
            <div className="space-y-2">
              <span className="text-xs font-mono text-[#9AE6B4]">PHASE 01</span>
              <h3 className="text-lg font-serif font-bold text-white">Village</h3>
              <p className="text-xs text-[#C5D7CE] leading-relaxed">
                Ground proof-of-concept. Stabilize Yash Home Stay, Uttarkunth Café, and local youth teams in our home mountain valley.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono text-[#9AE6B4]">PHASE 02</span>
              <h3 className="text-lg font-serif font-bold text-white">Region</h3>
              <p className="text-xs text-[#C5D7CE] leading-relaxed">
                Establish connected networks across Kullu, Parvati Valley and Himachal Pradesh. Link village homestays, create shared supply lines, and train youth cohorts.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono text-[#9AE6B4]">PHASE 03</span>
              <h3 className="text-lg font-serif font-bold text-white">India</h3>
              <p className="text-xs text-[#C5D7CE] leading-relaxed">
                Publish open blueprints, toolkits, and case studies so young entrepreneurs in other mountain and rural states can adapt the model.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono text-[#9AE6B4]">PHASE 04</span>
              <h3 className="text-lg font-serif font-bold text-white">Wider Impact</h3>
              <p className="text-xs text-[#C5D7CE] leading-relaxed">
                Global dialogue with indigenous and fragile mountain regions facing climate stress, youth flight, and cultural homogenization.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Exploratory Horizons & Future Sectors */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="border-b border-[#E8E2D9] pb-6 space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#163E2E] font-semibold">
            Future Exploration Sectors
          </span>
          <h2 className="text-3xl font-serif font-bold text-[#1C1917]">
            Expanding the Ecosystem Responsibly
          </h2>
          <p className="text-sm text-[#645E59] max-w-2xl">
            Each potential sector below aligns with the Uttarkunth philosophy. They will be launched strictly in rhythm with our operational capacity, financial stability, and local readiness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FUTURE_SECTORS.map((sector) => (
            <div
              key={sector.id}
              className="bg-white border border-[#E8E2D9] p-6 flex flex-col justify-between space-y-4 shadow-sm hover:border-[#163E2E] transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px] text-[#645E59]">
                  <span className="uppercase tracking-widest font-semibold text-[#163E2E]">
                    {sector.nature}
                  </span>
                  <span className="font-mono bg-[#F5EFEB] px-2 py-0.5 border border-[#E8E2D9]">
                    {sector.readiness}
                  </span>
                </div>
                <h3 className="text-xl font-serif font-bold text-[#1C1917]">
                  {sector.title}
                </h3>
                <p className="text-xs text-[#5A544E] leading-relaxed">
                  {sector.rationale}
                </p>

                <div className="space-y-1.5 pt-2">
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-[#8C827A] block">
                    Planned Focus:
                  </span>
                  <ul className="text-xs text-[#645E59] space-y-1">
                    {sector.potentialActivities.slice(0, 2).map((act, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-[#163E2E]">•</span>
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-[#F5EFEB] flex items-center justify-between">
                <span className="text-[11px] text-[#8C827A]">Concept Blueprint</span>
                <button
                  onClick={() => setActiveSector(sector)}
                  className="text-xs font-semibold uppercase tracking-wider text-[#163E2E] hover:underline"
                >
                  Explore Horizon →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modesty & Realism Callout */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FBF9F5] border-l-2 border-[#163E2E] p-6 sm:p-8 space-y-3">
          <span className="text-xs uppercase tracking-widest font-bold text-[#163E2E]">
            A Grounded Perspective
          </span>
          <p className="text-sm text-[#4A453F] leading-relaxed">
            We state these ambitions with humility. Uttarkunth is not claiming to have already built these future sectors or to possess an unbroken guarantee of success. We are learning our trade day-by-day in the cold mountain winds, in the kitchen, and on the trail.
          </p>
          <p className="text-sm text-[#4A453F] leading-relaxed">
            What we do promise is unwavering honesty: every venture launched will operate under the discipline of <em>Learn by Doing, Grow by Serving</em>.
          </p>
        </div>
      </div>

      {/* Navigation Call to Action */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#E8E2D9]">
        <button
          onClick={() => onNavigate('founder')}
          className="text-xs font-semibold uppercase tracking-widest text-[#163E2E] hover:underline"
        >
          Next: Read Founder Gaurav Negi’s Statement →
        </button>
        <button
          onClick={() => onNavigate('join')}
          className="px-6 py-3 text-xs font-semibold uppercase tracking-widest bg-[#B85D28] text-white hover:bg-[#964218] transition-colors shadow-sm"
        >
          Join the Journey
        </button>
      </div>

      {/* Sector Modal */}
      {activeSector && (
        <VentureDetailModal
          venture={activeSector}
          onClose={() => setActiveSector(null)}
          onInquire={onNavigate}
        />
      )}
    </div>
  );
};
