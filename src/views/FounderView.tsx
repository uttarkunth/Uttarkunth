import React from 'react';
import { PageId } from '../types';
import { FOUNDER_BIO, BRAND_INFO } from '../data/uttarkunthData';
import { ArrowRight, Quote, HeartHandshake, Compass, CheckCircle2, Instagram } from 'lucide-react';

interface FounderViewProps {
  onNavigate: (page: PageId) => void;
}

export const FounderView: React.FC<FounderViewProps> = ({ onNavigate }) => {
  return (
    <div className="py-12 sm:py-20 space-y-16">
      {/* Header Banner */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <span className="text-xs uppercase tracking-widest text-[#B85D28] font-semibold">
          Founder Profile & Statement
        </span>
        <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[#1C1917] tracking-tight leading-tight">
          Gaurav Negi
        </h1>
        <p className="text-lg sm:text-xl font-serif italic text-[#645E59]">
          Founder of Uttarkunth · Building from the grassroots up.
        </p>
        <div className="h-0.5 w-24 bg-[#B85D28] pt-0.5 mt-4" />
      </div>

      {/* Main Founder Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Portrait Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="aspect-[3/4] w-full overflow-hidden bg-[#F5EFEB] border border-[#E8E2D9] shadow-sm relative">
              <img
                src={FOUNDER_BIO.image}
                alt="Gaurav Negi - Founder of Uttarkunth"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-lg font-serif font-bold">Gaurav Negi</p>
                <p className="text-xs text-[#D1E0D7]">Founder & Ground Lead, Uttarkunth</p>
              </div>
            </div>

            <div className="bg-white border border-[#E8E2D9] p-5 space-y-3 text-xs text-[#5A544E]">
              <span className="uppercase tracking-widest font-semibold text-[#163E2E] block">
                Foundational Principles
              </span>
              <ul className="space-y-1.5">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-[#163E2E]" />
                  <span>Learn by Doing. Grow by Serving.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-[#163E2E]" />
                  <span>Think 5%. Do 95%. (Action first)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-[#163E2E]" />
                  <span>Businesses as vehicles for community development</span>
                </li>
              </ul>
            </div>

            <a
              href={BRAND_INFO.socialLinks.founderInstagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-white border border-[#E8E2D9] hover:border-[#163E2E] text-xs font-semibold uppercase tracking-wider text-[#163E2E] hover:bg-[#F3F7F5] transition-all shadow-sm group"
            >
              <Instagram size={15} className="text-[#E1306C]" />
              <span>Founder's Instagram (@gaurav_negi_._)</span>
            </a>
          </div>

          {/* Statement & Story Column */}
          <div className="lg:col-span-7 space-y-8 text-base text-[#38332E] leading-relaxed">
            {/* The Direct Quote */}
            <div className="bg-[#FDF7F2] border-l-2 border-[#B85D28] p-6 sm:p-8 space-y-3">
              <span className="text-xs uppercase tracking-widest text-[#B85D28] font-bold">
                Founder’s Statement
              </span>
              <blockquote className="font-serif italic text-xl sm:text-2xl text-[#163E2E] leading-snug">
                {FOUNDER_BIO.quote}
              </blockquote>
            </div>

            {/* Narrative Paragraphs drawn faithfully from the PDF */}
            <div className="space-y-5 text-sm sm:text-base text-[#4A453F]">
              {FOUNDER_BIO.story.map((paragraph, index) => (
                <p key={index} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Commitments & Humility */}
            <div className="pt-4 border-t border-[#E8E2D9] space-y-3">
              <h3 className="text-base font-serif font-bold text-[#1C1917]">
                A Personal Word to Collaborators & Visitors
              </h3>
              <p className="text-xs sm:text-sm text-[#5A544E] leading-relaxed">
                “If you visit our homestay, stop by our café, or follow our media journeys, please understand that we do not present ourselves as finished masters or flawless experts. We are mountain sons and daughters trying to build an honest, durable alternative to despair. If you believe in practical work, patience, and serving your soil, you are always welcome here.”
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Call to Action */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#E8E2D9]">
        <button
          onClick={() => onNavigate('join')}
          className="text-xs font-semibold uppercase tracking-widest text-[#163E2E] hover:underline"
        >
          Next: Ways to Join the Journey →
        </button>
        <button
          onClick={() => onNavigate('contact')}
          className="px-6 py-3 text-xs font-semibold uppercase tracking-widest bg-[#B85D28] text-white hover:bg-[#964218] transition-colors shadow-sm"
        >
          Direct Contact with Gaurav & Team
        </button>
      </div>
    </div>
  );
};
