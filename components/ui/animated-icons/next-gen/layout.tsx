'use client';

import { AnimatedIconProps } from '@/types/icons';
import { useAnimation, motion } from 'framer-motion';
import { useEffect } from 'react'

export const LayoutIcon = ({ className = "", size = 28, isAnimate = false }: AnimatedIconProps) => {
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
          initial={{ opacity: 0, translateY: -6 }}
          animate={controls}
          variants={{
            normal: { opacity: 0, translateY: -6 },
            animate: {
              opacity: 1,
              translateY: 0,
              transition: {
                duration: 0.6,
                ease: "easeInOut"
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
          initial={{ opacity: 0, translateX: -6 }}
          animate={controls}
          variants={{
            normal: { opacity: 0, translateX: -6 },
            animate: {
              opacity: 1,
              translateX: 0,
              transition: {
                duration: 0.6,
                delay: 0.1,
                ease: "easeInOut"
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
          initial={{ opacity: 0, translateX: 6 }}
          animate={controls}
          variants={{
            normal: { opacity: 0, translateX: 6 },
            animate: {
              opacity: 1,
              translateX: 0,
              transition: {
                duration: 0.6,
                delay: 0.2,
                ease: "easeInOut"
              },
            },
          }}
        />
      </svg>
    </div>
  );
};
