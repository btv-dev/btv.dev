'use client';

import { useAnimation, motion } from 'framer-motion';
import { useEffect } from 'react'

interface LayoutPanelTopIconProps {
  className?: string;
  size?: number;
  isVisible?: boolean;
}

const LayoutPanelTopIcon = ({ className = "", size = 28, isVisible = false }: LayoutPanelTopIconProps) => {
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
        <motion.rect
          width="18"
          height="7"
          x="3"
          y="3"
          rx="1"
          initial={{ opacity: 0, translateY: -5 }}
          animate={controls}
          variants={{
            normal: { opacity: 0, translateY: -5 },
            animate: {
              opacity: [0, 1],
              translateY: [-5, 0],
              transition: {
                opacity: { duration: 0.5, times: [0.2, 1] },
                duration: 0.5,
              },
            },
          }}
        />
        <motion.rect
          width="7"
          height="7"
          x="3"
          y="14"
          rx="1"
          initial={{ opacity: 0, translateX: -5 }}
          animate={controls}
          variants={{
            normal: { opacity: 0, translateX: -5 },
            animate: {
              opacity: [0, 1],
              translateX: [-5, 0],
              transition: {
                opacity: { duration: 0.5, times: [0.2, 1] },
                duration: 0.5,
                delay: 0.1,
              },
            },
          }}
        />
        <motion.rect
          width="7"
          height="7"
          x="14"
          y="14"
          rx="1"
          initial={{ opacity: 0, translateX: 5 }}
          animate={controls}
          variants={{
            normal: { opacity: 0, translateX: 5 },
            animate: {
              opacity: [0, 1],
              translateX: [5, 0],
              transition: {
                opacity: { duration: 0.5, times: [0.2, 1] },
                duration: 0.5,
                delay: 0.2,
              },
            },
          }}
        />
      </svg>
    </div>
  );
};

export { LayoutPanelTopIcon };
