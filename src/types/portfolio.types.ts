// @/types/portfolio.types.ts

export type ExperienceMode = 'hybrid' | 'creator' | 'developer';
export type ThemeMode = 'dark' | 'light' | 'system';

export interface EducationInfo {
  degree: string;
  field: string;
  institution: string;
  location: {
    city: string;
    state: string;
    country: string;
  };
  startYear: number;
  endYear: number;
}

export interface PersonalProfile {
  name: string;
  roles: string[];
  education: EducationInfo;
  clubs: string[];
  bioStatements: string[];
  socials: {
    github: string;
    linkedin: string;
    email: string;
    instagram?: string;
    behance?: string;
  };
  stats: {
    yearsCS: number;
    yearsCinematography: number;
    yearsEditing: number;
    eventsCovered: number;
    forgeWeeks: number;
  };
}

export type SkillCategory = 'Creative Skills' | 'Programming Skills' | 'Software & Tools' | 'Production & Hardware';

export interface SkillItem {
  id: string;
  name: string;
  category: SkillCategory;
  level: number; // 1 - 100 or 1 - 5
  levelLabel: 'Expert' | 'Advanced' | 'Intermediate' | 'Proficient';
  iconName: string;
  description: string;
  isFeatured?: boolean;
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  fullDescription: string;
  category: 'Full Stack' | 'Creative Tech' | 'Systems / C++' | 'Web Apps';
  status: 'Completed' | 'In Development' | 'Maintained';
  date: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  featuredImage: string;
  galleryImages: string[];
  problemStatement: string;
  solutionArchitecture: string;
  lessonsLearned: string[];
  awards?: string[];
  isFeatured?: boolean;
}

export interface ExperienceTimelineItem {
  id: string;
  role: string;
  organization: string;
  category: 'Student' | 'Cinematographer' | 'Video Editor' | 'Leadership' | 'Freelancer';
  period: string;
  location: string;
  description: string[];
  skillsUsed: string[];
  milestones: string[];
  isCurrent?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Events' | 'Cinematography' | 'Photography' | 'Editing' | 'Campus';
  imageUrl: string;
  aspectRatio: 'square' | 'portrait' | 'landscape' | 'wide';
  date: string;
  location?: string;
  cameraGear?: string;
  caption: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  category: 'Certificates' | 'Awards' | 'Competitions' | 'Leadership';
  description: string;
  credentialUrl?: string;
  badgeUrl?: string;
}

export interface FilmItem {
  id: string;
  title: string;
  role: string;
  genre: string[];
  status: 'Coming Soon' | 'In Production' | 'Released';
  releaseYear: string;
  posterImage: string;
  logline: string;
  synopsis: string;
  director: string;
  cinematographer: string;
  editor: string;
  cast: string[];
  crew: { role: string; name: string }[];
  behindTheScenes: string[];
  trailerUrl?: string;
}
