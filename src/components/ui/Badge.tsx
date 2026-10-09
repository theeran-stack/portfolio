// @/components/ui/Badge.tsx
import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent' | 'outline' | 'success' | 'amber';
  icon?: React.ComponentType<{ className?: string }>;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  icon: Icon,
  className,
}) => {
  const baseStyles = 'inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full tracking-wide transition-colors';

  const variantStyles = {
    default: 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border border-[var(--border-subtle)]',
    accent: 'bg-[var(--accent-glow)] text-[var(--accent-primary)] border border-[var(--border-glow)]',
    outline: 'bg-transparent text-[var(--text-secondary)] border border-[var(--border-subtle)]',
    success: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30',
    amber: 'bg-amber-500/10 text-amber-400 border border-amber-500/30',
  };

  return (
    <span className={cn(baseStyles, variantStyles[variant], className)}>
      {Icon && <Icon className="w-3 h-3" />}
      <span>{children}</span>
    </span>
  );
};
