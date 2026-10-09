// @/components/shared/ModeSelector.tsx
'use client';

import React from 'react';
import { useMode } from '@/context/ModeContext';
import { Sparkles, Video, Code2 } from 'lucide-react';
import { ExperienceMode } from '@/types/portfolio.types';

export const ModeSelector: React.FC = () => {
  const { mode, setMode } = useMode();

  const modes: { id: ExperienceMode; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'hybrid', label: 'Hybrid', icon: Sparkles },
    { id: 'creator', label: 'Creator', icon: Video },
    { id: 'developer', label: 'Developer', icon: Code2 },
  ];

  return (
    <div className="flex items-center bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] rounded-xl p-1 gap-1">
      {modes.map(({ id, label, icon: Icon }) => {
        const isActive = mode === id;
        return (
          <button
            key={id}
            onClick={() => setMode(id)}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              isActive
                ? 'bg-[var(--accent-glow)] text-[var(--accent-primary)] border border-[var(--border-glow)] shadow-sm'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
};
