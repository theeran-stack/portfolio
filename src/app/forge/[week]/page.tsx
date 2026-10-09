// @/app/forge/[week]/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { forgeWeeksData } from '@/content/forge.content';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Terminal, CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';

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

export default function ForgeWeekDetailPage() {
  const params = useParams();
  const week = params?.week as string;
  const [weeks, setWeeks] = useState(forgeWeeksData);

  useEffect(() => {
    if (typeof window !== "undefined") {
      loadCustomWeeksFromDB().then((saved) => {
        if (saved && Array.isArray(saved) && saved.length > 0) {
          const merged = forgeWeeksData.map(d => saved.find(s => s.weekNumber === d.weekNumber) || d);
          setWeeks(merged);
        }
      });
    }
  }, []);

  const weekData = weeks.find((w) => w.id === week) || weeks[0];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <Link href="/forge">
        <Button variant="ghost" size="sm" icon={ArrowLeft}>
          Back to Forge Workspace
        </Button>
      </Link>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="accent">{weekData.category}</Badge>
          <span className="text-xs font-mono text-[var(--text-muted)]">{weekData.dateRange}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[var(--text-primary)]">{weekData.title}</h1>
        <p className="text-base text-[var(--text-secondary)]">{weekData.subtitle}</p>
      </div>

      <Card hoverGlow className="p-8 space-y-6">
        <h3 className="text-xl font-bold text-[var(--text-primary)]">Overview & Learning Objectives</h3>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{weekData.summary}</p>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{weekData.summary}</p>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card hoverGlow className="p-6 space-y-4">
          <h4 className="font-bold text-sm text-[var(--accent-primary)] font-mono">Technologies & Tools</h4>
          <div className="flex flex-wrap gap-2">
            {weekData.tags.map((t) => (
              <Badge key={t} variant="accent">{t}</Badge>
            ))}
          </div>
        </Card>

        <Card hoverGlow className="p-6 space-y-4">
          <h4 className="font-bold text-sm text-emerald-400 font-mono">Key Skills Learned</h4>
          <ul className="space-y-2 text-xs text-[var(--text-secondary)]">
            {(weekData.skillsGained || []).map((s, i) => (
              <li key={i} className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card hoverGlow className="p-8 space-y-4">
        <h3 className="text-xl font-bold text-amber-400">My Personal Reflection</h3>
        <p className="text-sm text-[var(--text-secondary)] italic leading-relaxed">
          &quot;{weekData.reflection}&quot;
        </p>
      </Card>

      {/* Week Navigation Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-[var(--border-subtle)]">
        {weekData.id ? (
          <Link href={`/forge/${weekData.id}`}>
            <Button variant="glass" size="sm" icon={ChevronLeft}>
              Previous Week
            </Button>
          </Link>
        ) : <div />}

        {weekData.id ? (
          <Link href={`/forge/${weekData.id}`}>
            <Button variant="glass" size="sm" icon={ChevronRight} iconPosition="right">
              Next Week
            </Button>
          </Link>
        ) : <div />}
      </div>
    </div>
  );
}
