'use client';

import type { Variants } from 'framer-motion';
import { useAnimation, motion } from 'framer-motion';

interface WaypointsIconProps {
  className?: string;
  size?: number;
}

const variants: Variants = {
  normal: {
    pathLength: 1,
    opacity: 1,
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

const WaypointsIcon = ({ className = "", size = 28 }: WaypointsIconProps) => {
  const controls = useAnimation();

  return (
    <div
      className={`${className} cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`}
      onMouseEnter={() => controls.start('animate')}
      onMouseLeave={() => controls.start('normal')}
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
          custom={0}
        />
        <motion.path
          d="m10.2 6.3-3.9 3.9"
          variants={variants}
          animate={controls}
          custom={1}
        />
        <motion.circle
          cx="4.5"
          cy="12"
          r="2.5"
          variants={variants}
          animate={controls}
          custom={0}
        />
        <motion.path
          d="M7 12h10"
          variants={variants}
          animate={controls}
          custom={2}
        />
        <motion.circle
          cx="19.5"
          cy="12"
          r="2.5"
          variants={variants}
          animate={controls}
          custom={0}
        />
        <motion.path
          d="m13.8 17.7 3.9-3.9"
          variants={variants}
          animate={controls}
          custom={3}
        />
        <motion.circle
          cx="12"
          cy="19.5"
          r="2.5"
          variants={variants}
          animate={controls}
          custom={0}
        />
      </svg>
    </div>
  );
};

export { WaypointsIcon };
