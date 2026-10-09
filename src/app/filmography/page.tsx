// @/app/filmography/page.tsx
'use client';

import React from 'react';
import { filmographyData } from '@/content/filmography.content';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MotionWrapper } from '@/components/shared/MotionWrapper';
import { Film, Play, Camera, Users, Clapperboard, Sparkles } from 'lucide-react';

export default function FilmographyPage() {
  const film1212 = filmographyData[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <SectionHeading
        badge="Narrative Filmography"
        badgeIcon={Film}
        title="Cinematic Short Films & Visual Direction"
        subtitle="Explore my narrative filmmaking projects where I direct visual composition, low-key lighting ratios, and sound design."
      />

      {/* Main Showcase Hero for "12:12" */}
      <MotionWrapper>
        <div className="relative rounded-3xl overflow-hidden bg-black border border-white/15 shadow-2xl p-6 sm:p-12">
          {/* Subtle Background Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-rose-600/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
            {/* Poster Image Container */}
            <div className="relative h-96 sm:h-[480px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              {/* eslint-disable-next-html-element-suppression */}
              <img
                src={film1212.posterImage}
                alt={film1212.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <Badge variant="amber" icon={Clapperboard}>{film1212.status}</Badge>
              </div>
            </div>

            {/* Film Details */}
            <div className="lg:col-span-2 space-y-6 text-white">
              <div className="flex flex-wrap gap-2">
                {film1212.genre.map((g) => (
                  <Badge key={g} variant="accent">{g}</Badge>
                ))}
              </div>

              <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white">
                &quot;{film1212.title}&quot;
              </h2>

              <p className="text-lg text-rose-300 font-mono italic">
                &quot;{film1212.logline}&quot;
              </p>

              <div className="space-y-3 pt-2 text-sm text-gray-300 leading-relaxed border-t border-white/10">
                <p>{film1212.synopsis}</p>
              </div>

              {/* Roles Badges */}
              <div className="flex flex-wrap gap-4 text-xs font-mono text-gray-400">
                <div>
                  <span className="text-gray-500 block">Cinematographer</span>
                  <span className="text-white font-bold">{film1212.cinematographer}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">Editor & Colorist</span>
                  <span className="text-white font-bold">{film1212.editor}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">Release Target</span>
                  <span className="text-amber-400 font-bold">{film1212.releaseYear}</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <Button
                  variant="accent"
                  size="lg"
                  icon={Play}
                  onClick={() => alert('Official Teaser Trailer coming soon! Post-production in progress.')}
                >
                  Watch Official Teaser (Coming Soon)
                </Button>
              </div>
            </div>
          </div>
        </div>
      </MotionWrapper>

      {/* Behind the Scenes Stills */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-[var(--text-primary)] flex items-center gap-2">
          <Camera className="w-5 h-5 text-[var(--accent-primary)]" />
          <span>Behind The Scenes Stills</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {film1212.behindTheScenes.map((img, idx) => (
            <MotionWrapper key={idx} delay={idx}>
              <Card hoverGlow className="p-3">
                <div className="relative h-64 rounded-xl overflow-hidden bg-black/60">
                  {/* eslint-disable-next-html-element-suppression */}
                  <img src={img} alt={`BTS ${idx}`} className="w-full h-full object-cover" />
                </div>
              </Card>
            </MotionWrapper>
          ))}
        </div>
      </section>

      {/* Crew Credits Grid */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-[var(--text-primary)] flex items-center gap-2">
          <Users className="w-5 h-5 text-[var(--accent-primary)]" />
          <span>Crew & Production Credits</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {film1212.crew.map((member, idx) => (
            <Card key={idx} hoverGlow className="p-4 flex flex-col justify-center">
              <span className="text-xs text-[var(--text-muted)] font-mono">{member.role}</span>
              <span className="text-base font-bold text-[var(--text-primary)]">{member.name}</span>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
