// @/components/shared/SocialLinks.tsx
import React from 'react';
import { personalProfile } from '@/content/personal.content';
import { GithubIcon, LinkedinIcon, InstagramIcon } from '@/components/shared/BrandIcons';
import { Mail } from 'lucide-react';

interface SocialLinksProps {
  className?: string;
  iconSize?: string;
}

export const SocialLinks: React.FC<SocialLinksProps> = ({
  className = '',
  iconSize = 'w-5 h-5',
}) => {
  const links = [
    { label: 'GitHub', href: personalProfile.socials.github, icon: GithubIcon },
    { label: 'LinkedIn', href: personalProfile.socials.linkedin, icon: LinkedinIcon },
    { label: 'Email', href: `mailto:${personalProfile.socials.email}`, icon: Mail },
    ...(personalProfile.socials.instagram
      ? [{ label: 'Instagram', href: personalProfile.socials.instagram, icon: InstagramIcon }]
      : []),
  ];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {links.map(({ label, href, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          title={`My ${label}`}
          className="p-2.5 rounded-xl bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border border-[var(--border-subtle)] hover:text-[var(--text-primary)] hover:border-[var(--border-glow)] hover:bg-[var(--bg-surface)] transition-all hover:-translate-y-0.5"
        >
          <Icon className={iconSize} />
        </a>
      ))}
    </div>
  );
};
