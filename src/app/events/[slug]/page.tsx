// @/app/events/[slug]/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { eventsData } from '@/content/events.content';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Calendar, MapPin, Camera, Users } from 'lucide-react';
import { LinkedinIcon } from '@/components/shared/BrandIcons';

export default function EventDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const event = eventsData.find((e) => e.slug === slug) || eventsData[0];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <Link href="/events">
        <Button variant="ghost" size="sm" icon={ArrowLeft}>
          Back to Events
        </Button>
      </Link>

      {/* Header */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="accent">{event.typeTag}</Badge>
          <span className="text-xs font-mono text-[var(--text-muted)]">{event.date}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[var(--text-primary)]">{event.title}</h1>
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[var(--text-secondary)]">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-[var(--accent-primary)]" />
            <span>{event.organization}</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-[var(--accent-primary)]" />
            <span>{event.location}</span>
          </div>
        </div>
      </div>

      {/* Hero Cover */}
      <div className="relative h-80 sm:h-[450px] rounded-3xl overflow-hidden bg-black/60 border border-[var(--border-subtle)]">
        {/* eslint-disable-next-html-element-suppression */}
        <img
          src={event.coverImage}
          alt={event.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Story */}
      <Card hoverGlow className="p-8 space-y-4">
        <h3 className="text-2xl font-bold text-[var(--text-primary)]">Behind the Lens: My Event Story</h3>
        <p className="text-base text-[var(--text-secondary)] leading-relaxed">{event.fullStory}</p>
      </Card>

      {/* Equipment Used */}
      {event.equipmentUsed && (
        <Card hoverGlow className="p-6 space-y-3">
          <div className="flex items-center gap-2 text-[var(--accent-primary)] font-bold text-sm">
            <Camera className="w-4 h-4" />
            <span>Camera Gear & Rigging Utilized</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {event.equipmentUsed.map((eq) => (
              <Badge key={eq} variant="accent">{eq}</Badge>
            ))}
          </div>
        </Card>
      )}

      {/* Crew & Team Credits */}
      <Card hoverGlow className="p-8 space-y-4">
        <div className="flex items-center gap-2 text-xl font-bold text-[var(--text-primary)]">
          <Users className="w-5 h-5 text-[var(--accent-primary)]" />
          <span>Production Credits</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {event.credits.map((credit, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] flex items-center justify-between">
              <div>
                <span className="font-bold text-sm text-[var(--text-primary)] block">{credit.name}</span>
                <span className="text-xs text-[var(--text-muted)]">{credit.role}</span>
              </div>
              {credit.linkedin && (
                <a href={credit.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-[var(--bg-surface)] hover:text-indigo-400">
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
