// @/app/about/page.tsx
'use client';

import React from 'react';
import { personalProfile } from '@/content/personal.content';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { MotionWrapper } from '@/components/shared/MotionWrapper';
import { GraduationCap, MapPin, Sparkles, Users, Video, Code2, Heart, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <SectionHeading
        badge="My Personal Story"
        badgeIcon={Sparkles}
        title="Who I Am & What Drives Me"
        subtitle="I am a Computer Science Engineering student, Video Editor, and Cinematographer. Here is how I combine software craftsmanship with visual storytelling."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Sticky Fact Card */}
        <div className="space-y-6">
          <MotionWrapper>
            <Card hoverGlow className="p-6 space-y-6">
              <div className="relative h-64 rounded-xl overflow-hidden bg-black/40 border border-[var(--border-subtle)]">
                {/* eslint-disable-next-html-element-suppression */}
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop"
                  alt={personalProfile.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl font-black text-[var(--text-primary)]">{personalProfile.name}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {personalProfile.roles.map((r) => (
                    <Badge key={r} variant="accent">{r}</Badge>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--border-subtle)] space-y-3 text-sm text-[var(--text-secondary)]">
                <div className="flex items-start gap-3">
                  <GraduationCap className="w-5 h-5 text-[var(--accent-primary)] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[var(--text-primary)] block">Education</span>
                    <span>{personalProfile.education.degree} in {personalProfile.education.field}</span>
                    <span className="block text-xs text-[var(--text-muted)]">{personalProfile.education.institution} ({personalProfile.education.startYear}–{personalProfile.education.endYear})</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[var(--accent-primary)] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[var(--text-primary)] block">Location</span>
                    <span>{personalProfile.education.location.city}, {personalProfile.education.location.state}, {personalProfile.education.location.country}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-[var(--accent-primary)] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[var(--text-primary)] block">Campus Filmmaking Clubs</span>
                    <span>{personalProfile.clubs.join(' & ')}</span>
                  </div>
                </div>
              </div>
            </Card>
          </MotionWrapper>
        </div>

        {/* Right Story Prose */}
        <div className="lg:col-span-2 space-y-8">
          <MotionWrapper delay={1}>
            <Card hoverGlow className="p-8 space-y-6">
              <h3 className="text-2xl font-bold text-[var(--text-primary)]">My Mindset & Philosophy</h3>
              {personalProfile.bioStatements.map((paragraph, index) => (
                <p key={index} className="text-base text-[var(--text-secondary)] leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </Card>
          </MotionWrapper>

          <MotionWrapper delay={2}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Card hoverGlow className="p-6 space-y-3">
                <Code2 className="w-6 h-6 text-[var(--accent-primary)]" />
                <h4 className="text-lg font-bold text-[var(--text-primary)]">My Technical Journey</h4>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  I treat code as an art form. From learning foundational memory logic in C++ to architecting modular Next.js applications, I enjoy building tools that solve real problems cleanly.
                </p>
              </Card>

              <Card hoverGlow className="p-6 space-y-3">
                <Video className="w-6 h-6 text-amber-400" />
                <h4 className="text-lg font-bold text-[var(--text-primary)]">My Creative Journey</h4>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  Through cinematography and video editing, I capture emotion, pacing, and atmosphere. Covering 50+ campus and commercial events has honed my eye for detail and visual rhythm.
                </p>
              </Card>
            </div>
          </MotionWrapper>

          <MotionWrapper delay={3}>
            <Card hoverGlow className="p-8 space-y-4">
              <h3 className="text-2xl font-bold text-[var(--text-primary)] flex items-center gap-2">
                <Award className="w-6 h-6 text-[var(--accent-primary)]" />
                My Long-Term Vision
              </h3>
              <p className="text-base text-[var(--text-secondary)] leading-relaxed">
                This digital ecosystem is not a temporary college assignment. It is designed as my permanent professional home. As I take on new internships, direct feature films, engineer production systems, and launch new projects, I will continuously expand this hub for years to come.
              </p>
            </Card>
          </MotionWrapper>
        </div>
      </div>
    </div>
  );
}
