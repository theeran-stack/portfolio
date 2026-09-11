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
  {
    weekNumber: 2,
    id: "forge-w2",
    title: "Week 2 — Innovation, Programming & Mobile Application Development",
    subtitle: "Lean Spark Innovation, Think Like a Coder Python, Scratch Dinosaur Game & MIT App Inventor Hostel Tracker",
    dateRange: "Week 2",
    category: "Innovation & App Development",
    status: "Completed",
    summary: "Week 2 focused on innovation, problem-solving, programming, game development, and mobile application development. The activities were practical and helped me improve my logical thinking and apply programming concepts to real-world problems.\n\nThe week started with an expert session by Mukesh, author of Lean Spark, where I learned about innovation, entrepreneurship, and converting ideas into practical solutions.\n\nI then followed the Think Like a Coder approach to analyze 5 problem statements, develop algorithms, and create flowcharts before coding. I also learned Python fundamentals and improved my computational thinking.\n\nIn Scratch, I developed a Dinosaur Shooting Game with scoring, a 5-life system, and game-over logic. This helped me understand programming logic and event-based development.\n\nI also developed a Hostel Complaint Tracker mobile application using MIT App Inventor with Firebase integration. The application digitizes the complaint process through the workflow: Student → Warden → Hostel Head → Maintenance Staff → Warden → Student. It included role-based dashboards, photo proof, staff assignment, progress tracking, and complaint reopening.\n\nThe week concluded with an Applied Design Thinking session by the Vice President of FORGE, which helped me understand how user needs and problems can be converted into practical solutions.",
    objectives: [
      "Understand innovation and entrepreneurship.",
      "Apply computational thinking to problem-solving.",
      "Learn Python fundamentals, algorithms, and flowcharts.",
      "Develop a Scratch game using programming logic.",
      "Build a mobile application using MIT App Inventor and Firebase.",
      "Understand role-based workflows and Design Thinking."
    ],
    activitiesCompleted: [
      "Attended the Lean Spark expert session by Mukesh (Author of Lean Spark).",
      "Analyzed 5 problem statements using algorithms and flowcharts (Think Like a Coder).",
      "Practiced Python fundamentals and computational thinking.",
      "Developed a Dinosaur Shooting Game in Scratch with scoring, 5 lives, and game-over logic.",
      "Developed the Hostel Complaint Tracker using MIT App Inventor.",
      "Integrated Firebase for complaint data storage, real-time updates, and role routing.",
      "Attended the Applied Design Thinking workshop by Vice President of FORGE."
    ],
    challengesFaced: "I faced challenges while converting problem statements into algorithms, implementing game logic in Scratch, designing the multi-role complaint workflow, and managing real-time data using Firebase.",
    skillsGained: [
      "Problem Analysis",
      "Algorithm Design",
      "Computational Thinking",
      "Python Fundamentals",
      "Game Development",
      "Mobile Application Development",
      "Firebase Integration",
      "UI/UX Design",
      "Design Thinking"
    ],
    conceptsLearned: [
      "Lean Spark Innovation & Entrepreneurship",
      "Think Like a Coder Methodology",
      "Algorithm Development & Flowchart Design",
      "Python Syntax & Logic Control",
      "Scratch Event Blocks & Life Counter Systems",
      "Multi-Role Workflow Systems (Student → Warden → Head → Staff)",
      "Real-Time NoSQL Database Structuring in Firebase",
      "User-Centric Design Thinking"
    ],
    keyLearnings: "The Hostel Complaint Tracker mobile application digitized a complex 6-step institutional workflow (Student → Warden → Hostel Head → Maintenance Staff → Warden → Student) using MIT App Inventor and Firebase. This demonstrated how real-time databases and role-based UI access solve real-world campus problems.",
    reflection: "Overall, Week 2 improved my problem-solving, programming, application development, and design thinking skills. Combining high-level design thinking principles with hands-on coding in Python, Scratch, and App Inventor gave me confidence in building end-to-end user-centric applications.",
    highlights: [
      "Lean Spark session with Mukesh on converting ideas into practical solutions.",
      "Think Like a Coder: 5 problem statements solved with algorithms & flowcharts.",
      "Developed Scratch Dinosaur Shooting Game with score tracking and 5-life system.",
      "Engineered MIT App Inventor Hostel Complaint Tracker digitized 6-step workflow with Firebase.",
      "Applied Design Thinking workshop by Vice President of FORGE."
    ],
    galleryImages: [
      {
        url: "/img/week-2/MIT/User Dashboard.jpeg",
        caption: "MIT App Inventor: Hostel Complaint Tracker — Student & User Dashboard Interface"
      },
      {
        url: "/img/week-2/MIT/Location.png",
        caption: "MIT App Inventor: Hostel Complaint Tracker — Location & Campus Room Mapping"
      },
      {
        url: "/img/week-2/MIT/My Events.jpeg",
        caption: "MIT App Inventor: Hostel Complaint Tracker — Complaint Tracking & Role Status Workflow"
      },
      {
        url: "/img/week-2/MIT/Nodes.png",
        caption: "Firebase Realtime Database: Complaint Nodes Architecture & Multi-Role Status Fields"
      },
      {
        url: "/img/week-2/MIT/Konnecet Bot.jpeg",
        caption: "MIT App Inventor: Visual Block Code & Assistant Bot Integration"
      },
      {
        url: "/img/week-2/Python/Python learning.jpg",
        caption: "Python Fundamentals & Think Like a Coder Algorithm & Flowchart Exercises"
      }
    ],
    tags: ["MIT App Inventor", "Firebase", "Python", "Scratch", "Algorithms", "Flowcharts", "Design Thinking", "Lean Spark", "Mobile App"],
    teamCredits: [
      { role: "Mobile & Software Developer", name: "Theeran P." },
      { role: "Expert Speaker", name: "Mukesh (Author of Lean Spark)" },
      { role: "Workshop Mentor", name: "Vice President of FORGE" }
    ]
  },
  {
    weekNumber: 3,
    id: "forge-w3",
    title: "Week 3 — Electronics Fundamentals & 3D Product Design",
    subtitle: "Electronics Fundamentals, Ohm's Law, Circuit Components & Autodesk Fusion 360 Parametric CAD Modelling",
    dateRange: "Week 3",
    category: "Electronics & 3D Design",
    status: "Completed",
    summary: "Week 3 focused on electronics fundamentals, CAD, 3D modelling, and product design. The sessions helped me understand basic electrical concepts and apply design concepts using Autodesk Fusion 360.\n\nI learned fundamentals such as voltage, current, resistance, Ohm’s Law (V = I × R), and electronic components including resistors, capacitors, and diodes.\n\nIn Fusion 360, I followed the workflow of Idea → 2D Sketch → Dimensions & Constraints → 3D Features → Final Model. I practiced creating accurate sketches and converting them into 3D models.\n\nI designed a mechanical component with a base plate, mounting holes, vertical sections, and cylindrical supports. I also created 3D models of a Microphone, Paper Rocket with fins, and Water Bottle, focusing on proportions, symmetry, and accuracy.",
    objectives: [
      "Understand basic electronics and Ohm’s Law (V = I × R).",
      "Learn the functions of resistors, capacitors, and diodes.",
      "Learn the Fusion 360 product design workflow (Idea → 2D Sketch → Dimensions & Constraints → 3D Features → Final Model).",
      "Practice 2D parametric sketching with dimensions and constraints.",
      "Create detailed mechanical and real-world 3D models.",
      "Improve accuracy, spatial thinking, and product design skills."
    ],
    activitiesCompleted: [
      "Studied basic electronics and circuit concepts.",
      "Learned about resistors, capacitors, and diodes.",
      "Practiced 2D parametric sketching in Autodesk Fusion 360.",
      "Created a detailed mechanical component with mounting holes and supports.",
      "Modeled a 3D Microphone, Paper Rocket with fins, and Water Bottle.",
      "Focused on dimensions, proportions, symmetry, and design accuracy."
    ],
    challengesFaced: "I faced challenges in applying accurate dimensions and geometric constraints while creating sketches and converting reference designs into precise 3D models. Maintaining the correct proportions and symmetry of real-world products also required careful observation and repeated adjustments.",
    skillsGained: [
      "Basic Electronics",
      "Circuit Fundamentals",
      "Problem Solving",
      "CAD Modelling",
      "2D Sketching",
      "3D Modelling",
      "Geometric Constraints",
      "Dimensioning",
      "Product Design",
      "Spatial Thinking",
      "Attention to Detail",
      "Design Iteration"
    ],
    conceptsLearned: [
      "Voltage, Current, Resistance & Ohm's Law (V = I × R)",
      "Resistors, Capacitors & Diode Characteristics",
      "Fusion 360 Parametric CAD Workflow",
      "2D Sketching, Dimensions & Geometric Constraints",
      "Extrusions, Fillets & 3D Feature Operations",
      "Mechanical Base Plate & Mounting Holes Design",
      "Proportional & Symmetrical Real-World Product Modeling"
    ],
    keyLearnings: "Mastered the end-to-end CAD workflow (Idea → 2D Sketch → Dimensions & Constraints → 3D Features → Final Model) in Autodesk Fusion 360 while deepening my understanding of electronic circuit fundamentals and Ohm's Law.",
    reflection: "Overall, Week 3 helped me strengthen my electronics knowledge, CAD modelling, 3D design, and product development skills.",
    highlights: [
      "Studied electronics circuit concepts, Ohm's Law (V = I × R), and passive/active components.",
      "Mastered Autodesk Fusion 360 parametric 2D sketching & 3D feature creation.",
      "Designed a custom mechanical component with base plate, mounting holes, and supports.",
      "Created precise 3D models of a Microphone, Paper Rocket with fins, and Water Bottle."
    ],
    galleryImages: [
      {
        url: "/img/week-3/Electronics/DSC_9930.jpg",
        caption: "Electronics Fundamentals: Studying Circuit Concepts, Ohm's Law & Component Functions"
      },
      {
        url: "/img/week-3/Mecahnical/Base Sketch.png",
        caption: "Autodesk Fusion 360: 2D Parametric Base Sketch with Dimensions & Geometric Constraints"
      },
      {
        url: "/img/week-3/Mecahnical/Base Body.png",
        caption: "Autodesk Fusion 360: Extruded 3D Mechanical Component Base Body"
      },
      {
        url: "/img/week-3/Mecahnical/Home view body.png",
        caption: "Autodesk Fusion 360: Mechanical Component 3D Home View with Mounting Holes & Supports"
      },
      {
        url: "/img/week-3/Mecahnical/Home view Decay.png",
        caption: "Autodesk Fusion 360: Mechanical Assembly Perspective & Component Render Projection"
      }
    ],
    tags: ["Autodesk Fusion 360", "CAD & 3D Modelling", "2D Parametric Sketching", "Electronics Fundamentals", "Ohm’s Law", "Mechanical Design", "Product Design"],
    teamCredits: [
      { role: "CAD & Product Designer", name: "Theeran P." },
      { role: "Domain Lead", name: "Protosem Design & Electronics Team" }
    ]
  },
  ...Array.from({ length: 17 }, (_, i) => {
    const weekNum = i + 4;
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
