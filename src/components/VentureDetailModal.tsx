import React from 'react';
import { Venture, FutureSector, PageId } from '../types';
import { X, CheckCircle2, ArrowRight, MapPin, Compass } from 'lucide-react';

interface VentureModalProps {
  venture: Venture | FutureSector | null;
  onClose: () => void;
  onInquire: (page: PageId) => void;
}

export const VentureDetailModal: React.FC<VentureModalProps> = ({ venture, onClose, onInquire }) => {
  if (!venture) return null;

  const isCurrentVenture = 'location' in venture;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#FBF9F5] border border-[#163E2E] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-[#645E59] hover:text-[#163E2E] bg-white/80 hover:bg-white rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {isCurrentVenture && venture.image && (
          <div className="w-full h-56 sm:h-64 overflow-hidden relative">
            <img
              src={venture.image}
              alt={venture.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-6 right-6 text-white">
              <span className="text-[11px] uppercase tracking-widest bg-[#163E2E] px-2.5 py-1 font-semibold text-white">
                {venture.category} · {venture.status}
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold mt-2">
                {venture.name}
              </h3>
            </div>
          </div>
        )}

        <div className="p-6 sm:p-8 space-y-6">
          {!isCurrentVenture && (
            <div>
              <span className="text-xs uppercase tracking-widest text-[#163E2E] font-semibold">
                Future Exploration Horizon · {venture.readiness}
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C1917] mt-1">
                {venture.title}
              </h3>
            </div>
          )}

          {isCurrentVenture ? (
            <>
              <div className="flex items-center gap-2 text-xs text-[#645E59]">
                <MapPin size={14} className="text-[#163E2E]" />
                <span>{venture.location}</span>
                <span>·</span>
                <span className="font-medium text-[#163E2E]">{venture.focusArea}</span>
              </div>

              <p className="text-base text-[#1C1917] font-medium leading-relaxed">
                {venture.tagline}
              </p>

              <div className="text-sm text-[#4A453F] leading-relaxed space-y-3">
                <p>{venture.description}</p>
              </div>

              <div className="space-y-3 pt-2">
                <h4 className="text-xs uppercase tracking-widest text-[#163E2E] font-bold">
                  Operational Architecture & Community Integration
                </h4>
                <ul className="space-y-2">
                  {venture.details.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#4A453F]">
                      <CheckCircle2 size={16} className="text-[#163E2E] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <>
              <div className="text-sm text-[#4A453F] leading-relaxed space-y-3">
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-[#163E2E] font-bold mb-1">
                    Development Rationale
                  </h4>
                  <p>{venture.rationale}</p>
                </div>

                <div className="space-y-2 pt-2">
                  <h4 className="text-xs uppercase tracking-widest text-[#163E2E] font-bold">
                    Potential Focus Areas (Planned & Concept Stage)
                  </h4>
                  <ul className="space-y-2">
                    {venture.potentialActivities.map((act, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#4A453F]">
                        <Compass size={15} className="text-[#163E2E] shrink-0 mt-0.5" />
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}

          <div className="pt-6 border-t border-[#E8E2D9] flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-[#645E59]">
              {isCurrentVenture
                ? 'Interested in visiting, hosting, or collaborating with this venture?'
                : 'Have expertise or local capability to help launch this sector?'}
            </span>
            <button
              onClick={() => {
                onClose();
                onInquire('join');
              }}
              className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold uppercase tracking-wider bg-[#163E2E] text-white hover:bg-[#0F2E22] transition-colors flex items-center justify-center gap-2"
            >
              <span>Connect with Uttarkunth</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
