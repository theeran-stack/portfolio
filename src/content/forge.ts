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
  galleryImages?: string[];
  codeSnippet?: { language: string; code: string; filename: string };
}

export const forgeWeeksData: ForgeWeekItem[] = [
  {
    weekNumber: 0,
    id: "forge-w0",
    title: "Week 0 — ProtoSem Orientation & Team Building",
    subtitle: "Orientation, Team-Building Activities & 16 Personalities Assessment (INFJ Advocate)",
    dateRange: "Week 0",
    category: "Orientation & Team Building",
    status: "Completed",
    summary: "My ProtoSem journey began with an engaging orientation program that introduced me to the purpose, structure, and expectations of the semester. Throughout the orientation, I actively participated in various team-building activities that encouraged collaboration, communication, and creative thinking. One of the most valuable experiences was completing the 16 Personalities Assessment, where I discovered that my personality type is Advocate (INFJ). Overall, Week 0 served as a strong foundation for my ProtoSem journey.",
    objectives: [
      "Understand the structure, objectives, and expectations of the ProtoSem program.",
      "Build confidence through interactive orientation activities.",
      "Develop stronger teamwork and collaboration skills.",
      "Improve communication and interpersonal abilities.",
      "Prepare myself for the learning journey in the upcoming weeks."
    ],
    activitiesCompleted: [
      "Participated in the ProtoSem Orientation Program.",
      "Took part in interactive team-building activities.",
      "Collaborated with peers to complete group tasks.",
      "Completed the 16 Personalities Assessment.",
      "Identified my personality type as Advocate (INFJ).",
      "Engaged in communication and collaboration exercises."
    ],
    skillsGained: [
      "Teamwork",
      "Communication",
      "Leadership",
      "Critical Thinking",
      "Problem Solving",
      "Collaboration",
      "Self-Awareness",
      "Confidence Building"
    ],
    keyLearnings: "During this week, I realized that learning extends far beyond technical knowledge. Building meaningful relationships, communicating effectively, and collaborating with others are equally important for personal and professional growth. The team-building activities taught me the value of trust, cooperation, and active participation, while the personality assessment helped me understand my strengths and areas for improvement. These experiences motivated me to become a better team player and a more confident learner.",
    reflection: "Week 0 was an inspiring start to my ProtoSem journey. It helped me build confidence, connect with new people, and understand the importance of collaboration in both academic and professional environments. Discovering my Advocate (INFJ) personality type gave me valuable insights into how I approach challenges, work with teams, and contribute to meaningful projects. Looking back, this week laid a strong foundation for the experiences ahead and encouraged me to continue learning, growing, and challenging myself throughout the ProtoSem program.",
    highlights: [
      "Participated in ProtoSem Orientation & Team Building activities.",
      "Completed 16 Personalities Assessment — Identified as Advocate (INFJ).",
      "Strengthened confidence, teamwork, and self-awareness for the semester ahead."
    ],
    tags: ["Orientation", "Teamwork", "INFJ Advocate", "16 Personalities", "Communication"],
    teamCredits: [{ role: "Student / Developer", name: "Theeran P." }]
  },
  {
    weekNumber: 1,
    id: "forge-w1",
    title: "Week 1 — 5S Implementation",
    subtitle: "Workplace Organization, Cable Management & Desoldering Works",
    dateRange: "Week 1",
    category: "Workplace Organization",
    status: "Completed",
    teamName: "Cable Management Team / Desoldering Works",
    role: "Cable Management & Desoldering Component Handling",
    summary: "Week 1 introduced me to the practical implementation of the 5S Methodology, where I learned how workplace organization contributes to efficiency, safety, and productivity. I initially worked as a member of the Cable Management Team, where I was responsible for organizing and managing cables systematically to maintain a clean and efficient workspace. Later, I was assigned to Desoldering Works, where I carefully removed electronic components from circuit boards while following proper handling procedures.",
    objectives: [
      "Understand the principles of the 5S Workplace Methodology.",
      "Learn the importance of workplace organization and efficiency.",
      "Improve teamwork and collaboration.",
      "Develop practical experience in cable management and desoldering.",
      "Maintain a clean, organized, and systematic workspace."
    ],
    activitiesCompleted: [
      "Participated in the 5S Implementation activity.",
      "Worked as a member of the Cable Management Team.",
      "Organized and managed cables following the 5S principles.",
      "Assisted in maintaining a clean and systematic workspace.",
      "Participated in Desoldering Works by safely removing electronic components from circuit boards.",
      "Collaborated with teammates to complete assigned tasks efficiently."
    ],
    challengesFaced: "One of the key challenges was maintaining accuracy while organizing cables systematically and later performing desoldering without damaging electronic components. Managing both responsibilities within the given time required patience, precision, and effective coordination with my teammates.",
    skillsGained: [
      "Teamwork",
      "Communication",
      "Workplace Organization",
      "Cable Management",
      "Desoldering Techniques",
      "Attention to Detail",
      "Responsibility",
      "Time Management",
      "Problem Solving"
    ],
    conceptsLearned: [
      "5S Workplace Methodology",
      "Workplace Organization",
      "Cable Management",
      "Basic Electronic Component Handling",
      "Desoldering Process",
      "Team Collaboration"
    ],
    keyLearnings: "This week helped me understand how the 5S Methodology improves workplace efficiency through proper organization and discipline. Working in both the Cable Management Team and Desoldering Works gave me practical exposure to organizing workspaces and handling electronic components with care. These experiences strengthened my teamwork, communication, adaptability, and attention to detail while reinforcing the importance of following systematic work practices.",
    reflection: "Week 1 was a valuable learning experience that introduced me to practical workplace management and electronics handling. Working on cable management taught me the importance of maintaining an organized environment, while participating in desoldering improved my patience and precision when working with hardware. Overall, this week enhanced my teamwork, adaptability, and responsibility, giving me a stronger appreciation for organized workflows and practical engineering tasks.",
    highlights: [
      "Successfully participated in the 5S Implementation activity.",
      "Worked as a member of the Cable Management Team.",
      "Contributed to maintaining an organized workspace using the 5S Methodology.",
      "Participated in Desoldering Works and gained practical experience in handling electronic components.",
      "Improved teamwork, communication, adaptability, and attention to detail through hands-on activities."
    ],
    tags: ["5S Methodology", "Cable Management", "Desoldering", "Electronics", "Workplace Organization"],
    teamCredits: [
      { role: "Initial Team", name: "Cable Management Team" },
      { role: "Additional Work", name: "Desoldering Works" }
    ]
  },
  ...Array.from({ length: 19 }, (_, i) => {
    const weekNum = i + 2;
    return {
      weekNumber: weekNum,
      id: `forge-w${weekNum}`,
      title: `Week ${weekNum} — In Progress`,
      subtitle: `Protosem Week ${weekNum} learning log and deliverables currently in progress.`,
      dateRange: `Week ${weekNum}`,
      category: "In Progress",
      status: "In Progress" as const,
      summary: `Week ${weekNum} is currently in progress. Learning objectives, activities, and project deliverables are actively being documented.`,
      highlights: [`Week ${weekNum} documentation in progress.`],
      tags: [`Week ${weekNum}`, "In Progress"],
      teamCredits: [{ role: "Student / Developer", name: "Theeran P." }]
    };
  })
];
