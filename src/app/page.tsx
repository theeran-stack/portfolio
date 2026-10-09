// @/app/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { personalProfile } from '@/content/personal.content';
import { projectsData } from '@/content/projects.content';
import { eventsData } from '@/content/events.content';
import { skillsData } from '@/content/skills.content';
import { achievementsData } from '@/content/achievements.content';
import { filmographyData } from '@/content/filmography.content';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { SocialLinks } from '@/components/shared/SocialLinks';
import { MotionWrapper } from '@/components/shared/MotionWrapper';
import { GithubIcon } from '@/components/shared/BrandIcons';
import {
  ArrowRight,
  Code2,
  Video,
  Sparkles,
  FolderGit2,
  Film,
  Terminal,
  Award,
  Send,
  Download,
  Calendar,
  MapPin,
  Cpu,
  FileText,
} from 'lucide-react';

export default function HomePage() {
  const featuredProjects = projectsData.filter((p) => p.isFeatured).slice(0, 2);
  const featuredEvents = eventsData.slice(0, 2);
  const topSkills = skillsData.filter((s) => s.isFeatured).slice(0, 6);
  const film1212 = filmographyData[0];

  return (
    <div className="space-y-28">
      {/* 1. Hero Section (80–100vh) */}
      <section className="min-h-[85vh] flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative pt-6 pb-12">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[var(--accent-glow)] rounded-full blur-3xl opacity-30 pointer-events-none" />

        <div className="relative space-y-8 max-w-5xl">
          <MotionWrapper delay={0}>
            <div className="flex flex-wrap gap-2.5">
              <Badge variant="accent" icon={Sparkles}>
                Computer Science & Engineering @ KCT
              </Badge>
              <Badge variant="amber" icon={Video}>
                Lead Cinematographer
              </Badge>
              <Badge variant="default" icon={Code2}>
                Video Editor
              </Badge>
            </div>
          </MotionWrapper>

          <MotionWrapper delay={1}>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[var(--text-primary)] leading-[1.08]">
              I combine <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-amber-400">software engineering</span> and <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">cinematography</span> to engineer premium digital experiences.
            </h1>
          </MotionWrapper>

          <MotionWrapper delay={2}>
            <p className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-3xl leading-relaxed font-normal">
              I am <strong className="text-[var(--text-primary)]">{personalProfile.name}</strong>, a Computer Science student at Kumaraguru College of Technology (2024–2028). I design production-grade web systems and direct visual cinematography for campus and commercial productions.
            </p>
          </MotionWrapper>

          <MotionWrapper delay={3}>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link href="/projects">
                <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
                  Explore My Projects
                </Button>
              </Link>
              <Link href="/forge">
                <Button variant="glass" size="lg" icon={FolderGit2}>
                  Launch Forge Workspace
                </Button>
              </Link>
              <Button variant="ghost" size="lg" icon={Download} onClick={() => alert('Resume PDF placeholder: PDF file will be available shortly!')}>
                Resume
              </Button>
            </div>
          </MotionWrapper>

          <MotionWrapper delay={4}>
            <div className="pt-4 flex items-center gap-4">
              <span className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
                Connect With Me:
              </span>
              <SocialLinks />
            </div>
          </MotionWrapper>
        </div>
      </section>

      {/* 2. Quick Introduction & Bento Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <MotionWrapper>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center bg-[var(--bg-glass)] border border-[var(--border-subtle)] rounded-3xl p-8 sm:p-10 backdrop-blur-xl">
            <div className="lg:col-span-2 space-y-4">
              <Badge variant="accent">My Story</Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight">
                Quick Introduction
              </h2>
              <p className="text-base text-[var(--text-secondary)] leading-relaxed">
                I adapt quickly to new environments and continuously enjoy learning new engineering skills and creative disciplines. Alongside pursuing Computer Science Engineering at Kumaraguru College of Technology, I have built 3 years of hands-on experience in cinematography and 2 years in professional video editing.
              </p>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                I am an active member of the campus filmmaking community inside <strong className="text-[var(--text-primary)]">Nigal Club</strong> and <strong className="text-[var(--text-primary)]">Elaris</strong>, while working as a freelance DP and editor.
              </p>
              <div>
                <Link href="/about">
                  <Button variant="ghost" size="sm" icon={ArrowRight} iconPosition="right">
                    Read My Full Story & Journey
                  </Button>
                </Link>
              </div>
            </div>

            {/* Quick Metrics Bento */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'CS Degree', val: '2024–28', sub: 'KCT Student' },
                { label: 'Cinematography', val: '3 Years', sub: '50+ Events' },
                { label: 'Video Editing', val: '2 Years', sub: 'Premiere & Resolve' },
                { label: 'Forge Weeks', val: '20+ Weeks', sub: 'OS Workspace' },
              ].map((m) => (
                <div key={m.label} className="p-4 rounded-2xl bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] space-y-1">
                  <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase block">{m.label}</span>
                  <span className="text-xl font-black text-[var(--text-primary)] block">{m.val}</span>
                  <span className="text-[11px] text-[var(--accent-primary)] font-medium block">{m.sub}</span>
                </div>
              ))}
            </div>
          </div>
        </MotionWrapper>
      </section>

      {/* 3. Featured Projects */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <Badge variant="accent" icon={Code2}>Technical Architecture</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] mt-2">
              Featured Technical Projects
            </h2>
          </div>
          <Link href="/projects">
            <Button variant="ghost" size="sm" icon={ArrowRight} iconPosition="right">
              View All Projects
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredProjects.map((proj, idx) => (
            <MotionWrapper key={proj.id} delay={idx}>
              <Card enableTilt hoverGlow className="flex flex-col gap-5 h-full">
                <div className="relative h-52 rounded-xl overflow-hidden bg-black/40">
                  {/* eslint-disable-next-html-element-suppression */}
                  <img
                    src={proj.featuredImage}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <Badge variant="accent">{proj.category}</Badge>
                  </div>
                </div>

                <div className="flex flex-col gap-2 flex-1">
                  <h3 className="text-2xl font-bold text-[var(--text-primary)]">{proj.title}</h3>
                  <p className="text-xs font-mono text-[var(--text-muted)]">{proj.subtitle}</p>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mt-1">
                    {proj.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {proj.technologies.map((tech) => (
                      <span key={tech} className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-[var(--bg-tertiary)] text-[var(--text-muted)] border border-[var(--border-subtle)]">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between gap-3">
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-[var(--bg-tertiary)] hover:bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors border border-[var(--border-subtle)]"
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
      </section>

      {/* 4. Forge Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MotionWrapper>
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 p-8 sm:p-12 border border-indigo-500/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl">
              <Badge variant="accent" icon={Terminal}>Signature Workspace</Badge>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Explore My Forge Experience (Weeks 0–20+)
              </h2>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                I engineered an OS-inspired desktop workspace where you can inspect my week-by-week learning progress, file hierarchies, challenges faced, team member links, and reflections.
              </p>
              <div className="pt-2 flex items-center gap-3">
                <Link href="/forge">
                  <Button variant="accent" size="lg" icon={FolderGit2}>
                    Launch Forge Workspace
                  </Button>
                </Link>
              </div>
            </div>

            <div className="w-full md:w-88 bg-black/70 border border-white/10 rounded-2xl p-5 font-mono text-xs text-gray-300 space-y-3 shadow-2xl">
              <div className="flex items-center justify-between pb-2 border-b border-white/10 text-indigo-400 font-bold">
                <span>📁 / forge / semester-1 / week-20</span>
                <span className="text-[10px] text-emerald-400">Active</span>
              </div>
              <div className="space-y-1.5 text-gray-400">
                <div className="flex items-center gap-2 text-white">
                  <FileText className="w-3.5 h-3.5 text-amber-400" />
                  <span>overview.md</span>
                </div>
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  <span>technologies.json</span>
                </div>
                <div className="flex items-center gap-2">
                  <Code2 className="w-3.5 h-3.5 text-indigo-400" />
                  <span>team.ts</span>
                </div>
              </div>
              <div className="text-emerald-400 text-[11px] pt-2 border-t border-white/10">
                ✓ 21 Weeks Loaded & Filterable (⌘K)
              </div>
            </div>
          </div>
        </MotionWrapper>
      </section>

      {/* 5. Featured Events */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <Badge variant="amber" icon={Video}>Cinematography Works</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] mt-2">
              Featured Event Coverages
            </h2>
          </div>
          <Link href="/events">
            <Button variant="ghost" size="sm" icon={ArrowRight} iconPosition="right">
              View All Events
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredEvents.map((evt, idx) => (
            <MotionWrapper key={evt.id} delay={idx}>
              <Card enableTilt hoverGlow className="flex flex-col gap-5 h-full">
                <div className="relative h-56 rounded-xl overflow-hidden bg-black/60">
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

                <div className="flex flex-col gap-2 flex-1">
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
                </div>

                <div className="pt-3 border-t border-[var(--border-subtle)]">
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
      </section>

      {/* 6. Skills Snapshot */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <Badge variant="accent" icon={Cpu}>Stack Overview</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] mt-2">
              Skills Snapshot
            </h2>
          </div>
          <Link href="/skills">
            <Button variant="ghost" size="sm" icon={ArrowRight} iconPosition="right">
              View All Skills & Tools
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topSkills.map((skill, idx) => (
            <MotionWrapper key={skill.id} delay={idx}>
              <Card hoverGlow className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-base text-[var(--text-primary)]">{skill.name}</h3>
                  <Badge variant="accent">{skill.levelLabel}</Badge>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {skill.description}
                </p>
                <div className="w-full h-1.5 rounded-full bg-[var(--bg-tertiary)] overflow-hidden pt-1">
                  <div
                    className="h-full bg-gradient-to-r from-[var(--accent-primary)] to-indigo-400 rounded-full"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </Card>
            </MotionWrapper>
          ))}
        </div>
      </section>

      {/* 7. Achievements & Filmography Feature */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <Badge variant="accent" icon={Award}>Credentials & Films</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] mt-2">
              Achievements & Feature Short "12:12"
            </h2>
          </div>
          <Link href="/achievements">
            <Button variant="ghost" size="sm" icon={ArrowRight} iconPosition="right">
              View Achievements
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Filmography Feature Card */}
          <div className="relative h-80 rounded-2xl overflow-hidden bg-black border border-white/10 p-6 flex flex-col justify-end group">
            {/* eslint-disable-next-html-element-suppression */}
            <img
              src={film1212.posterImage}
              alt={film1212.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60"
            />
            <div className="relative z-10 space-y-2">
              <Badge variant="amber" icon={Film}>{film1212.status}</Badge>
              <h3 className="text-3xl font-black text-white">&quot;{film1212.title}&quot;</h3>
              <p className="text-xs text-rose-300 font-mono italic">{film1212.logline}</p>
              <div className="pt-2">
                <Link href="/filmography">
                  <Button variant="accent" size="sm" icon={ArrowRight} iconPosition="right">
                    View Film Details
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Achievements Grid */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {achievementsData.map((item) => (
              <Card key={item.id} hoverGlow className="p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="accent">{item.category}</Badge>
                  <span className="text-[11px] font-mono text-[var(--text-muted)]">{item.date}</span>
                </div>
                <h4 className="font-bold text-base text-[var(--text-primary)]">{item.title}</h4>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {item.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Contact CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MotionWrapper>
          <div className="relative rounded-3xl bg-gradient-to-r from-indigo-900 via-purple-950 to-slate-950 p-8 sm:p-12 border border-indigo-500/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="space-y-3 max-w-xl">
              <Badge variant="accent">Let's Connect</Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Interested in Collaborating or Hiring Me?
              </h2>
              <p className="text-sm text-gray-300 leading-relaxed">
                Whether you have a freelance video editing project, a cinematography shoot, or a technical software engineering inquiry, send me a message directly.
              </p>
            </div>
            <div>
              <Link href="/contact">
                <Button variant="accent" size="lg" icon={Send}>
                  Send Me a Message
                </Button>
              </Link>
            </div>
          </div>
        </MotionWrapper>
      </section>
    </div>
  );
}
