// @/components/layout/WelcomeScreen.tsx
'use client';

import React from 'react';
import { useWelcome } from '@/context/WelcomeContext';
import { useMode } from '@/context/ModeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, Code2, Sparkles, ArrowRight, Check } from 'lucide-react';
import { ExperienceMode } from '@/types/portfolio.types';

export const WelcomeScreen: React.FC = () => {
  const { isIntroOpen, completeIntro } = useWelcome();
  const { mode, setMode } = useMode();

  if (!isIntroOpen) return null;

  const options: {
    id: ExperienceMode;
    title: string;
    description: string;
    icon: React.FC<{ className?: string }>;
    accentColor: string;
    isRecommended?: boolean;
  }[] = [
    {
      id: 'hybrid',
      title: 'Hybrid Experience',
      description: 'Balanced presentation combining my software engineering journey and cinematography works.',
      icon: Sparkles,
      accentColor: 'from-indigo-500 to-purple-600',
      isRecommended: true,
    },
    {
      id: 'creator',
      title: 'Creator Focused',
      description: 'Prioritizes my cinematography, video editing, behind-the-scenes coverage, and filmography.',
      icon: Video,
      accentColor: 'from-amber-500 to-orange-600',
    },
    {
      id: 'developer',
      title: 'Developer Focused',
      description: 'Highlights my Computer Science projects, C++ algorithms, GitHub repositories, and Forge OS workspace.',
      icon: Code2,
      accentColor: 'from-cyan-500 to-blue-600',
    },
  ];

  const handleSelect = (selectedMode: ExperienceMode) => {
    setMode(selectedMode);
    completeIntro();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 sm:p-6"
      >
        <div className="max-w-2xl w-full flex flex-col items-center text-center gap-6">
          {/* Logo Brand */}
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-500 to-amber-500 flex items-center justify-center text-white text-2xl font-black shadow-2xl">
            T
          </div>

          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Welcome to My Digital Ecosystem
            </h1>
            <p className="text-sm sm:text-base text-gray-400 mt-2 max-w-lg">
              I am <span className="text-white font-semibold">Theeran P.</span> Choose how you would like to explore my journey:
            </p>
          </div>

          {/* Options Grid */}
          <div className="w-full flex flex-col gap-3 mt-2">
            {options.map((opt) => {
              const isSelected = mode === opt.id;
              const Icon = opt.icon;
              return (
                <button
                  key={opt.id}
                  onClick={() => setMode(opt.id)}
                  className={`relative flex items-center gap-4 p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-white/10 border-indigo-500/60 shadow-lg shadow-indigo-500/20'
                      : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/8'
                  }`}
                >
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${opt.accentColor} text-white shadow-md`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-base">{opt.title}</span>
                      {opt.isRecommended && (
                        <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                          Recommended
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{opt.description}</p>
                  </div>

                  <div className="p-1.5 rounded-full bg-white/10">
                    {isSelected ? (
                      <Check className="w-5 h-5 text-indigo-400" />
                    ) : (
                      <div className="w-5 h-5" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => handleSelect(mode)}
            className="w-full mt-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 to-amber-600 text-white font-bold text-base flex items-center justify-center gap-2 shadow-xl hover:opacity-95 transition-opacity cursor-pointer"
          >
            <span>Enter Ecosystem</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
