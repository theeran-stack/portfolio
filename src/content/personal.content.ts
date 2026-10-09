// @/content/personal.content.ts
import { PersonalProfile } from '@/types/portfolio.types';

export const personalProfile: PersonalProfile = {
  name: 'Theeran P.',
  roles: ['Computer Science Student', 'Video Editor', 'Cinematographer'],
  education: {
    degree: 'Bachelor of Engineering',
    field: 'Computer Science and Engineering',
    institution: 'Kumaraguru College of Technology',
    location: {
      city: 'Coimbatore',
      state: 'Tamil Nadu',
      country: 'India',
    },
    startYear: 2024,
    endYear: 2028,
  },
  clubs: ['Nigal Club', 'Elaris'],
  bioStatements: [
    "I am a Computer Science Engineering student at Kumaraguru College of Technology, passionate about fusing modern software engineering with creative storytelling.",
    "I adapt quickly to new environments and continuously enjoy learning new technologies, tools, and technical disciplines.",
    "Alongside pursuing my degree, I have developed practical hands-on experience in cinematography and professional video editing.",
    "I actively contribute to the filmmaking community within my college as part of Nigal Club and Elaris, while also taking on freelance editing and cinematography projects.",
    "My goal is to build long-lasting, beautifully designed digital products and visual stories that resonate with people worldwide."
  ],
  socials: {
    github: 'https://github.com/theeran-p',
    linkedin: 'https://linkedin.com/in/theeran-p',
    email: 'theeran.p@kct.ac.in',
    instagram: 'https://instagram.com/theeran_p',
  },
  stats: {
    yearsCS: 3,
    yearsCinematography: 3,
    yearsEditing: 2,
    eventsCovered: 50,
    forgeWeeks: 20,
  },
};
