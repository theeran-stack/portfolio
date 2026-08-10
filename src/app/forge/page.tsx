"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { forgeWeeksData } from "@/content/forge";
import { 
  FolderGit2, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Users, 
  Sparkles, 
  Target, 
  AlertTriangle, 
  Lightbulb, 
  BookOpen, 
  Check, 
  Copy,
  Code,
  Compass,
  Image as ImageIcon,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

export default function ForgePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [expandedWeek, setExpandedWeek] = useState<number | null>(1); // Week 1 open by default
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activeLightbox, setActiveLightbox] = useState<{ weekNumber: number; imageIndex: number } | null>(null);

  const categories = ["All", "Completed", "In Progress"];

  const filteredWeeks = forgeWeeksData.filter((w) => {
    const matchesSearch = 
      w.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "All" || w.status === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const activeLightboxWeek = activeLightbox !== null 
    ? forgeWeeksData.find((w) => w.weekNumber === activeLightbox.weekNumber)
    : null;

  const currentGalleryItem = activeLightboxWeek && activeLightboxWeek.galleryImages 
    ? activeLightboxWeek.galleryImages[activeLightbox!.imageIndex]
    : null;

  const currentLightboxImageUrl = currentGalleryItem
    ? typeof currentGalleryItem === "string" ? currentGalleryItem : currentGalleryItem.url
    : "";

  const currentLightboxCaption = currentGalleryItem
    ? typeof currentGalleryItem === "string" ? `Week ${activeLightboxWeek?.weekNumber} Image` : currentGalleryItem.caption
    : "";

  const handleNextLightboxImage = () => {
    if (!activeLightboxWeek || !activeLightboxWeek.galleryImages) return;
    const total = activeLightboxWeek.galleryImages.length;
    setActiveLightbox((prev) => prev ? { ...prev, imageIndex: (prev.imageIndex + 1) % total } : null);
  };

  const handlePrevLightboxImage = () => {
    if (!activeLightboxWeek || !activeLightboxWeek.galleryImages) return;
    const total = activeLightboxWeek.galleryImages.length;
    setActiveLightbox((prev) => prev ? { ...prev, imageIndex: (prev.imageIndex - 1 + total) % total } : null);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeLightbox !== null) {
        if (e.key === "ArrowRight") handleNextLightboxImage();
        if (e.key === "ArrowLeft") handlePrevLightboxImage();
        if (e.key === "Escape") setActiveLightbox(null);
        return;
      }

      if (e.target instanceof HTMLInputElement) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setExpandedWeek((prev) => (prev === null ? 0 : Math.min(20, prev + 1)));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setExpandedWeek((prev) => (prev === null ? 0 : Math.max(0, prev - 1)));
      } else if (e.key === "Escape") {
        setExpandedWeek(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeLightbox, activeLightboxWeek]);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-10 py-6">
      
      {/* ARCHIVE HEADER */}
      <section className="space-y-4 text-center max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full glass-panel px-3.5 py-1 text-xs text-white border border-white/20"
        >
          <FolderGit2 className="h-3.5 w-3.5 text-white" />
          <span className="font-mono text-[11px] uppercase tracking-widest text-neutral-300 font-bold">PROTOSEM INTERNSHIP • FORGE EXPERIENCE</span>
        </motion.div>

        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white leading-tight">
          Forge Experience: Weeks 0–20
        </h1>

        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans max-w-2xl mx-auto">
          Forge Experience is where I document my weekly learning journey. Instead of simply showing what I built, I share how I learned, what challenges I faced, the solutions I explored, and the progress I made every week.
        </p>

        {/* Keyboard Helper Pill */}
        <div className="inline-flex items-center gap-2 rounded-full glass-panel px-3 py-0.5 text-[10px] font-mono text-neutral-400 border border-white/10">
          <span>Key Controls:</span>
          <kbd className="rounded bg-neutral-800 px-1 py-0.2 text-white border border-white/20">↑</kbd>
          <kbd className="rounded bg-neutral-800 px-1 py-0.2 text-white border border-white/20">↓</kbd>
          <span>Navigate</span>
          <span>•</span>
          <kbd className="rounded bg-neutral-800 px-1 py-0.2 text-white border border-white/20">ESC</kbd>
          <span>Collapse</span>
        </div>
      </section>

      {/* SEARCH BAR & CATEGORY FILTERS */}
      <section className="space-y-3">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search archive by title, topic, or keyword (e.g. 'Arduino', 'Sensors', 'Cables', 'PCB Rework')..."
            className="w-full rounded-xl glass-panel-elevated py-3 pl-11 pr-4 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-all border border-white/15"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-3.5 py-1 text-[11px] font-mono font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-white text-black font-bold"
                  : "glass-panel text-neutral-400 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* VERTICAL FORGE WORKSPACE ARCHIVE */}
      <section className="relative space-y-4 pt-2">
        
        {/* Central Vertical Timeline Line */}
        <div className="absolute left-4 sm:left-7 top-0 bottom-0 w-px bg-white/15 pointer-events-none" />

        {filteredWeeks.length === 0 ? (
          <div className="glass-panel rounded-2xl p-8 text-center space-y-2">
            <p className="text-xs text-neutral-400">No archive folders found for "{searchQuery}".</p>
            <button
              onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
              className="text-xs font-mono font-bold text-white hover:underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredWeeks.map((week) => {
            const isExpanded = expandedWeek === week.weekNumber;
            const isCompleted = week.status === "Completed";

            return (
              <motion.div
                key={week.id}
                layout
                className={`relative pl-9 sm:pl-14 transition-all duration-200 ${
                  isExpanded ? "z-20" : "z-10 opacity-90 hover:opacity-100"
                }`}
              >
                {/* Timeline Week Node */}
                <div
                  onClick={() => setExpandedWeek(isExpanded ? null : week.weekNumber)}
                  className={`absolute left-2 sm:left-[19px] top-5 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full border transition-all ${
                    isExpanded
                      ? "bg-white border-white text-black font-bold scale-110 shadow-glass-sm"
                      : isCompleted
                      ? "bg-neutral-800 border-white text-white"
                      : "bg-black border-white/30 text-neutral-500"
                  }`}
                >
                  <span className="text-[9px] font-mono">{week.weekNumber}</span>
                </div>

                {/* PHYSICAL FOLDER CONTAINER */}
                <div
                  className={`rounded-2xl transition-all duration-200 border overflow-hidden ${
                    isExpanded
                      ? "glass-panel-elevated border-white/40 shadow-2xl bg-neutral-900"
                      : "glass-panel border-white/10 hover:border-white/25"
                  }`}
                >
                  {/* FOLDER TAB HEADER */}
                  <div
                    onClick={() => setExpandedWeek(isExpanded ? null : week.weekNumber)}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-5 cursor-pointer select-none gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-white px-2.5 py-0.5 text-[10px] font-mono font-bold text-black shadow-sm">
                          WEEK {week.weekNumber}
                        </span>
                        <span className="rounded-full bg-white/10 px-2 py-0.2 text-[10px] font-mono text-neutral-300 border border-white/15">
                          {week.category}
                        </span>
                        {week.teamName && (
                          <span className="rounded-full bg-white/10 px-2 py-0.2 text-[10px] font-mono text-neutral-300 border border-white/15">
                            {week.teamName}
                          </span>
                        )}
                        <span className="text-[11px] text-neutral-500 font-mono">
                          {week.dateRange}
                        </span>
                      </div>

                      <h3 className="font-serif text-lg sm:text-xl font-bold text-white">
                        {week.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-center">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-mono border ${
                        isCompleted
                          ? "bg-white/10 text-white border-white/20 font-semibold"
                          : "bg-amber-500/10 text-amber-300 border-amber-500/30"
                      }`}>
                        {isCompleted ? <CheckCircle2 className="h-3 w-3 text-white" /> : <Clock className="h-3 w-3 text-amber-400" />}
                        <span>{week.status}</span>
                      </span>

                      <div className="flex h-7 w-7 items-center justify-center rounded-full glass-panel text-white">
                        {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                      </div>
                    </div>
                  </div>

                  {/* UNFOLDING DRAWER CONTENT */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="border-t border-white/10 p-5 sm:p-6 space-y-6 bg-black/40"
                      >
                        {/* Summary */}
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-white uppercase tracking-wider font-bold">OVERVIEW</span>
                          <div className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans space-y-3 whitespace-pre-line">
                            {week.summary}
                          </div>
                        </div>

                        {/* Objectives Checklist */}
                        {week.objectives && week.objectives.length > 0 && (
                          <div className="space-y-2">
                            <span className="text-[10px] font-mono text-white uppercase tracking-wider font-bold flex items-center gap-1">
                              <Target className="h-3.5 w-3.5 text-white" />
                              <span>OBJECTIVES</span>
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {week.objectives.map((obj, idx) => (
                                <div key={idx} className="flex items-start gap-2 glass-panel p-2.5 rounded-lg border border-white/10 text-xs text-neutral-300">
                                  <Check className="h-3.5 w-3.5 text-white shrink-0 mt-0.5" />
                                  <span>{obj}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Activities Completed */}
                        {week.activitiesCompleted && week.activitiesCompleted.length > 0 && (
                          <div className="space-y-2">
                            <span className="text-[10px] font-mono text-white uppercase tracking-wider font-bold flex items-center gap-1">
                              <Sparkles className="h-3.5 w-3.5 text-white" />
                              <span>ACTIVITIES COMPLETED</span>
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {week.activitiesCompleted.map((act, idx) => (
                                <div key={idx} className="flex items-start gap-2 glass-panel p-2.5 rounded-lg border border-white/10 text-xs text-neutral-300">
                                  <span className="h-1.5 w-1.5 rounded-full bg-white mt-1.5 shrink-0" />
                                  <span>{act}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* GALLERY IMAGES */}
                        {week.galleryImages && week.galleryImages.length > 0 && (
                          <div className="space-y-3 pt-2">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-mono text-white uppercase tracking-wider font-bold flex items-center gap-1.5">
                                <ImageIcon className="h-3.5 w-3.5 text-white" />
                                <span>PHOTO LOG & LAB GALLERY ({week.galleryImages.length} IMAGES)</span>
                              </span>
                              <span className="text-[10px] font-mono text-neutral-400">Click to expand</span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                              {week.galleryImages.map((imgItem, imgIdx) => {
                                const url = typeof imgItem === "string" ? imgItem : imgItem.url;
                                const caption = typeof imgItem === "string" ? `Week ${week.weekNumber} Photo ${imgIdx + 1}` : imgItem.caption;

                                return (
                                  <motion.div
                                    key={imgIdx}
                                    whileHover={{ scale: 1.02 }}
                                    onClick={() => setActiveLightbox({ weekNumber: week.weekNumber, imageIndex: imgIdx })}
                                    className="group relative cursor-pointer overflow-hidden rounded-xl glass-panel p-2 border border-white/15 hover:border-white/40 transition-all bg-black/60 shadow-md flex flex-col justify-between"
                                  >
                                    <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-neutral-950">
                                      <img
                                        src={url}
                                        alt={caption}
                                        loading="lazy"
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                      />
                                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30">
                                          <Maximize2 className="h-4 w-4" />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="pt-2 px-1">
                                      <p className="text-[11px] text-neutral-300 font-sans line-clamp-2 leading-snug group-hover:text-white transition-colors">
                                        {caption}
                                      </p>
                                    </div>
                                  </motion.div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* Challenges Faced */}
                        {week.challengesFaced && (
                          <div className="space-y-2 rounded-xl bg-amber-950/20 p-4 border border-amber-500/20">
                            <span className="text-[10px] font-mono text-amber-300 uppercase tracking-wider font-bold flex items-center gap-1">
                              <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />
                              <span>CHALLENGES FACED</span>
                            </span>
                            <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                              {week.challengesFaced}
                            </p>
                          </div>
                        )}

                        {/* Skills & Concepts Learned */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {week.skillsGained && (
                            <div className="space-y-2 glass-panel p-3.5 rounded-xl border border-white/10">
                              <span className="text-[10px] font-mono text-white uppercase tracking-wider block font-bold">SKILLS DEVELOPED</span>
                              <div className="flex flex-wrap gap-1">
                                {week.skillsGained.map((skill) => (
                                  <span key={skill} className="rounded bg-white/10 px-2 py-0.5 text-[10px] font-mono text-neutral-200 border border-white/15">
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {week.conceptsLearned && (
                            <div className="space-y-2 glass-panel p-3.5 rounded-xl border border-white/10">
                              <span className="text-[10px] font-mono text-white uppercase tracking-wider block font-bold">CONCEPTS LEARNED</span>
                              <div className="flex flex-wrap gap-1">
                                {week.conceptsLearned.map((concept) => (
                                  <span key={concept} className="rounded bg-white/10 px-2 py-0.5 text-[10px] font-mono text-neutral-200 border border-white/15">
                                    {concept}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Key Learnings */}
                        {week.keyLearnings && (
                          <div className="space-y-2 rounded-xl bg-neutral-900/80 p-4 border border-white/15">
                            <span className="text-[10px] font-mono text-white uppercase tracking-wider font-bold flex items-center gap-1">
                              <Lightbulb className="h-3.5 w-3.5 text-white" />
                              <span>KEY LEARNINGS</span>
                            </span>
                            <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                              {week.keyLearnings}
                            </p>
                          </div>
                        )}

                        {/* Reflection */}
                        {week.reflection && (
                          <div className="space-y-2 rounded-xl bg-neutral-900 p-4 border border-white/20">
                            <span className="text-[10px] font-mono text-white uppercase tracking-wider font-bold flex items-center gap-1">
                              <Compass className="h-3.5 w-3.5 text-white" />
                              <span>WEEK REFLECTION</span>
                            </span>
                            <p className="text-xs text-neutral-200 italic leading-relaxed font-serif">
                              "{week.reflection}"
                            </p>
                          </div>
                        )}

                        {/* Deliverables & Team Credits (if present) */}
                        {week.deliverables && week.deliverables.length > 0 && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                            
                            <div className="space-y-2 glass-panel p-4 rounded-xl border border-white/10">
                              <div className="flex items-center gap-1.5 text-[10px] font-mono text-white uppercase font-bold">
                                <FileText className="h-3.5 w-3.5" />
                                <span>DELIVERABLES ({week.deliverables.length})</span>
                              </div>
                              <ul className="space-y-1.5">
                                {week.deliverables.map((d, idx) => (
                                  <li key={idx} className="flex items-center justify-between text-xs text-neutral-300">
                                    <span>{d.title}</span>
                                    <span className="rounded bg-white/10 px-1.5 py-0.2 text-[9px] font-mono text-white border border-white/15">
                                      {d.type}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {week.teamCredits && (
                              <div className="space-y-2 glass-panel p-4 rounded-xl border border-white/10">
                                <div className="flex items-center gap-1.5 text-[10px] font-mono text-white uppercase font-bold">
                                  <Users className="h-3.5 w-3.5" />
                                  <span>CONTRIBUTOR CREDITS</span>
                                </div>
                                <ul className="space-y-1.5">
                                  {week.teamCredits.map((c, idx) => (
                                    <li key={idx} className="flex items-center justify-between text-xs text-neutral-300">
                                      <span className="text-neutral-500">{c.role}</span>
                                      <span className="font-semibold text-white">{c.name}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                          </div>
                        )}

                        {/* Optional Code Snippet */}
                        {week.codeSnippet && (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-[10px] font-mono">
                              <span className="text-white uppercase flex items-center gap-1 font-bold">
                                <Code className="h-3.5 w-3.5" />
                                <span>{week.codeSnippet.filename}</span>
                              </span>
                              <button
                                onClick={() => handleCopyCode(week.codeSnippet!.code)}
                                className="flex items-center gap-1 rounded bg-neutral-900 px-2 py-0.5 text-neutral-300 hover:text-white transition-colors border border-white/15"
                              >
                                {copiedCode === week.codeSnippet.code ? (
                                  <>
                                    <Check className="h-3 w-3 text-white" />
                                    <span className="text-white">Copied</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="h-3 w-3" />
                                    <span>Copy Code</span>
                                  </>
                                )}
                              </button>
                            </div>
                            <pre className="rounded-xl bg-black p-3.5 overflow-x-auto text-[11px] font-mono text-neutral-300 border border-white/15">
                              <code>{week.codeSnippet.code}</code>
                            </pre>
                          </div>
                        )}

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 pt-1 border-t border-white/10">
                          {week.tags.map((t) => (
                            <span key={t} className="rounded bg-neutral-900 px-2 py-0.2 text-[9px] font-mono text-neutral-400 border border-white/10">
                              #{t}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })
        )}
      </section>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {activeLightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 sm:p-8"
          >
            <button
              onClick={() => setActiveLightbox(null)}
              className="absolute top-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full glass-panel text-white hover:bg-white/20 transition-all border border-white/20"
            >
              <X className="h-5 w-5" />
            </button>

            <button
              onClick={handlePrevLightboxImage}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 flex h-11 w-11 items-center justify-center rounded-full glass-panel text-white hover:bg-white/20 transition-all border border-white/20"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              onClick={handleNextLightboxImage}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 flex h-11 w-11 items-center justify-center rounded-full glass-panel text-white hover:bg-white/20 transition-all border border-white/20"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <div className="max-w-4xl w-full space-y-4 text-center">
              <div className="relative inline-block overflow-hidden rounded-2xl glass-panel-elevated p-3 border border-white/25 shadow-2xl max-h-[75vh]">
                <img
                  src={currentLightboxImageUrl}
                  alt={currentLightboxCaption}
                  className="max-h-[70vh] max-w-full object-contain rounded-xl mx-auto"
                />
              </div>
              <div className="space-y-1 max-w-xl mx-auto">
                <p className="text-sm font-semibold text-white">{currentLightboxCaption}</p>
                <p className="text-xs font-mono text-neutral-400">
                  Week {activeLightboxWeek?.weekNumber} • Image {activeLightbox.imageIndex + 1} of {activeLightboxWeek?.galleryImages?.length}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
