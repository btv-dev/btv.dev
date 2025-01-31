'use client';

import { AnimatedIconProps } from '@/types/icons';
import type { Variants } from 'framer-motion';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';

const arrowVariants: Variants = {
  initial: { y: 0 },
  normal: { y: 0 },
  animate: {
    y: -2,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 10,
      mass: 1,
    },
  },
};

const UploadIcon = ({ className = "", size = 28, isAnimate = false }: AnimatedIconProps) => {
  const controls = useAnimation();

  useEffect(() => {
    if (isAnimate) {
      controls.start('animate');
    } else {
      controls.start('normal');
    }
  }, [isAnimate, controls]);

  return (
    <div
      className={`${className} flex items-center justify-center`}
      onMouseEnter={() => !isAnimate && controls.start('animate')}
      onMouseLeave={() => !isAnimate && controls.start('normal')}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <motion.g 
          variants={arrowVariants} 
          initial="initial"
          animate={controls}
        >
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" x2="12" y1="3" y2="15" />
        </motion.g>
      </svg>
    </div>
  );
};

export { UploadIcon };
