import React, { useState } from 'react';
import { PageId } from '../types';
import { BRAND_INFO } from '../data/uttarkunthData';
import { Mail, MapPin, Send, CheckCircle2, AlertCircle, Clock, ShieldCheck, HeartHandshake, Youtube, Instagram } from 'lucide-react';

interface ContactViewProps {
  onNavigate: (page: PageId) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!name.trim()) errs.name = 'Please provide your name.';
    if (!email.trim()) {
      errs.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Please provide a valid email format.';
    }
    if (!message.trim()) {
      errs.message = 'Please write your message.';
    } else if (message.trim().length < 10) {
      errs.message = 'Your message must be at least 10 characters long.';
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

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
    }, 600);
  };

  return (
    <div className="py-12 sm:py-20 space-y-16">
      {/* Header Banner */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <span className="text-xs uppercase tracking-widest text-[#B85D28] font-semibold">
          Dialogue & Contact
        </span>
        <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[#1C1917] tracking-tight leading-tight">
          Connect with Uttarkunth
        </h1>
        <p className="text-lg sm:text-xl font-serif italic text-[#645E59]">
          Direct channels for partners, travelers, villagers, and collaborators.
        </p>
        <div className="h-0.5 w-24 bg-[#B85D28] pt-0.5 mt-4" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Verified Contact Details Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-[#E8E2D9] p-6 sm:p-8 space-y-6 shadow-sm">
              <span className="text-xs uppercase tracking-widest text-[#163E2E] font-bold">
                Verified Information
              </span>

              <div className="space-y-4 text-sm text-[#4A453F]">
                <div className="flex items-start gap-3">
                  <Mail size={18} className="text-[#163E2E] mt-0.5 shrink-0" />
                  <div>
                    <span className="text-xs text-[#8C827A] uppercase font-semibold block">
                      Primary Inquiries & Correspondence
                    </span>
                    <a
                      href={`mailto:${BRAND_INFO.contactEmail}`}
                      className="text-base font-serif font-bold text-[#163E2E] hover:underline break-all"
                    >
                      {BRAND_INFO.contactEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-3 border-t border-[#F5EFEB]">
                  <MapPin size={18} className="text-[#163E2E] mt-0.5 shrink-0" />
                  <div>
                    <span className="text-xs text-[#8C827A] uppercase font-semibold block">
                      Address & Location
                    </span>
                    <p className="font-medium text-[#1C1917]">
                      Jari, Kullu, Himachal Pradesh 175105, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-3 border-t border-[#F5EFEB]">
                  <Clock size={18} className="text-[#163E2E] mt-0.5 shrink-0" />
                  <div>
                    <span className="text-xs text-[#8C827A] uppercase font-semibold block">
                      Response Cadence
                    </span>
                    <p className="text-xs text-[#5A544E]">
                      Because our team actively operates on mountain trails, in the kitchen, and on village builds, please allow 2–3 business days for thorough replies.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E8E2D9] space-y-2">
                <span className="text-xs uppercase tracking-widest text-[#163E2E] font-bold block">
                  Ground Presence
                </span>
                <p className="text-xs text-[#645E59] leading-relaxed">
                  We welcome pre-scheduled visits to <strong>Yash Home Stay</strong> and the developing <strong>Uttarkunth Café</strong> space in Jari, Kullu. Prior notice ensures someone is available to receive you with warmth.
                </p>
              </div>

              <div className="pt-4 border-t border-[#E8E2D9] space-y-2">
                <span className="text-xs uppercase tracking-widest text-[#163E2E] font-bold block">
                  Follow & Watch
                </span>
                <div className="flex flex-col gap-2 pt-1 text-xs">
                  <a
                    href={BRAND_INFO.socialLinks.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[#4A453F] hover:text-[#FF0000] transition-colors"
                  >
                    <Youtube size={16} className="text-[#FF0000]" />
                    <span className="font-medium">YouTube: @UttarkunthLivingUniversity</span>
                  </a>
                  <a
                    href={BRAND_INFO.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[#4A453F] hover:text-[#E1306C] transition-colors"
                  >
                    <Instagram size={16} className="text-[#E1306C]" />
                    <span className="font-medium">Instagram: @uttarkunth</span>
                  </a>
                  <a
                    href={BRAND_INFO.socialLinks.founderInstagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[#4A453F] hover:text-[#E1306C] transition-colors"
                  >
                    <Instagram size={16} className="text-[#E1306C]" />
                    <span className="font-medium">Founder's IG: @gaurav_negi_._</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-[#163E2E] text-white p-6 space-y-3">
              <span className="text-xs uppercase tracking-widest text-[#9AE6B4] font-semibold">
                Founder Contact
              </span>
              <p className="text-sm font-serif italic text-[#D1E0D7]">
                “Whether you have an idea for mountain agriculture, wish to apprentice with our stone masons, or want to discuss ethical tourism—our door is open.”
              </p>
              <span className="text-xs font-mono text-[#9AE6B4] block">— Gaurav Negi</span>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-[#E8E2D9] p-8 sm:p-10 shadow-sm space-y-6">
              {!isSent ? (
                <>
                  <div className="border-b border-[#E8E2D9] pb-4">
                    <h2 className="text-2xl font-serif font-bold text-[#1C1917]">
                      Send a Message
                    </h2>
                    <p className="text-xs text-[#645E59] mt-1">
                      Fill out the form below to reach Gaurav Negi and the Uttarkunth team.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold text-[#1C1917] mb-1">
                        Full Name <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your full name"
                        className={`w-full px-4 py-2.5 text-sm bg-[#FBF9F5] border ${
                          errors.name ? 'border-red-500' : 'border-[#E8E2D9]'
                        } focus:outline-none focus:border-[#163E2E]`}
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@domain.com"
                        className={`w-full px-4 py-2.5 text-sm bg-[#FBF9F5] border ${
                          errors.email ? 'border-red-500' : 'border-[#E8E2D9]'
                        } focus:outline-none focus:border-[#163E2E]`}
                      />
                      {errors.email && (
                        <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                          <AlertCircle size={12} /> {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold text-[#1C1917] mb-1">
                        Subject / Topic
                      </label>
                      <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="e.g. Yash Home Stay inquiry / Media collaboration"
                        className="w-full px-4 py-2.5 text-sm bg-[#FBF9F5] border border-[#E8E2D9] focus:outline-none focus:border-[#163E2E]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold text-[#1C1917] mb-1">
                        Your Message <span className="text-red-600">*</span>
                      </label>
                      <textarea
                        rows={5}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="How can we assist you?"
                        className={`w-full px-4 py-2.5 text-sm bg-[#FBF9F5] border ${
                          errors.message ? 'border-red-500' : 'border-[#E8E2D9]'
                        } focus:outline-none focus:border-[#163E2E]`}
                      />
                      {errors.message && (
                        <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                          <AlertCircle size={12} /> {errors.message}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 text-xs font-semibold uppercase tracking-widest bg-[#B85D28] text-white hover:bg-[#964218] transition-colors disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm"
                    >
                      {isSubmitting ? (
                        <span>Transmitting...</span>
                      ) : (
                        <>
                          <Send size={15} />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </form>
                </>
              ) : (
                <div className="py-8 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#163E2E] text-white flex items-center justify-center mx-auto">
                    <CheckCircle2 size={28} />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-[#163E2E]">
                    Message Transmitted
                  </h3>
                  <p className="text-sm text-[#4A453F] max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{name}</strong>. Your message has been logged. We will review your correspondence and respond to <strong>{email}</strong> shortly.
                  </p>
                  <div className="pt-4 flex justify-center gap-4">
                    <a
                      href={`mailto:${BRAND_INFO.contactEmail}?subject=${encodeURIComponent(subject || 'Uttarkunth Inquiry')}&body=${encodeURIComponent(message)}`}
                      className="px-5 py-2.5 text-xs font-semibold uppercase bg-[#163E2E] text-white hover:bg-[#0F2E22] transition-colors inline-flex items-center gap-2"
                    >
                      <Mail size={14} />
                      <span>Send Direct Email Copy</span>
                    </a>
                    <button
                      onClick={() => {
                        setIsSent(false);
                        setName('');
                        setEmail('');
                        setSubject('');
                        setMessage('');
                      }}
                      className="px-5 py-2.5 text-xs font-semibold uppercase border border-[#E8E2D9] text-[#1C1917] hover:bg-[#F5EFEB] transition-colors"
                    >
                      Compose Another
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
