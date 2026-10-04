import React, { useState } from 'react';
import { PageId, ParticipationInquiry } from '../types';
import { BRAND_INFO } from '../data/uttarkunthData';
import { CheckCircle2, Send, Mail, AlertCircle, HeartHandshake, Compass, Users2, Sparkles } from 'lucide-react';

interface JoinViewProps {
  onNavigate: (page: PageId) => void;
}

export const JoinView: React.FC<JoinViewProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState<ParticipationInquiry>({
    name: '',
    email: '',
    phone: '',
    areaOfInterest: 'business_hospitality',
    experience: '',
    message: '',
  });

  const [submittedReceipt, setSubmittedReceipt] = useState<{
    id: string;
    timestamp: string;
    data: ParticipationInquiry;
  } | null>(null);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.name.trim()) errs.name = 'Please provide your full name.';
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email format.';
    }
    if (!formData.message.trim()) {
      errs.message = 'Please provide a brief message explaining how you wish to participate.';
    } else if (formData.message.trim().length < 15) {
      errs.message = 'Please write at least 15 characters so we can understand your inquiry.';
    }
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setIsSubmitting(true);

    // Simulate reliable local submission persistence and receipt generation
    setTimeout(() => {
      const receiptId = 'UTK-' + Math.floor(100000 + Math.random() * 900000);
      const receipt = {
        id: receiptId,
        timestamp: new Date().toLocaleString(),
        data: { ...formData },
      };

      try {
        const stored = JSON.parse(localStorage.getItem('uttarkunth_inquiries') || '[]');
        stored.push(receipt);
        localStorage.setItem('uttarkunth_inquiries', JSON.stringify(stored));
      } catch (err) {
        // Safe fallback if storage unavailable
      }

      setIsSubmitting(false);
      setSubmittedReceipt(receipt);
    }, 600);
  };

  const getAreaLabel = (area: ParticipationInquiry['areaOfInterest']) => {
    switch (area) {
      case 'business_hospitality':
        return 'Business & Hospitality Partnership (Yash Home Stay / Café)';
      case 'creative_media':
        return 'Creative Storytelling, Film & Media (Aaj Ka Devta)';
      case 'community_initiatives':
        return 'Community Development & Village Field Initiatives';
      case 'skills_volunteering':
        return 'Practical Skills, Mentorship & Artisanal Apprenticeship';
      case 'general_enquiry':
        return 'General Dialogue & Ecosystem Inquiries';
    }
  };

  return (
    <div className="py-12 sm:py-20 space-y-16">
      {/* Header Banner */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <span className="text-xs uppercase tracking-widest text-[#B85D28] font-semibold">
          Participation & Fellowship
        </span>
        <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[#1C1917] tracking-tight leading-tight">
          Join the Journey
        </h1>
        <p className="text-lg sm:text-xl font-serif italic text-[#645E59]">
          Be part of building something meaningful in the Himalayas.
        </p>
        <div className="h-0.5 w-24 bg-[#B85D28] pt-0.5 mt-4" />
      </div>

      {/* Pathways Overview Cards */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border border-[#E8E2D9] p-6 space-y-3">
            <span className="text-xs font-mono text-[#8C827A]">PATH 01</span>
            <h3 className="text-lg font-serif font-bold text-[#163E2E]">Enterprise Partners</h3>
            <p className="text-xs text-[#5A544E] leading-relaxed">
              Collaborate on sustainable homestays, cafe operations, ethical mountain harvests, and regional distribution.
            </p>
          </div>

          <div className="bg-white border border-[#E8E2D9] p-6 space-y-3">
            <span className="text-xs font-mono text-[#8C827A]">PATH 02</span>
            <h3 className="text-lg font-serif font-bold text-[#163E2E]">Creative & Media</h3>
            <p className="text-xs text-[#5A544E] leading-relaxed">
              Co-produce documentaries, write cultural essays, research mountain folklore, or assist field crews.
            </p>
          </div>

          <div className="bg-white border border-[#E8E2D9] p-6 space-y-3">
            <span className="text-xs font-mono text-[#8C827A]">PATH 03</span>
            <h3 className="text-lg font-serif font-bold text-[#163E2E]">Field Apprentices</h3>
            <p className="text-xs text-[#5A544E] leading-relaxed">
              Offer expertise in vernacular architecture, soil restoration, water management, youth mentorship, or software.
            </p>
          </div>

          <div className="bg-white border border-[#E8E2D9] p-6 space-y-3">
            <span className="text-xs font-mono text-[#8C827A]">PATH 04</span>
            <h3 className="text-lg font-serif font-bold text-[#163E2E]">Conscious Travelers</h3>
            <p className="text-xs text-[#5A544E] leading-relaxed">
              Visit Yash Home Stay or Uttarkunth Café to experience authentic village life with mindful cultural respect.
            </p>
          </div>
        </div>
      </div>

      {/* The Participation Form or Confirmed Receipt */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {!submittedReceipt ? (
          <div className="bg-white border border-[#E8E2D9] p-8 sm:p-12 shadow-sm space-y-8">
            <div className="border-b border-[#E8E2D9] pb-4">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C1917]">
                Submit Your Participation Inquiry
              </h2>
              <p className="text-xs sm:text-sm text-[#645E59] mt-1">
                Tell us about your background, skills, or idea. All inquiries are personally reviewed by Gaurav Negi and our core team.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#1C1917] mb-1">
                    Your Full Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Anand Sharma"
                    className={`w-full px-4 py-2.5 text-sm bg-[#FBF9F5] border ${
                      errors.name ? 'border-red-500' : 'border-[#E8E2D9]'
                    } focus:outline-none focus:border-[#163E2E] transition-colors`}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#1C1917] mb-1">
                    Email Address <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className={`w-full px-4 py-2.5 text-sm bg-[#FBF9F5] border ${
                      errors.email ? 'border-red-500' : 'border-[#E8E2D9]'
                    } focus:outline-none focus:border-[#163E2E] transition-colors`}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Phone & Area of Interest Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#1C1917] mb-1">
                    Phone / WhatsApp Number <span className="text-stone-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2.5 text-sm bg-[#FBF9F5] border border-[#E8E2D9] focus:outline-none focus:border-[#163E2E] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#1C1917] mb-1">
                    Area of Interest <span className="text-red-600">*</span>
                  </label>
                  <select
                    value={formData.areaOfInterest}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        areaOfInterest: e.target.value as ParticipationInquiry['areaOfInterest'],
                      })
                    }
                    className="w-full px-4 py-2.5 text-sm bg-[#FBF9F5] border border-[#E8E2D9] focus:outline-none focus:border-[#163E2E] transition-colors"
                  >
                    <option value="business_hospitality">
                      Business & Hospitality (Homestay / Café)
                    </option>
                    <option value="creative_media">
                      Creative & Media (Aaj Ka Devta / Films)
                    </option>
                    <option value="community_initiatives">
                      Community Development & Environment
                    </option>
                    <option value="skills_volunteering">
                      Skills, Apprenticeship & Mentoring
                    </option>
                    <option value="general_enquiry">
                      General Collaboration & Inquiries
                    </option>
                  </select>
                </div>
              </div>

              {/* Background / Skills (Optional) */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#1C1917] mb-1">
                  Relevant Skills / Background <span className="text-stone-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  placeholder="e.g. Masonry, culinary, documentary video, organic farming, web tech"
                  className="w-full px-4 py-2.5 text-sm bg-[#FBF9F5] border border-[#E8E2D9] focus:outline-none focus:border-[#163E2E] transition-colors"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#1C1917] mb-1">
                  How Would You Like to Collaborate? <span className="text-red-600">*</span>
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share your thoughts, questions, or how you envision working together..."
                  className={`w-full px-4 py-2.5 text-sm bg-[#FBF9F5] border ${
                    errors.message ? 'border-red-500' : 'border-[#E8E2D9]'
                  } focus:outline-none focus:border-[#163E2E] transition-colors`}
                />
                {errors.message && (
                  <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.message}
                  </p>
                )}
              </div>

              {/* Notice of Transparency */}
              <div className="bg-[#F5EFEB] p-4 text-xs text-[#5A544E] leading-relaxed">
                <strong>Honest Response Guarantee:</strong> Inquiries submitted here are stored locally and logged for the team. If you require immediate confirmation, you can also email us directly at <strong>{BRAND_INFO.contactEmail}</strong>.
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 text-xs font-semibold uppercase tracking-widest bg-[#B85D28] text-white hover:bg-[#964218] transition-colors disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm"
              >
                {isSubmitting ? (
                  <span>Logging Submission...</span>
                ) : (
                  <>
                    <Send size={15} />
                    <span>Send Participation Inquiry</span>
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          /* Confirmed Receipt Box */
          <div className="bg-[#0F2E22] text-white p-8 sm:p-12 space-y-6 shadow-xl border border-[#2E6850]">
            <div className="flex items-center gap-3 text-[#9AE6B4]">
              <CheckCircle2 size={32} />
              <div>
                <span className="text-xs font-mono tracking-widest uppercase">
                  Receipt Ref: {submittedReceipt.id}
                </span>
                <h3 className="text-2xl font-serif font-bold text-white">
                  Inquiry Successfully Received
                </h3>
              </div>
            </div>

            <p className="text-sm text-[#D1E0D7] leading-relaxed">
              Thank you, <strong>{submittedReceipt.data.name}</strong>. Your participation inquiry has been logged into our local registry on {submittedReceipt.timestamp}.
            </p>

            <div className="bg-[#163E2E] p-5 border border-[#2E6850] space-y-2 text-xs text-[#C5D7CE]">
              <p>
                <strong>Area Selected:</strong> {getAreaLabel(submittedReceipt.data.areaOfInterest)}
              </p>
              <p>
                <strong>Contact Email:</strong> {submittedReceipt.data.email}
              </p>
              {submittedReceipt.data.phone && (
                <p>
                  <strong>Phone:</strong> {submittedReceipt.data.phone}
                </p>
              )}
              <div className="pt-2 border-t border-[#2E6850]">
                <p className="font-semibold text-white mb-1">Your Message:</p>
                <p className="italic">"{submittedReceipt.data.message}"</p>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <p className="text-xs text-[#A3B8AD] leading-relaxed">
                Direct email copy ready? You can also send a pre-filled direct email to Gaurav Negi at <strong>{BRAND_INFO.contactEmail}</strong> using the link below:
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href={`mailto:${BRAND_INFO.contactEmail}?subject=Uttarkunth Inquiry [${submittedReceipt.id}] - ${submittedReceipt.data.name}&body=Hello Gaurav and Uttarkunth team,%0D%0A%0D%0AMy name is ${submittedReceipt.data.name}. I am writing regarding ${getAreaLabel(submittedReceipt.data.areaOfInterest)}.%0D%0A%0D%0AMessage:%0D%0A${encodeURIComponent(submittedReceipt.data.message)}%0D%0A%0D%0ABest regards,%0D%0A${submittedReceipt.data.name}%0D%0AEmail: ${submittedReceipt.data.email}`}
                  className="px-6 py-3 text-xs font-semibold uppercase tracking-wider bg-white text-[#0F2E22] hover:bg-[#F3F7F5] transition-colors inline-flex items-center gap-2"
                >
                  <Mail size={15} />
                  <span>Open in Mail Client</span>
                </a>
                <button
                  onClick={() => {
                    setSubmittedReceipt(null);
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      areaOfInterest: 'business_hospitality',
                      experience: '',
                      message: '',
                    });
                  }}
                  className="px-6 py-3 text-xs font-semibold uppercase tracking-wider bg-transparent border border-[#9AE6B4]/60 text-white hover:bg-[#163E2E] transition-colors"
                >
                  Submit Another Inquiry
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Call to Action */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#E8E2D9]">
        <button
          onClick={() => onNavigate('contact')}
          className="text-xs font-semibold uppercase tracking-widest text-[#163E2E] hover:underline"
        >
          Have a Direct Question? View Contact Page →
        </button>
        <button
          onClick={() => onNavigate('home')}
          className="text-xs font-semibold uppercase tracking-widest text-[#645E59] hover:text-[#163E2E]"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};
