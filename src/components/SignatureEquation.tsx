import React, { useState } from 'react';
import { BRAND_INFO } from '../data/uttarkunthData';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export const SignatureEquation: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number | null>(null);

  const steps = BRAND_INFO.signatureEquation;

  return (
    <div className="w-full bg-[#163E2E] text-white py-12 px-4 sm:px-8 border-y border-[#235843]">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <p className="text-xs uppercase tracking-widest text-[#9AE6B4] font-semibold">
            The Core Framework
          </p>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
            How Development Truly Emerges
          </h3>
          <p className="text-sm text-[#D7E3DC] max-w-xl mx-auto">
            Development is not delivered from above; it is forged step-by-step through deliberate collective work.
          </p>
        </div>

        {/* Visual Flow Pipeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-4">
          {steps.map((item, idx) => {
            const isSelected = activeStage === idx;
            return (
              <div
                key={item.label}
                onClick={() => setActiveStage(isSelected ? null : idx)}
                className={`cursor-pointer transition-all duration-200 p-5 rounded-none border text-left relative flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#0F2E22] border-[#68D391] shadow-lg ring-1 ring-[#68D391]'
                    : 'bg-[#1E4B39]/70 border-[#2E6850] hover:bg-[#1E4B39] hover:border-[#4B8E70]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-[#2E6850]">
                    <span className="text-xs font-mono text-[#9AE6B4]">0{idx + 1}</span>
                    {idx < steps.length - 1 && (
                      <span className="hidden lg:inline text-xs text-[#9AE6B4]/60">→</span>
                    )}
                  </div>
                  <h4 className="text-lg font-serif font-bold text-white tracking-wide pt-3">
                    {item.label}
                  </h4>
                  <p className="text-xs text-[#C5D7CE] mt-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="pt-4 text-[11px] text-[#9AE6B4] font-medium flex items-center gap-1">
                  <span>{isSelected ? 'Click to minimize' : 'Explore principle'}</span>
                  <span>{isSelected ? '↑' : '→'}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Detail Card if active */}
        {activeStage !== null && (
          <div className="bg-[#0F2E22] border border-[#68D391]/60 p-6 text-sm text-[#E2E8F0] space-y-2 animate-fadeIn">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-[#9AE6B4] font-semibold">
                Principle 0{activeStage + 1} • {steps[activeStage].label}
              </span>
              <button
                onClick={() => setActiveStage(null)}
                className="text-xs text-[#A0AEC0] hover:text-white"
              >
                Close ✕
              </button>
            </div>
            <p className="text-base font-serif text-white">
              {activeStage === 0 &&
                'Unity: Recognizing that isolated individuals are vulnerable to external pressures, but a cohesive community aligned around shared purpose can protect its landscape and shape its own destiny.'}
              {activeStage === 1 &&
                'Action: Transcending mere complaint, cynicism, or endless theoretical meetings. Stepping into the physical world to clean, build, cook, plant, teach, and innovate.'}
              {activeStage === 2 &&
                'Experience: Ground truth discovered through real obstacles, failed attempts, client feedback, and seasonal mountain realities that no classroom or book can simulate.'}
              {activeStage === 3 &&
                'Capability: The emergence of dependable operational muscle, technical competence, managerial discipline, and self-belief within local mountain youth.'}
              {activeStage === 4 &&
                'Development: Genuine, self-sustained community elevation—economic resilience, ecological stewardship, and cultural pride that endures without external charity.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
