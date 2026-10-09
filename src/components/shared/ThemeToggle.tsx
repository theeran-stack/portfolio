// @/components/shared/ThemeToggle.tsx
'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Sun, Moon, Laptop } from 'lucide-react';
import { ThemeMode } from '@/types/portfolio.types';

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const themes: { mode: ThemeMode; icon: React.FC<{ className?: string }>; label: string }[] = [
    { mode: 'dark', icon: Moon, label: 'Dark' },
    { mode: 'light', icon: Sun, label: 'Light' },
    { mode: 'system', icon: Laptop, label: 'System' },
  ];

  return (
    <div className="flex items-center bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] rounded-full p-1 gap-1">
      {themes.map(({ mode, icon: Icon, label }) => {
        const isActive = theme === mode;
        return (
          <button
            key={mode}
            onClick={() => setTheme(mode)}
            title={`Switch to ${label} theme`}
            className={`p-1.5 rounded-full transition-all duration-200 cursor-pointer ${
              isActive
                ? 'bg-[var(--accent-primary)] text-white shadow-sm'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
          </button>
        );
      })}
    </div>
  );
};
