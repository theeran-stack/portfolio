"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { contactData } from "@/content/contact";
import { Send, CheckCircle2, Mail, MapPin, Clock, FileText, ArrowUpRight, Github, Linkedin, Instagram, Sparkles } from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 4000);
  };

  const getSocialIcon = (iconName: string) => {
    switch (iconName) {
      case "Github": return <Github className="h-4 w-4 text-white" />;
      case "Linkedin": return <Linkedin className="h-4 w-4 text-white" />;
      case "Instagram": return <Instagram className="h-4 w-4 text-white" />;
      default: return <Mail className="h-4 w-4 text-white" />;
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16 py-8">
      
      {/* HEADER */}
      <section className="space-y-6 text-center max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: smoothEase }}
          className="inline-flex items-center gap-2 rounded-full glass-panel px-4 py-1.5 text-xs text-white border border-white/10"
        >
          <Mail className="h-3.5 w-3.5 text-neutral-300" />
          <span className="font-mono text-[11px] uppercase tracking-widest text-neutral-300 font-bold">GET IN TOUCH</span>
        </motion.div>

        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-white leading-tight">
          {contactData.headline}
        </h1>

        <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-sans">
          {contactData.description}
        </p>
      </section>

      {/* MAIN CONTACT LAYOUT */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Direct Info & Social Cards */}
        <div className="lg:col-span-5 space-y-8">
          
          <div className="glass-panel-elevated rounded-3xl p-8 border border-white/10 shadow-glass-md space-y-6">
            <h3 className="font-serif text-2xl font-bold text-white">Contact Information</h3>
            
            <div className="space-y-5 text-xs font-mono">
              <div className="flex items-start gap-3">
                <Mail className="h-4 w-4 text-white shrink-0 mt-1" />
                <div>
                  <span className="text-neutral-400 block text-[10px] uppercase">EMAIL ADDRESS</span>
                  <a href={`mailto:${contactData.email}`} className="text-sm font-bold text-white hover:underline">
                    {contactData.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-white shrink-0 mt-1" />
                <div>
                  <span className="text-neutral-400 block text-[10px] uppercase">LOCATION</span>
                  <span className="text-sm font-semibold text-white">{contactData.location}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-4 w-4 text-white shrink-0 mt-1" />
                <div>
                  <span className="text-neutral-400 block text-[10px] uppercase">AVAILABILITY</span>
                  <span className="text-xs font-semibold text-neutral-300">{contactData.availability}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <button
                disabled
                className="w-full flex items-center justify-center gap-2 rounded-full glass-panel px-6 py-3 text-xs font-mono text-neutral-400 border border-white/10 cursor-not-allowed opacity-70"
              >
                <FileText className="h-4 w-4 text-neutral-400" />
                <span>Resume: {contactData.resumeStatus}</span>
              </button>
            </div>
          </div>

          {/* Social Profiles */}
          <div className="glass-panel rounded-3xl p-6 border border-white/10 space-y-4">
            <h4 className="font-serif text-lg font-bold text-white">Socials & Links</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {contactData.socials.map((s) => (
                <a
                  key={s.platform}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-2xl glass-panel p-3 text-xs font-mono text-neutral-300 hover:text-white hover:border-white/25 transition-all border border-white/10"
                >
                  <div className="flex items-center gap-2">
                    {getSocialIcon(s.icon)}
                    <span className="font-semibold">{s.platform}</span>
                  </div>
                  {s.status ? (
                    <span className="text-[9px] bg-white/10 text-neutral-400 px-1.5 py-0.5 rounded">{s.status}</span>
                  ) : (
                    <ArrowUpRight className="h-3.5 w-3.5 text-neutral-500" />
                  )}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7 glass-panel-elevated rounded-3xl p-8 sm:p-12 border border-white/10 shadow-glass-lg relative">
          {formSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-16 text-center space-y-4"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-white border border-white/20">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-white">Message Sent</h3>
              <p className="text-xs font-mono text-neutral-300 max-w-md mx-auto">
                Thank you for reaching out! Your message has been sent. Response time: within 24 hours.
              </p>
              <button
                onClick={() => setFormSubmitted(false)}
                className="pt-4 text-xs font-mono font-bold text-white hover:underline"
              >
                Send Another Message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="font-serif text-2xl font-bold text-white">Contact Form</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono text-white font-bold">FULL NAME *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full rounded-xl glass-panel p-3.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white border border-white/15"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-white font-bold">EMAIL ADDRESS *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@example.com"
                    className="w-full rounded-xl glass-panel p-3.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white border border-white/15"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-white font-bold">SUBJECT *</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Software project, filmmaking, or general inquiry"
                  className="w-full rounded-xl glass-panel p-3.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white border border-white/15"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-white font-bold">MESSAGE *</label>
                <textarea
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Type your message here..."
                  className="w-full rounded-xl glass-panel p-3.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white border border-white/15 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-full bg-white py-4 text-xs font-mono font-bold text-black hover:bg-neutral-200 transition-all shadow-glass-sm"
              >
                <Send className="h-4 w-4 text-black" />
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>

      </section>

    </div>
  );
}
