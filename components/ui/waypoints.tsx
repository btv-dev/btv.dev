'use client';

import type { Variants } from 'framer-motion';
import { useAnimation, motion } from 'framer-motion';
import { useEffect } from 'react'

interface WaypointsIconProps {
  className?: string;
  size?: number;
  isVisible?: boolean;
}

const variants: Variants = {
  normal: {
    pathLength: 0,
    opacity: 0,
  },
  animate: (custom: number) => ({
    pathLength: [0, 1],
    opacity: [0, 1],
    transition: {
      delay: 0.15 * custom,
      opacity: { delay: 0.1 * custom },
    },
  }),
};

const pathVariants: Variants = {
  normal: {
    opacity: 0,
    pathLength: 0,
    scale: 0.5,
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    scale: [0.5, 1],
    transition: {
      duration: 1,
      opacity: { duration: 0.1 },
    },
  },
};

const WaypointsIcon = ({ className = "", size = 28, isVisible = false }: WaypointsIconProps) => {
  const controls = useAnimation();

  useEffect(() => {
    if (isVisible) {
      controls.start('animate');
    } else {
      controls.start('normal');
    }
  }, [isVisible, controls]);

  return (
    <div
      className={`${className} flex items-center justify-center`}
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
        <motion.circle
          cx="12"
          cy="4.5"
          r="2.5"
          variants={variants}
          animate={controls}
          initial="normal"
          custom={0}
        />
        <motion.path
          d="m10.2 6.3-3.9 3.9"
          variants={pathVariants}
          animate={controls}
          initial="normal"
        />
        <motion.circle
          cx="4.5"
          cy="12"
          r="2.5"
          variants={variants}
          animate={controls}
          initial="normal"
          custom={0}
        />
        <motion.path
          d="M7 12h10"
          variants={pathVariants}
          animate={controls}
          initial="normal"
        />
        <motion.circle
          cx="19.5"
          cy="12"
          r="2.5"
          variants={variants}
          animate={controls}
          initial="normal"
          custom={0}
        />
        <motion.path
          d="m13.8 17.7 3.9-3.9"
          variants={pathVariants}
          animate={controls}
          initial="normal"
        />
        <motion.circle
          cx="12"
          cy="19.5"
          r="2.5"
          variants={variants}
          animate={controls}
          initial="normal"
          custom={0}
        />
      </svg>
    </div>
  );
};

export { WaypointsIcon };
