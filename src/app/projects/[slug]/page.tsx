// @/app/projects/[slug]/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { projectsData } from '@/content/projects.content';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, ExternalLink, Code2, CheckCircle2, Lightbulb, Layers } from 'lucide-react';
import { GithubIcon } from '@/components/shared/BrandIcons';

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const project = projectsData.find((p) => p.slug === slug) || projectsData[0];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Back Button */}
      <Link href="/projects">
        <Button variant="ghost" size="sm" icon={ArrowLeft}>
          Back to Projects
        </Button>
      </Link>

      {/* Hero Header */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="accent">{project.category}</Badge>
          <Badge variant="outline">{project.status}</Badge>
          <span className="text-xs font-mono text-[var(--text-muted)]">{project.date}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight">
          {project.title}
        </h1>
        <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
          {project.subtitle}
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="glass" size="sm" icon={GithubIcon}>
              View GitHub Repo
            </Button>
          </a>
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="primary" size="sm" icon={ExternalLink}>
                Live Preview
              </Button>
            </a>
          )}
        </div>
      </div>

      {/* Main Image */}
      <div className="relative h-80 sm:h-[450px] rounded-3xl overflow-hidden bg-black/60 border border-[var(--border-subtle)]">
        {/* eslint-disable-next-html-element-suppression */}
        <img
          src={project.featuredImage}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Problem & Solution Architecture */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card hoverGlow className="p-8 space-y-4">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-lg">
            <Layers className="w-5 h-5" />
            <span>Problem Statement</span>
          </div>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            {project.problemStatement}
          </p>
        </Card>

        <Card hoverGlow className="p-8 space-y-4">
          <div className="flex items-center gap-2 text-[var(--accent-primary)] font-bold text-lg">
            <Code2 className="w-5 h-5" />
            <span>My Architectural Solution</span>
          </div>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            {project.solutionArchitecture}
          </p>
        </Card>
      </div>

      {/* Full Description */}
      <Card hoverGlow className="p-8 space-y-4">
        <h3 className="text-xl font-bold text-[var(--text-primary)]">Project Overview & Background</h3>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
          {project.fullDescription}
        </p>
      </Card>

      {/* Technologies Used */}
      <div className="space-y-3">
        <h3 className="text-xl font-bold text-[var(--text-primary)]">Technologies Used</h3>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((t) => (
            <Badge key={t} variant="accent" className="text-xs px-3 py-1">
              {t}
            </Badge>
          ))}
        </div>
      </div>

      {/* Lessons Learned */}
      <Card hoverGlow className="p-8 space-y-4">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-lg">
          <Lightbulb className="w-5 h-5" />
          <span>Key Lessons I Learned</span>
        </div>
        <ul className="space-y-3">
          {project.lessonsLearned.map((lesson, idx) => (
            <li key={idx} className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{lesson}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
