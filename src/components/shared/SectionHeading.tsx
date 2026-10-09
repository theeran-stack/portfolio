// @/components/shared/SectionHeading.tsx
import React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';

interface SectionHeadingProps {
  badge?: string;
  badgeIcon?: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  badgeIcon,
  title,
  subtitle,
  centered = false,
  className,
}) => {
  return (
    <div className={cn('flex flex-col gap-3 mb-12', centered && 'items-center text-center', className)}>
      {badge && (
        <Badge variant="accent" icon={badgeIcon}>
          {badge}
        </Badge>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--text-primary)]">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};
