export interface ForgeGalleryImage {
  url: string;
  caption: string;
  type?: "image" | "video";
}

export interface ForgeHardwareSoftwareItem {
  name: string;
  type: "Hardware" | "Software" | "Tool" | "Protocol";
  purpose: string;
}

export interface ForgeEvidenceItem {
  title: string;
  explanation: string;
  filename: string;
  mediaUrl: string;
  type?: "image" | "video";
}

export interface ForgeChallengeFixItem {
  challenge: string;
  fix: string;
}

export interface ForgeWeekItem {
  weekNumber: number;
  id: string;
  title: string;
  subtitle: string;
  dateRange: string;
  category: string;
  status: "Completed" | "In Progress";
  summary: string;
  highlights: string[];
  objectives?: string[];
  activitiesCompleted?: string[];
  challengesFaced?: string;
  skillsGained?: string[];
  conceptsLearned?: string[];
  keyLearnings?: string;
  reflection?: string;
  teamName?: string;
  role?: string;
  teamCredits?: { role: string; name: string }[];
  deliverables?: { title: string; type: string; link?: string }[];
  tags: string[];
  galleryImages?: (string | ForgeGalleryImage)[];
  codeSnippet?: { language: string; code: string; filename: string };
  // Week 7 specific fields
  systemDesign?: {
    diagram: string;
    explanation: string;
  };
  hardwareSoftware?: ForgeHardwareSoftwareItem[];
  wiringSetup?: {
    diagram?: string;
    description: string;
    image?: string;
  };
  implementationDetails?: string;
  configurationDetails?: string;
  evidenceList?: ForgeEvidenceItem[];
  challengesFixesList?: ForgeChallengeFixItem[];
  repoLink?: string;
}


