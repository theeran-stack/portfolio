// @/components/layout/Navbar.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { mainNavigation } from '@/config/navigation.config';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { ModeSelector } from '@/components/shared/ModeSelector';
import { Button } from '@/components/ui/Button';
import { Download, Menu, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[var(--bg-glass)] backdrop-blur-xl border-b border-[var(--border-subtle)] py-3 shadow-lg'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--accent-primary)] to-indigo-700 flex items-center justify-center text-white font-extrabold text-lg shadow-md group-hover:scale-105 transition-transform">
            T
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-base tracking-tight text-[var(--text-primary)] leading-none">
              Theeran P.
            </span>
            <span className="text-[10px] text-[var(--text-muted)] font-mono tracking-widest uppercase">
              Digital Ecosystem
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden xl:flex items-center gap-1 bg-[var(--bg-tertiary)]/60 border border-[var(--border-subtle)] p-1.5 rounded-2xl backdrop-blur-md">
          {mainNavigation.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                  isActive
                    ? 'text-[var(--text-primary)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-[var(--accent-glow)] border border-[var(--border-glow)] rounded-xl"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1">
                  {item.label}
                  {item.isBadge && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-[var(--accent-primary)]/20 text-[var(--accent-primary)] font-mono">
                      {item.badgeText}
                    </span>
                  )}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="hidden lg:flex items-center gap-3">
          <ModeSelector />
          <ThemeToggle />
          <Button variant="glass" size="sm" icon={Download} onClick={() => alert('Resume file placeholder: Resume PDF will be available shortly!')}>
            Resume
          </Button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center gap-2 xl:hidden">
          <ThemeToggle />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] text-[var(--text-primary)]"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden bg-[var(--bg-glass)] backdrop-blur-2xl border-b border-[var(--border-subtle)] px-6 py-6"
          >
            <div className="flex flex-col gap-3">
              <div className="pb-3 border-b border-[var(--border-subtle)] flex items-center justify-between">
                <span className="text-xs text-[var(--text-muted)] font-mono">Perspective Mode</span>
                <ModeSelector />
              </div>
              <div className="grid grid-cols-2 gap-2 py-2">
                {mainNavigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2.5 rounded-xl bg-[var(--bg-tertiary)] text-xs font-semibold text-[var(--text-primary)] hover:border-[var(--border-glow)] border border-transparent"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <Button variant="accent" size="sm" icon={Sparkles} className="w-full mt-2" onClick={() => alert('Resume PDF placeholder ready!')}>
                Download Resume
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
