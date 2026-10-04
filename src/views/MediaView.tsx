import React, { useState } from 'react';
import { PageId, MediaStory } from '../types';
import { MEDIA_STORIES, BRAND_INFO } from '../data/uttarkunthData';
import { StoryModal } from '../components/StoryModal';
import { Play, Clock, Film, Share2, Sparkles, Video, ArrowRight, Youtube, Instagram } from 'lucide-react';

interface MediaViewProps {
  onNavigate: (page: PageId) => void;
}

export const MediaView: React.FC<MediaViewProps> = ({ onNavigate }) => {
  const [filter, setFilter] = useState<string>('all');
  const [activeStory, setActiveStory] = useState<MediaStory | null>(null);

  const categories = ['all', 'Aaj Ka Devta', 'Cultural Reflection', 'Founder Vlog', 'Field Notes'];

  const filteredStories =
    filter === 'all'
      ? MEDIA_STORIES
      : MEDIA_STORIES.filter((s) => s.category.toLowerCase() === filter.toLowerCase());

  return (
    <div className="py-12 sm:py-20 space-y-16">
      {/* Header Banner */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <span className="text-xs uppercase tracking-widest text-[#163E2E] font-semibold">
          Digital Storytelling & Cultural Archiving
        </span>
        <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[#1C1917] tracking-tight leading-tight">
          Stories & Media
        </h1>
        <p className="text-lg sm:text-xl font-serif italic text-[#645E59]">
          The Uttarkunth journey documented through documentaries, vlogs, field reflections, and Aaj Ka Devta.
        </p>
        <div className="h-0.5 w-24 bg-[#163E2E] pt-0.5 mt-4" />
      </div>

      {/* Official Channel Links Banner */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F5EFEB] border border-[#E8E2D9] p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <span className="text-xs uppercase tracking-widest text-[#163E2E] font-bold block">
              Official Media Channels
            </span>
            <p className="text-xs text-[#5A544E] mt-0.5">
              Subscribe on YouTube for full-length documentary releases & follow daily field updates on Instagram.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={BRAND_INFO.socialLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#FF0000] hover:bg-[#CC0000] text-white text-xs font-semibold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5 shadow-sm"
            >
              <Youtube size={15} />
              <span>YouTube</span>
            </a>
            <a
              href={BRAND_INFO.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#163E2E] hover:bg-[#0F2E22] text-white text-xs font-semibold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5 shadow-sm"
            >
              <Instagram size={15} />
              <span>Instagram</span>
            </a>
          </div>
        </div>
      </div>

      {/* Featured Production Spotlight: Aaj Ka Devta */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0F2E22] text-white border border-[#235843] p-6 sm:p-10 flex flex-col lg:flex-row gap-8 items-center shadow-lg">
          <div className="w-full lg:w-1/2 aspect-video overflow-hidden relative group cursor-pointer" onClick={() => setActiveStory(MEDIA_STORIES[0])}>
            <img
              src="/src/assets/images/media_storytelling_camera_1791084753811.jpg"
              alt="Aaj Ka Devta production filming in Himalayan village"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-[#163E2E] text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                <Play size={24} className="ml-1" />
              </div>
            </div>
            <div className="absolute bottom-3 left-3 bg-[#163E2E] px-2.5 py-1 text-[10px] uppercase font-bold tracking-widest text-white">
              Flagship Series · 18 Min
            </div>
          </div>

          <div className="w-full lg:w-1/2 space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#9AE6B4] font-semibold">
              Original Documentary Series
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
              Aaj Ka Devta (The Living Deity)
            </h2>
            <p className="text-sm text-[#D1E0D7] leading-relaxed">
              In Himalayan folklore, the gods dwell in high snows and stone sanctums. But <em>Aaj Ka Devta</em> turns the camera toward the living human beings whose daily, selfless labor sustains the mountains: the village elder who rebuilds footpaths after every monsoon, the herbal healer who treats travelers without asking for coins, the teacher who hikes two valleys to reach a single-room school.
            </p>
            <blockquote className="border-l border-[#9AE6B4] pl-4 italic font-serif text-sm text-[#9AE6B4]">
              “A devta is not just in stone temples; a devta is anyone who gives life to others without demanding applause.”
            </blockquote>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setActiveStory(MEDIA_STORIES[0])}
                className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider bg-white text-[#0F2E22] hover:bg-[#F3F7F5] transition-colors"
              >
                Watch Episode Details
              </button>
              <a
                href={BRAND_INFO.socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider bg-[#FF0000] text-white hover:bg-[#CC0000] transition-colors inline-flex items-center gap-1.5"
              >
                <Youtube size={14} />
                <span>Watch on YouTube</span>
              </a>
              <span className="text-xs text-[#A3B8AD]">Premiered October 2026</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Controls & Story Gallery */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Functional interactive category filters */}
        <div className="flex flex-wrap items-center gap-2 border-b border-[#E8E2D9] pb-4">
          <span className="text-xs uppercase tracking-widest text-[#645E59] font-medium mr-2">
            Filter Genre:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-none transition-colors capitalize ${
                filter === cat
                  ? 'bg-[#163E2E] text-white shadow-sm'
                  : 'bg-white text-[#645E59] hover:bg-[#F5EFEB] hover:text-[#163E2E] border border-[#E8E2D9]'
              }`}
            >
              {cat === 'all' ? 'All Stories' : cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStories.map((story) => (
            <div
              key={story.id}
              onClick={() => setActiveStory(story)}
              className="bg-white border border-[#E8E2D9] overflow-hidden group cursor-pointer hover:border-[#163E2E] transition-all flex flex-col justify-between shadow-sm"
            >
              <div>
                <div className="aspect-video w-full overflow-hidden relative">
                  <img
                    src={story.thumbnail}
                    alt={story.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute top-3 left-3 bg-[#163E2E] text-white text-[10px] uppercase font-bold tracking-widest px-2 py-0.5">
                    {story.category}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/75 text-white text-[11px] px-2 py-0.5">
                    {story.duration}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-[#163E2E] text-white flex items-center justify-center shadow-md">
                      <Play size={18} className="ml-0.5" />
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-2">
                  <span className="text-[11px] text-[#8C827A] uppercase tracking-wider block">
                    {story.releaseDate}
                  </span>
                  <h3 className="text-xl font-serif font-bold text-[#163E2E] group-hover:underline">
                    {story.title}
                  </h3>
                  <p className="text-xs text-[#5A544E] leading-relaxed line-clamp-2">
                    {story.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-[#F5EFEB] mt-4 flex items-center justify-between text-xs text-[#645E59]">
                <span>View Story Synopsis</span>
                <ArrowRight size={13} className="text-[#163E2E]" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Media Philosophy Note */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F5EFEB] border border-[#E8E2D9] p-8 space-y-4 text-center">
          <h3 className="text-2xl font-serif font-bold text-[#163E2E]">
            Why We Document Publicly
          </h3>
          <p className="text-sm text-[#4A453F] leading-relaxed max-w-2xl mx-auto">
            Storytelling is not marketing for Uttarkunth; it is public education and cultural preservation. By recording our daily experiments, building logs, and village wisdom, we create an open archive that young people anywhere in India can study and emulate.
          </p>
        </div>
      </div>

      {/* Navigation Call to Action */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#E8E2D9]">
        <button
          onClick={() => onNavigate('vision')}
          className="text-xs font-semibold uppercase tracking-widest text-[#163E2E] hover:underline"
        >
          Next: Long-Term Vision & Road Ahead →
        </button>
        <button
          onClick={() => onNavigate('join')}
          className="px-6 py-3 text-xs font-semibold uppercase tracking-widest bg-[#163E2E] text-white hover:bg-[#0F2E22]"
        >
          Join as a Creative Collaborator
        </button>
      </div>

      {/* Story Detail Modal */}
      {activeStory && (
        <StoryModal
          story={activeStory}
          onClose={() => setActiveStory(null)}
          onNavigate={onNavigate}
        />
      )}
    </div>
  );
};
