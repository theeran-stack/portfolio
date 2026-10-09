// @/app/experience/page.tsx
'use client';

import React from 'react';
import { experienceData } from '@/content/experience.content';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { MotionWrapper } from '@/components/shared/MotionWrapper';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

export default function ExperiencePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <SectionHeading
        badge="My Professional Timeline"
        badgeIcon={Briefcase}
        title="Experience & Milestones"
        subtitle="I track my growth across Computer Science Engineering at KCT, cinematography direction, professional video editing, and student leadership."
      />

      <div className="relative border-l border-[var(--border-subtle)] ml-4 sm:ml-8 space-y-12 pl-6 sm:pl-10">
        {experienceData.map((item, idx) => (
          <MotionWrapper key={item.id} delay={idx}>
            <div className="relative">
              {/* Timeline Indicator Node */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1 w-5 h-5 rounded-full bg-[var(--bg-primary)] border-2 border-[var(--accent-primary)] flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-[var(--accent-primary)]" />
              </div>

              <Card hoverGlow className="p-6 sm:p-8 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--border-subtle)] pb-4">
                  <div>
                    <span className="text-xs text-[var(--accent-primary)] font-mono uppercase tracking-wider font-semibold">
                      {item.category}
                    </span>
                    <h3 className="text-2xl font-bold text-[var(--text-primary)]">{item.role}</h3>
                    <span className="text-sm font-semibold text-[var(--text-secondary)]">{item.organization}</span>
                  </div>

                  <div className="flex flex-col items-start sm:items-end gap-1 text-xs text-[var(--text-muted)] font-mono">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{item.period}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{item.location}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  {item.description.map((desc, i) => (
                    <p key={i} className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      {desc}
                    </p>
                  ))}
                </div>

                <div className="pt-2 flex flex-wrap gap-1.5">
                  {item.skillsUsed.map((skill) => (
                    <Badge key={skill} variant="accent" className="text-[11px]">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>
            </div>
          </MotionWrapper>
        ))}
      </div>
    </div>
  );
}
