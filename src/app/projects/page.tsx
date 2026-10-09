// @/app/projects/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { projectsData } from '@/content/projects.content';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MotionWrapper } from '@/components/shared/MotionWrapper';
import { Code2, ArrowRight } from 'lucide-react';
import { GithubIcon } from '@/components/shared/BrandIcons';

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Full Stack', 'Creative Tech', 'Systems / C++'];

  const filteredProjects = activeCategory === 'All'
    ? projectsData
    : projectsData.filter((p) => p.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <SectionHeading
        badge="My Software Architecture"
        badgeIcon={Code2}
        title="Technical & Creative Engineering Projects"
        subtitle="I build production-grade web systems, desktop UIs, and embedded microcontroller software. Explore my case studies."
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

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((proj, idx) => (
          <MotionWrapper key={proj.id} delay={idx}>
            <Card enableTilt hoverGlow className="flex flex-col gap-5 h-full">
              <div className="relative h-56 rounded-xl overflow-hidden bg-black/40">
                {/* eslint-disable-next-html-element-suppression */}
                <img
                  src={proj.featuredImage}
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <Badge variant="accent">{proj.category}</Badge>
                  <Badge variant="outline">{proj.status}</Badge>
                </div>
              </div>

              <div className="flex flex-col gap-2 flex-1">
                <h3 className="text-2xl font-bold text-[var(--text-primary)]">{proj.title}</h3>
                <p className="text-xs text-[var(--text-muted)] font-mono">{proj.subtitle}</p>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mt-1">
                  {proj.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-3">
                  {proj.technologies.map((t) => (
                    <span key={t} className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-[var(--bg-tertiary)] text-[var(--text-muted)] border border-[var(--border-subtle)]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between gap-3">
                <a
                  href={proj.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-[var(--bg-tertiary)] hover:bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors border border-[var(--border-subtle)]"
                  title="GitHub Repository"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>

                <Link href={`/projects/${proj.slug}`} className="flex-1">
                  <Button variant="primary" size="sm" icon={ArrowRight} iconPosition="right" className="w-full">
                    View Case Study
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
