import React, { useState } from 'react';
import { PageId, Venture } from '../types';
import { CURRENT_VENTURES } from '../data/uttarkunthData';
import { VentureDetailModal } from '../components/VentureDetailModal';
import { MapPin, CheckCircle2, ArrowRight, ShieldCheck, HeartHandshake, Eye } from 'lucide-react';

interface VenturesViewProps {
  onNavigate: (page: PageId) => void;
}

export const VenturesView: React.FC<VenturesViewProps> = ({ onNavigate }) => {
  const [activeModalVenture, setActiveModalVenture] = useState<Venture | null>(null);

  return (
    <div className="py-12 sm:py-20 space-y-16">
      {/* Header Banner */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <span className="text-xs uppercase tracking-widest text-[#B85D28] font-semibold">
          Operational Vehicles
        </span>
        <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[#1C1917] tracking-tight leading-tight">
          Our Active Ventures
        </h1>
        <p className="text-lg sm:text-xl font-serif italic text-[#645E59]">
          The businesses serving as vehicles for skill-building, sustainable revenue, and community development.
        </p>
        <div className="h-0.5 w-24 bg-[#B85D28] pt-0.5 mt-4" />
      </div>

      {/* Ventures Editorial Deep-Dive */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {CURRENT_VENTURES.map((venture, index) => {
          const isReversed = index % 2 === 1;
          return (
            <article
              key={venture.id}
              className={`flex flex-col ${
                isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'
              } gap-10 items-stretch bg-white border border-[#E8E2D9] p-6 sm:p-10 shadow-sm`}
            >
              {/* Media Visual Column */}
              <div className="w-full lg:w-1/2 flex flex-col justify-between">
                <div className="aspect-[4/3] w-full overflow-hidden relative group/img bg-[#163E2E]/10">
                  <img
                    src={venture.image}
                    alt={venture.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/img:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-4 left-4 bg-[#163E2E] text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 shadow-md">
                    {venture.category} · {venture.status}
                  </div>
                  {venture.id === 'yash-homestay' && (
                    <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white px-2.5 py-1 text-[11px] font-medium tracking-wide">
                      Actual Location · Himalayan Valley Vista
                    </div>
                  )}
                </div>

                <div className="mt-4 p-4 bg-[#F5EFEB] border border-[#E8E2D9] flex items-center justify-between text-xs text-[#645E59]">
                  <div className="flex items-center gap-1.5">
                    <MapPin size={14} className="text-[#163E2E]" />
                    <span>{venture.location}</span>
                  </div>
                  <span className="font-medium text-[#163E2E]">{venture.focusArea}</span>
                </div>
              </div>

              {/* Editorial Description Column */}
              <div className="w-full lg:w-1/2 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-mono text-[#8C827A] uppercase">
                      Vehicle 0{index + 1}
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#163E2E] mt-1">
                      {venture.name}
                    </h2>
                    <p className="text-base font-serif italic text-[#4A453F] mt-2">
                      {venture.tagline}
                    </p>
                  </div>

                  <p className="text-sm text-[#4A453F] leading-relaxed">
                    {venture.description}
                  </p>

                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs uppercase tracking-widest text-[#163E2E] font-bold">
                      Core Operations & Impact Integration:
                    </h4>
                    <ul className="space-y-2">
                      {venture.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#4A453F]">
                          <CheckCircle2 size={16} className="text-[#163E2E] shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#F5EFEB] flex flex-wrap items-center justify-between gap-4">
                  <button
                    onClick={() => setActiveModalVenture(venture)}
                    className="text-xs font-semibold uppercase tracking-wider text-[#163E2E] hover:underline flex items-center gap-1.5"
                  >
                    <span>Read Operational Architecture</span>
                    <ArrowRight size={13} />
                  </button>

                  <button
                    onClick={() => onNavigate('join')}
                    className="px-5 py-2.5 text-xs font-semibold uppercase tracking-widest bg-[#163E2E] text-white hover:bg-[#0F2E22] transition-colors"
                  >
                    Collaborate with {venture.name}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Explanatory Banner: Businesses as Vehicles */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#163E2E] text-white p-8 text-center space-y-4">
          <h3 className="text-2xl font-serif font-bold text-white">
            Why We Emphasize Multiple Vehicles
          </h3>
          <p className="text-sm text-[#D1E0D7] leading-relaxed max-w-2xl mx-auto">
            A single homestay or café is easily overwhelmed by mountain seasonality. By developing complementary ventures—hospitality, culinary craft, media documentation, and regional produce—we create an interconnected safety net that stabilizes employment for mountain youth year-round.
          </p>
        </div>
      </div>

      {/* Navigation Call to Action */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#E8E2D9]">
        <button
          onClick={() => onNavigate('community')}
          className="text-xs font-semibold uppercase tracking-widest text-[#163E2E] hover:underline"
        >
          Next: How Enterprise Supports Community Development →
        </button>
        <button
          onClick={() => onNavigate('join')}
          className="px-6 py-3 text-xs font-semibold uppercase tracking-widest bg-[#B85D28] text-white hover:bg-[#964218] transition-colors shadow-sm"
        >
          Join the Journey
        </button>
      </div>

      {/* Active Modal */}
      {activeModalVenture && (
        <VentureDetailModal
          venture={activeModalVenture}
          onClose={() => setActiveModalVenture(null)}
          onInquire={onNavigate}
        />
      )}
    </div>
  );
};
