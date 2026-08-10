export interface ForgeGalleryImage {
  url: string;
  caption: string;
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
    title: "Week 1 — ProtoSem Learning Summary",
    subtitle: "Cables Team, Microcontrollers, Arduino Sensor Interfacing & PCB Desoldering Rework",
    dateRange: "Week 1",
    category: "Embedded Systems & Hardware",
    status: "Completed",
    teamName: "Cables Team & Microcontrollers Team",
    role: "Embedded Systems & Hardware Developer",
    summary: "During the first week of my ProtoSem journey, I initially worked with the Cables team and completed the assigned activities. After completing the work in that area, I moved to the Microcontrollers team to gain practical exposure to embedded systems and electronic hardware.\n\nAlongside the assigned activities, I explored my own interests in microcontrollers and started learning Arduino-based development. I learned how to use an Arduino board and the Arduino software environment to interface and test different sensors. I experimented with components such as ultrasonic, smoke, and thermal sensors, and observed their working conditions through practical testing.\n\nI also gained hands-on experience in sensor interfacing, circuit connections, basic programming, testing, and troubleshooting. Towards the end of the week, I worked on desoldering previously soldered electronic boards, which helped me understand practical PCB handling and electronic rework techniques.\n\nOverall, Week 1 gave me a strong foundation in cabling, microcontrollers, Arduino, sensor interfacing, hardware testing, and PCB rework, while also encouraging me to learn and experiment beyond the assigned tasks.",
    objectives: [
      "Complete assigned activities with the Cables team.",
      "Gain practical exposure to embedded systems and electronic hardware with the Microcontrollers team.",
      "Learn Arduino board operation and the Arduino software environment.",
      "Interface and test sensors including Ultrasonic, Smoke, and Thermal sensors.",
      "Gain hands-on experience in circuit connections, basic programming, testing, and troubleshooting.",
      "Perform desoldering on electronic boards for PCB handling and rework techniques."
    ],
    activitiesCompleted: [
      "Worked with Cables team and completed assigned initial activities.",
      "Transitioned to Microcontrollers team for embedded systems and hardware exposure.",
      "Learned Arduino board usage and Arduino IDE development environment.",
      "Interfaced and tested Ultrasonic, Smoke, and Thermal sensors with Arduino.",
      "Observed sensor working conditions through live practical testing.",
      "Executed circuit wiring, basic embedded programming, testing, and troubleshooting.",
      "Desoldered previously soldered electronic boards for PCB handling and rework."
    ],
    challengesFaced: "Transitioning between the Cables team and Microcontrollers team required rapid adaptation. Interfacing multiple sensors (ultrasonic, smoke, thermal) and verifying working conditions demanded structured circuit connections and careful Arduino IDE code testing. Desoldering component pins without damaging board pads required steady hands, precision thermal application, and patience.",
    skillsGained: [
      "Arduino Development",
      "Microcontrollers",
      "Sensor Interfacing",
      "Circuit Connections",
      "PCB Desoldering & Rework",
      "Hardware Testing & Troubleshooting",
      "Cabling",
      "Self-Directed Learning"
    ],
    conceptsLearned: [
      "Arduino Board Architecture & IDE",
      "Ultrasonic, Smoke & Thermal Sensors",
      "Embedded Hardware Wiring & Signal Logic",
      "Circuit Debugging & Fault Isolation",
      "PCB Rework & Component Desoldering",
      "Cross-Team Electronic Workflows"
    ],
    keyLearnings: "Gained hands-on experience in sensor interfacing, circuit connections, basic programming, testing, and troubleshooting. Working on desoldering previously soldered electronic boards provided deep insights into practical PCB handling and electronic rework techniques.",
    reflection: "Overall, Week 1 gave me a strong foundation in cabling, microcontrollers, Arduino, sensor interfacing, hardware testing, and PCB rework, while also encouraging me to learn and experiment beyond the assigned tasks.",
    highlights: [
      "Completed initial assigned activities with Cables team & moved to Microcontrollers team.",
      "Mastered Arduino board usage & software environment for sensor interfacing.",
      "Interfaced & tested Ultrasonic, Smoke, and Thermal sensors with live hardware testing.",
      "Gained hands-on experience in circuit connections, programming, and troubleshooting.",
      "Desoldered electronic boards for practical PCB handling & rework techniques."
    ],
    galleryImages: [
      {
        url: "/img/week-1/IMG20260727113755.jpg.jpeg",
        caption: "Cabling team activities & initial lab workspace setup"
      },
      {
        url: "/img/week-1/IMG20260728123255_20260810161452.jpg.jpeg",
        caption: "Microcontrollers team setup & Arduino board configuration"
      },
      {
        url: "/img/week-1/IMG20260728160259_20260810161452.jpg.jpeg",
        caption: "Ultrasonic, smoke, and thermal sensor interfacing & circuit wiring"
      },
      {
        url: "/img/week-1/IMG20260729122235_20260810161452.jpg.jpeg",
        caption: "Live sensor testing & observing working conditions in Arduino IDE"
      },
      {
        url: "/img/week-1/IMG_20260810_105037.jpg.jpeg",
        caption: "Desoldering components from electronic circuit boards"
      },
      {
        url: "/img/week-1/IMG_20260810_105134.jpg.jpeg",
        caption: "Practical PCB handling, component inspection & electronic rework"
      }
    ],
    tags: ["Arduino", "Microcontrollers", "Sensors", "Cabling", "PCB Rework", "Desoldering", "Embedded Systems", "Hardware Testing"],
    teamCredits: [
      { role: "Initial Assignment", name: "Cables Team" },
      { role: "Primary Assignment", name: "Microcontrollers Team" }
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
