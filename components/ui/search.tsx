'use client';

import { useAnimation, motion } from 'framer-motion';
import { useEffect } from 'react'

interface SearchIconProps {
  className?: string;
  size?: number;
  isVisible?: boolean;
}

const SearchIcon = ({ className = "", size = 28, isVisible = false }: SearchIconProps) => {
  const controls = useAnimation();

  useEffect(() => {
    if (isVisible) {
      controls.start('animate');
    } else {
      controls.start('normal');
    }
  }, [isVisible, controls]);

  return (
    <div className={`${className} flex items-center justify-center`}
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
        variants={{
          normal: { x: 0, y: 0, opacity: 0 },
          animate: {
            x: [0, 0, -3, 0],
            y: [0, -4, 0, 0],
            opacity: 1,
          },
        }}
        initial="normal"
        animate={controls}
        transition={{
          duration: 1,
          bounce: 0.3,
        }}
      >
        <motion.circle
          cx="11"
          cy="11"
          r="8"
          initial={{ opacity: 0, scale: 0.8 }}
          variants={{
            normal: { opacity: 0, scale: 0.8 },
            animate: { opacity: 1, scale: 1 },
          }}
        />
        <motion.path
          d="m21 21-4.3-4.3"
          initial={{ opacity: 0, pathLength: 0 }}
          variants={{
            normal: { opacity: 0, pathLength: 0 },
            animate: { opacity: 1, pathLength: 1 },
          }}
        />
      </motion.svg>
    </div>
  );
};

export { SearchIcon };
