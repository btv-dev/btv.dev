'use client';

import type { Variants } from 'framer-motion';
import { useAnimation, motion } from 'framer-motion';
import { useEffect } from 'react';

interface SquarePenIconProps {
  className?: string;
  size?: number;
  isVisible?: boolean;
}

const squareVariants: Variants = {
  normal: {
    opacity: 0,
    pathLength: 0,
  },
  animate: {
    opacity: 1,
    pathLength: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const penVariants: Variants = {
  normal: {
    opacity: 0,
    pathLength: 0,
    scale: 0.8,
  },
  animate: {
    opacity: 1,
    pathLength: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: 0.2,
    },
  },
};

const SquarePenIcon = ({ className = "", size = 28, isVisible = false }: SquarePenIconProps) => {
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
      className={`${className} cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`}
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
        style={{ overflow: 'visible' }}
      >
        <motion.path
          d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
          initial="normal"
          animate={controls}
          variants={squareVariants}
        />
        <motion.path
          d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"
          initial="normal"
          animate={controls}
          variants={penVariants}
          style={{ transformOrigin: '18.375px 2.625px' }}
        />
      </svg>
    </div>
  );
};

export { SquarePenIcon };
