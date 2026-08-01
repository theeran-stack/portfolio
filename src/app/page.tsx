"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Hero3DCanvas } from "@/components/hero/Hero3DCanvas";
import { profileData } from "@/content/profile";
import { projectsData } from "@/content/projects";
import { forgeWeeksData } from "@/content/forge";
import { ArrowRight, FolderGit2, Mail, FileText, MapPin, GraduationCap, Building2, Camera, Video, Code2, Sparkles, Terminal } from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

export default function HomePage() {
  const featuredProjects = projectsData.slice(0, 3);
  const latestWeek = forgeWeeksData[forgeWeeksData.length - 1];

  return (
    <div className="relative overflow-hidden space-y-24 md:space-y-32 pb-16">
      
      {/* MINIMALIST HERO VIEWPORT WITH PROFILE PHOTO */}
      <section className="relative min-h-[88vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-4">
        <Hero3DCanvas />
        
        {/* Minimalist Grid Background Overlay */}
        <div className="absolute inset-0 bg-minimal-grid pointer-events-none opacity-40" />

        <div className="relative z-10 mx-auto max-w-7xl w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* STARTING SECTION: PROFILE PHOTO CARD */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, ease: smoothEase }}
              className="lg:col-span-5 max-w-sm mx-auto lg:max-w-none w-full group"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl glass-panel-elevated border border-white/15 shadow-glass-lg p-2.5 transition-all group-hover:border-white/30">
                <img
                  src="/profile.jpg?v=2"
                  alt="Theeran P. - Computer Science Engineering Student & Cinematographer"
                  className="h-full w-full object-cover object-top rounded-2xl filter grayscale contrast-105 group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
                
                {/* Photo Badge overlay */}
                <div className="absolute bottom-5 left-5 right-5 glass-panel rounded-xl p-3.5 border border-white/15 backdrop-blur-md space-y-1 shadow-glass-md">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-mono text-white font-bold">Theeran P.</span>
                  </div>
                  <p className="text-[11px] font-mono text-neutral-300">B.E. CSE • Cinematographer & Editor</p>
                  <div className="flex items-center gap-1 text-[10px] font-mono text-neutral-400 pt-0.5">
                    <MapPin className="h-3 w-3 text-white" />
                    <span>Coimbatore, India</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ALIGNED HERO TEXT CONTENT & ACTIONS */}
            <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
              
              {/* Tagline Badge */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: smoothEase }}
                className="inline-flex items-center gap-2 rounded-full glass-panel px-4 py-1.5 text-xs text-white border border-white/10 shadow-glass-sm"
              >
                <Sparkles className="h-3.5 w-3.5 text-neutral-300" />
                <span className="font-mono text-[11px] tracking-widest uppercase text-neutral-300 font-bold">WHERE TECHNOLOGY MEETS STORYTELLING</span>
              </motion.div>

              {/* Main Headline */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: smoothEase }}
                className="space-y-3"
              >
                <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white leading-[1.12]">
                  I Build. I Create. <br className="hidden sm:inline" />
                  I Capture.
                </h1>
                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-sans font-normal max-w-2xl">
                  {profileData.headline}
                </p>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans font-light max-w-xl">
                  From software development to filmmaking, I continuously explore, learn, and create experiences that leave a lasting impression.
                </p>
              </motion.div>

              {/* Quick Info Badges */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: smoothEase }}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1"
              >
                <div className="flex items-center gap-1.5 rounded-full glass-panel px-3 py-1 text-xs font-mono text-neutral-300 border border-white/10">
                  <MapPin className="h-3.5 w-3.5 text-white" />
                  <span>Coimbatore, India</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-full glass-panel px-3 py-1 text-xs font-mono text-neutral-300 border border-white/10">
                  <GraduationCap className="h-3.5 w-3.5 text-white" />
                  <span>B.E. Computer Science & Engineering</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-full glass-panel px-3 py-1 text-xs font-mono text-neutral-300 border border-white/10">
                  <Building2 className="h-3.5 w-3.5 text-white" />
                  <span>Kumaraguru College of Technology</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-full glass-panel px-3 py-1 text-xs font-mono text-neutral-300 border border-white/10">
                  <Camera className="h-3.5 w-3.5 text-white" />
                  <span>Cinematographer</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-full glass-panel px-3 py-1 text-xs font-mono text-neutral-300 border border-white/10">
                  <Video className="h-3.5 w-3.5 text-white" />
                  <span>Video Editor</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-full glass-panel px-3 py-1 text-xs font-mono text-neutral-300 border border-white/10">
                  <Code2 className="h-3.5 w-3.5 text-white" />
                  <span>Software Developer</span>
                </div>
              </motion.div>

              {/* Quick Statistics Bar */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: smoothEase }}
                className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1"
              >
                {profileData.stats.map((stat, idx) => (
                  <div key={idx} className="glass-panel rounded-xl p-2.5 text-center lg:text-left border border-white/10 hover:border-white/20 transition-all duration-300">
                    <div className="font-serif text-lg font-bold text-white">
                      {stat.value}<span className="text-xs text-neutral-400">{stat.suffix}</span>
                    </div>
                    <div className="text-[10px] text-neutral-400 font-mono tracking-wider uppercase mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </motion.div>

              {/* CTA Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4, ease: smoothEase }}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2"
              >
                <Link
                  href="/projects"
                  className="group flex items-center gap-2 rounded-full bg-white px-6 py-3 text-xs font-mono font-bold text-black hover:bg-neutral-200 transition-all shadow-glass-sm hover:-translate-y-0.5"
                >
                  <span>Explore My Work</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/forge"
                  className="flex items-center gap-2 rounded-full glass-panel px-5 py-3 text-xs font-mono font-medium text-white hover:border-white/25 transition-all border border-white/10 hover:-translate-y-0.5"
                >
                  <FolderGit2 className="h-4 w-4 text-white" />
                  <span>View Forge Journey</span>
                </Link>

                <Link
                  href="/contact"
                  className="flex items-center gap-2 rounded-full glass-panel px-5 py-3 text-xs font-mono font-medium text-white hover:border-white/25 transition-all border border-white/10 hover:-translate-y-0.5"
                >
                  <Mail className="h-4 w-4 text-white" />
                  <span>Contact Me</span>
                </Link>

                <button
                  disabled
                  className="flex items-center gap-2 rounded-full glass-panel px-5 py-3 text-xs font-mono font-medium text-neutral-400 opacity-70 border border-white/10 cursor-not-allowed"
                >
                  <FileText className="h-4 w-4 text-neutral-400" />
                  <span>Download Resume (Coming Soon)</span>
                </button>
              </motion.div>

            </div>

          </div>
        </div>
      </section>

      {/* PHILOSOPHY STATEMENT SECTION */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="glass-panel-elevated rounded-2xl p-8 md:p-12 border border-white/10 relative overflow-hidden transition-all hover:border-white/20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-5">
              <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-300 tracking-widest uppercase">
                <Terminal className="h-3.5 w-3.5" />
                <span>MY PHILOSOPHY</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white leading-snug">
                "I enjoy learning by building."
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono text-neutral-300">
                <div className="glass-panel rounded-xl p-3 border border-white/10">
                  <span className="text-white font-bold block mb-1">01. Learn & Build</span>
                  <span>Every project teaches me something new.</span>
                </div>
                <div className="glass-panel rounded-xl p-3 border border-white/10">
                  <span className="text-white font-bold block mb-1">02. Event Impact</span>
                  <span>Every event improves my confidence.</span>
                </div>
                <div className="glass-panel rounded-xl p-3 border border-white/10">
                  <span className="text-white font-bold block mb-1">03. Challenge & Grow</span>
                  <span>Every challenge helps me grow.</span>
                </div>
              </div>
              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-white hover:text-neutral-300 transition-colors"
                >
                  <span>Read Full About Story</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-center gap-4 border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-0 lg:pl-8 text-xs font-mono">
              <div className="space-y-1">
                <span className="text-neutral-500 block uppercase text-[10px]">EDUCATION</span>
                <p className="font-semibold text-white">B.E. CSE (2024–2028)</p>
                <p className="text-[11px] text-neutral-400">Kumaraguru College of Technology</p>
              </div>
              <div className="space-y-1">
                <span className="text-neutral-500 block uppercase text-[10px]">ORGANIZATIONS</span>
                <p className="font-semibold text-white">Nigal Club & Elaris</p>
              </div>
              <div className="space-y-1">
                <span className="text-neutral-500 block uppercase text-[10px]">CREATIVE DOMAIN</span>
                <p className="font-semibold text-white">Cinematography & Video Editing</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS SHOWCASE */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest">FEATURED PROJECTS</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
              Software & Embedded Showcase
            </h2>
          </div>
          <Link href="/projects" className="text-xs font-mono text-white hover:text-neutral-300 flex items-center gap-1 font-semibold transition-colors">
            <span>View All ({projectsData.length})</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <motion.div
              key={project.id}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3, ease: smoothEase }}
              className="group rounded-2xl glass-panel border border-white/10 overflow-hidden hover:border-white/25 transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-video overflow-hidden bg-neutral-900">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 filter grayscale contrast-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-primary via-transparent to-transparent opacity-85" />
                <span className="absolute top-3 left-3 rounded-full bg-black/80 px-2.5 py-0.5 text-[10px] font-mono text-white border border-white/15 backdrop-blur-md">
                  {project.category}
                </span>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <h3 className="font-serif text-lg font-bold text-white group-hover:text-neutral-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed font-sans">
                    {project.subtitle}
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span key={tech} className="rounded bg-neutral-900/80 px-2 py-0.5 text-[9px] font-mono text-neutral-300 border border-white/10">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/projects/${project.slug}`}
                    className="flex items-center gap-1 text-xs font-mono font-bold text-white hover:text-neutral-300 transition-colors pt-1"
                  >
                    <span>Read Case Study</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PROTOSEM (FORGE EXPERIENCE) ARCHIVE SECTION */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl glass-panel-elevated p-8 md:p-12 border border-white/10 relative overflow-hidden transition-all hover:border-white/20 shadow-glass-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-mono text-white border border-white/15">
                <FolderGit2 className="h-3.5 w-3.5" />
                <span>PROTOSEM INTERNSHIP EXPERIENCE</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
                Forge Experience: Weeks 0–20
              </h2>

              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans max-w-xl">
                Forge Experience is where I document my weekly learning journey. Instead of simply showing what I built, I share how I learned, what challenges I faced, and the solutions I explored every week.
              </p>

              <div className="pt-2">
                <Link
                  href="/forge"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-mono font-bold text-black hover:bg-neutral-200 transition-all hover:-translate-y-0.5"
                >
                  <FolderGit2 className="h-4 w-4" />
                  <span>Open Protosem Forge Workspace</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Folder Mock Preview */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm glass-panel rounded-xl p-5 border border-white/15 space-y-3 shadow-glass-md hover:border-white/25 transition-all">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="font-mono text-[11px] text-white font-bold">WEEK {latestWeek.weekNumber}</span>
                  <span className="rounded-full bg-white/10 px-2 py-0.5 text-[9px] font-mono text-white border border-white/15">
                    {latestWeek.status}
                  </span>
                </div>
                <h4 className="font-serif text-sm font-bold text-white">{latestWeek.title}</h4>
                <p className="text-xs text-neutral-400">{latestWeek.summary}</p>
                <div className="pt-1 flex items-center justify-between text-[10px] font-mono text-neutral-400">
                  <span>{latestWeek.deliverables?.length || 0} Deliverables</span>
                  <span>{latestWeek.dateRange}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
