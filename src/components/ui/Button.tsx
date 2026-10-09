// @/components/ui/Button.tsx
'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'glass' | 'ghost' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ComponentType<{ className?: string }>;
  iconPosition?: 'left' | 'right';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  children,
  className,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-250 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] disabled:opacity-50 disabled:pointer-events-none rounded-xl cursor-pointer active:scale-98';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-7 py-3.5 gap-2.5 rounded-2xl',
  };

  const variantStyles = {
    primary: 'bg-[var(--accent-primary)] text-white hover:bg-[var(--accent-hover)] shadow-lg shadow-[var(--accent-glow)] border border-transparent',
    secondary: 'bg-[var(--bg-tertiary)] text-[var(--text-primary)] hover:bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)]',
    glass: 'bg-[var(--bg-glass)] text-[var(--text-primary)] backdrop-blur-md border border-[var(--border-subtle)] hover:border-[var(--border-glow)] hover:bg-[var(--bg-surface)] shadow-md',
    ghost: 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]',
    accent: 'bg-gradient-to-r from-amber-500 to-indigo-600 text-white hover:opacity-95 shadow-lg shadow-indigo-500/20',
  };

  return (
    <button
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className={size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'} />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className={size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'} />}
    </button>
  );
};
