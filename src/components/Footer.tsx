import React, { useState } from 'react';
import { PageId } from '../types';
import { BRAND_INFO } from '../data/uttarkunthData';
import { ArrowUpRight, Mail, Compass, ShieldCheck, FileText, HeartHandshake, X, Youtube, Instagram } from 'lucide-react';
import { UttarkunthLogo } from './UttarkunthLogo';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | 'ethics' | null>(null);

  const handleNav = (id: PageId) => {
    onNavigate(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#11241C] text-[#E8E2D9] border-t border-[#1F3D30] pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#214738]">
          {/* Column 1 & 2: Brand Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="space-y-2">
              <UttarkunthLogo variant="horizontal" size="md" theme="dark" />
              <p className="text-xs font-serif italic text-[#C8D6CE] pt-1">
                {BRAND_INFO.brandline}
              </p>
            </div>
            <p className="text-sm text-[#C8D6CE] leading-relaxed max-w-md pt-1">
              A Himalayan-born entrepreneurial ecosystem built around the belief that people working
              together can become a powerful force for community development.
            </p>
            <div className="pt-2">
              <p className="text-xs uppercase tracking-widest text-[#859E92] font-semibold">
                Motto
              </p>
              <p className="text-base font-serif text-white font-medium">
                {BRAND_INFO.motto}
              </p>
            </div>
            <div className="pt-2">
              <p className="text-xs uppercase tracking-widest text-[#859E92] font-semibold">
                Founder
              </p>
              <p className="text-sm text-stone-200">
                {BRAND_INFO.founder}
              </p>
            </div>
          </div>

          {/* Column 3: Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#859E92] font-semibold">
              Explore
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-white transition-colors text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('story')}
                  className="hover:text-white transition-colors text-left"
                >
                  Our Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('philosophy')}
                  className="hover:text-white transition-colors text-left"
                >
                  Our Philosophy
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('ecosystem')}
                  className="hover:text-white transition-colors text-left"
                >
                  Our Ecosystem
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('ventures')}
                  className="hover:text-white transition-colors text-left"
                >
                  Our Ventures
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('community')}
                  className="hover:text-white transition-colors text-left"
                >
                  Community Development
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Media & Pathways */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#859E92] font-semibold">
              Participate
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => handleNav('media')}
                  className="hover:text-white transition-colors text-left"
                >
                  Stories & Media
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('vision')}
                  className="hover:text-white transition-colors text-left"
                >
                  Future Vision
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('founder')}
                  className="hover:text-white transition-colors text-left"
                >
                  Founder’s Note
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('join')}
                  className="hover:text-white transition-colors text-left text-[#68D391] font-medium"
                >
                  Join the Journey
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-white transition-colors text-left"
                >
                  Contact & Inquiries
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: Verified Contact & Channels */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#859E92] font-semibold">
              Verified Contact
            </h4>
            <p className="text-xs text-[#A3B8AD] leading-relaxed">
              We welcome dialogue with entrepreneurs, local community members, and thoughtful collaborators.
            </p>
            <a
              href={`mailto:${BRAND_INFO.contactEmail}`}
              className="inline-flex items-center gap-2 text-sm text-white hover:text-[#68D391] transition-colors py-1 group"
            >
              <Mail size={16} className="text-[#859E92] group-hover:text-[#68D391]" />
              <span className="break-all">{BRAND_INFO.contactEmail}</span>
            </a>
            
            <div className="pt-2 space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#859E92] font-semibold block">
                Official Channels
              </span>
              <div className="flex flex-col gap-1.5 text-xs">
                <a
                  href={BRAND_INFO.socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#D1E0D7] hover:text-[#68D391] transition-colors py-0.5"
                >
                  <Youtube size={15} className="text-[#FF4444]" />
                  <span>@UttarkunthLivingUniversity</span>
                </a>
                <a
                  href={BRAND_INFO.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#D1E0D7] hover:text-[#68D391] transition-colors py-0.5"
                >
                  <Instagram size={15} className="text-[#E1306C]" />
                  <span>@uttarkunth</span>
                </a>
              </div>
            </div>

            <div className="pt-2">
              <span className="text-xs text-[#7A9386] block">
                Address: Jari, Kullu, Himachal Pradesh 175105, India
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#859E92] gap-4">
          <p>
            © {new Date().getFullYear()} Uttarkunth. All rights reserved. Built through people.
          </p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => setActiveModal('ethics')}
              className="hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              Guiding Framework & Ethics
            </button>
            <button
              onClick={() => setActiveModal('privacy')}
              className="hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              Privacy Practice
            </button>
            <button
              onClick={() => setActiveModal('terms')}
              className="hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              Operational Terms
            </button>
          </div>
        </div>
      </div>

      {/* Policy / Framework Modals */}
      {activeModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FBF9F5] text-[#1C1917] max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 rounded-none border border-[#163E2E] shadow-2xl relative">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 p-2 text-[#645E59] hover:text-[#163E2E] hover:bg-[#E8E2D9]/40 rounded-full transition-colors"
              aria-label="Close dialog"
            >
              <X size={20} />
            </button>

            {activeModal === 'ethics' && (
              <div className="space-y-4">
                <span className="text-xs uppercase tracking-widest font-semibold text-[#163E2E]">
                  Uttarkunth Governance
                </span>
                <h3 className="text-2xl font-serif font-bold text-[#163E2E]">
                  Guiding Framework & Ethics
                </h3>
                <div className="text-sm text-[#4A453F] space-y-3 leading-relaxed">
                  <p>
                    Uttarkunth operates on the principle that business must be an ethical instrument for community empowerment rather than unconstrained extraction.
                  </p>
                  <p>
                    <strong>Financial Sustainability:</strong> We are a for-profit entrepreneurial ecosystem, not an NGO. We sustain our work through genuine commercial value creation in hospitality, dining, media, and regional products.
                  </p>
                  <p>
                    <strong>Community Participation:</strong> We reject passive dependency models. Initiatives in the village are executed with local consensus, shared responsibility, and practical skills development.
                  </p>
                  <p>
                    <strong>The 10% Guiding Principle:</strong> Our vision includes voluntarily designating approximately 10% of operational surplus to village initiatives as business capacity permits. This is an aspirational internal operating principle, not an open public charity subscription.
                  </p>
                </div>
              </div>
            )}

            {activeModal === 'privacy' && (
              <div className="space-y-4">
                <span className="text-xs uppercase tracking-widest font-semibold text-[#163E2E]">
                  Transparent Handling
                </span>
                <h3 className="text-2xl font-serif font-bold text-[#163E2E]">
                  Privacy Practice
                </h3>
                <div className="text-sm text-[#4A453F] space-y-3 leading-relaxed">
                  <p>
                    Uttarkunth respects your privacy. When you submit inquiries through our Join the Journey or Contact forms, your details (name, email, phone, message) are utilized exclusively to review collaboration, discuss partnerships, or answer inquiries.
                  </p>
                  <p>
                    We never sell, rent, or trade personal data. We do not run invasive behavioral tracking or surveillance analytics.
                  </p>
                  <p>
                    You can request deletion or inspection of any information submitted at any time by emailing us directly at <strong>{BRAND_INFO.contactEmail}</strong>.
                  </p>
                </div>
              </div>
            )}

            {activeModal === 'terms' && (
              <div className="space-y-4">
                <span className="text-xs uppercase tracking-widest font-semibold text-[#163E2E]">
                  Operational Principles
                </span>
                <h3 className="text-2xl font-serif font-bold text-[#163E2E]">
                  Operational Terms & Transparency
                </h3>
                <div className="text-sm text-[#4A453F] space-y-3 leading-relaxed">
                  <p>
                    <strong>Accurate Brand Representation:</strong> The brand is spelled <em>Uttarkunth</em>. All statements regarding ventures and community programs distinguish between current operating entities (Yash Home Stay, Uttarkunth Café, Media & Storytelling) and planned exploratory horizons.
                  </p>
                  <p>
                    <strong>No Unverified Claims:</strong> Uttarkunth does not claim unverified impact metrics or institutional endorsements. We document our journey openly as it unfolds on the ground.
                  </p>
                  <p>
                    <strong>Community Respect:</strong> Visitors and guests participating in Uttarkunth activities are expected to respect local village sensibilities, mountain ecology, and water conservation practices.
                  </p>
                </div>
              </div>
            )}

            <div className="pt-6 border-t border-[#E8E2D9] flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="px-5 py-2 text-xs font-semibold uppercase tracking-wider bg-[#163E2E] text-white hover:bg-[#0F2E22] transition-colors"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
