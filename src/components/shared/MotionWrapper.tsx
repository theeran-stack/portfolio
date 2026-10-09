// @/components/shared/MotionWrapper.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { slideUpVariants } from '@/lib/animations';

interface MotionWrapperProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export const MotionWrapper: React.FC<MotionWrapperProps> = ({
  children,
  delay = 0,
  className,
}) => {
  return (
    <motion.div
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={slideUpVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
};
