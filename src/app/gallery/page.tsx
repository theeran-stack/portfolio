// @/app/gallery/page.tsx
'use client';

import React, { useState } from 'react';
import { galleryData } from '@/content/gallery.content';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Card } from '@/components/ui/Card';
import { Lightbox } from '@/components/ui/Lightbox';
import { MotionWrapper } from '@/components/shared/MotionWrapper';
import { Maximize2, Camera } from 'lucide-react';

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ['All', 'Events', 'Cinematography', 'Photography', 'Editing', 'Campus'];

  const filteredGallery = activeCategory === 'All'
    ? galleryData
    : galleryData.filter((g) => g.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <SectionHeading
        badge="Visual Storytelling"
        badgeIcon={Camera}
        title="Photography & Stills Gallery"
        subtitle="Explore key visual moments I captured across campus cultural shows, cinematography sets, lighting setups, and outdoor photography."
      />

      {/* Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                isActive
                  ? 'bg-[var(--accent-primary)] text-white shadow-md'
                  : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Masonry / Grid Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGallery.map((item, idx) => (
          <MotionWrapper key={item.id} delay={idx}>
            <Card
              enableTilt
              hoverGlow
              onClick={() => setLightboxIndex(idx)}
              className="p-3 flex flex-col gap-3 group cursor-pointer"
            >
              <div className="relative h-64 rounded-xl overflow-hidden bg-black/60">
                {/* eslint-disable-next-html-element-suppression */}
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                  <div className="flex items-center justify-between text-white">
                    <span className="text-xs font-mono">{item.category}</span>
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <div className="px-2 pb-1">
                <h3 className="font-bold text-base text-[var(--text-primary)]">{item.title}</h3>
                <p className="text-xs text-[var(--text-secondary)] line-clamp-2 mt-1 leading-relaxed">
                  {item.caption}
                </p>
              </div>
            </Card>
          </MotionWrapper>
        ))}
      </div>

      {/* Lightbox Modal Overlay */}
      <Lightbox
        items={filteredGallery}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
      />
    </div>
  );
}
