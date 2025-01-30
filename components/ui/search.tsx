'use client';

import { useAnimation, motion } from 'framer-motion';

interface SearchIconProps {
  className?: string;
  size?: number;
}

const SearchIcon = ({ className = "", size = 28 }: SearchIconProps) => {
  const controls = useAnimation();

  return (
    <div
      className={`${className} cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center overflow-hidden`}
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
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, 0, -3, 0],
            y: [0, -4, 0, 0],
          },
        }}
        transition={{
          duration: 1,
          bounce: 0.3,
        }}
        animate={controls}
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </motion.svg>
    </div>
  );
};

export { SearchIcon };
