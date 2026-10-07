import React, { useState } from 'react';
import { PageId } from '../types';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { UttarkunthLogo } from './UttarkunthLogo';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'stays', label: 'Uttarkunth Stays' },
    { id: 'story', label: 'Our Story' },
    { id: 'philosophy', label: 'Philosophy' },
    { id: 'ecosystem', label: 'Ecosystem' },
    { id: 'ventures', label: 'Ventures' },
    { id: 'community', label: 'Community' },
    { id: 'media', label: 'Stories & Media' },
    { id: 'vision', label: 'Future Vision' },
    { id: 'founder', label: 'Founder' },
    { id: 'host-portal', label: 'Host Portal (0%)' },
    { id: 'my-trips', label: 'My Trips' },
    { id: 'contact', label: 'Contact' },
    { id: 'admin-portal', label: 'Admin Console' },
  ];

  const handleNav = (id: PageId) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FBF9F5]/95 backdrop-blur-md border-b border-[#E8E2D9] transition-all">
      {/* 3-Zone Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Zone 1: Official Logo Emblem & Wordmark */}
        <button
          onClick={() => handleNav('home')}
          className="text-left flex items-center hover:opacity-90 transition-opacity focus:outline-none py-1 shrink-0"
          aria-label="Uttarkunth Home"
        >
          <UttarkunthLogo variant="horizontal" size="sm" theme="light" />
        </button>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-7 text-sm font-medium text-[#645E59]">
          {navLinks.slice(0, 7).map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={`transition-colors py-1 relative whitespace-nowrap focus:outline-none ${
                currentPage === item.id
                  ? 'text-[#163E2E] font-bold'
                  : 'hover:text-[#B85D28]'
              }`}
            >
              {item.label}
              {currentPage === item.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B85D28] rounded-full" />
              )}
            </button>
          ))}

          {/* More Dropdown for Vision, Founder & Contact */}
          <div className="relative group">
            <button className="text-sm font-medium text-[#645E59] hover:text-[#B85D28] py-1 flex items-center gap-1 focus:outline-none">
              <span>More</span>
              <span className="text-xs">▾</span>
            </button>
            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-[#E8E2D9] rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
              {navLinks.slice(7).map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors block ${
                    currentPage === item.id
                      ? 'bg-[#FDF7F2] text-[#B85D28] font-semibold border-l-2 border-[#B85D28]'
                      : 'text-[#645E59] hover:bg-[#FBF9F5] hover:text-[#163E2E]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Zone 3: 1-2 primary actions (Responsive spacing, zero collision) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={() => handleNav('join')}
            className={`px-3 sm:px-5 py-2 sm:py-2.5 text-xs font-semibold tracking-wider uppercase transition-all duration-200 whitespace-nowrap rounded-none shadow-sm ${
              currentPage === 'join'
                ? 'bg-[#964218] text-white border border-[#7A3411]'
                : 'bg-[#B85D28] text-white hover:bg-[#964218] border border-[#B85D28]'
            }`}
          >
            <span className="hidden sm:inline">Join the Journey</span>
            <span className="sm:hidden">Join</span>
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 sm:p-2 text-[#163E2E] hover:bg-[#E8E2D9]/40 rounded-md focus:outline-none shrink-0"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FBF9F5] border-b border-[#E8E2D9] px-4 pt-3 pb-6 space-y-2">
          <div className="pb-3 border-b border-[#E8E2D9] mb-3 flex items-center justify-between">
            <span className="text-xs uppercase tracking-widest text-[#B85D28] font-bold">
              Navigation Menu
            </span>
            <span className="text-[10px] text-[#645E59] font-serif italic">
              Tapobhoomi Living
            </span>
          </div>
          {navLinks.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={`w-full text-left px-3 py-2 text-base transition-colors flex items-center justify-between rounded-md ${
                currentPage === item.id
                  ? 'bg-[#163E2E] text-white font-medium'
                  : 'text-[#1C1917] hover:bg-[#FDF7F2] hover:text-[#B85D28]'
              }`}
            >
              <span>{item.label}</span>
              <ArrowUpRight size={16} className={currentPage === item.id ? 'opacity-90' : 'opacity-40'} />
            </button>
          ))}
          <div className="pt-3 border-t border-[#E8E2D9] mt-3">
            <button
              onClick={() => handleNav('join')}
              className="w-full py-3 text-center text-sm font-semibold uppercase tracking-wider text-white bg-[#B85D28] hover:bg-[#964218] transition-colors shadow-sm"
            >
              Join the Journey
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
