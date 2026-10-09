// @/config/navigation.config.ts

export interface NavItem {
  label: string;
  href: string;
  description?: string;
  isBadge?: boolean;
  badgeText?: string;
}

export const mainNavigation: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Skills', href: '/skills' },
  { label: 'Projects', href: '/projects' },
  { label: 'Experience', href: '/experience' },
  { label: 'Forge', href: '/forge', isBadge: true, badgeText: 'OS Workspace' },
  { label: 'Events', href: '/events' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Achievements', href: '/achievements' },
  { label: 'Filmography', href: '/filmography', isBadge: true, badgeText: '12:12' },
  { label: 'Contact', href: '/contact' },
];
