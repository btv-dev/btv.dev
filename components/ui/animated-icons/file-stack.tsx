'use client';

import { useAnimation, motion, Variants } from 'framer-motion';
import { useEffect } from 'react'

interface FileStackIconProps {
  className?: string;
  size?: number;
  isVisible?: boolean;
}

const FileStackIcon = ({ className = "", size = 28, isVisible = false }: FileStackIconProps) => {
  const controls = useAnimation();

  useEffect(() => {
    if (isVisible) {
      controls.start('animate');
    } else {
      controls.start('normal');
    }
  }, [isVisible, controls]);

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
        <motion.path
          d="M21 7h-3a2 2 0 0 1-2-2V2"
          initial={{ opacity: 0, translateX: -4, translateY: 4 }}
          variants={{
            normal: { opacity: 0, translateX: -4, translateY: 4 },
            animate: { opacity: 1, translateX: 0, translateY: 0 },
          }}
          animate={controls}
        />
        <motion.path
          d="M21 6v6.5c0 .8-.7 1.5-1.5 1.5h-7c-.8 0-1.5-.7-1.5-1.5v-9c0-.8.7-1.5 1.5-1.5H17Z"
          initial={{ opacity: 0, translateX: -4, translateY: 4 }}
          variants={{
            normal: { opacity: 0, translateX: -4, translateY: 4 },
            animate: { opacity: 1, translateX: 0, translateY: 0 },
          }}
          animate={controls}
        />
        <motion.path
          d="M7 8v8.8c0 .3.2.6.4.8.2.2.5.4.8.4H15"
          initial={{ opacity: 0, pathLength: 0 }}
          variants={pathVariants}
          animate={controls}
        />
        <motion.path
          d="M3 12v8.8c0 .3.2.6.4.8.2.2.5.4.8.4H11"
          initial={{ opacity: 0, translateX: 4, translateY: -4 }}
          variants={{
            normal: { opacity: 0, translateX: 4, translateY: -4 },
            animate: { opacity: 1, translateX: 0, translateY: 0 },
          }}
          animate={controls}
        />
      </svg>
    </div>
  );
};

export { FileStackIcon };
