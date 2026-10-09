// @/app/events/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { eventsData } from '@/content/events.content';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MotionWrapper } from '@/components/shared/MotionWrapper';
import { Video, Calendar, MapPin, ArrowRight, Layers } from 'lucide-react';

export default function EventsPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = [
    { id: 'All', label: 'All Works' },
    { id: 'institutional', label: 'Institutional Coverage' },
    { id: 'creator', label: 'Creator Works & Commercials' },
  ];

  const filteredEvents = activeCategory === 'All'
    ? eventsData
    : eventsData.filter((e) => e.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <SectionHeading
        badge="Cinematography & Live Productions"
        badgeIcon={Video}
        title="Events & Film Coverage Portfolio"
        subtitle="I have covered over 50+ campus cultural festivals, technical symposiums, freelance commercial projects, and creative shoots."
      />

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                isActive
                  ? 'bg-[var(--accent-primary)] text-white shadow-md'
                  : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)]'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredEvents.map((evt, idx) => (
          <MotionWrapper key={evt.id} delay={idx}>
            <Card enableTilt hoverGlow className="flex flex-col gap-5 h-full">
              <div className="relative h-60 rounded-xl overflow-hidden bg-black/60">
                {/* eslint-disable-next-html-element-suppression */}
                <img
                  src={evt.coverImage}
                  alt={evt.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <Badge variant={evt.category === 'institutional' ? 'accent' : 'amber'}>
                    {evt.typeTag}
                  </Badge>
                </div>
              </div>

              <div className="flex flex-col gap-3 flex-1">
                <div className="flex items-center gap-3 text-xs text-[var(--text-muted)] font-mono">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                    <span>{evt.date}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                    <span>{evt.location}</span>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-[var(--text-primary)]">{evt.title}</h3>
                <span className="text-xs text-amber-400 font-semibold">My Role: {evt.role}</span>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {evt.description}
                </p>

                {evt.equipmentUsed && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {evt.equipmentUsed.map((eq) => (
                      <span key={eq} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[var(--bg-tertiary)] text-[var(--text-muted)]">
                        {eq}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-[var(--border-subtle)]">
                <Link href={`/events/${evt.slug}`}>
                  <Button variant="glass" size="sm" icon={ArrowRight} iconPosition="right" className="w-full">
                    View Event Story & Credits
                  </Button>
                </Link>
              </div>
            </Card>
          </MotionWrapper>
        ))}
      </div>
    </div>
  );
}
