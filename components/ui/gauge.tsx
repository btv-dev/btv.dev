'use client';

import type { Transition } from 'framer-motion';
import { useAnimation, motion } from 'framer-motion';
import { useEffect } from 'react'

const defaultTransition: Transition = {
  type: 'spring',
  stiffness: 160,
  damping: 17,
  mass: 1,
};

interface GaugeIconProps {
  className?: string;
  size?: number;
  isVisible?: boolean;
}

const GaugeIcon = ({ className = "", size = 28, isVisible = false }: GaugeIconProps) => {
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
      >
        <motion.path
          d="m12 14 4-4"
          initial={{ opacity: 0, translateX: 0, translateY: 0, rotate: 0 }}
          variants={{
            normal: { opacity: 0, translateX: 0, translateY: 0, rotate: 0 },
            animate: { translateX: 0.5, translateY: 3, rotate: 72, opacity: 1 },
          }}
          animate={controls}
          transition={defaultTransition}
        />
        <motion.path 
          d="M3.34 19a10 10 0 1 1 17.32 0"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={controls}
          variants={{
            normal: { opacity: 0, pathLength: 0 },
            animate: { opacity: 1, pathLength: 1 },
          }}
          transition={{ duration: 0.5 }}
        />
      </svg>
    </div>
  );
};

export { GaugeIcon };
