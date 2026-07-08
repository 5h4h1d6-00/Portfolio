import React, { useState } from "react";
import { Mail, Github, Linkedin, Instagram, Copy, Check, Send, Sparkles, MessageSquare } from "lucide-react";
import { PERSONAL_INFO } from "../data";

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    
    setIsSubmitting(true);
    
    // Simulate real high-fidelity submission pipeline
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormState({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const socials = [
    {
      name: "GitHub",
      url: PERSONAL_INFO.github,
      icon: Github,
      glow: "hover:bg-slate-800 hover:text-white hover:border-white/40 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]",
      desc: "Source repositories"
    },
    {
      name: "LinkedIn",
      url: PERSONAL_INFO.linkedin,
      icon: Linkedin,
      glow: "hover:bg-blue-600/15 hover:text-blue-400 hover:border-blue-500/40 hover:shadow-[0_0_20px_rgba(37,99,235,0.25)]",
      desc: "Professional network"
    },
    {
      name: "Instagram",
      url: PERSONAL_INFO.instagram,
      icon: Instagram,
      glow: "hover:bg-pink-600/15 hover:text-pink-400 hover:border-pink-500/40 hover:shadow-[0_0_20px_rgba(219,39,119,0.25)]",
      desc: "Social connections"
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8" id="contact-wrapper">
      {/* Contact Channels Panel */}
      <div className="lg:col-span-2 space-y-6 flex flex-col justify-between">
        <div className="space-y-6">
          <div className="space-y-2">
            <h4 className="text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-sky-400" />
              Let's craft something amazing
            </h4>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Whether you are looking to hire, discuss an open-source collaboration, or simply say hello, my inbox is always open!
            </p>
          </div>

          {/* Quick Copy Email Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-950/80 to-slate-900/40 border border-white/5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block">Direct Email</span>
                <span className="text-sm font-bold text-white font-mono break-all">{PERSONAL_INFO.email}</span>
              </div>
            </div>

            <button
              onClick={handleCopyEmail}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border transition-all duration-300 cursor-pointer ${
                copied
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
                  : "bg-slate-900 hover:bg-slate-800 border-white/10 hover:border-white/20 text-white"
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 animate-scale" />
                  Address Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy Email Address
                </>
              )}
            </button>
          </div>
        </div>

        {/* Brand-glowing social tiles */}
        <div className="space-y-3 pt-6 border-t border-white/5 lg:border-t-0 lg:pt-0">
          <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block">Digital Footprints</span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-4 rounded-xl bg-slate-950/40 border border-white/5 text-slate-400 transition-all duration-300 flex flex-col items-center text-center gap-1 cursor-pointer ${social.glow}`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs font-bold text-white mt-1">{social.name}</span>
                  <span className="text-[9px] text-slate-500 font-medium">{social.desc}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modern Feedback Submission Form */}
      <div className="lg:col-span-3 p-6 sm:p-8 rounded-2xl bg-slate-950/40 border border-white/5">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="name-input" className="text-xs font-semibold text-slate-400">Your Name *</label>
              <input
                id="name-input"
                type="text"
                name="name"
                required
                value={formState.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-900 border border-white/5 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-sky-500/40"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="email-input" className="text-xs font-semibold text-slate-400">Your Email *</label>
              <input
                id="email-input"
                type="email"
                name="email"
                required
                value={formState.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-900 border border-white/5 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-sky-500/40"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="subject-input" className="text-xs font-semibold text-slate-400">Subject</label>
            <input
              id="subject-input"
              type="text"
              name="subject"
              value={formState.subject}
              onChange={handleChange}
              placeholder="Collaboration Opportunity"
              className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-900 border border-white/5 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-sky-500/40"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="message-input" className="text-xs font-semibold text-slate-400">Your Message *</label>
            <textarea
              id="message-input"
              name="message"
              required
              rows={4}
              value={formState.message}
              onChange={handleChange}
              placeholder="Tell me about your project, timeline, or inquiries..."
              className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-900 border border-white/5 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-sky-500/40 resize-none"
            />
          </div>

          {/* Alert messages */}
          {submitted && (
            <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm flex items-center gap-2 animate-in fade-in duration-300">
              <MessageSquare className="w-5 h-5 shrink-0" />
              <span>Thank you! Your message was sent successfully. Shahid Saleem will connect with you soon.</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting || !formState.name || !formState.email || !formState.message}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:opacity-95 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_25px_rgba(14,165,233,0.45)] transition-all duration-300 disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Transmitting Message...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Transmit Message
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
