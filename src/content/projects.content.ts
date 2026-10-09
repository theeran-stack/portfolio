// @/content/projects.content.ts
import { ProjectItem } from '@/types/portfolio.types';

export const projectsData: ProjectItem[] = [
  {
    id: 'digital-ecosystem-platform',
    slug: 'digital-ecosystem-platform',
    title: 'Enterprise Identity & Workspace Platform',
    subtitle: 'A production-grade Next.js multi-page ecosystem with an integrated OS Finder workspace',
    description: 'I engineered my own digital identity platform using Next.js App Router, Tailwind CSS, Framer Motion, and strict TypeScript content architecture.',
    fullDescription: 'I built this platform to serve as my permanent digital hub for the next decade. Rather than building a simple portfolio landing page, I architected an enterprise-grade ecosystem featuring a desktop-inspired Forge Finder workspace, filterable events engine, mode selector, and cinematic filmography viewer.',
    category: 'Full Stack',
    status: 'Completed',
    date: '2026-08-01',
    technologies: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Lucide Icons'],
    githubUrl: 'https://github.com/theeran-p/portfolio-ecosystem',
    liveUrl: 'https://theeran.dev',
    featuredImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1600&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1600&auto=format&fit=crop',
    ],
    problemStatement: 'Conventional portfolio templates quickly become stale and require full architectural rewrites every few years. Furthermore, static portfolios fail to capture the dual nature of technical engineering and high-end video production.',
    solutionArchitecture: 'I implemented a clean separation of presentation and content. All personal data is queried from strongly-typed TypeScript configuration files. I built a mode switching system allowing visitors to select Creator, Developer, or Hybrid view modes, along with an OS-inspired folder explorer for my Forge experience.',
    lessonsLearned: [
      'I mastered Next.js Server Components for fast zero-JS initial page shell rendering.',
      'I learned to build reusable Framer Motion variants that keep animations GPU-accelerated and light.',
      'I established design token patterns for theme modes that prevent layout shifts and flickering.'
    ],
    isFeatured: true,
  },
  {
    id: 'forge-workspace-explorer',
    slug: 'forge-workspace-explorer',
    title: 'Forge OS Folder Explorer UI',
    subtitle: 'Interactive desktop-class file navigator for documenting 20+ engineering weeks',
    description: 'I designed an OS-inspired file navigation workspace that allows visitors to explore 20+ weeks of my Forge engineering journey.',
    fullDescription: 'I created the Forge Workspace Explorer to replace traditional long-scrolling blog posts with an interactive desktop Finder experience. It includes search filtering, tree navigation, file previewing, team member LinkedIn links, and gallery integration.',
    category: 'Creative Tech',
    status: 'Maintained',
    date: '2026-05-15',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    githubUrl: 'https://github.com/theeran-p/forge-explorer-ui',
    featuredImage: 'https://images.unsplash.com/photo-1618401471353-b98aedd04e11?q=80&w=1600&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1618401471353-b98aedd04e11?q=80&w=1600&auto=format&fit=crop',
    ],
    problemStatement: 'Documenting multi-week learning journeys often results in cluttered timelines where specific technical code or resources get buried.',
    solutionArchitecture: 'I architected a folder tree structure where each week operates as a self-contained virtual folder with structured files (overview.md, technologies.json, team.ts, challenges.md, reflection.md).',
    lessonsLearned: [
      'I designed stateful search filters that filter folder nodes instantly without page reloads.',
      'I implemented responsive drawer fallbacks for mobile screens.'
    ],
    isFeatured: true,
  },
  {
    id: 'embedded-camera-telemetry',
    slug: 'embedded-camera-telemetry',
    title: 'Arduino Camera Rig Telemetry',
    subtitle: 'Hardware sensor rig for real-time gimbal roll, pitch, and camera metadata logging',
    description: 'I developed an Arduino-based telemetry logger that captures camera motion angles and sensor data during live cinematography shoots.',
    fullDescription: 'Combining my passion for hardware microcontrollers and cinematography, I built an embedded telemetry logging module. It mounts onto camera rigs to track movement smooth metrics, temperature, and shot duration.',
    category: 'Systems / C++',
    status: 'Completed',
    date: '2025-11-20',
    technologies: ['C++', 'Arduino IDE', 'IMU Sensors', 'MicroSD Logging'],
    githubUrl: 'https://github.com/theeran-p/camera-rig-telemetry',
    featuredImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop',
    ],
    problemStatement: 'Achieving consistent gimbal moves during dynamic camera shoots requires precise feedback on tilt/roll angles.',
    solutionArchitecture: 'I wrote C++ firmware using Arduino IDE to read 6-axis IMU sensor inputs at 100Hz, writing output telemetry to an onboard MicroSD logger.',
    lessonsLearned: [
      'I gained experience with low-level sensor calibration in C++.',
      'I learned how to minimize power consumption for battery-operated field hardware.'
    ],
    isFeatured: true,
  },
];
