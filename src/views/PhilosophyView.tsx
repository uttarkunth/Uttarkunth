import React from 'react';
import { PageId } from '../types';
import { BRAND_INFO } from '../data/uttarkunthData';
import { Sparkles, Hammer, HeartHandshake, Compass, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

interface PhilosophyViewProps {
  onNavigate: (page: PageId) => void;
}

export const PhilosophyView: React.FC<PhilosophyViewProps> = ({ onNavigate }) => {
  return (
    <div className="py-12 sm:py-20 space-y-16">
      {/* Header Banner */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <span className="text-xs uppercase tracking-widest text-[#B85D28] font-semibold">
          Foundational Ethos
        </span>
        <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[#1C1917] tracking-tight leading-tight">
          Learn by Doing. Grow by Serving.
        </h1>
        <p className="text-lg sm:text-xl font-serif italic text-[#645E59]">
          The dual pillars of action and purpose that govern every venture in Uttarkunth.
        </p>
        <div className="h-0.5 w-24 bg-[#B85D28] pt-0.5 mt-4" />
      </div>

      {/* Narrative Section 1: The Two Core Principles */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Pillar 1: Learn by Doing */}
          <div className="bg-white border border-[#E8E2D9] p-8 space-y-5 shadow-sm">
            <div className="w-12 h-12 bg-[#F3F7F5] border border-[#C5D7CE] text-[#163E2E] flex items-center justify-center font-serif text-lg font-bold">
              01
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#163E2E]">
              Learn by Doing
            </h2>
            <p className="text-sm sm:text-base text-[#4A453F] leading-relaxed">
              Theory is sterile until tested against mountain weather, broken tools, late supply trucks, and demanding guests.
            </p>
            <p className="text-sm text-[#5A544E] leading-relaxed">
              We believe competence is not forged in ivory towers or endless conferences; it is hammered out on the anvil of daily execution. When an idea fails, we do not conceal it—we examine the wreckage, refine the blueprint, and rebuild with greater precision.
            </p>
            <div className="border-t border-[#F5EFEB] pt-4 space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#163E2E] font-semibold">
                Operational Realities:
              </span>
              <ul className="text-xs text-[#645E59] space-y-1.5">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-[#163E2E]" />
                  <span>Embrace controlled experimentation</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-[#163E2E]" />
                  <span>Respect mistakes as necessary tuition</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-[#163E2E]" />
                  <span>Iterate standard operating procedures continuously</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Pillar 2: Grow by Serving */}
          <div className="bg-white border border-[#E8E2D9] p-8 space-y-5 shadow-sm">
            <div className="w-12 h-12 bg-[#F3F7F5] border border-[#C5D7CE] text-[#163E2E] flex items-center justify-center font-serif text-lg font-bold">
              02
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#163E2E]">
              Grow by Serving
            </h2>
            <p className="text-sm sm:text-base text-[#4A453F] leading-relaxed">
              Expansion without contribution is merely extraction. Growth in Uttarkunth is measured by how deeply our roots nurture the surrounding community.
            </p>
            <p className="text-sm text-[#5A544E] leading-relaxed">
              Serving is not condescending charity; it is mutual accountability. We serve our guests through genuine warmth and honest food; we serve local youth through technical mentorship; we serve the mountain earth by treating its soil, springs, and trees with reverence.
            </p>
            <div className="border-t border-[#F5EFEB] pt-4 space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#163E2E] font-semibold">
                Operational Realities:
              </span>
              <ul className="text-xs text-[#645E59] space-y-1.5">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-[#163E2E]" />
                  <span>Livelihood creation prioritized over speculative profit</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-[#163E2E]" />
                  <span>Reinvesting capability into village priorities</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-[#163E2E]" />
                  <span>Respecting local autonomy and elders’ counsel</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Deep-Dive: Karmayog & The Action-First Mindset */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="bg-[#F5EFEB] border border-[#E8E2D9] p-8 sm:p-10 space-y-6">
          <span className="text-xs uppercase tracking-widest text-[#163E2E] font-semibold">
            Philosophical Influence
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#163E2E]">
            Karmayog: Meaningful Work Without Paralysis
          </h3>
          <p className="text-base text-[#4A453F] leading-relaxed">
            In the founder's vision, <strong>Karmayog</strong> is not an esoteric mystical concept, but a rigorous, practical code for modern entrepreneurs. It means committing wholeheartedly to purposeful work today, rather than becoming paralyzed by anxiety over distant, uncertain outcomes.
          </p>
          <p className="text-sm text-[#5A544E] leading-relaxed">
            Many ambitious social projects collapse before they even begin because founders obsess over 10-year projections, hypothetical policy hurdles, or fear of criticism. Karmayog frees us to pick up the tools, clear the trail, and perform our duty with excellence here and now.
          </p>

          <div className="border-l-2 border-[#163E2E] pl-6 py-3 my-4 bg-white">
            <h4 className="text-base font-serif font-bold text-[#163E2E]">
              “Think 5%. Do 95%” — An Action-First Mindset
            </h4>
            <p className="text-xs sm:text-sm text-[#4A453F] mt-2 leading-relaxed">
              We often use this phrase among our teams. It is not an invitation to ignore legal compliance, financial safety, or thoughtful engineering. Rather, it is a sharp rebuke against analysis paralysis.
            </p>
            <p className="text-xs sm:text-sm text-[#4A453F] mt-1.5 leading-relaxed">
              Do the essential 5% of planning with clarity and rigor. Then commit the remaining 95% of your energy to rolling up your sleeves, meeting guests, training apprentices, and building on the ground.
            </p>
          </div>
        </div>

        {/* Accountability & Responsibility Matrix */}
        <div className="space-y-4">
          <h3 className="text-xl font-serif font-bold text-[#1C1917]">
            The Five Pillars of Responsible Enterprise
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white border border-[#E8E2D9] p-5 space-y-2">
              <span className="text-xs font-mono text-[#163E2E] font-bold">01 / SAFETY & LEGALITY</span>
              <p className="text-xs text-[#5A544E]">
                We operate with strict adherence to fire safety, sanitation standards, land rights, and transparent taxation.
              </p>
            </div>
            <div className="bg-white border border-[#E8E2D9] p-5 space-y-2">
              <span className="text-xs font-mono text-[#163E2E] font-bold">02 / ENVIRONMENTAL DISCIPLINE</span>
              <p className="text-xs text-[#5A544E]">
                Zero tolerance for slope destabilization, plastic dumping, or water waste in fragile mountain ecosystems.
              </p>
            </div>
            <div className="bg-white border border-[#E8E2D9] p-5 space-y-2">
              <span className="text-xs font-mono text-[#163E2E] font-bold">03 / TRUTHFUL COMMERCE</span>
              <p className="text-xs text-[#5A544E]">
                No inflated claims, no artificial scarcity marketing, and fair compensation for all local collaborators.
              </p>
            </div>
            <div className="bg-white border border-[#E8E2D9] p-5 space-y-2">
              <span className="text-xs font-mono text-[#163E2E] font-bold">04 / COMMUNITY DIGNITY</span>
              <p className="text-xs text-[#5A544E]">
                Villagers are partners and hosts, never treated as decorative photo backdrops for urban tourism.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Call to Action */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#E8E2D9]">
        <button
          onClick={() => onNavigate('ecosystem')}
          className="text-xs font-semibold uppercase tracking-widest text-[#163E2E] hover:underline"
        >
          Next: Explore Our Ecosystem Architecture →
        </button>
        <button
          onClick={() => onNavigate('join')}
          className="px-6 py-3 text-xs font-semibold uppercase tracking-widest bg-[#B85D28] text-white hover:bg-[#964218] transition-colors shadow-sm"
        >
          Join the Journey
        </button>
      </div>
    </div>
  );
};
