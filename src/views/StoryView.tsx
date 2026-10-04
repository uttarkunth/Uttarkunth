import React from 'react';
import { PageId } from '../types';
import { BRAND_INFO, FOUNDER_BIO } from '../data/uttarkunthData';
import { SignatureEquation } from '../components/SignatureEquation';
import { ArrowRight, Mountain, ShieldAlert, Users, Compass, CheckCircle2 } from 'lucide-react';

interface StoryViewProps {
  onNavigate: (page: PageId) => void;
}

export const StoryView: React.FC<StoryViewProps> = ({ onNavigate }) => {
  return (
    <div className="py-12 sm:py-20 space-y-16">
      {/* Header Banner */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <span className="text-xs uppercase tracking-widest text-[#B85D28] font-semibold">
          Genesis & Purpose
        </span>
        <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[#1C1917] tracking-tight leading-tight">
          The Story of Uttarkunth
        </h1>
        <p className="text-lg sm:text-xl font-serif italic text-[#645E59]">
          How a question born during civil services preparation became a living mountain enterprise.
        </p>
        <div className="h-0.5 w-24 bg-[#B85D28] pt-0.5 mt-4" />
      </div>

      {/* Main Narrative with Editorial Pull Quotes */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-[#38332E] leading-relaxed text-base sm:text-lg">
        {/* Chapter 1: The Observations */}
        <section className="space-y-6">
          <span className="text-xs uppercase tracking-widest text-[#8C827A] font-mono">
            01 / GROUND REALITIES
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#163E2E]">
            The Silence of Vanishing Villages
          </h2>
          <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-[#163E2E]">
            Uttarkunth did not begin in a corporate incubator or with investor pitch decks. It began on the quiet, winding mountain pathways of Himachal Pradesh, while its founder, Gaurav Negi, was immersed in preparation for competitive civil services examinations.
          </p>
          <p>
            Surrounded by thick textbooks on governance, economics, environmental policy, and rural development, Gaurav looked up from his study table at the realities of the surrounding Himalayan ridges. What he witnessed was a painful paradox: an ancient sacred landscape of peerless natural beauty and spiritual heritage, caught in an escalating spiral of vulnerability.
          </p>

          <div className="my-8 bg-[#F5EFEB] border border-[#E8E2D9] p-6 space-y-3">
            <h3 className="text-sm uppercase tracking-widest font-bold text-[#163E2E]">
              The Observed Mountain Dilemmas
            </h3>
            <ul className="text-sm text-[#4A453F] space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-[#163E2E] font-bold">•</span>
                <span><strong>Environmental Strain:</strong> Unplanned slope cutting, rapid deforestation, and drying perennial mountain springs (Naulas and Dharas).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#163E2E] font-bold">•</span>
                <span><strong>Pressure on Sacred Corridors:</strong> Mountains of single-use plastic waste accumulating along pilgrimage routes and pristine riverbanks.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#163E2E] font-bold">•</span>
                <span><strong>Mass Migration (Palayan):</strong> Ghost villages where ancestral homes lie padlocked because youth see no viable livelihood outside distant urban migration.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#163E2E] font-bold">•</span>
                <span><strong>Cultural Erosion:</strong> The slow forgetting of traditional stone masonry, herbal medicine, indigenous seeds, and community self-reliance.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Chapter 2: The Founding Question */}
        <section className="space-y-6">
          <span className="text-xs uppercase tracking-widest text-[#8C827A] font-mono">
            02 / THE CATALYST
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#163E2E]">
            Is There Any Practical Solution — and Who Will Create It?
          </h2>
          <p>
            It is easy to analyze problems from afar, write policy critiques, or express grief on social media. But Gaurav found himself haunted by an uncompromising question:
          </p>

          <blockquote className="border-l-2 border-[#163E2E] pl-6 py-4 my-8 font-serif italic text-2xl text-[#163E2E] bg-[#F5EFEB]">
            “Is there any practical solution to these problems — and who will create it?”
          </blockquote>

          <p>
            The conventional instinct in rural India has often been to wait: wait for government departments to sanction projects, wait for philanthropists to donate, or wait for outside corporations to bring jobs.
          </p>
          <p>
            Yet history demonstrates that outside interventions often treat symptoms rather than root causes, or fade when external funding dries up. The awakening was stark and definitive:
          </p>

          <div className="text-center py-6">
            <span className="text-3xl sm:text-4xl font-serif font-bold text-[#1C1917] tracking-tight">
              “We the people.”
            </span>
            <p className="text-xs uppercase tracking-widest text-[#645E59] mt-2">
              The only sustainable architects of community destiny
            </p>
          </div>

          <p>
            If the community does not stand up to protect its slopes, value its soil, build its businesses, and mentor its children, no external power can do it for them.
          </p>
        </section>

        {/* Chapter 3: Why Entrepreneurship */}
        <section className="space-y-6">
          <span className="text-xs uppercase tracking-widest text-[#8C827A] font-mono">
            03 / THE ENGINE
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#163E2E]">
            Why Business, Not an NGO?
          </h2>
          <p>
            Many well-meaning initiatives choose the non-profit or charitable route. Uttarkunth made a deliberate, principled decision to organize as an <strong>entrepreneurial ecosystem</strong>.
          </p>
          <p>
            Charity, while noble in emergencies, often breeds dependency and leaves initiatives fragile when donor priorities shift. In contrast, honest commercial enterprise requires operational discipline, accountability, and the daily creation of real value for which customers gladly pay.
          </p>

          <div className="bg-[#163E2E] text-white p-6 sm:p-8 space-y-4 my-6">
            <h3 className="text-xl font-serif font-bold text-[#9AE6B4]">
              The Core Equation
            </h3>
            <p className="text-sm sm:text-base text-[#D1E0D7] leading-relaxed">
              <strong>Businesses are the vehicles.</strong> They generate revenue, hone skills, establish networks, and create resilient local jobs.
            </p>
            <p className="text-sm sm:text-base text-[#D1E0D7] leading-relaxed">
              <strong>Community development is the purpose.</strong> The surplus, operational muscle, and collective will generated by those businesses are directed back into village elevation.
            </p>
          </div>

          <p>
            By building businesses—beginning with Yash Home Stay, Uttarkunth Café, and our Media & Storytelling channels—we test our ideas in the actual market. If our service is poor, guests will not return. If our food is sub-par, the café will fail. That pressure forces us to develop genuine excellence.
          </p>
        </section>

        {/* Chapter 4: The Path Forward */}
        <section className="space-y-6">
          <span className="text-xs uppercase tracking-widest text-[#8C827A] font-mono">
            04 / THE HORIZON
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#163E2E]">
            Building Step by Step
          </h2>
          <p>
            Uttarkunth does not claim to have solved every challenge or to possess a magical cure for mountain migration. We are at the beginning of an honest, multi-decade marathon.
          </p>
          <p>
            Every day, we mix mortar, welcome guests, brew mountain teas, train local teenagers, document village elders, and make our share of mistakes. But through that continuous cycle of <em>learning by doing</em>, capability is quietly taking root.
          </p>
        </section>
      </div>

      {/* Signature Equation embedded in story */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SignatureEquation />
      </div>

      {/* Navigation Call to Action */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#E8E2D9]">
        <button
          onClick={() => onNavigate('philosophy')}
          className="text-xs font-semibold uppercase tracking-widest text-[#163E2E] hover:underline"
        >
          Next: Explore Our Philosophy →
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
