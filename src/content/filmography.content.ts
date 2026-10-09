// @/content/filmography.content.ts
import { FilmItem } from '@/types/portfolio.types';

export const filmographyData: FilmItem[] = [
  {
    id: 'film-1212',
    title: '12:12',
    role: 'Lead Cinematographer & Visual Director',
    genre: ['Horror', 'Thriller', 'Psychological'],
    status: 'Coming Soon',
    releaseYear: '2026',
    posterImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1600&auto=format&fit=crop',
    logline: 'When midnight strikes at exactly 12:12, time loops into a psychological nightmare inside an abandoned campus laboratory.',
    synopsis: 'I designed the camera angles, low-key lighting ratios, and unsettling slow-push camera zooms for "12:12". The film creates tension using shadows, practical red accent lighting, and claustrophobic framing rather than jump scares.',
    director: 'Creative Director (Nigal Club)',
    cinematographer: 'Theeran P.',
    editor: 'Theeran P.',
    cast: ['KCT Student Actors', 'Nigal Club Performers'],
    crew: [
      { role: 'Cinematographer', name: 'Theeran P.' },
      { role: 'Editor & Colorist', name: 'Theeran P.' },
      { role: 'Sound Designer', name: 'Elaris Audio Team' }
    ],
    behindTheScenes: [
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1600&auto=format&fit=crop'
    ],
  },
];
