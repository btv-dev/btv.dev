'use client';

import type { Variants } from 'framer-motion';
import { useAnimation, motion } from 'framer-motion';

interface TrendingUpIconProps {
  className?: string;
  size?: number;
}

const svgVariants: Variants = {
  animate: {
    x: 0,
    y: 0,
    translateX: [0, 2, 0],
    translateY: [0, -2, 0],
    transition: {
      duration: 0.5,
    },
  },
};

const pathVariants: Variants = {
  normal: {
    opacity: 1,
    pathLength: 1,
    transition: {
      duration: 0.4,
      opacity: { duration: 0.1 },
    },
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    pathOffset: [1, 0],
    transition: {
      duration: 0.4,
      opacity: { duration: 0.1 },
    },
  },
};

const arrowVariants: Variants = {
  normal: {
    opacity: 1,
    pathLength: 1,
    transition: {
      delay: 0.3,
      duration: 0.3,
      opacity: { duration: 0.1, delay: 0.3 },
    },
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    pathOffset: [0.5, 0],
    transition: {
      delay: 0.3,
      duration: 0.3,
      opacity: { duration: 0.1, delay: 0.3 },
    },
  },
};

const TrendingUpIcon = ({ className = "", size = 28 }: TrendingUpIconProps) => {
  const controls = useAnimation();

  return (
    <div
      className={`${className} cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`}
      onMouseEnter={() => controls.start('animate')}
      onMouseLeave={() => controls.start('normal')}
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
        variants={svgVariants}
        initial="normal"
        animate={controls}
      >
        <motion.polyline
          points="22 7 13.5 15.5 8.5 10.5 2 17"
          variants={pathVariants}
          initial="normal"
          animate={controls}
        />
        <motion.polyline
          points="16 7 22 7 22 13"
          variants={arrowVariants}
          initial="normal"
          animate={controls}
        />
      </motion.svg>
    </div>
  );
};

export { TrendingUpIcon };
