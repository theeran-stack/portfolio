// @/components/layout/Footer.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { SocialLinks } from '@/components/shared/SocialLinks';
import { ArrowUp } from 'lucide-react';
import { siteConfig } from '@/config/site.config';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[var(--accent-primary)] text-white flex items-center justify-center font-bold">
                T
              </div>
              <span className="text-xl font-extrabold text-[var(--text-primary)] tracking-tight">
                Theeran P.
              </span>
            </div>
            <p className="text-sm leading-relaxed text-[var(--text-muted)] max-w-md">
              I build enterprise digital web systems and direct visual cinematography. Computer Science Engineering Student at Kumaraguru College of Technology (2024–2028).
            </p>
            <SocialLinks className="mt-2" />
          </div>

          {/* Sitemap Col 1 */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-primary)]">
              Core Hub
            </span>
            <Link href="/" className="text-sm hover:text-[var(--text-primary)] transition-colors">Home</Link>
            <Link href="/about" className="text-sm hover:text-[var(--text-primary)] transition-colors">About Me</Link>
            <Link href="/skills" className="text-sm hover:text-[var(--text-primary)] transition-colors">Skills & Tools</Link>
            <Link href="/projects" className="text-sm hover:text-[var(--text-primary)] transition-colors">Projects & Architecture</Link>
            <Link href="/experience" className="text-sm hover:text-[var(--text-primary)] transition-colors">Experience Timeline</Link>
          </div>

          {/* Sitemap Col 2 */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-primary)]">
              Specialized Modules
            </span>
            <Link href="/forge" className="text-sm hover:text-[var(--text-primary)] transition-colors">Forge OS Explorer</Link>
            <Link href="/events" className="text-sm hover:text-[var(--text-primary)] transition-colors">Events & Coverage</Link>
            <Link href="/gallery" className="text-sm hover:text-[var(--text-primary)] transition-colors">Visual Gallery</Link>
            <Link href="/filmography" className="text-sm hover:text-[var(--text-primary)] transition-colors">Filmography (12:12)</Link>
            <Link href="/contact" className="text-sm hover:text-[var(--text-primary)] transition-colors">Contact Me</Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
          <div>
            © {new Date().getFullYear()} {siteConfig.name}. Designed & Engineered by Me.
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono">v2.0 Enterprise</span>
            <span>•</span>
            <span>Coimbatore, India</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-[var(--bg-tertiary)] hover:bg-[var(--bg-surface)] text-[var(--text-primary)] transition-colors border border-[var(--border-subtle)]"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
