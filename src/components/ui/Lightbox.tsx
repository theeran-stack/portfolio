// @/components/ui/Lightbox.tsx
'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Camera, Calendar, MapPin } from 'lucide-react';
import { GalleryItem } from '@/types/portfolio.types';

interface LightboxProps {
  items: GalleryItem[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  items,
  currentIndex,
  onClose,
  onNavigate,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentIndex === null) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate((currentIndex - 1 + items.length) % items.length);
      if (e.key === 'ArrowRight') onNavigate((currentIndex + 1) % items.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, items.length, onClose, onNavigate]);

  if (currentIndex === null || !items[currentIndex]) return null;

  const current = items[currentIndex];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-2xl p-4 sm:p-8"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Prev Button */}
        <button
          onClick={() => onNavigate((currentIndex - 1 + items.length) % items.length)}
          className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Next Button */}
        <button
          onClick={() => onNavigate((currentIndex + 1) % items.length)}
          className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Content Container */}
        <div className="max-w-5xl w-full flex flex-col md:flex-row gap-6 items-center bg-[var(--bg-glass)] border border-[var(--border-subtle)] rounded-3xl overflow-hidden shadow-2xl">
          <div className="w-full md:w-2/3 bg-black flex items-center justify-center max-h-[70vh]">
            {/* eslint-disable-next-html-element-suppression */}
            <img
              src={current.imageUrl}
              alt={current.title}
              className="max-h-[70vh] w-full object-contain"
            />
          </div>

          <div className="w-full md:w-1/3 p-6 flex flex-col gap-4 text-[var(--text-primary)]">
            <span className="text-xs uppercase tracking-wider font-semibold text-[var(--accent-primary)]">
              {current.category}
            </span>
            <h3 className="text-2xl font-bold">{current.title}</h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{current.caption}</p>

            <div className="mt-4 flex flex-col gap-2 text-xs text-[var(--text-muted)] border-t border-[var(--border-subtle)] pt-4">
              {current.date && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[var(--accent-primary)]" />
                  <span>{current.date}</span>
                </div>
              )}
              {current.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[var(--accent-primary)]" />
                  <span>{current.location}</span>
                </div>
              )}
              {current.cameraGear && (
                <div className="flex items-center gap-2">
                  <Camera className="w-4 h-4 text-[var(--accent-primary)]" />
                  <span>{current.cameraGear}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
