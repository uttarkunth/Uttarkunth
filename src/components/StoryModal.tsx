import React, { useState } from 'react';
import { MediaStory, PageId } from '../types';
import { X, Play, Clock, Share2, Check, Youtube } from 'lucide-react';
import { BRAND_INFO } from '../data/uttarkunthData';

interface StoryModalProps {
  story: MediaStory | null;
  onClose: () => void;
  onNavigate: (page: PageId) => void;
}

export const StoryModal: React.FC<StoryModalProps> = ({ story, onClose, onNavigate }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!story) return null;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#FBF9F5] border border-[#163E2E] max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-[#645E59] hover:text-[#163E2E] bg-white/80 hover:bg-white rounded-full transition-colors"
          aria-label="Close story"
        >
          <X size={20} />
        </button>

        {/* Video simulation / poster screen */}
        <div className="relative w-full aspect-video bg-black overflow-hidden group">
          {!isPlaying ? (
            <>
              <img
                src={story.thumbnail}
                alt={story.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-85 group-hover:opacity-95 transition-opacity"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <button
                  onClick={() => setIsPlaying(true)}
                  className="w-16 h-16 rounded-full bg-[#163E2E] text-white flex items-center justify-center shadow-xl hover:scale-105 transition-transform"
                  aria-label="Play video excerpt"
                >
                  <Play size={24} className="ml-1" />
                </button>
                <span className="text-white text-xs font-semibold uppercase tracking-widest mt-3 drop-shadow">
                  Watch Documentary Excerpt
                </span>
              </div>
            </>
          ) : (
            <div className="w-full h-full bg-[#0D271D] p-6 text-white flex flex-col items-center justify-center text-center space-y-4">
              <span className="text-xs uppercase tracking-widest text-[#9AE6B4]">
                Uttarkunth Media Production
              </span>
              <h4 className="text-xl sm:text-2xl font-serif font-bold max-w-lg">
                {story.title}
              </h4>
              <p className="text-xs text-[#C5D7CE] max-w-md">
                This documentary piece is being produced and archived as part of the official Uttarkunth storytelling project. Full digital broadcast streams via our community media channels.
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={BRAND_INFO.socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-xs font-semibold uppercase bg-[#FF0000] text-white hover:bg-[#CC0000] transition-colors inline-flex items-center gap-1.5"
                >
                  <Youtube size={14} />
                  <span>Watch on YouTube</span>
                </a>
                <button
                  onClick={() => setIsPlaying(false)}
                  className="text-xs text-white/70 hover:text-white underline underline-offset-4 px-2"
                >
                  Back to Poster
                </button>
                <button
                  onClick={() => {
                    onClose();
                    onNavigate('contact');
                  }}
                  className="px-4 py-2 text-xs font-semibold uppercase bg-[#2C7156] text-white hover:bg-[#1F543F]"
                >
                  Contact Media Team
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Story details */}
        <div className="p-6 sm:p-8 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E8E2D9] pb-4">
            <div className="flex items-center gap-3 text-xs text-[#645E59]">
              <span className="font-semibold text-[#163E2E] uppercase tracking-wider">
                {story.category}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock size={13} />
                {story.duration}
              </span>
              <span>·</span>
              <span>{story.releaseDate}</span>
            </div>

            <button
              onClick={handleShare}
              className="text-xs text-[#645E59] hover:text-[#163E2E] flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check size={14} className="text-[#163E2E]" /> : <Share2 size={14} />}
              <span>{copied ? 'Link Copied' : 'Share Story'}</span>
            </button>
          </div>

          <h3 className="text-2xl font-serif font-bold text-[#1C1917]">
            {story.title}
          </h3>

          <p className="text-sm text-[#4A453F] leading-relaxed">
            {story.description}
          </p>

          {story.featuredQuote && (
            <div className="border-l-2 border-[#163E2E] pl-4 py-2 italic font-serif text-base text-[#163E2E] bg-[#F5EFEB]">
              {story.featuredQuote}
            </div>
          )}

          <div className="pt-4 border-t border-[#E8E2D9] flex items-center justify-between text-xs text-[#645E59]">
            <span>Filmed on location in Kullu Valley, Himachal Pradesh</span>
            <button
              onClick={() => {
                onClose();
                onNavigate('media');
              }}
              className="font-medium text-[#163E2E] hover:underline"
            >
              Browse All Stories & Media →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
