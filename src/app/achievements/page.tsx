// @/app/achievements/page.tsx
'use client';

import React from 'react';
import { achievementsData } from '@/content/achievements.content';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { MotionWrapper } from '@/components/shared/MotionWrapper';
import { Award, Calendar, ExternalLink } from 'lucide-react';

export default function AchievementsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <SectionHeading
        badge="Recognitions & Credentials"
        badgeIcon={Award}
        title="Achievements & Certifications"
        subtitle="Here are my official certificates, leadership honors, hackathon recognitions, and film showcase nominations."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {achievementsData.map((item, idx) => (
          <MotionWrapper key={item.id} delay={idx}>
            <Card hoverGlow className="p-6 flex flex-col gap-4 h-full">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-xl bg-[var(--accent-glow)] text-[var(--accent-primary)]">
                  <Award className="w-6 h-6" />
                </div>
                <Badge variant="accent">{item.category}</Badge>
              </div>

              <div className="flex-1 space-y-2">
                <h3 className="text-xl font-bold text-[var(--text-primary)]">{item.title}</h3>
                <div className="flex items-center justify-between text-xs text-[var(--text-muted)] font-mono">
                  <span>{item.issuer}</span>
                  <span>{item.date}</span>
                </div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed pt-2">
                  {item.description}
                </p>
              </div>
            </Card>
          </MotionWrapper>
        ))}
      </div>
    </div>
  );
}
