import React, { useState } from 'react';
import { PROCESS_STAGES } from '../data/uttarkunthData';
import { ChevronRight, ChevronLeft, ArrowRight, Eye, Hammer, Coins, BookOpen, Users, HeartHandshake, Film, Sparkles, TrendingUp } from 'lucide-react';

export const ProcessDiagram: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const icons = [
    Eye,
    Hammer,
    Coins,
    BookOpen,
    Users,
    HeartHandshake,
    Film,
    Sparkles,
    TrendingUp,
  ];

  const current = PROCESS_STAGES[activeStep];
  const CurrentIcon = icons[activeStep] || Eye;

  return (
    <div className="w-full bg-[#F5EFEB] border border-[#E8E2D9] p-6 sm:p-10 my-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E8E2D9] pb-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#163E2E] font-semibold">
              The 9-Stage Operating Model
            </span>
            <h3 className="text-3xl font-serif font-bold text-[#1C1917] mt-1">
              How Uttarkunth Ventures Function
            </h3>
          </div>
          <p className="text-sm text-[#645E59] max-w-md">
            A cyclical, iterative engine translating Himalayan observation into enduring, self-reliant community capability.
          </p>
        </div>

        {/* Desktop Stepper Bar */}
        <div className="hidden lg:flex items-center justify-between gap-1 overflow-x-auto pb-2 border-b border-[#E0D8CE]">
          {PROCESS_STAGES.map((stage, idx) => {
            const isCurrent = activeStep === idx;
            const isCompleted = activeStep > idx;
            return (
              <button
                key={stage.name}
                onClick={() => setActiveStep(idx)}
                className={`group flex flex-col items-center py-2 px-2 text-center transition-all flex-1 min-w-[90px] focus:outline-none ${
                  isCurrent
                    ? 'text-[#B85D28] font-bold border-b-2 border-[#B85D28]'
                    : isCompleted
                    ? 'text-[#163E2E]'
                    : 'text-[#8C827A] hover:text-[#1C1917]'
                }`}
              >
                <span className="text-[11px] font-mono tracking-tight opacity-70">
                  0{stage.step}
                </span>
                <span className="text-xs tracking-wider uppercase font-semibold mt-1">
                  {stage.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Mobile Horizontal Selector */}
        <div className="lg:hidden flex items-center justify-between bg-white border border-[#E8E2D9] p-2">
          <button
            onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
            disabled={activeStep === 0}
            className="p-2 text-[#163E2E] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#F5EFEB]"
            aria-label="Previous step"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="text-center">
            <span className="text-[10px] font-mono uppercase text-[#645E59]">
              Stage {activeStep + 1} of 9
            </span>
            <p className="text-sm font-serif font-bold text-[#163E2E]">
              {current.name}
            </p>
          </div>
          <button
            onClick={() => setActiveStep((prev) => Math.min(PROCESS_STAGES.length - 1, prev + 1))}
            disabled={activeStep === PROCESS_STAGES.length - 1}
            className="p-2 text-[#163E2E] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#F5EFEB]"
            aria-label="Next step"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Active Stage Presentation Card */}
        <div className="bg-white border border-[#E8E2D9] p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {/* Left Column: Number & Icon */}
            <div className="md:col-span-1 border-b md:border-b-0 md:border-r border-[#E8E2D9] pb-6 md:pb-0 md:pr-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#B85D28] text-white flex items-center justify-center font-serif text-lg font-bold shadow-sm">
                  0{current.step}
                </div>
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#645E59]">
                    Cycle Position
                  </span>
                  <h4 className="text-xl font-serif font-bold text-[#163E2E]">
                    {current.name}
                  </h4>
                </div>
              </div>
              <p className="text-sm font-medium text-[#1C1917] leading-snug">
                {current.shortDesc}
              </p>
            </div>

            {/* Right Column: In-depth rationale & key action */}
            <div className="md:col-span-2 space-y-5">
              <div>
                <h5 className="text-xs uppercase tracking-widest text-[#645E59] font-semibold mb-1">
                  Ground Philosophy
                </h5>
                <p className="text-sm sm:text-base text-[#38332E] leading-relaxed">
                  {current.fullDesc}
                </p>
              </div>

              <div className="bg-[#FBF9F5] border-l-2 border-[#163E2E] p-4">
                <span className="text-xs uppercase tracking-widest text-[#163E2E] font-bold block mb-1">
                  Practical Operational Focus
                </span>
                <p className="text-sm text-[#4A453F]">
                  {current.keyAction}
                </p>
              </div>

              {/* Navigation within card */}
              <div className="pt-2 flex items-center justify-between text-xs text-[#645E59]">
                <div className="flex items-center gap-2">
                  <span>Cycle progression:</span>
                  <span className="font-mono font-semibold text-[#163E2E]">
                    {Math.round(((activeStep + 1) / PROCESS_STAGES.length) * 100)}%
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                    disabled={activeStep === 0}
                    className="hover:text-[#163E2E] disabled:opacity-30 disabled:cursor-not-allowed font-medium"
                  >
                    ← Previous
                  </button>
                  <span className="text-[#C8BEB3]">|</span>
                  <button
                    onClick={() => setActiveStep((prev) => Math.min(PROCESS_STAGES.length - 1, prev + 1))}
                    disabled={activeStep === PROCESS_STAGES.length - 1}
                    className="hover:text-[#163E2E] disabled:opacity-30 disabled:cursor-not-allowed font-medium text-[#163E2E]"
                  >
                    Next Stage →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Summary equation underneath */}
        <div className="pt-2 text-center">
          <p className="text-xs font-mono text-[#78716A] tracking-wider uppercase">
            OBSERVE → BUILD → EARN → LEARN → CONNECT → SERVE → DOCUMENT → IMPROVE → SCALE
          </p>
        </div>
      </div>
    </div>
  );
};
