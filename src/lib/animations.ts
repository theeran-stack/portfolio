// @/lib/animations.ts
import { Variants } from 'framer-motion';

export const fadeInVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: custom * 0.08,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export const slideUpVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: custom * 0.1,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const cardHoverVariants: Variants = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.02,
    y: -4,
    transition: {
      duration: 0.25,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const folderExpandVariants: Variants = {
  collapsed: { height: 0, opacity: 0 },
  expanded: {
    height: 'auto',
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 26,
    },
  },
};
