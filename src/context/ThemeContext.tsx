// @/context/ThemeContext.tsx
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeMode } from '@/types/portfolio.types';

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (mode: ThemeMode) => void;
  activeTheme: 'dark' | 'light';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') return 'dark';
    return (localStorage.getItem('theeran_theme') as ThemeMode) || 'dark';
  });

  const [activeTheme, setActiveTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const root = document.documentElement;
    localStorage.setItem('theeran_theme', theme);

    if (theme === 'system') {
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const resolved = systemDark ? 'dark' : 'light';
      root.setAttribute('data-theme', resolved);
    } else {
      root.setAttribute('data-theme', theme);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme: setThemeState, activeTheme: theme === 'system' ? activeTheme : theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
