// @/content/experience.content.ts
import { ExperienceTimelineItem } from '@/types/portfolio.types';

export const experienceData: ExperienceTimelineItem[] = [
  {
    id: 'exp-student-kct',
    role: 'Computer Science & Engineering Student',
    organization: 'Kumaraguru College of Technology (KCT)',
    category: 'Student',
    period: '2024 — 2028',
    location: 'Coimbatore, Tamil Nadu',
    description: [
      'I am pursuing my Bachelor of Engineering degree in Computer Science and Engineering.',
      'I focus on software engineering fundamentals, data structures, algorithms, object-oriented systems in C++, and full-stack web development.',
      'I actively participate in campus technical events, hackathons, and collaborative engineering projects.'
    ],
    skillsUsed: ['C++', 'Data Structures', 'Python', 'TypeScript', 'Web Development'],
    milestones: ['Admitted to KCT 2024-2028 batch', 'Joined Nigal Club & Elaris'],
    isCurrent: true,
  },
  {
    id: 'exp-cinematographer',
    role: 'Lead Cinematographer',
    organization: 'Nigal Club & Freelance Projects',
    category: 'Cinematographer',
    period: '2023 — Present (3 Years)',
    location: 'Coimbatore & Regional',
    description: [
      'I direct visual composition, camera movement, and lighting setups for over 50+ institutional, cultural, and commercial event coverages.',
      'I operate professional cinema cameras, stabilizers, gimbals, and multi-cam live shoot setups.',
      'I collaborate with event organizers to capture highlight films that preserve key moments.'
    ],
    skillsUsed: ['Cinematography', 'Camera Rigging', 'Framing', 'Lighting', 'Multi-Cam Direction'],
    milestones: ['Covered 50+ Major Campus & Commercial Events', 'Lead Cinematographer for feature project 12:12'],
    isCurrent: true,
  },
  {
    id: 'exp-editor',
    role: 'Professional Video Editor',
    organization: 'Elaris Club & Freelance',
    category: 'Video Editor',
    period: '2024 — Present (2 Years)',
    location: 'Coimbatore & Remote',
    description: [
      'I edit narrative stories, recap reels, promotional videos, and creative films using Adobe Premiere Pro and DaVinci Resolve.',
      'I perform color grading, audio cleaning, sound effects design, and dynamic pacing.',
      'I manage asset delivery pipelines for social media formats and widescreen cinema exports.'
    ],
    skillsUsed: ['Adobe Premiere Pro', 'DaVinci Resolve', 'Color Grading', 'Sound Design'],
    milestones: ['Edited 30+ High-Impact Commercial & Institutional Reels'],
    isCurrent: true,
  },
  {
    id: 'exp-leadership-clubs',
    role: 'Active Media & Technical Member',
    organization: 'Nigal Club & Elaris Club @ KCT',
    category: 'Leadership',
    period: '2024 — Present',
    location: 'KCT Campus, Coimbatore',
    description: [
      'I lead visual media coverage teams for campus festivals, technical symposiums, and college inaugurations.',
      'I mentor junior members in cinematography techniques, framing standards, and post-production workflows.'
    ],
    skillsUsed: ['Team Leadership', 'Event Management', 'Mentorship', 'Video Production'],
    milestones: ['Streamlined club video asset production workflow'],
    isCurrent: true,
  },
];
