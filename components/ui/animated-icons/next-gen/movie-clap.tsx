'use client';

import { AnimatedIconProps } from '@/types/icons';
import { useAnimation, motion, Variants } from 'framer-motion';
import { useEffect } from 'react';

const ClapIcon = ({ className = "", size = 28, isAnimate = false }: AnimatedIconProps) => {
  const controls = useAnimation();

  useEffect(() => {
    if (isAnimate) {
      controls.start('animate');
    } else {
      controls.start('normal');
    }
  }, [isAnimate, controls]);

  const variants: Variants = {
    normal: {
      rotate: 0,
      originX: '4px',
      originY: '20px',
      opacity: [0, 1],
      transition: {
        opacity: { duration: 0.3 }
      }
    },
    animate: {
      rotate: [0, -10, -10, -10, 0],
      opacity: 1,
      transition: {
        duration: 0.8,
        times: [0, 0.2, 0.4, 0.6, 1],
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const clapVariants: Variants = {
    normal: {
      rotate: 0,
      originX: '3px',
      originY: '11px',
      opacity: 1,
    },
    animate: {
      rotate: [0, 0, -15, 20, 0],
      opacity: 1,
      transition: {
        duration: 0.4,
        times: [0, 0.2, 0.4, 0.6, 1],
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  return (
    <div 
      className={`${className} flex items-center justify-center`}
      onMouseEnter={() => !isAnimate && controls.start('animate')}
      onMouseLeave={() => !isAnimate && controls.start('normal')}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ overflow: 'visible' }}
        initial="normal"
        animate={controls}
      >
        <motion.g variants={variants}>
          <motion.g variants={clapVariants}>
            <motion.path d="M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3Z" />
            <motion.path d="m6.2 5.3 3.1 3.9" />
            <motion.path d="m12.4 3.4 3.1 4" />
          </motion.g>
          <motion.path d="M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
        </motion.g>
      </motion.svg>
    </div>
  );
};

export { ClapIcon };
