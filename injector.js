const fs = require('fs');
let page = fs.readFileSync('src/app/forge/page.tsx', 'utf8');

// 1. Add imports
page = page.replace('X,', 'X, Trash2, Upload, Loader2, Save, AlertTriangle, Edit3, Lock,');
page = page.replace('import { forgeWeeksData } from \'@/content/forge.content\';', 'import { forgeWeeksData } from \'@/content/forge.content\';\nimport { ForgeGalleryImage } from \'@/types/forge.types\';');

// 2. Add IDB Code outside component
const idbCode = `
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

const isVideoUrl = (url: string, type?: string) => type === "video" || !!url.match(/\\.(mp4|webm|ogg)$/i);
`;

page = page.replace('export default function ForgeSignaturePage() {', idbCode + '\nexport default function ForgeSignaturePage() {');

// 3. Add state inside component
const stateCode = `
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
`;

page = page.replace('const [isFolderStackExpanded, setIsFolderStackExpanded] = useState<boolean>(false);', 'const [isFolderStackExpanded, setIsFolderStackExpanded] = useState<boolean>(false);\n' + stateCode);

// 4. Update data references
page = page.replace(/forgeWeeksData/g, 'weeks');
// But the initial state uses forgeWeeksData
page = page.replace(/const \[weeks, setWeeks\] = useState\(weeks\);/, 'const [weeks, setWeeks] = useState(forgeWeeksData);');
page = page.replace('const merged = weeks.map', 'const merged = forgeWeeksData.map');

// 5. Inject Admin Control Bar + Edit Button + Modal
const adminControlBar = `
      {isAdmin && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between gap-4 px-4 py-2 bg-emerald-950/80 border border-emerald-500/30 rounded-full backdrop-blur-md shadow-2xl text-emerald-300">
          <span className="text-[10px] font-mono font-bold tracking-widest uppercase">PROTOSEM ADMIN EDIT MODE ACTIVE</span>
          <button onClick={handleLockAdmin} className="flex items-center gap-1.5 px-2 py-1 rounded bg-black/40 hover:bg-black/60 transition-colors text-[10px] font-mono">
            <Lock className="h-3 w-3" />
            Lock
          </button>
        </div>
      )}
`;

const editButton = `
  {isAdmin && (
    <Button variant="outline" size="sm" onClick={() => { setEditingWeek(selectedWeek); setActiveEditorTab("general"); }} className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 mr-2">
      <Edit3 className="w-4 h-4 mr-2"/> Edit
    </Button>
  )}
`;

const adminModal = `
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
            <button onClick={() => setActiveEditorTab("general")} className={\`px-3 py-1.5 rounded-lg text-xs font-mono font-bold \${activeEditorTab === "general" ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40" : "text-neutral-400"}\`}>General Details</button>
            <button onClick={() => setActiveEditorTab("gallery")} className={\`px-3 py-1.5 rounded-lg text-xs font-mono font-bold \${activeEditorTab === "gallery" ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40" : "text-neutral-400"}\`}>Gallery & Media</button>
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
                    const caption = typeof imgItem === "string" ? \`Media \${imgIdx + 1}\` : imgItem.caption;
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
`;

page = page.replace('<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">', '<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">\n' + adminControlBar);
page = page.replace('<Link href={`/forge/${selectedWeek.id}`}>', editButton + '\n<Link href={`/forge/${selectedWeek.id}`}>');
page = page.replace('{/* Main Spatial Studio Workspace Container */}', adminModal + '\n{/* Main Spatial Studio Workspace Container */}');

// Ensure useRef is imported
page = page.replace("import React, { useState, useEffect } from 'react';", "import React, { useState, useEffect, useRef } from 'react';");

// Use only one import of forgeWeeksData
page = page.replace('import { forgeWeeksData } from \'@/content/forge.content\';\nimport { forgeWeeksData } from \'@/content/forge.content\';', 'import { forgeWeeksData } from \'@/content/forge.content\';');

fs.writeFileSync('src/app/forge/page.tsx', page);
