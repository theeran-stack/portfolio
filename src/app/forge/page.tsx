// @/app/forge/page.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { forgeWeeksData } from '@/content/forge.content';
import { ForgeGalleryImage } from '@/types/forge.types';
import { ForgeWeekItem } from '@/types/forge.types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Lightbox } from '@/components/ui/Lightbox';
import { GithubIcon, LinkedinIcon } from '@/components/shared/BrandIcons';
import { GalleryItem } from '@/types/portfolio.types';
import {
  Folder,
  FileText,
  Terminal,
  ChevronRight,
  CheckCircle2,
  Maximize2,
  Sparkles,
  Layers,
  Command,
  Code2,
  Lightbulb,
  X, Trash2, Upload, Loader2, Save, AlertTriangle, Edit3, Lock,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';


const DB_NAME = "ProtoSemArchive";
const DB_VERSION = 1;
const STORE_NAME = "CustomWeeks";

function getIDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !window.indexedDB) {
      reject(new Error("IndexedDB is not available."));
      return;
    }
    const req = window.indexedDB.open(DB_NAME, DB_VERSION);
    req.onerror = () => reject(req.error);
    req.onsuccess = () => resolve(req.result);
    req.onupgradeneeded = (e) => {
      const db = (e.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) db.createObjectStore(STORE_NAME);
    };
  });
}

async function saveCustomWeeksToDB(weeks: any[]): Promise<void> {
  const db = await getIDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const req = store.put(weeks, "weeks_data");
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

async function loadCustomWeeksFromDB(): Promise<any[] | null> {
  try {
    const db = await getIDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const req = store.get("weeks_data");
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
  } catch(e) { return null; }
}

const isVideoUrl = (url: string, type?: string) => type === "video" || !!url.match(/\.(mp4|webm|ogg)$/i);

export default function ForgeSignaturePage() {
  const [selectedWeekId, setSelectedWeekId] = useState<string>('week-00');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSemester, setSelectedSemester] = useState<string>('All');
  const [activeFileTab, setActiveFileTab] = useState<'overview' | 'tech' | 'team' | 'challenges' | 'reflection'>('overview');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isFolderStackExpanded, setIsFolderStackExpanded] = useState<boolean>(false);

  const [weeks, setWeeks] = useState(forgeWeeksData);
  const [isAdmin, setIsAdmin] = useState(false);
  const [editingWeek, setEditingWeek] = useState<any>(null);
  const [activeEditorTab, setActiveEditorTab] = useState("general");
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const unlocked = localStorage.getItem("protosem_admin_unlocked") === "true";
      setIsAdmin(unlocked);
      loadCustomWeeksFromDB().then((saved) => {
        if (saved && Array.isArray(saved) && saved.length > 0) {
          const merged = forgeWeeksData.map(d => saved.find(s => s.weekNumber === d.weekNumber) || d);
          setWeeks(merged);
        }
      });
    }
  }, []);

  const handleLockAdmin = () => {
    localStorage.removeItem("protosem_admin_unlocked");
    setIsAdmin(false);
  };

  const handleSaveWeekEdit = async () => {
    if (!editingWeek) return;
    setIsSaving(true);
    setSaveError(null);
    try {
      const updated = weeks.map(w => w.weekNumber === editingWeek.weekNumber ? editingWeek : w);
      await saveCustomWeeksToDB(updated);
      setWeeks(updated);
      setEditingWeek(null);
    } catch(err: any) {
      setSaveError(err.message || "Failed to save.");
    } finally {
      setIsSaving(false);
    }
  };


  // Keyboard shortcut listener for Cmd+K / Ctrl+K (Raycast style)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const selectedWeek: ForgeWeekItem =
    weeks.find((w: any) => w.id === selectedWeekId) || (weeks as any)[0];

  const filteredWeeks = weeks.filter((w: any) => {
    const matchesSemester =
      selectedSemester === 'All' || w.category === selectedSemester;
    const matchesSearch =
      w.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (w.tags && w.tags.some((t: string) =>
        t.toLowerCase().includes(searchQuery.toLowerCase())
      )) ||
      (w.summary && w.summary.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSemester && matchesSearch;
  });

  // Mock gallery items generated for stacked photo physical interaction
  const galleryItems: GalleryItem[] = ((selectedWeek.galleryImages || [
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1618401471353-b98aedd04e11?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop',
  ]) as (string | {url: string})[]).map((img, i) => {
    const url = typeof img === 'string' ? img : img.url;
    return {
    id: `photo-${i}`,
    title: `${selectedWeek.title} — Artifact Photo ${i + 1}`,
    category: 'Cinematography',
    imageUrl: url,
    aspectRatio: 'landscape',
    date: selectedWeek.dateRange,
    caption: `I documented key engineering artifacts during ${selectedWeek.title}.`,
  };
});

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

      {isAdmin && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between gap-4 px-4 py-2 bg-emerald-950/80 border border-emerald-500/30 rounded-full backdrop-blur-md shadow-2xl text-emerald-300">
          <span className="text-[10px] font-mono font-bold tracking-widest uppercase">PROTOSEM ADMIN EDIT MODE ACTIVE</span>
          <button onClick={handleLockAdmin} className="flex items-center gap-1.5 px-2 py-1 rounded bg-black/40 hover:bg-black/60 transition-colors text-[10px] font-mono">
            <Lock className="h-3 w-3" />
            Lock
          </button>
        </div>
      )}

      {/* Signature Section Header */}
      <div className="relative">
        <SectionHeading
          badge="Signature Experience"
          badgeIcon={Sparkles}
          title="Forge Workspace Studio"
          subtitle="An interactive operating system workspace documenting my 20+ engineering weeks. Physical folder depth, fluid layout morphing, and zero webpage reloads."
        />

        {/* Command Palette Trigger Pill */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4 bg-[var(--bg-glass)] border border-[var(--border-subtle)] backdrop-blur-xl p-3 rounded-2xl">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCommandPaletteOpen(true)}
              className="flex items-center gap-3 px-4 py-2 bg-[var(--bg-tertiary)] hover:bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-subtle)] hover:border-[var(--border-glow)] rounded-xl text-xs font-mono transition-all cursor-pointer shadow-inner"
            >
              <Command className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
              <span>Search workspace...</span>
              <kbd className="px-1.5 py-0.5 rounded bg-[var(--bg-primary)] text-[10px] text-[var(--text-muted)] border border-[var(--border-subtle)]">
                ⌘K
              </kbd>
            </button>

            {/* Semester Filter Tabs */}
            <div className="flex items-center gap-1 bg-[var(--bg-primary)] p-1 rounded-xl border border-[var(--border-subtle)]">
              {['All', 'Semester 1', 'Semester 2'].map((sem) => (
                <button
                  key={sem}
                  onClick={() => setSelectedSemester(sem)}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    selectedSemester === sem
                      ? 'bg-[var(--accent-primary)] text-white shadow-sm'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {sem}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>21 Weeks Loaded</span>
          </div>
        </div>
      </div>

      
{/* ADMIN EDIT MODAL */}
<AnimatePresence>
  {editingWeek && (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <motion.div initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:0.95}} className="w-full max-w-3xl bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl flex flex-col my-8">
        <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between sticky top-0 bg-[#0a0a0a] z-10 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <Edit3 className="h-5 w-5 text-emerald-400" />
            <h2 className="text-sm sm:text-base font-mono font-bold text-white uppercase">Edit Week {editingWeek.weekNumber} Content</h2>
          </div>
          <button onClick={() => setEditingWeek(null)} className="p-2 rounded-lg hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"><X className="h-5 w-5" /></button>
        </div>
        <div className="p-4 sm:p-6 flex-1 flex flex-col gap-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/10">
            <button onClick={() => setActiveEditorTab("general")} className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold ${activeEditorTab === "general" ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40" : "text-neutral-400"}`}>General Details</button>
            <button onClick={() => setActiveEditorTab("gallery")} className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold ${activeEditorTab === "gallery" ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40" : "text-neutral-400"}`}>Gallery & Media</button>
          </div>
          {activeEditorTab === "general" && (
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-neutral-300 font-bold uppercase">Title</label>
                  <input type="text" value={editingWeek.title} onChange={(e) => setEditingWeek({ ...editingWeek, title: e.target.value })} className="w-full rounded-xl p-2.5 text-white border border-white/15 bg-black/40 focus:outline-none focus:border-white" />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-neutral-300 font-bold uppercase">Subtitle</label>
                  <input type="text" value={editingWeek.subtitle} onChange={(e) => setEditingWeek({ ...editingWeek, subtitle: e.target.value })} className="w-full rounded-xl p-2.5 text-white border border-white/15 bg-black/40 focus:outline-none focus:border-white" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-mono text-neutral-300 font-bold uppercase">Summary / Overview</label>
                <textarea rows={4} value={editingWeek.summary} onChange={(e) => setEditingWeek({ ...editingWeek, summary: e.target.value })} className="w-full rounded-xl p-2.5 text-white border border-white/15 bg-black/40 focus:outline-none focus:border-white font-sans" />
              </div>
            </div>
          )}
          {activeEditorTab === "gallery" && (
            <div className="space-y-4">
              <span className="text-xs font-mono text-neutral-300 font-bold uppercase">GALLERY MEDIA LIST ({(editingWeek.galleryImages || []).length} ITEMS)</span>
              {editingWeek.galleryImages && editingWeek.galleryImages.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-60 overflow-y-auto pr-1">
                  {editingWeek.galleryImages.map((imgItem: any, imgIdx: number) => {
                    const url = typeof imgItem === "string" ? imgItem : imgItem.url;
                    const caption = typeof imgItem === "string" ? `Media ${imgIdx + 1}` : imgItem.caption;
                    return (
                      <div key={imgIdx} className="flex items-center gap-3 p-2.5 rounded-xl border border-white/15 bg-black/50">
                        <div className="h-12 w-16 shrink-0 overflow-hidden rounded-lg bg-black relative">
                          <img src={url} alt={caption} className="h-full w-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0"><p className="text-xs font-semibold text-white truncate">{caption}</p></div>
                        <button onClick={() => { const updated = (editingWeek.galleryImages || []).filter((_: any, i: number) => i !== imgIdx); setEditingWeek({ ...editingWeek, galleryImages: updated }); }} className="p-1.5 rounded-lg bg-red-500/20 text-red-300"><Trash2 className="h-3.5 w-3.5" /></button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
          {saveError && (
            <div className="rounded-xl border border-red-500/40 bg-red-950/40 p-3 text-xs text-red-300 flex items-center gap-2"><AlertTriangle className="h-4 w-4 shrink-0" /><span>{saveError}</span></div>
          )}
        </div>
        <div className="p-4 sm:p-6 border-t border-white/10 flex items-center justify-end gap-3 sticky bottom-0 bg-[#0a0a0a] z-10 rounded-b-2xl">
          <button disabled={isSaving} onClick={() => setEditingWeek(null)} className="rounded-full px-5 py-2.5 text-xs font-mono text-neutral-400 hover:text-white border border-white/10">Cancel</button>
          <button disabled={isSaving} onClick={handleSaveWeekEdit} className="flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-xs font-mono font-bold text-black hover:bg-neutral-200 transition-all shadow-md">
            {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            <span>Save Changes</span>
          </button>
        </div>
      </motion.div>
    </div>
  )}
</AnimatePresence>

{/* Main Spatial Studio Workspace Container */}
      <div className="relative bg-[var(--bg-glass)] border border-[var(--border-strong)] rounded-3xl overflow-hidden shadow-2xl backdrop-blur-2xl flex flex-col min-h-[740px]">
        {/* Spatial Window Header */}
        <div className="bg-[var(--bg-tertiary)] border-b border-[var(--border-subtle)] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-rose-500/80 shadow-inner" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80 shadow-inner" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80 shadow-inner" />
            </div>
            <span className="text-xs font-mono text-[var(--text-muted)]">
              workspace / forge / {selectedWeek.id} / {activeFileTab}.ts
            </span>
          </div>

          <div className="flex items-center gap-3">
            
  {isAdmin && (
    <Button variant="ghost" size="sm" onClick={() => { setEditingWeek(selectedWeek); setActiveEditorTab("general"); }} className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 mr-2">
      <Edit3 className="w-4 h-4 mr-2"/> Edit
    </Button>
  )}

<Link href={`/forge/${selectedWeek.id}`}>
              <Button variant="ghost" size="sm" icon={Maximize2}>
                Full Document View
              </Button>
            </Link>
          </div>
        </div>

        {/* Studio Body: Folder Sidebar + Document Stage */}
        <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
          {/* Left Spatial Folder Carousel Sidebar */}
          <div className="w-full lg:w-88 bg-[var(--bg-secondary)] border-b lg:border-b-0 lg:border-r border-[var(--border-subtle)] p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)]">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-primary)] flex items-center gap-2">
                <Folder className="w-4 h-4 text-amber-400" />
                Physical Week Folders
              </span>
              <span className="text-[11px] font-mono text-[var(--text-muted)]">
                {filteredWeeks.length} Folders
              </span>
            </div>

            {/* Folder List with 3D physical depth & hover spring */}
            <div className="flex-1 overflow-y-auto max-h-[560px] space-y-2.5 pr-1 custom-scrollbar">
              {filteredWeeks.map((w) => {
                const isActive = w.id === selectedWeek.id;
                return (
                  <motion.button
                    key={w.id}
                    onClick={() => {
                      setSelectedWeekId(w.id);
                      setActiveFileTab('overview');
                    }}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden group ${
                      isActive
                        ? 'bg-gradient-to-r from-[var(--accent-primary)] to-indigo-600 text-white border-transparent shadow-xl shadow-[var(--accent-glow)]'
                        : 'bg-[var(--bg-tertiary)]/70 text-[var(--text-secondary)] border-[var(--border-subtle)] hover:border-[var(--border-strong)] hover:bg-[var(--bg-surface)]'
                    }`}
                  >
                    {/* Active Folder Ambient Sheen */}
                    {isActive && (
                      <motion.div
                        layoutId="active-folder-sheen"
                        className="absolute inset-0 bg-white/10 pointer-events-none"
                        transition={{ type: 'spring', stiffness: 300, damping: 26 }}
                      />
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-xl transition-transform ${
                            isActive
                              ? 'bg-white/20 text-white shadow-inner'
                              : 'bg-[var(--bg-primary)] text-amber-400 group-hover:rotate-6'
                          }`}
                        >
                          <Folder className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="font-mono font-bold text-xs block">
                            {w.id.toUpperCase()}
                          </span>
                          <span className="text-[11px] font-medium opacity-80 block truncate max-w-[170px]">
                            {w.title.replace(/^Week \d+:\s*/, '')}
                          </span>
                        </div>
                      </div>

                      <ChevronRight
                        className={`w-4 h-4 transition-transform ${
                          isActive
                            ? 'translate-x-1 text-white'
                            : 'opacity-40 group-hover:translate-x-1'
                        }`}
                      />
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Right Main Document Stage */}
          <div className="flex-1 p-6 sm:p-8 flex flex-col gap-6 overflow-y-auto bg-[var(--bg-primary)]/50 relative">
            {/* Ambient Stage Background Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--accent-glow)] rounded-full blur-3xl opacity-20 pointer-events-none" />

            {/* Document Header Panel */}
            <div className="space-y-4 pb-6 border-b border-[var(--border-subtle)]">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Badge variant="accent">{selectedWeek.category}</Badge>
                  <span className="text-xs font-mono text-[var(--text-muted)]">
                    {selectedWeek.dateRange}
                  </span>
                </div>

                {selectedWeek.repoLink && (
                  <a
                    href={selectedWeek.repoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="glass" size="sm" icon={GithubIcon}>
                      View Week Source Code
                    </Button>
                  </a>
                )}
              </div>

              <div>
                <h2 className="text-3xl font-black tracking-tight text-[var(--text-primary)]">
                  {selectedWeek.title}
                </h2>
                <p className="text-sm text-[var(--text-secondary)] mt-1 font-medium">
                  {selectedWeek.subtitle}
                </p>
              </div>
            </div>

            {/* Document File Tabs Bar (VS Code / Linear style) */}
            <div className="flex flex-wrap gap-2 border-b border-[var(--border-subtle)] pb-3">
              {[
                { id: 'overview', name: 'overview.md', icon: FileText },
                { id: 'tech', name: 'technologies.json', icon: Terminal },
                { id: 'team', name: 'team.ts', icon: LinkedinIcon },
                { id: 'challenges', name: 'challenges.md', icon: FileText },
                { id: 'reflection', name: 'reflection.md', icon: FileText },
              ].map((tab) => {
                const isActive = activeFileTab === tab.id;
                const TabIcon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveFileTab(tab.id as 'overview' | 'tech' | 'team' | 'challenges' | 'reflection')}
                    className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                      isActive
                        ? 'text-[var(--text-primary)] font-bold shadow-sm'
                        : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-file-tab"
                        className="absolute inset-0 bg-[var(--accent-glow)] border border-[var(--border-glow)] rounded-xl"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                    <TabIcon className="w-3.5 h-3.5 relative z-10 text-[var(--accent-primary)]" />
                    <span className="relative z-10">{tab.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Document Content Viewport */}
            <div className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl p-6 min-h-[320px] shadow-inner">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFileTab + selectedWeek.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                >
                  {activeFileTab === 'overview' && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-[var(--accent-primary)] font-mono text-sm font-bold">
                        <FileText className="w-4 h-4" />
                        <span># Executive Overview</span>
                      </div>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-normal">
                        {selectedWeek.summary}
                      </p>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-normal">
                        {selectedWeek.summary}
                      </p>
                    </div>
                  )}

                  {activeFileTab === 'tech' && (
                    <div className="space-y-5 font-mono text-xs">
                      <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                        <Code2 className="w-4 h-4" />
                        <span>{"// Technologies & Skills Architecture"}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {selectedWeek.tags.map((t) => (
                          <Badge key={t} variant="accent">
                            {t}
                          </Badge>
                        ))}
                      </div>

                      <div className="pt-4 border-t border-[var(--border-subtle)] space-y-3">
                        <span className="text-[var(--text-muted)] font-bold block">
                          Key Skills Mastered:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[var(--text-secondary)]">
                          {(selectedWeek.skillsGained || []).map((s, i) => (
                            <div
                              key={i}
                              className="flex items-center gap-2 p-2 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-subtle)]"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                              <span>{s}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeFileTab === 'team' && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-indigo-400 font-mono text-sm font-bold">
                        <LinkedinIcon className="w-4 h-4" />
                        <span># Team Members & Collaborators</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {(selectedWeek.teamCredits || []).map((m) => (
                          <div
                            key={m.name}
                            className="p-4 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] flex items-center justify-between hover:border-[var(--border-glow)] transition-all"
                          >
                            <div>
                              <span className="font-bold text-sm text-[var(--text-primary)] block">
                                {m.name}
                              </span>
                              <span className="text-xs text-[var(--text-muted)]">
                                {m.role}
                              </span>
                            </div>
                            <a
                              href={'#'}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-lg bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-indigo-400 transition-colors"
                            >
                              <LinkedinIcon className="w-4 h-4" />
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeFileTab === 'challenges' && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-rose-400 font-mono text-sm font-bold">
                        <Layers className="w-4 h-4" />
                        <span># Technical Challenges Solved</span>
                      </div>
                      <div className="space-y-3">
                        {(selectedWeek.challengesFaced ? [selectedWeek.challengesFaced] : []).map((c, i) => (
                          <div
                            key={i}
                            className="p-4 rounded-xl bg-rose-500/5 border border-rose-500/20 text-sm text-[var(--text-secondary)] leading-relaxed"
                          >
                            <span className="font-bold text-rose-400 mr-2">
                              Challenge #{i + 1}:
                            </span>
                            <span>{c}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeFileTab === 'reflection' && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-amber-400 font-mono text-sm font-bold">
                        <Lightbulb className="w-4 h-4" />
                        <span># My Personal Reflection</span>
                      </div>
                      <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/20 text-sm text-[var(--text-secondary)] italic leading-relaxed">
                        &quot;{selectedWeek.reflection}&quot;
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Physical Stacked Photos Interaction Section */}
            <div className="space-y-4 pt-4 border-t border-[var(--border-subtle)]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-primary)]">
                  Artifact Photographs & Media Stack
                </span>
                <button
                  onClick={() => setIsFolderStackExpanded(!isFolderStackExpanded)}
                  className="text-xs text-[var(--accent-primary)] hover:underline font-mono cursor-pointer"
                >
                  {isFolderStackExpanded ? 'Collapse Stack' : 'Fan Out Photographs'}
                </button>
              </div>

              <div className="relative py-4 flex items-center justify-center min-h-[160px]">
                {galleryItems.map((photo, idx) => {
                  const rotations = [-4, 2, 6];
                  const offsets = [-15, 0, 15];
                  const rotation = isFolderStackExpanded ? 0 : rotations[idx % 3];
                  const xOffset = isFolderStackExpanded
                    ? (idx - 1) * 220
                    : offsets[idx % 3];

                  return (
                    <motion.div
                      key={photo.id}
                      onClick={() => setLightboxIndex(idx)}
                      animate={{
                        rotate: rotation,
                        x: xOffset,
                        y: isFolderStackExpanded ? 0 : idx * -6,
                      }}
                      whileHover={{ scale: 1.08, zIndex: 30 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                      className="absolute w-52 h-32 rounded-xl overflow-hidden border-2 border-white/20 shadow-2xl bg-black cursor-pointer group"
                    >
                      {/* eslint-disable-next-html-element-suppression */}
                      <img
                        src={photo.imageUrl}
                        alt={photo.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity p-2 flex items-end">
                        <span className="text-[10px] text-white font-mono truncate">
                          {photo.title}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox for physical photograph stack */}
      <Lightbox
        items={galleryItems}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
      />

      {/* Raycast-style Command Palette Modal */}
      <AnimatePresence>
        {isCommandPaletteOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center pt-24 bg-black/80 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: -20 }}
              className="max-w-xl w-full bg-[var(--bg-glass)] border border-[var(--border-strong)] rounded-2xl shadow-2xl overflow-hidden p-4 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
                <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent-primary)] font-bold">
                  <Command className="w-4 h-4" />
                  <span>Raycast Workspace Search</span>
                </div>
                <button
                  onClick={() => setIsCommandPaletteOpen(false)}
                  className="p-1 rounded-lg text-[var(--text-muted)] hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <input
                type="text"
                autoFocus
                placeholder="Search across all 21 Forge weeks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 bg-[var(--bg-tertiary)] text-sm text-[var(--text-primary)] rounded-xl border border-[var(--border-subtle)] focus:outline-none focus:border-[var(--accent-primary)] font-mono"
              />

              <div className="max-h-64 overflow-y-auto space-y-1">
                {filteredWeeks.map((w) => (
                  <button
                    key={w.id}
                    onClick={() => {
                      setSelectedWeekId(w.id);
                      setIsCommandPaletteOpen(false);
                    }}
                    className="w-full text-left p-3 rounded-xl hover:bg-[var(--bg-surface)] flex items-center justify-between text-xs font-mono transition-colors"
                  >
                    <span className="font-bold text-[var(--text-primary)]">
                      {w.id.toUpperCase()}: {w.title}
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

