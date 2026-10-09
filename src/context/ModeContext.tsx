// @/context/ModeContext.tsx
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { ExperienceMode } from '@/types/portfolio.types';

interface ModeContextType {
  mode: ExperienceMode;
  setMode: (mode: ExperienceMode) => void;
}

const ModeContext = createContext<ModeContextType | undefined>(undefined);

export const ModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setModeState] = useState<ExperienceMode>(() => {
    if (typeof window === 'undefined') return 'hybrid';
    return (localStorage.getItem('theeran_experience_mode') as ExperienceMode) || 'hybrid';
  });

  const setMode = (newMode: ExperienceMode) => {
    setModeState(newMode);
    localStorage.setItem('theeran_experience_mode', newMode);
    document.documentElement.setAttribute('data-mode', newMode);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-mode', mode);
  }, [mode]);

  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      {children}
    </ModeContext.Provider>
  );
};

export const useMode = () => {
  const context = useContext(ModeContext);
  if (!context) throw new Error('useMode must be used within ModeProvider');
  return context;
};
