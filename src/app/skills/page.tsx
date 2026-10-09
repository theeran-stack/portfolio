// @/app/skills/page.tsx
'use client';

import React, { useState } from 'react';
import { skillsData } from '@/content/skills.content';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { MotionWrapper } from '@/components/shared/MotionWrapper';
import { Cpu, Video, Code2, Film, Sliders, Image, GitBranch, Terminal, Camera, SlidersHorizontal, Layers } from 'lucide-react';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Video, Camera, Film, Sliders, Image, Code2, FileCode: Code2, GitBranch, Terminal, Cpu, SlidersHorizontal
};

export default function SkillsPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Creative Skills', 'Programming Skills', 'Software & Tools', 'Production & Hardware'];

  const filteredSkills = activeCategory === 'All'
    ? skillsData
    : skillsData.filter((s) => s.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <SectionHeading
        badge="My Technical & Creative Stack"
        badgeIcon={Cpu}
        title="Skills, Tools & Technologies I Use"
        subtitle="I believe in mastering tools thoroughly. Here is a breakdown of my engineering competencies and film production stack."
      />

      {/* Filter Tabs */}
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

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSkills.map((skill, idx) => {
          const IconComponent = iconMap[skill.iconName] || Layers;
          return (
            <MotionWrapper key={skill.id} delay={idx}>
              <Card hoverGlow className="flex flex-col gap-4 h-full">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-[var(--bg-tertiary)] text-[var(--accent-primary)] border border-[var(--border-subtle)]">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[var(--text-primary)]">{skill.name}</h3>
                      <span className="text-xs text-[var(--text-muted)] font-mono">{skill.category}</span>
                    </div>
                  </div>
                  <Badge variant={skill.level > 88 ? 'accent' : 'default'}>
                    {skill.levelLabel}
                  </Badge>
                </div>

                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed flex-1">
                  {skill.description}
                </p>

                {/* Progress bar */}
                <div className="space-y-1.5 pt-2 border-t border-[var(--border-subtle)]">
                  <div className="flex justify-between text-[11px] font-mono text-[var(--text-muted)]">
                    <span>Proficiency</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-[var(--bg-tertiary)] overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[var(--accent-primary)] to-indigo-400 rounded-full transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              </Card>
            </MotionWrapper>
          );
        })}
      </div>
    </div>
  );
}
