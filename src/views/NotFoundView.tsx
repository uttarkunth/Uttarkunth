import React from 'react';
import { PageId } from '../types';
import { Compass, ArrowRight } from 'lucide-react';

interface NotFoundProps {
  onNavigate: (page: PageId) => void;
}

export const NotFoundView: React.FC<NotFoundProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center py-20 px-4">
      <div className="max-w-md w-full bg-white border border-[#E8E2D9] p-8 sm:p-10 text-center space-y-6 shadow-sm">
        <div className="w-16 h-16 bg-[#F5EFEB] text-[#163E2E] flex items-center justify-center mx-auto rounded-full">
          <Compass size={32} />
        </div>
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase text-[#8C827A]">
            Path Uncharted · 404
          </span>
          <h2 className="text-3xl font-serif font-bold text-[#1C1917]">
            Trail Leads Into the Mist
          </h2>
          <p className="text-sm text-[#5A544E] leading-relaxed">
            The page or mountain trail you are seeking does not exist or has been shifted in our evolving ecosystem.
          </p>
        </div>

        <div className="pt-2 flex flex-col gap-3">
          <button
            onClick={() => onNavigate('home')}
            className="w-full py-3 text-xs font-semibold uppercase tracking-widest bg-[#163E2E] text-white hover:bg-[#0F2E22] transition-colors flex items-center justify-center gap-2"
          >
            <span>Return to Home Sanctuary</span>
            <ArrowRight size={14} />
          </button>
          <button
            onClick={() => onNavigate('ventures')}
            className="w-full py-2.5 text-xs font-semibold uppercase tracking-wider text-[#163E2E] hover:underline"
          >
            Explore Active Ventures
          </button>
        </div>
      </div>
    </div>
  );
};
