"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { forgeWeeksData, ForgeWeekItem, ForgeGalleryImage } from "@/content/forge";
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
  ChevronRight,
  Edit3,
  Plus,
  Trash2,
  Save,
  Lock,
  RotateCcw,
  ShieldAlert,
  Upload,
  UploadCloud,
  ImagePlus,
  Loader2,
  RefreshCw,
  FileUp,
  Video,
  Play,
  Film
} from "lucide-react";

/**
 * Utility to check if a media URL or item type corresponds to a video file.
 */
function isVideoUrl(url: string, itemType?: string): boolean {
  if (itemType === "video") return true;
  if (!url) return false;
  if (url.startsWith("data:video/")) return true;
  const lower = url.toLowerCase();
  return (
    lower.endsWith(".mp4") ||
    lower.endsWith(".webm") ||
    lower.endsWith(".ogg") ||
    lower.endsWith(".mov") ||
    lower.endsWith(".m4v") ||
    lower.includes("youtube.com") ||
    lower.includes("youtu.be") ||
    lower.includes("vimeo.com")
  );
}

/**
 * Utility to read a video file from disk as a Data URL.
 * Includes client-side size check to prevent localStorage quota errors.
 */
function readVideoFile(file: File): Promise<{ url: string; type: "video" }> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith("video/")) {
      reject(new Error("Selected file is not a valid video format. Please select an MP4, WebM, OGG or MOV file."));
      return;
    }
    const MAX_VIDEO_SIZE = 15 * 1024 * 1024; // 15MB
    if (file.size > MAX_VIDEO_SIZE) {
      reject(new Error(`Video file size (${(file.size / (1024 * 1024)).toFixed(1)}MB) exceeds 15MB. Please upload a smaller video file to save in local storage.`));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Failed to read video file from disk."));
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (!dataUrl) {
        reject(new Error("Video content is empty."));
        return;
      }
      resolve({ url: dataUrl, type: "video" });
    };
    reader.readAsDataURL(file);
  });
}

/**
 * Client-side utility to read an image file from the local disk/system
 * and compress it using HTML5 Canvas before producing a Data URL.
 * Prevents localStorage quota overflow (~5MB) while keeping crisp visual quality.
 */
function compressAndReadImage(file: File, maxWidth = 1200, maxHeight = 1200, quality = 0.85): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/")) {
      reject(new Error("Selected file is not a valid image format. Please select a PNG, JPG, WebP or GIF."));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Failed to read image file from disk."));
    reader.onload = (e) => {
      const rawDataUrl = e.target?.result as string;
      if (!rawDataUrl) {
        reject(new Error("Image content is empty."));
        return;
      }

      const img = new Image();
      img.onerror = () => reject(new Error("Failed to decode image data."));
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          resolve(rawDataUrl);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        try {
          const webpDataUrl = canvas.toDataURL("image/webp", quality);
          if (webpDataUrl && webpDataUrl.startsWith("data:image/webp")) {
            resolve(webpDataUrl);
            return;
          }
        } catch {
          // ignore webp fallback
        }

        try {
          const jpegDataUrl = canvas.toDataURL("image/jpeg", quality);
          resolve(jpegDataUrl);
        } catch {
          resolve(rawDataUrl);
        }
      };
      img.src = rawDataUrl;
    };
    reader.readAsDataURL(file);
  });
}

export default function ForgePage() {
  const [weeks, setWeeks] = useState<ForgeWeekItem[]>(forgeWeeksData);
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [expandedWeek, setExpandedWeek] = useState<number | null>(1); // Week 1 open by default
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activeLightbox, setActiveLightbox] = useState<{ weekNumber: number; imageIndex: number } | null>(null);

  // Week Editor Modal State
  const [editingWeek, setEditingWeek] = useState<ForgeWeekItem | null>(null);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newImageCaption, setNewImageCaption] = useState("");
  const [newMediaType, setNewMediaType] = useState<"image" | "video">("image");
  const [activeEditorTab, setActiveEditorTab] = useState<"general" | "lists" | "text" | "gallery">("general");

  // System Image File Upload States
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [targetReplaceIdx, setTargetReplaceIdx] = useState<number | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const replaceFileInputRef = useRef<HTMLInputElement>(null);

  const categories = ["All", "Completed", "In Progress"];

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Check Admin Auth state from secret contact password
      const auth = localStorage.getItem("protosem_admin_authenticated");
      if (auth === "true") {
        setIsAdmin(true);
      }

      // Check Saved Custom Weeks Data
      const saved = localStorage.getItem("protosem_custom_weeks_data");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setWeeks(parsed);
          }
        } catch (e) {
          console.error("Failed to parse custom weeks from localStorage", e);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (editingWeek) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [editingWeek]);

  const handleSaveWeekEdit = () => {
    if (!editingWeek) return;
    const updatedWeeks = weeks.map((w) => (w.weekNumber === editingWeek.weekNumber ? editingWeek : w));
    setWeeks(updatedWeeks);
    if (typeof window !== "undefined") {
      localStorage.setItem("protosem_custom_weeks_data", JSON.stringify(updatedWeeks));
    }
    setEditingWeek(null);
  };

  const handleSystemFileUpload = async (file: File, replaceIdx?: number | null) => {
    if (!file) return;
    setIsUploading(true);
    setUploadError(null);

    try {
      let resultUrl = "";
      let mediaType: "image" | "video" = "image";

      if (file.type.startsWith("video/")) {
        const videoRes = await readVideoFile(file);
        resultUrl = videoRes.url;
        mediaType = "video";
      } else if (file.type.startsWith("image/")) {
        resultUrl = await compressAndReadImage(file);
        mediaType = "image";
      } else {
        throw new Error("Unsupported file format. Please select an Image (PNG, JPG, WebP) or Video (MP4, WebM, MOV).");
      }

      if (!editingWeek) return;

      const autoCaption = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
      const defaultCaption = autoCaption || `Week ${editingWeek.weekNumber} ${mediaType === "video" ? "Video" : "Photo"}`;

      if (replaceIdx !== undefined && replaceIdx !== null) {
        const updated = [...(editingWeek.galleryImages || [])];
        const existingItem = updated[replaceIdx];
        const existingCaption = typeof existingItem === "string" ? "" : existingItem.caption;
        updated[replaceIdx] = { 
          url: resultUrl, 
          caption: existingCaption || defaultCaption,
          type: mediaType
        };
        setEditingWeek({ ...editingWeek, galleryImages: updated });
      } else {
        setNewImageUrl(resultUrl);
        setNewMediaType(mediaType);
        if (!newImageCaption) {
          setNewImageCaption(defaultCaption);
        }
      }
    } catch (err: any) {
      console.error("Media upload error:", err);
      setUploadError(err?.message || "Failed to process media file from system.");
    } finally {
      setIsUploading(false);
      setTargetReplaceIdx(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleSystemFileUpload(file);
    }
  };

  const handleLockAdmin = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("protosem_admin_authenticated");
    }
    setIsAdmin(false);
  };

  const handleResetWeeks = () => {
    if (confirm("Are you sure you want to reset all week edits and restore defaults?")) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("protosem_custom_weeks_data");
      }
      setWeeks(forgeWeeksData);
    }
  };

  const filteredWeeks = weeks.filter((w) => {
    const matchesSearch = 
      w.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "All" || w.status === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const activeLightboxWeek = activeLightbox !== null 
    ? weeks.find((w) => w.weekNumber === activeLightbox.weekNumber)
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

      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

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
      
      {/* ADMIN CONTROL BAR (Visible when unlocked via password on contact page) */}
      {isAdmin && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel-elevated rounded-2xl p-4 border border-emerald-500/40 bg-emerald-950/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono shadow-lg"
        >
          <div className="flex items-center gap-2 text-emerald-300 font-bold">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <ShieldAlert className="h-4 w-4 text-emerald-400" />
            <span>PROTOSEM ADMIN EDIT MODE ACTIVE</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleResetWeeks}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass-panel hover:bg-neutral-800 text-neutral-300 border border-white/10 transition-all"
              title="Reset all custom week edits to default static data"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset Defaults</span>
            </button>
            <button
              onClick={handleLockAdmin}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 font-bold transition-all"
            >
              <Lock className="h-3.5 w-3.5" />
              <span>Lock Admin</span>
            </button>
          </div>
        </motion.div>
      )}

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
            placeholder="Search archive by title, topic, or keyword (e.g. 'Arduino', 'Sensors', 'MIT App', 'Fusion 360')..."
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
                      {/* EDIT WEEK BUTTON (When Admin is Unlocked) */}
                      {isAdmin && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingWeek(JSON.parse(JSON.stringify(week)));
                            setNewImageUrl("");
                            setNewImageCaption("");
                            setActiveEditorTab("general");
                          }}
                          className="flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-mono font-bold text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/40 transition-all shadow-sm"
                          title="Edit Week Content & Images"
                        >
                          <Edit3 className="h-3.5 w-3.5 text-emerald-300" />
                          <span>Edit Week</span>
                        </button>
                      )}

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

                        {/* MEDIA & VIDEO GALLERY */}
                        {week.galleryImages && week.galleryImages.length > 0 && (
                          <div className="space-y-3 pt-2">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-mono text-white uppercase tracking-wider font-bold flex items-center gap-1.5">
                                <ImageIcon className="h-3.5 w-3.5 text-white" />
                                <span>MEDIA & VIDEO GALLERY ({week.galleryImages.length} ITEMS)</span>
                              </span>
                              <span className="text-[10px] font-mono text-neutral-400">Click to expand</span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                              {week.galleryImages.map((imgItem, imgIdx) => {
                                const url = typeof imgItem === "string" ? imgItem : imgItem.url;
                                const caption = typeof imgItem === "string" ? `Week ${week.weekNumber} Media ${imgIdx + 1}` : imgItem.caption;
                                const itemType = typeof imgItem === "string" ? undefined : imgItem.type;
                                const isVid = isVideoUrl(url, itemType);

                                return (
                                  <motion.div
                                    key={imgIdx}
                                    whileHover={{ scale: 1.02 }}
                                    onClick={() => setActiveLightbox({ weekNumber: week.weekNumber, imageIndex: imgIdx })}
                                    className="group relative cursor-pointer overflow-hidden rounded-xl glass-panel p-2 border border-white/15 hover:border-white/40 transition-all bg-black/60 shadow-md flex flex-col justify-between"
                                  >
                                    <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-neutral-950">
                                      {isVid ? (
                                        <video
                                          src={url}
                                          muted
                                          playsInline
                                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                      ) : (
                                        <img
                                          src={url}
                                          alt={caption}
                                          loading="lazy"
                                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                      )}
                                      {isVid && (
                                        <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-[9px] font-mono font-bold text-amber-300 border border-amber-500/40 flex items-center gap-1 z-10">
                                          <Video className="h-3 w-3" />
                                          <span>VIDEO</span>
                                        </div>
                                      )}
                                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-lg">
                                          {isVid ? <Play className="h-5 w-5 fill-white text-white ml-0.5" /> : <Maximize2 className="h-4 w-4" />}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="pt-2 px-1 flex items-center justify-between gap-1">
                                      <p className="text-[11px] text-neutral-300 font-sans line-clamp-2 leading-snug group-hover:text-white transition-colors">
                                        {caption}
                                      </p>
                                      {isVid && <Film className="h-3.5 w-3.5 text-amber-400 shrink-0" />}
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

            {(() => {
              const itemType = typeof currentGalleryItem === "string" ? undefined : currentGalleryItem?.type;
              const isVid = isVideoUrl(currentLightboxImageUrl, itemType);

              return (
                <div className="max-w-4xl w-full space-y-4 text-center">
                  <div className="relative inline-block overflow-hidden rounded-2xl glass-panel-elevated p-3 border border-white/25 shadow-2xl max-h-[75vh]">
                    {isVid ? (
                      <video
                        src={currentLightboxImageUrl}
                        controls
                        autoPlay
                        className="max-h-[70vh] max-w-full rounded-xl mx-auto shadow-2xl"
                      />
                    ) : (
                      <img
                        src={currentLightboxImageUrl}
                        alt={currentLightboxCaption}
                        className="max-h-[70vh] max-w-full object-contain rounded-xl mx-auto"
                      />
                    )}
                  </div>
                  <div className="space-y-1 max-w-xl mx-auto">
                    <p className="text-sm font-semibold text-white flex items-center justify-center gap-2">
                      {isVid && <Video className="h-4 w-4 text-amber-400" />}
                      <span>{currentLightboxCaption}</span>
                    </p>
                    <p className="text-xs font-mono text-neutral-400">
                      Week {activeLightboxWeek?.weekNumber} • Item {activeLightbox.imageIndex + 1} of {activeLightboxWeek?.galleryImages?.length} {isVid ? "(Video)" : "(Image)"}
                    </p>
                  </div>
                </div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>

      {/* WEEK EDITOR MODAL (INTERACTIVE CONTENT & GALLERY MANAGER) */}
      <AnimatePresence>
        {editingWeek && (
          <div
            data-lenis-prevent
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl overflow-y-auto"
          >
            <motion.div
              data-lenis-prevent
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-3xl rounded-3xl glass-panel-elevated p-6 sm:p-8 border border-white/20 shadow-2xl space-y-6 bg-neutral-900 my-auto max-h-[85vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2 text-white font-mono text-base font-bold">
                  <Edit3 className="h-5 w-5 text-emerald-400" />
                  <span>Edit Week {editingWeek.weekNumber} Content & Media</span>
                </div>
                <button
                  onClick={() => setEditingWeek(null)}
                  className="rounded-full p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Editor Tabs Navigation */}
              <div className="flex flex-wrap gap-2 border-b border-white/10 pb-3 font-mono text-xs">
                <button
                  type="button"
                  onClick={() => setActiveEditorTab("general")}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    activeEditorTab === "general"
                      ? "bg-white text-black font-bold"
                      : "glass-panel text-neutral-400 hover:text-white"
                  }`}
                >
                  General Info
                </button>
                <button
                  type="button"
                  onClick={() => setActiveEditorTab("lists")}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    activeEditorTab === "lists"
                      ? "bg-white text-black font-bold"
                      : "glass-panel text-neutral-400 hover:text-white"
                  }`}
                >
                  Objectives & Activities
                </button>
                <button
                  type="button"
                  onClick={() => setActiveEditorTab("text")}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    activeEditorTab === "text"
                      ? "bg-white text-black font-bold"
                      : "glass-panel text-neutral-400 hover:text-white"
                  }`}
                >
                  Detailed Descriptions
                </button>
                <button
                  type="button"
                  onClick={() => setActiveEditorTab("gallery")}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    activeEditorTab === "gallery"
                      ? "bg-white text-black font-bold"
                      : "glass-panel text-neutral-400 hover:text-white"
                  }`}
                >
                  Media & Video Gallery ({editingWeek.galleryImages?.length || 0})
                </button>
              </div>

              {/* TAB 1: GENERAL INFO */}
              {activeEditorTab === "general" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono text-white font-bold uppercase block">TITLE *</label>
                      <input
                        type="text"
                        value={editingWeek.title}
                        onChange={(e) => setEditingWeek({ ...editingWeek, title: e.target.value })}
                        className="w-full rounded-xl glass-panel p-3 text-xs text-white border border-white/15 bg-black/40 focus:outline-none focus:border-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono text-white font-bold uppercase block">SUBTITLE</label>
                      <input
                        type="text"
                        value={editingWeek.subtitle}
                        onChange={(e) => setEditingWeek({ ...editingWeek, subtitle: e.target.value })}
                        className="w-full rounded-xl glass-panel p-3 text-xs text-white border border-white/15 bg-black/40 focus:outline-none focus:border-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono text-white font-bold uppercase block">CATEGORY</label>
                      <input
                        type="text"
                        value={editingWeek.category}
                        onChange={(e) => setEditingWeek({ ...editingWeek, category: e.target.value })}
                        className="w-full rounded-xl glass-panel p-3 text-xs text-white border border-white/15 bg-black/40 focus:outline-none focus:border-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono text-white font-bold uppercase block">STATUS</label>
                      <select
                        value={editingWeek.status}
                        onChange={(e) => setEditingWeek({ ...editingWeek, status: e.target.value as "Completed" | "In Progress" })}
                        className="w-full rounded-xl glass-panel p-3 text-xs text-white border border-white/15 bg-black/40 focus:outline-none focus:border-white"
                      >
                        <option value="Completed" className="bg-neutral-900 text-white">Completed</option>
                        <option value="In Progress" className="bg-neutral-900 text-white">In Progress</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono text-white font-bold uppercase block">DATE RANGE</label>
                      <input
                        type="text"
                        value={editingWeek.dateRange}
                        onChange={(e) => setEditingWeek({ ...editingWeek, dateRange: e.target.value })}
                        className="w-full rounded-xl glass-panel p-3 text-xs text-white border border-white/15 bg-black/40 focus:outline-none focus:border-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono text-white font-bold uppercase block">OVERVIEW / SUMMARY *</label>
                    <textarea
                      rows={6}
                      value={editingWeek.summary}
                      onChange={(e) => setEditingWeek({ ...editingWeek, summary: e.target.value })}
                      className="w-full rounded-xl glass-panel p-3.5 text-xs text-white border border-white/15 bg-black/40 focus:outline-none focus:border-white leading-relaxed resize-y"
                    />
                  </div>
                </div>
              )}

              {/* TAB 2: OBJECTIVES & ACTIVITIES LISTS */}
              {activeEditorTab === "lists" && (
                <div className="space-y-6">
                  {/* Objectives List */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-mono text-white font-bold uppercase flex items-center gap-1.5">
                        <Target className="h-3.5 w-3.5 text-white" />
                        <span>OBJECTIVES ({editingWeek.objectives?.length || 0})</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          const currentObj = editingWeek.objectives || [];
                          setEditingWeek({ ...editingWeek, objectives: [...currentObj, "New objective statement..."] });
                        }}
                        className="flex items-center gap-1 px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-[10px] font-mono text-white border border-white/15"
                      >
                        <Plus className="h-3 w-3" />
                        <span>Add Objective</span>
                      </button>
                    </div>
                    <div data-lenis-prevent className="space-y-2 max-h-56 overflow-y-auto pr-1">
                      {(editingWeek.objectives || []).map((obj, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={obj}
                            onChange={(e) => {
                              const updated = [...(editingWeek.objectives || [])];
                              updated[idx] = e.target.value;
                              setEditingWeek({ ...editingWeek, objectives: updated });
                            }}
                            className="flex-1 rounded-xl glass-panel p-2.5 text-xs text-white border border-white/15 bg-black/40"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const updated = (editingWeek.objectives || []).filter((_, i) => i !== idx);
                              setEditingWeek({ ...editingWeek, objectives: updated });
                            }}
                            className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 shrink-0"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Activities Completed List */}
                  <div className="space-y-2 pt-2 border-t border-white/10">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-mono text-white font-bold uppercase flex items-center gap-1.5">
                        <Sparkles className="h-3.5 w-3.5 text-white" />
                        <span>ACTIVITIES COMPLETED ({editingWeek.activitiesCompleted?.length || 0})</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          const currentAct = editingWeek.activitiesCompleted || [];
                          setEditingWeek({ ...editingWeek, activitiesCompleted: [...currentAct, "New activity completed..."] });
                        }}
                        className="flex items-center gap-1 px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-[10px] font-mono text-white border border-white/15"
                      >
                        <Plus className="h-3 w-3" />
                        <span>Add Activity</span>
                      </button>
                    </div>
                    <div data-lenis-prevent className="space-y-2 max-h-56 overflow-y-auto pr-1">
                      {(editingWeek.activitiesCompleted || []).map((act, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={act}
                            onChange={(e) => {
                              const updated = [...(editingWeek.activitiesCompleted || [])];
                              updated[idx] = e.target.value;
                              setEditingWeek({ ...editingWeek, activitiesCompleted: updated });
                            }}
                            className="flex-1 rounded-xl glass-panel p-2.5 text-xs text-white border border-white/15 bg-black/40"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const updated = (editingWeek.activitiesCompleted || []).filter((_, i) => i !== idx);
                              setEditingWeek({ ...editingWeek, activitiesCompleted: updated });
                            }}
                            className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 shrink-0"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Skills Gained List */}
                  <div className="space-y-2 pt-2 border-t border-white/10">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-mono text-white font-bold uppercase flex items-center gap-1.5">
                        <span>SKILLS GAINED ({editingWeek.skillsGained?.length || 0})</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          const currentSkills = editingWeek.skillsGained || [];
                          setEditingWeek({ ...editingWeek, skillsGained: [...currentSkills, "New Skill"] });
                        }}
                        className="flex items-center gap-1 px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-[10px] font-mono text-white border border-white/15"
                      >
                        <Plus className="h-3 w-3" />
                        <span>Add Skill</span>
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {(editingWeek.skillsGained || []).map((skill, idx) => (
                        <div key={idx} className="flex items-center gap-1 bg-white/10 rounded-lg p-1.5 border border-white/15 text-xs">
                          <input
                            type="text"
                            value={skill}
                            onChange={(e) => {
                              const updated = [...(editingWeek.skillsGained || [])];
                              updated[idx] = e.target.value;
                              setEditingWeek({ ...editingWeek, skillsGained: updated });
                            }}
                            className="bg-transparent text-white font-mono text-xs w-28 focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const updated = (editingWeek.skillsGained || []).filter((_, i) => i !== idx);
                              setEditingWeek({ ...editingWeek, skillsGained: updated });
                            }}
                            className="text-red-400 hover:text-red-300 p-0.5"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: DETAILED DESCRIPTIONS */}
              {activeEditorTab === "text" && (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono text-white font-bold uppercase flex items-center gap-1 text-amber-300">
                      <AlertTriangle className="h-3.5 w-3.5" />
                      <span>CHALLENGES FACED</span>
                    </label>
                    <textarea
                      rows={3}
                      value={editingWeek.challengesFaced || ""}
                      onChange={(e) => setEditingWeek({ ...editingWeek, challengesFaced: e.target.value })}
                      placeholder="Describe any challenges faced during this week..."
                      className="w-full rounded-xl glass-panel p-3 text-xs text-white border border-white/15 bg-black/40 focus:outline-none focus:border-white resize-y"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono text-white font-bold uppercase flex items-center gap-1">
                      <Lightbulb className="h-3.5 w-3.5 text-white" />
                      <span>KEY LEARNINGS</span>
                    </label>
                    <textarea
                      rows={3}
                      value={editingWeek.keyLearnings || ""}
                      onChange={(e) => setEditingWeek({ ...editingWeek, keyLearnings: e.target.value })}
                      placeholder="Summarize key technical and personal learnings..."
                      className="w-full rounded-xl glass-panel p-3 text-xs text-white border border-white/15 bg-black/40 focus:outline-none focus:border-white resize-y"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono text-white font-bold uppercase flex items-center gap-1">
                      <Compass className="h-3.5 w-3.5 text-white" />
                      <span>WEEK REFLECTION</span>
                    </label>
                    <textarea
                      rows={3}
                      value={editingWeek.reflection || ""}
                      onChange={(e) => setEditingWeek({ ...editingWeek, reflection: e.target.value })}
                      placeholder="Personal reflection on progress..."
                      className="w-full rounded-xl glass-panel p-3 text-xs text-white border border-white/15 bg-black/40 focus:outline-none focus:border-white resize-y"
                    />
                  </div>
                </div>
              )}

              {/* TAB 4: MEDIA & VIDEO GALLERY MANAGER */}
              {activeEditorTab === "gallery" && (
                <div className="space-y-6">
                  {/* Hidden File Inputs for System File Dialog */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*,video/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleSystemFileUpload(e.target.files[0]);
                        e.target.value = "";
                      }
                    }}
                  />
                  <input
                    type="file"
                    ref={replaceFileInputRef}
                    accept="image/*,video/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0] && targetReplaceIdx !== null) {
                        handleSystemFileUpload(e.target.files[0], targetReplaceIdx);
                        e.target.value = "";
                      }
                    }}
                  />

                  {/* Upload Error Alert */}
                  {uploadError && (
                    <div className="rounded-xl border border-red-500/40 bg-red-950/40 p-3 text-xs text-red-300 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-400 shrink-0" />
                        <span>{uploadError}</span>
                      </div>
                      <button onClick={() => setUploadError(null)} className="text-red-400 hover:text-white">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )}

                  {/* Processing / Uploading Indicator */}
                  {isUploading && (
                    <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/40 p-3 text-xs text-emerald-300 flex items-center gap-2 font-mono animate-pulse">
                      <Loader2 className="h-4 w-4 animate-spin text-emerald-400" />
                      <span>Reading and processing media file (image/video) from system...</span>
                    </div>
                  )}

                  {/* Drag and Drop Zone for Local Files */}
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`cursor-pointer rounded-2xl border-2 border-dashed p-6 text-center transition-all flex flex-col items-center justify-center gap-2 ${
                      isDragging
                        ? "border-emerald-400 bg-emerald-500/10 scale-[1.01]"
                        : "border-white/20 bg-black/30 hover:border-emerald-500/50 hover:bg-neutral-900/60"
                    }`}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      <UploadCloud className="h-6 w-6" />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-xs font-semibold text-white">
                        Click to Choose File or Drag & Drop Image or Video from System
                      </p>
                      <p className="text-[11px] text-neutral-400 font-mono">
                        Supports PNG, JPG, WebP, GIF, MP4, WebM, MOV, OGG • Automatic client-side canvas & media handling
                      </p>
                    </div>
                  </div>

                  {/* Current Gallery Media List */}
                  <div className="space-y-3">
                    <label className="text-[11px] font-mono text-white font-bold uppercase flex items-center gap-1.5">
                      <ImageIcon className="h-3.5 w-3.5 text-white" />
                      <span>EXISTING GALLERY MEDIA ({editingWeek.galleryImages?.length || 0})</span>
                    </label>

                    {(!editingWeek.galleryImages || editingWeek.galleryImages.length === 0) ? (
                      <p className="text-xs text-neutral-400 italic">No media items currently in this week's gallery.</p>
                    ) : (
                      <div data-lenis-prevent className="space-y-3 max-h-72 overflow-y-auto pr-1">
                        {editingWeek.galleryImages.map((imgItem, imgIdx) => {
                          const url = typeof imgItem === "string" ? imgItem : imgItem.url;
                          const caption = typeof imgItem === "string" ? "" : imgItem.caption;
                          const itemType = typeof imgItem === "string" ? undefined : imgItem.type;
                          const isVid = isVideoUrl(url, itemType);

                          return (
                            <div key={imgIdx} className="glass-panel p-3 rounded-xl border border-white/15 flex flex-col sm:flex-row items-center gap-3 bg-black/40">
                              <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-neutral-950 border border-white/10 group">
                                {isVid ? (
                                  <video src={url} muted className="h-full w-full object-cover" />
                                ) : (
                                  <img src={url} alt={caption} className="h-full w-full object-cover" />
                                )}
                                <div className={`absolute top-1 right-1 px-1 py-0.5 rounded text-[8px] font-mono font-bold ${
                                  isVid ? "bg-amber-500/80 text-black" : "bg-black/70 text-white"
                                }`}>
                                  {isVid ? "VIDEO" : "IMAGE"}
                                </div>
                              </div>

                              <div className="flex-1 space-y-1.5 w-full">
                                <div className="flex items-center gap-2">
                                  <input
                                    type="text"
                                    value={url}
                                    onChange={(e) => {
                                      const updated = [...(editingWeek.galleryImages || [])];
                                      const newIsVid = isVideoUrl(e.target.value);
                                      const mediaKind: "video" | "image" = newIsVid ? "video" : "image";
                                      updated[imgIdx] = { url: e.target.value, caption, type: mediaKind };
                                      setEditingWeek({ ...editingWeek, galleryImages: updated });
                                    }}
                                    placeholder="Media URL or Base64 Data URL..."
                                    className="w-full rounded-lg glass-panel p-1.5 text-xs text-white border border-white/10 bg-black/50 font-mono"
                                  />
                                </div>
                                <input
                                  type="text"
                                  value={caption}
                                  onChange={(e) => {
                                    const updated = [...(editingWeek.galleryImages || [])];
                                    const mediaKind: "video" | "image" = isVid ? "video" : "image";
                                    updated[imgIdx] = { url, caption: e.target.value, type: mediaKind };
                                    setEditingWeek({ ...editingWeek, galleryImages: updated });
                                  }}
                                  placeholder="Media Caption..."
                                  className="w-full rounded-lg glass-panel p-1.5 text-xs text-neutral-300 border border-white/10 bg-black/50"
                                />
                              </div>

                              <div className="flex sm:flex-col gap-2 shrink-0">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setTargetReplaceIdx(imgIdx);
                                    replaceFileInputRef.current?.click();
                                  }}
                                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 text-xs font-mono"
                                  title="Replace this media file with a file from your computer"
                                >
                                  <RefreshCw className="h-3.5 w-3.5" />
                                  <span>Replace</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const updated = (editingWeek.galleryImages || []).filter((_, i) => i !== imgIdx);
                                    setEditingWeek({ ...editingWeek, galleryImages: updated });
                                  }}
                                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 text-xs font-mono"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                  <span>Delete</span>
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Add New Media Section */}
                  <div className="pt-4 border-t border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-mono text-emerald-300 font-bold uppercase flex items-center gap-1">
                        <Plus className="h-3.5 w-3.5 text-emerald-400" />
                        <span>ADD NEW MEDIA (IMAGE / VIDEO) TO GALLERY</span>
                      </label>

                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1 text-xs font-mono text-white border border-white/20 hover:bg-white/20 transition-all"
                      >
                        <Upload className="h-3.5 w-3.5 text-emerald-400" />
                        <span>Upload Image or Video</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={newImageUrl}
                        onChange={(e) => {
                          const val = e.target.value;
                          setNewImageUrl(val);
                          if (isVideoUrl(val)) {
                            setNewMediaType("video");
                          }
                        }}
                        placeholder="Image/Video URL or upload file above..."
                        className="rounded-xl glass-panel p-2.5 text-xs text-white border border-white/15 bg-black/40 focus:outline-none focus:border-white font-mono"
                      />
                      <input
                        type="text"
                        value={newImageCaption}
                        onChange={(e) => setNewImageCaption(e.target.value)}
                        placeholder="Media Caption description..."
                        className="rounded-xl glass-panel p-2.5 text-xs text-white border border-white/15 bg-black/40 focus:outline-none focus:border-white"
                      />
                    </div>

                    {/* Preview of newly uploaded or typed media */}
                    {newImageUrl && (
                      <div className="flex items-center gap-3 p-3 rounded-xl glass-panel border border-emerald-500/30 bg-emerald-950/20">
                        <div className="h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-black border border-white/15 relative">
                          {isVideoUrl(newImageUrl, newMediaType) ? (
                            <video src={newImageUrl} muted className="h-full w-full object-cover" />
                          ) : (
                            <img src={newImageUrl} alt="Preview" className="h-full w-full object-cover" />
                          )}
                        </div>
                        <div className="flex-1 text-xs text-neutral-300 truncate">
                          <p className="font-semibold text-white truncate">{newImageCaption || "Untitled Media"}</p>
                          <p className="text-[10px] font-mono text-emerald-400">
                            Ready to add as {isVideoUrl(newImageUrl, newMediaType) ? "Video" : "Image"}
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          if (!newImageUrl.trim()) return;
                          const currentGallery = editingWeek.galleryImages || [];
                          const isVid = isVideoUrl(newImageUrl.trim(), newMediaType);
                          const mediaKind: "video" | "image" = isVid ? "video" : "image";
                          const updated: (string | ForgeGalleryImage)[] = [
                            ...currentGallery, 
                            { 
                              url: newImageUrl.trim(), 
                              caption: newImageCaption.trim() || `Week ${editingWeek.weekNumber} ${isVid ? "Video" : "Media"}`,
                              type: mediaKind
                            }
                          ];
                          setEditingWeek({ ...editingWeek, galleryImages: updated });
                          setNewImageUrl("");
                          setNewImageCaption("");
                        }}
                        disabled={!newImageUrl.trim()}
                        className="flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-4 py-2 text-xs font-mono font-bold text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        <span>Add Media to Gallery</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Modal Footer Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingWeek(null)}
                  className="rounded-full glass-panel px-5 py-2.5 text-xs font-mono text-neutral-400 hover:text-white border border-white/10"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveWeekEdit}
                  className="flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-xs font-mono font-bold text-black hover:bg-neutral-200 transition-all shadow-md"
                >
                  <Save className="h-4 w-4 text-black" />
                  <span>Save Changes</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
