import React, { useState } from 'react';
import { PageId, Venture, FutureSector, MediaStory } from '../types';
import { BRAND_INFO, CURRENT_VENTURES, MEDIA_STORIES } from '../data/uttarkunthData';
import { SignatureEquation } from '../components/SignatureEquation';
import { ProcessDiagram } from '../components/ProcessDiagram';
import { VentureDetailModal } from '../components/VentureDetailModal';
import { StoryModal } from '../components/StoryModal';
import { UttarkunthLogo } from '../components/UttarkunthLogo';
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Compass,
  CheckCircle2,
  TreePine,
  Coffee,
  Video,
  Mountain,
  Users2,
  BookOpen,
  Eye,
  Hammer,
  Youtube,
  Instagram,
} from 'lucide-react';

interface HomeViewProps {
  onNavigate: (page: PageId) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  const [selectedVenture, setSelectedVenture] = useState<Venture | FutureSector | null>(null);
  const [selectedStory, setSelectedStory] = useState<MediaStory | null>(null);

  return (
    <div className="space-y-0">
      {/* SECTION 1: HERO */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#0F2E22] text-white">
        {/* Cinematic Backdrop Image */}
        <div className="absolute inset-0">
          <img
            src="/src/assets/images/hero_himalayan_valley_1791084719943.jpg"
            alt="Majestic Himalayan pine forest and mountain village valley"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-45 scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F2E22] via-[#0F2E22]/60 to-[#0F2E22]/30" />
        </div>

        {/* Content Container */}
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center space-y-8">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#D8773E] font-semibold border-b border-[#D8773E]/40 pb-1">
              Himalayan-Born Entrepreneurial Ecosystem
            </span>
            <div className="py-2">
              <UttarkunthLogo variant="full" size="xl" theme="dark" showSubtitle={true} className="mx-auto" />
            </div>
            <p className="text-xl sm:text-2xl font-serif italic text-[#D1E0D7] max-w-2xl mx-auto">
              Ideas born in the Himalayas. Built through people.
            </p>
          </div>

          <p className="text-base sm:text-lg text-[#C5D7CE] max-w-3xl mx-auto leading-relaxed font-light">
            An entrepreneurial ecosystem exploring how sustainable businesses, creativity, learning,
            and collective action can contribute to meaningful community development.
          </p>

          {/* Motto Display */}
          <div className="py-2">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-[#163E2E]/80 border border-[#B85D28]/40 text-[#D8773E] text-xs uppercase tracking-widest font-semibold backdrop-blur-sm shadow-inner">
              <span className="text-[#D8773E] font-bold">Motto:</span>
              <span className="text-white font-serif normal-case text-base tracking-normal italic">
                {BRAND_INFO.motto}
              </span>
            </div>
          </div>

          {/* Hero Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('ecosystem')}
              className="w-full sm:w-auto px-8 py-4 text-xs font-semibold uppercase tracking-widest bg-[#B85D28] text-white hover:bg-[#964218] transition-all shadow-lg flex items-center justify-center gap-2 group border border-[#964218]"
            >
              <span>Explore Uttarkunth</span>
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => onNavigate('story')}
              className="w-full sm:w-auto px-8 py-4 text-xs font-semibold uppercase tracking-widest bg-transparent border border-white/60 text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2"
            >
              <span>Discover Our Story</span>
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE QUESTION THAT STARTED IT */}
      <section className="py-20 sm:py-28 bg-[#FBF9F5] border-b border-[#E8E2D9]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#163E2E] font-semibold">
              The Genesis & Ground Reality
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#1C1917] leading-tight">
              Is there any practical solution — and who will create it?
            </h2>
          </div>

          <div className="space-y-5 text-base sm:text-lg text-[#4A453F] leading-relaxed">
            <p>
              The concept of Uttarkunth emerged while our founder, Gaurav Negi, was preparing for competitive civil services examinations and closely observing the deep-seated challenges confronting the Himalayan mountain region.
            </p>
            <p>
              Along the fragile river valleys and high slopes, the concerns were impossible to ignore: accelerating deforestation, devastating flash floods, increasing pollution along sacred pilgrimage corridors, the rapid erosion of indigenous architectural knowledge, and a systemic lack of viable economic opportunities that compelled youth to abandon their ancestral villages.
            </p>
            <blockquote className="border-l-2 border-[#163E2E] pl-6 py-2 my-6 font-serif italic text-xl sm:text-2xl text-[#163E2E] bg-[#F5EFEB]">
              “Observing a problem is only the beginning. Practical action, shared participation, and learning through execution are what truly move an idea forward.”
            </blockquote>
            <p>
              Uttarkunth was born out of the realization that waiting indefinitely for external agencies, distant institutions, or philanthropic donors will never build autonomous mountain resilience. Real transformation begins when local people organize around sustainable enterprises.
            </p>
          </div>

          <div className="pt-4">
            <button
              onClick={() => onNavigate('story')}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#163E2E] hover:text-[#0F2E22] group border-b border-[#163E2E] pb-1"
            >
              <span>Read the Full Origin Story</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE CORE BELIEF */}
      <section className="py-20 sm:py-24 bg-[#F5EFEB] border-b border-[#E8E2D9]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-[#163E2E] font-semibold">
              The Guiding Conviction
            </span>
            <h2 className="text-4xl sm:text-6xl font-serif font-bold text-[#1C1917] tracking-tight">
              We the people.
            </h2>
            <p className="text-base sm:text-lg text-[#5A544E] leading-relaxed">
              We believe that communities can become active creators of development rather than passive recipients waiting for outside actors to solve every local challenge.
            </p>
          </div>

          {/* Signature Equation embedded prominently */}
          <SignatureEquation />
        </div>
      </section>

      {/* SECTION 4: WHAT IS UTTARKUNTH? (3 CONNECTED PILLARS) */}
      <section className="py-20 sm:py-28 bg-[#FBF9F5] border-b border-[#E8E2D9]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-[#163E2E] font-semibold">
              Foundational Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1C1917]">
              The Three Connected Pillars
            </h2>
            <p className="text-sm text-[#645E59]">
              How Uttarkunth anchors practical community development through a unified discipline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 1 */}
            <div className="bg-white border border-[#E8E2D9] p-8 space-y-5 relative group hover:border-[#163E2E] transition-all">
              <div className="w-12 h-12 bg-[#F3F7F5] border border-[#C5D7CE] text-[#163E2E] flex items-center justify-center">
                <Hammer size={22} />
              </div>
              <div className="space-y-2">
                <span className="text-xs font-mono text-[#8C827A]">01 / ENGINE</span>
                <h3 className="text-2xl font-serif font-bold text-[#163E2E]">
                  Entrepreneurship
                </h3>
              </div>
              <p className="text-sm text-[#5A544E] leading-relaxed">
                Building financially viable, self-sustaining businesses rather than dependent charities. Honest revenue provides the freedom to invest in people, tools, and local capability.
              </p>
              <ul className="text-xs text-[#645E59] space-y-2 pt-2 border-t border-[#F5EFEB]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-[#163E2E]" />
                  <span>Market-tested financial independence</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-[#163E2E]" />
                  <span>Local youth employment & fair wages</span>
                </li>
              </ul>
            </div>

            {/* Pillar 2 */}
            <div className="bg-white border border-[#E8E2D9] p-8 space-y-5 relative group hover:border-[#163E2E] transition-all">
              <div className="w-12 h-12 bg-[#F3F7F5] border border-[#C5D7CE] text-[#163E2E] flex items-center justify-center">
                <BookOpen size={22} />
              </div>
              <div className="space-y-2">
                <span className="text-xs font-mono text-[#8C827A]">02 / METHOD</span>
                <h3 className="text-2xl font-serif font-bold text-[#163E2E]">
                  Learning by Doing
                </h3>
              </div>
              <p className="text-sm text-[#5A544E] leading-relaxed">
                Ground experience trumps theoretical speculation. We learn through physical construction, daily customer hospitality, supply trials, and continuous operational iteration.
              </p>
              <ul className="text-xs text-[#645E59] space-y-2 pt-2 border-t border-[#F5EFEB]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-[#163E2E]" />
                  <span>Action-first mindset (Think 5%, Do 95%)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-[#163E2E]" />
                  <span>Honest reflection upon mistakes</span>
                </li>
              </ul>
            </div>

            {/* Pillar 3 */}
            <div className="bg-white border border-[#E8E2D9] p-8 space-y-5 relative group hover:border-[#163E2E] transition-all">
              <div className="w-12 h-12 bg-[#F3F7F5] border border-[#C5D7CE] text-[#163E2E] flex items-center justify-center">
                <Users2 size={22} />
              </div>
              <div className="space-y-2">
                <span className="text-xs font-mono text-[#8C827A]">03 / PURPOSE</span>
                <h3 className="text-2xl font-serif font-bold text-[#163E2E]">
                  Collective Action
                </h3>
              </div>
              <p className="text-sm text-[#5A544E] leading-relaxed">
                Bringing people, local skills, and shared resources together. Development is not an isolated individual triumph; it is a collaborative triumph of an organized community.
              </p>
              <ul className="text-xs text-[#645E59] space-y-2 pt-2 border-t border-[#F5EFEB]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-[#163E2E]" />
                  <span>Village consensus and mutual aid</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-[#163E2E]" />
                  <span>Cross-pollination with conscious travelers</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: THE UTTARKUNTH MODEL (INTERACTIVE DIAGRAM) */}
      <section className="py-16 sm:py-24 bg-[#F5EFEB] border-b border-[#E8E2D9]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProcessDiagram />
        </div>
      </section>

      {/* SECTION 5.5: UTTARKUNTH STAYS (Section 51 Specification) */}
      <section className="py-20 sm:py-28 bg-[#163E2E] text-white border-b border-[#214738]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-[#D8773E] font-semibold border-b border-[#D8773E]/40 pb-1">
              Accommodation Marketplace
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
              UTTARKUNTH STAYS
            </h2>
            <p className="text-xl sm:text-2xl font-serif italic text-[#D1E0D7]">
              Stay Somewhere Meaningful.
            </p>
            <p className="text-sm sm:text-base text-[#C5D7CE] font-light leading-relaxed">
              Discover homestays, hotels, resorts, villas and unique stays while connecting with the people who host them.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => onNavigate('stays')}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#B85D28] hover:bg-[#964218] text-white text-xs font-semibold uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>Explore Stays</span>
                <ArrowRight size={14} />
              </button>
              <button
                onClick={() => onNavigate('host-portal')}
                className="w-full sm:w-auto px-8 py-3.5 bg-transparent hover:bg-white/10 text-white text-xs font-semibold uppercase tracking-widest transition-all border border-white/40 flex items-center justify-center gap-2"
              >
                <span>List Your Property</span>
              </button>
            </div>
          </div>

          {/* Why Host With Uttarkunth? */}
          <div className="pt-8 border-t border-[#214738] space-y-8">
            <div className="text-center">
              <h3 className="text-2xl font-serif font-bold text-white">Why Host With Uttarkunth?</h3>
              <p className="text-xs text-[#A8C2B4] mt-1">Built for mountain property owners with transparent community terms.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-[#0F2E22] p-6 rounded-xl border border-white/10 space-y-3">
                <span className="text-xs font-bold text-[#D8773E] uppercase tracking-wider block">0% Introductory</span>
                <h4 className="text-lg font-serif font-bold text-white">0% Platform Commission for Your First 12 Months</h4>
                <p className="text-xs text-[#C5D7CE] font-light leading-relaxed">
                  Give your property room to grow without Uttarkunth platform commission during your introductory period.
                </p>
              </div>

              <div className="bg-[#0F2E22] p-6 rounded-xl border border-white/10 space-y-3">
                <span className="text-xs font-bold text-[#A8C2B4] uppercase tracking-wider block">Transparent Rate</span>
                <h4 className="text-lg font-serif font-bold text-white">10% Standard Platform Commission Afterward</h4>
                <p className="text-xs text-[#C5D7CE] font-light leading-relaxed">
                  A simple and transparent platform commission with zero hidden deductions or surprise charges.
                </p>
              </div>

              <div className="bg-[#0F2E22] p-6 rounded-xl border border-white/10 space-y-3">
                <span className="text-xs font-bold text-[#A8C2B4] uppercase tracking-wider block">Mobile-First</span>
                <h4 className="text-lg font-serif font-bold text-white">Professional Booking Management</h4>
                <p className="text-xs text-[#C5D7CE] font-light leading-relaxed">
                  Manage availability, rooms, reservations and guests seamlessly from your phone.
                </p>
              </div>

              <div className="bg-[#0F2E22] p-6 rounded-xl border border-white/10 space-y-3">
                <span className="text-xs font-bold text-[#A8C2B4] uppercase tracking-wider block">Ecosystem</span>
                <h4 className="text-lg font-serif font-bold text-white">Growing Community</h4>
                <p className="text-xs text-[#C5D7CE] font-light leading-relaxed">
                  Become part of a growing network of meaningful places and conscious mountain travellers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: THE CURRENT VENTURES */}
      <section className="py-20 sm:py-28 bg-[#FBF9F5] border-b border-[#E8E2D9]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E8E2D9] pb-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#163E2E] font-semibold">
                Operational Realities
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1C1917]">
                Current Operational Vehicles
              </h2>
            </div>
            <p className="text-sm text-[#645E59] max-w-md">
              Businesses built step-by-step in the Himalayas to demonstrate how viable enterprise and community values work in practice.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CURRENT_VENTURES.map((v) => (
              <div
                key={v.id}
                className="bg-white border border-[#E8E2D9] flex flex-col justify-between group hover:border-[#163E2E] transition-all shadow-sm"
              >
                <div>
                  <div className="aspect-[4/3] w-full overflow-hidden relative">
                    <img
                      src={v.image}
                      alt={v.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#163E2E] text-white text-[10px] uppercase font-bold tracking-widest px-2.5 py-1">
                      {v.status}
                    </div>
                  </div>
                  <div className="p-6 space-y-3">
                    <span className="text-xs uppercase tracking-wider text-[#645E59] font-medium">
                      {v.category}
                    </span>
                    <h3 className="text-2xl font-serif font-bold text-[#163E2E]">
                      {v.name}
                    </h3>
                    <p className="text-xs text-[#38332E] font-medium">
                      {v.tagline}
                    </p>
                    <p className="text-xs text-[#5A544E] line-clamp-3 leading-relaxed">
                      {v.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-[#F5EFEB] mt-4 flex items-center justify-between">
                  <span className="text-[11px] text-[#8C827A]">{v.focusArea}</span>
                  <button
                    onClick={() => setSelectedVenture(v)}
                    className="text-xs font-semibold uppercase tracking-wider text-[#163E2E] hover:underline flex items-center gap-1"
                  >
                    <span>Details</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <button
              onClick={() => onNavigate('ventures')}
              className="px-6 py-3 text-xs font-semibold uppercase tracking-widest bg-[#163E2E] text-white hover:bg-[#0F2E22] transition-colors"
            >
              Explore Ventures Architecture & Future Horizons →
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 7: BUSINESSES ARE THE VEHICLES */}
      <section className="py-20 sm:py-28 bg-[#163E2E] text-white border-b border-[#235843]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <span className="text-xs uppercase tracking-widest text-[#9AE6B4] font-semibold">
            The Fundamental Distinction
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-tight">
            Businesses are the vehicles.<br />
            Community development is the purpose.
          </h2>
          <p className="text-base sm:text-lg text-[#D1E0D7] max-w-2xl mx-auto leading-relaxed">
            Uttarkunth is not an NGO seeking charity, nor a purely commercial entity extracting wealth.
            We construct enterprises that create livelihood, master skills, build resilience, and direct
            their growing capacity back into the soil that gave them birth.
          </p>

          <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left border-t border-[#2E6850]">
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest text-[#9AE6B4] font-mono">01. Independent</span>
              <p className="text-xs text-[#C5D7CE]">Sustained by market value, ensuring longevity beyond grants.</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest text-[#9AE6B4] font-mono">02. Skill-Driven</span>
              <p className="text-xs text-[#C5D7CE]">Training mountain youth in practical trade and modern capability.</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest text-[#9AE6B4] font-mono">03. Impact-Bound</span>
              <p className="text-xs text-[#C5D7CE]">Channeling profits, energy, and wisdom back to the village.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: THE VILLAGE AS A LIVING LABORATORY */}
      <section className="py-20 sm:py-28 bg-[#FBF9F5] border-b border-[#E8E2D9]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#163E2E] font-semibold">
              Ground Proving Ground
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1C1917]">
              The Village as a Living Laboratory
            </h2>
            <p className="text-base text-[#5A544E] leading-relaxed">
              We do not test theories in sterile boardrooms. We begin with modest, tangible experiments in our surrounding Himalayan communities, testing what works in mountain logistics, local culture, and ecological balance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white border border-[#E8E2D9] p-6 space-y-3">
              <span className="text-xs font-mono text-[#8C827A]">AREA A</span>
              <h4 className="text-lg font-serif font-bold text-[#163E2E]">
                Environmental Responsibility & Waste
              </h4>
              <p className="text-xs text-[#5A544E] leading-relaxed">
                Developing localized plastic collection systems and composting solutions adapted to high-altitude cold weather and steep terrain.
              </p>
            </div>

            <div className="bg-white border border-[#E8E2D9] p-6 space-y-3">
              <span className="text-xs font-mono text-[#8C827A]">AREA B</span>
              <h4 className="text-lg font-serif font-bold text-[#163E2E]">
                Youth Capability & Apprenticeship
              </h4>
              <p className="text-xs text-[#5A544E] leading-relaxed">
                Involving young villagers in carpentry, masonry, hospitality management, food hygiene, and digital media production.
              </p>
            </div>

            <div className="bg-white border border-[#E8E2D9] p-6 space-y-3">
              <span className="text-xs font-mono text-[#8C827A]">AREA C</span>
              <h4 className="text-lg font-serif font-bold text-[#163E2E]">
                Vernacular Architecture Preservation
              </h4>
              <p className="text-xs text-[#5A544E] leading-relaxed">
                Restoring ancestral stone and timber building practices (Koti Banal methods) that are climate-resilient and earthquake-proof.
              </p>
            </div>

            <div className="bg-white border border-[#E8E2D9] p-6 space-y-3">
              <span className="text-xs font-mono text-[#8C827A]">AREA D</span>
              <h4 className="text-lg font-serif font-bold text-[#163E2E]">
                Indigenous Crops & Food Systems
              </h4>
              <p className="text-xs text-[#5A544E] leading-relaxed">
                Integrating drought-resistant native grains like Mandua (finger millet) and Jhangora into our hospitality menus.
              </p>
            </div>

            <div className="bg-white border border-[#E8E2D9] p-6 space-y-3">
              <span className="text-xs font-mono text-[#8C827A]">AREA E</span>
              <h4 className="text-lg font-serif font-bold text-[#163E2E]">
                Cultural Oral Histories & "Aaj Ka Devta"
              </h4>
              <p className="text-xs text-[#5A544E] leading-relaxed">
                Documenting living legends, traditional folk medicinal wisdom, and village folklore before they are lost to modern migration.
              </p>
            </div>

            <div className="bg-white border border-[#E8E2D9] p-6 space-y-3">
              <span className="text-xs font-mono text-[#8C827A]">AREA F</span>
              <h4 className="text-lg font-serif font-bold text-[#163E2E]">
                The 10% Guiding Principle
              </h4>
              <p className="text-xs text-[#5A544E] leading-relaxed">
                An internal aspirational benchmark designating ~10% of operational surplus to village priorities as financial health allows.
              </p>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => onNavigate('community')}
              className="text-xs font-semibold uppercase tracking-wider text-[#163E2E] border-b border-[#163E2E] pb-1 hover:text-[#0F2E22]"
            >
              Explore Our Community Development Framework →
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 9: STORIES & MEDIA */}
      <section className="py-20 sm:py-28 bg-[#F5EFEB] border-b border-[#E8E2D9]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E8E2D9] pb-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#163E2E] font-semibold">
                Digital Dispatches
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1C1917]">
                Stories, Films & Cultural Reflections
              </h2>
            </div>
            <p className="text-sm text-[#645E59] max-w-md">
              Unvarnished field logs, behind-the-scenes vlogs, and documentary explorations of mountain wisdom.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {MEDIA_STORIES.slice(0, 2).map((story) => (
              <div
                key={story.id}
                onClick={() => setSelectedStory(story)}
                className="bg-white border border-[#E8E2D9] overflow-hidden group cursor-pointer hover:border-[#163E2E] transition-all shadow-sm"
              >
                <div className="aspect-video w-full overflow-hidden relative">
                  <img
                    src={story.thumbnail}
                    alt={story.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute top-3 left-3 bg-[#163E2E] text-white text-[10px] uppercase font-bold tracking-widest px-2 py-0.5">
                    {story.category}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white text-[11px] px-2 py-0.5">
                    {story.duration}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="text-[11px] text-[#8C827A] uppercase tracking-wider">
                    Released {story.releaseDate}
                  </div>
                  <h3 className="text-xl font-serif font-bold text-[#163E2E] group-hover:underline">
                    {story.title}
                  </h3>
                  <p className="text-xs text-[#5A544E] line-clamp-2 leading-relaxed">
                    {story.description}
                  </p>
                  {story.featuredQuote && (
                    <p className="text-xs italic text-[#163E2E] font-serif border-l border-[#163E2E] pl-3 py-1">
                      {story.featuredQuote}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('media')}
              className="px-6 py-3 text-xs font-semibold uppercase tracking-widest bg-white border border-[#163E2E] text-[#163E2E] hover:bg-[#163E2E] hover:text-white transition-colors"
            >
              View All Documentaries & Media Series →
            </button>
            <a
              href={BRAND_INFO.socialLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 text-xs font-semibold uppercase tracking-widest bg-[#FF0000] text-white hover:bg-[#CC0000] transition-colors inline-flex items-center gap-1.5 shadow-sm"
            >
              <Youtube size={15} />
              <span>YouTube</span>
            </a>
            <a
              href={BRAND_INFO.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 text-xs font-semibold uppercase tracking-widest bg-[#163E2E] text-white hover:bg-[#0F2E22] transition-colors inline-flex items-center gap-1.5 shadow-sm"
            >
              <Instagram size={15} />
              <span>Instagram</span>
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 10: THE LONG-TERM VISION */}
      <section className="py-20 sm:py-28 bg-[#FBF9F5] border-b border-[#E8E2D9]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-center">
          <div className="space-y-4 max-w-3xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-[#163E2E] font-semibold">
              The Path Ahead
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#1C1917]">
              Start local. Learn continuously.<br />Build for the long term.
            </h2>
            <p className="text-base text-[#5A544E] leading-relaxed">
              Uttarkunth is not designed to be a temporary experiment or a one-person endeavor. Our ambition is to build systems, operational playbooks, and enterprise frameworks that outlive us and can be adapted by other mountain valleys across India.
            </p>
          </div>

          {/* Progression Arrow: Village -> Region -> India -> Wider Impact */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
            <div className="bg-white border border-[#E8E2D9] p-5 text-left space-y-2">
              <span className="text-xs font-mono text-[#163E2E] font-bold">STAGE 01</span>
              <h4 className="text-lg font-serif font-bold text-[#1C1917]">Village</h4>
              <p className="text-xs text-[#645E59]">
                Proving viable models in specific mountain hamlets through homestays, cafes, and local youth teams.
              </p>
            </div>

            <div className="bg-white border border-[#E8E2D9] p-5 text-left space-y-2">
              <span className="text-xs font-mono text-[#163E2E] font-bold">STAGE 02</span>
              <h4 className="text-lg font-serif font-bold text-[#1C1917]">Region</h4>
              <p className="text-xs text-[#645E59]">
                Connecting corridors across Kullu, Parvati Valley and Himachal Pradesh through cooperative networks and shared standards.
              </p>
            </div>

            <div className="bg-white border border-[#E8E2D9] p-5 text-left space-y-2">
              <span className="text-xs font-mono text-[#163E2E] font-bold">STAGE 03</span>
              <h4 className="text-lg font-serif font-bold text-[#1C1917]">India</h4>
              <p className="text-xs text-[#645E59]">
                Sharing blueprints with youth and entrepreneurs in Western Ghats, Northeast hills, and rural plains.
              </p>
            </div>

            <div className="bg-white border border-[#E8E2D9] p-5 text-left space-y-2">
              <span className="text-xs font-mono text-[#163E2E] font-bold">STAGE 04</span>
              <h4 className="text-lg font-serif font-bold text-[#1C1917]">Wider Impact</h4>
              <p className="text-xs text-[#645E59]">
                Decentralized, open-source community development frameworks adapted globally by indigenous regions.
              </p>
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={() => onNavigate('vision')}
              className="text-xs font-semibold uppercase tracking-wider text-[#163E2E] border-b border-[#163E2E] pb-1 hover:text-[#0F2E22]"
            >
              Explore Long-Term Vision & Future Sectors →
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 11: JOIN THE JOURNEY */}
      <section className="py-20 sm:py-28 bg-[#11241C] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#9AE6B4] font-semibold">
              Participation & Fellowship
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white">
              Be part of building something meaningful.
            </h2>
            <p className="text-base sm:text-lg text-[#C5D7CE] max-w-2xl mx-auto leading-relaxed">
              Whether you are a mountain villager with skills, an entrepreneur seeking ethical partnership, a creative storyteller, or a traveler wanting mindful hospitality—there is a place for you in Uttarkunth.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left pt-4">
            <div className="bg-[#19362A] p-5 border border-[#275341] space-y-2">
              <h4 className="text-base font-serif font-bold text-white">Business Collaboration</h4>
              <p className="text-xs text-[#A3B8AD]">Partner on mountain hospitality, local produce sourcing, and ethical supply chains.</p>
            </div>
            <div className="bg-[#19362A] p-5 border border-[#275341] space-y-2">
              <h4 className="text-base font-serif font-bold text-white">Creative & Media</h4>
              <p className="text-xs text-[#A3B8AD]">Collaborate on documentaries, oral histories, folk art, and the "Aaj Ka Devta" series.</p>
            </div>
            <div className="bg-[#19362A] p-5 border border-[#275341] space-y-2">
              <h4 className="text-base font-serif font-bold text-white">Skills & Field Work</h4>
              <p className="text-xs text-[#A3B8AD]">Contribute skills in carpentry, sustainable design, botany, coding, and youth mentoring.</p>
            </div>
          </div>

          <div className="pt-6">
            <button
              onClick={() => onNavigate('join')}
              className="px-8 py-4 text-xs font-semibold uppercase tracking-widest bg-white text-[#0F2E22] hover:bg-[#F3F7F5] transition-all shadow-md"
            >
              Submit an Inquiry to Join the Journey →
            </button>
          </div>
        </div>
      </section>

      {/* Modals for Details */}
      {selectedVenture && (
        <VentureDetailModal
          venture={selectedVenture}
          onClose={() => setSelectedVenture(null)}
          onInquire={onNavigate}
        />
      )}

      {selectedStory && (
        <StoryModal
          story={selectedStory}
          onClose={() => setSelectedStory(null)}
          onNavigate={onNavigate}
        />
      )}
    </div>
  );
};
