// @/components/ui/Card.tsx
'use client';

import React, { useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  enableTilt?: boolean;
  hoverGlow?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  enableTilt = false,
  hoverGlow = true,
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableTilt || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotateX((-y / rect.height) * 8);
    setRotateY((x / rect.width) * 8);
  };

  const handleMouseLeave = () => {
    if (!enableTilt) return;
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transformStyle: enableTilt ? 'preserve-3d' : undefined,
        rotateX: enableTilt ? rotateX : 0,
        rotateY: enableTilt ? rotateY : 0,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={cn(
        'group relative bg-[var(--bg-glass)] backdrop-blur-xl border border-[var(--border-subtle)] rounded-2xl p-6 transition-all duration-300',
        hoverGlow && 'hover:border-[var(--border-strong)] hover:shadow-2xl hover:shadow-[var(--accent-glow)]',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {/* Background specular sheen effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      {children}
    </motion.div>
  );
};
