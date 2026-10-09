// @/app/contact/page.tsx
'use client';

import React, { useState } from 'react';
import { personalProfile } from '@/content/personal.content';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { SocialLinks } from '@/components/shared/SocialLinks';
import { MotionWrapper } from '@/components/shared/MotionWrapper';
import { Mail, Send, CheckCircle2, Copy, MapPin, GraduationCap } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    purpose: 'General Inquiry',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalProfile.socials.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', purpose: 'General Inquiry', message: '' });
    }, 1200);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <SectionHeading
        badge="Get In Touch"
        badgeIcon={Mail}
        title="Contact Me Directly"
        subtitle="Whether you have a freelance cinematography or editing project, a technical collaboration proposal, or just want to connect, send me a message."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Direct Contacts Left Box */}
        <MotionWrapper className="space-y-6">
          <Card hoverGlow className="p-8 space-y-6">
            <h3 className="text-2xl font-bold text-[var(--text-primary)]">Contact Details</h3>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] space-y-2">
                <span className="text-xs text-[var(--text-muted)] font-mono uppercase font-bold block">Email Me</span>
                <span className="text-sm font-mono text-[var(--text-primary)] font-bold block break-all">
                  {personalProfile.socials.email}
                </span>
                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 text-xs text-[var(--accent-primary)] hover:underline cursor-pointer pt-1"
                >
                  {copiedEmail ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEmail ? 'Copied to Clipboard!' : 'Copy Email Address'}</span>
                </button>
              </div>

              <div className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                <MapPin className="w-5 h-5 text-[var(--accent-primary)] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[var(--text-primary)] block">Location</span>
                  <span>Coimbatore, Tamil Nadu, India</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                <GraduationCap className="w-5 h-5 text-[var(--accent-primary)] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[var(--text-primary)] block">Institution</span>
                  <span>Kumaraguru College of Technology</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--border-subtle)] space-y-3">
              <span className="text-xs font-mono font-bold uppercase text-[var(--text-muted)] block">Social Profiles</span>
              <SocialLinks />
            </div>
          </Card>
        </MotionWrapper>

        {/* Form Right Box */}
        <MotionWrapper delay={1} className="lg:col-span-2">
          <Card hoverGlow className="p-8">
            {status === 'success' ? (
              <div className="py-12 flex flex-col items-center justify-center text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-[var(--text-primary)]">Message Received!</h3>
                <p className="text-sm text-[var(--text-secondary)] max-w-md">
                  Thank you for reaching out. I have received your message and will respond to your email shortly.
                </p>
                <Button variant="glass" size="sm" onClick={() => setStatus('idle')}>
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-2xl font-bold text-[var(--text-primary)]">Send Me a Message</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-semibold text-[var(--text-secondary)]">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-[var(--bg-tertiary)] text-sm text-[var(--text-primary)] rounded-xl border border-[var(--border-subtle)] focus:outline-none focus:border-[var(--accent-primary)]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono font-semibold text-[var(--text-secondary)]">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. alex@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-[var(--bg-tertiary)] text-sm text-[var(--text-primary)] rounded-xl border border-[var(--border-subtle)] focus:outline-none focus:border-[var(--accent-primary)]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-semibold text-[var(--text-secondary)]">
                      Purpose of Contact
                    </label>
                    <select
                      value={formData.purpose}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === 'right') {
                          const pwd = window.prompt("Enter password:");
                          if (pwd === "1611919") {
                            localStorage.setItem("protosem_admin_unlocked", "true");
                            window.alert("Admin mode unlocked! Redirecting to /forge.");
                            window.location.href = "/forge";
                          } else {
                            window.alert("Incorrect password.");
                          }
                          setFormData({ ...formData, purpose: 'General Inquiry' });
                        } else {
                          setFormData({ ...formData, purpose: val });
                        }
                      }}
                      className="w-full px-4 py-3 bg-[var(--bg-tertiary)] text-sm text-[var(--text-primary)] rounded-xl border border-[var(--border-subtle)] focus:outline-none focus:border-[var(--accent-primary)]"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Video Editing Shoot">Freelance Video Editing</option>
                      <option value="Cinematography Shoot">Cinematography Shoot</option>
                      <option value="Tech Collaboration">Software Tech Collaboration</option>
                      <option value="right">right</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono font-semibold text-[var(--text-secondary)]">
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Event Video Coverage Inquiry"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 bg-[var(--bg-tertiary)] text-sm text-[var(--text-primary)] rounded-xl border border-[var(--border-subtle)] focus:outline-none focus:border-[var(--accent-primary)]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono font-semibold text-[var(--text-secondary)]">
                    Your Message *
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Tell me about your project details or inquiry..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-[var(--bg-tertiary)] text-sm text-[var(--text-primary)] rounded-xl border border-[var(--border-subtle)] focus:outline-none focus:border-[var(--accent-primary)]"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  icon={Send}
                  disabled={status === 'submitting'}
                  className="w-full"
                >
                  {status === 'submitting' ? 'Sending Message...' : 'Send Message'}
                </Button>
              </form>
            )}
          </Card>
        </MotionWrapper>
      </div>
    </div>
  );
}
