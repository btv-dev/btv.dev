"use client";

import { cn } from "@/lib/utils";
import { useMotionValue, motion, useMotionTemplate } from "framer-motion";
import React, { forwardRef } from "react";

// Animation timing constant (sync with HeroHighlight.tsx)
const CARD_ANIMATION_DELAY = 0.9; // Start just after dot appears

interface HeroHighlightProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

export const HeroHighlight = forwardRef<HTMLDivElement, HeroHighlightProps>(
  ({ className, children, containerClassName }, ref) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ clientX, clientY, currentTarget }: React.MouseEvent) {
      const { left, top } = currentTarget.getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }
    
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: CARD_ANIMATION_DELAY,
          duration: 0.6,
          ease: "easeOut",
        }}
        className={cn(
          "relative h-[100vh] flex items-center bg-white dark:bg-black justify-center w-full group",
          containerClassName
        )}
        onMouseMove={handleMouseMove}
      >
        {/* Gradient background */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                650px circle at ${mouseX}px ${mouseY}px,
                rgba(29, 131, 196, 0.05),
                transparent 80%
              )
            `,
          }}
        />

        {/* Content */}
        <div className={cn("z-20", className)}>{children}</div>
      </motion.div>
    );
  }
);

interface HighlightProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function Highlight({ children, delay = 0, className }: HighlightProps) {
  return (
    <motion.span
      initial={{
        backgroundSize: "0% 100%",
        scale: 1,
      }}
      animate={{
        backgroundSize: "100% 100%",
        scale: [1, 1.02, 1],
      }}
      transition={{
        backgroundSize: {
          duration: 0.4,
          ease: "circInOut",
          delay,
        },
        scale: {
          duration: 0.5,
          times: [0, 0.6, 1],
          ease: "anticipate",
          delay,
        },
      }}
      style={{
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left center",
        display: "inline",
        whiteSpace: "nowrap",
      }}
      className={cn(
        `
relative inline whitespace-nowrap pb-1 px-1 rounded-lg 
bg-gradient-to-r 
from-[#58AED2] to-[#74D7E2]
dark:from-[#3F90BB] dark:to-[#51B3C7]
`,
        className
      )}
    >
      {children}
    </motion.span>
  );
}

HeroHighlight.displayName = "HeroHighlight";
