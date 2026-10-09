// @/types/events.types.ts

export type EventCategory = 'institutional' | 'creator';

export interface EventCredit {
  name: string;
  role: string;
  linkedin?: string;
}

export interface EventItem {
  id: string;
  slug: string;
  title: string;
  category: EventCategory;
  typeTag: string; // e.g. "College Symposium", "Commercial Shoot", "Government Function"
  date: string;
  organization: string;
  location: string;
  role: string;
  description: string;
  fullStory: string;
  coverImage: string;
  gallery: string[];
  equipmentUsed?: string[];
  credits: EventCredit[];
  videoUrl?: string;
  isFeatured?: boolean;
}
