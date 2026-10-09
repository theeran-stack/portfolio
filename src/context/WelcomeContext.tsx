// @/context/WelcomeContext.tsx
'use client';

import React, { createContext, useContext, useState } from 'react';

interface WelcomeContextType {
  hasSeenIntro: boolean;
  isIntroOpen: boolean;
  completeIntro: () => void;
  openIntro: () => void;
}

const WelcomeContext = createContext<WelcomeContextType | undefined>(undefined);

export const WelcomeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hasSeenIntro, setHasSeenIntro] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('theeran_welcome_completed');
  });

  const [isIntroOpen, setIsIntroOpen] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return !localStorage.getItem('theeran_welcome_completed');
  });

  const completeIntro = () => {
    localStorage.setItem('theeran_welcome_completed', 'true');
    setHasSeenIntro(true);
    setIsIntroOpen(false);
  };

  const openIntro = () => {
    setIsIntroOpen(true);
  };

  return (
    <WelcomeContext.Provider value={{ hasSeenIntro, isIntroOpen, completeIntro, openIntro }}>
      {children}
    </WelcomeContext.Provider>
  );
};

export const useWelcome = () => {
  const context = useContext(WelcomeContext);
  if (!context) throw new Error('useWelcome must be used within WelcomeProvider');
  return context;
};
