"use client";
import { cn } from "@/lib/utils";
import { useMotionValue, motion, useMotionTemplate } from "framer-motion";
import React, { forwardRef } from "react";
interface HeroHighlightProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

export const HeroHighlight = forwardRef<HTMLDivElement, HeroHighlightProps>(
  ({ children, className, containerClassName }, ref) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({
      currentTarget,
      clientX,
      clientY,
    }: React.MouseEvent<HTMLDivElement>) {
      if (!currentTarget) return;
      const { left, top } = currentTarget.getBoundingClientRect();

      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }
    return (
      <div
        className={cn(
          "relative h-[100vh] flex items-center bg-white dark:bg-black justify-center w-full group",
          containerClassName
        )}
        onMouseMove={handleMouseMove}
        ref={ref}
      >
        <div className="absolute inset-0 bg-dot-thick-neutral-300 dark:bg-dot-thick-neutral-800  pointer-events-none" />
        <motion.div
          className="pointer-events-none bg-dot-thick-indigo-500 dark:bg-dot-thick-indigo-500   absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
          style={{
            WebkitMaskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
            maskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
          }}
        />
        {/* !!! removed relative for dot canvas */}
        <div className={cn("z-20", className)}>{children}</div>
      </div>
    );
  }
);

export const Highlight = ({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number; // Add delay as a prop
}) => {
  return (
    <motion.span
      initial={{
        backgroundSize: "0% 100%",
      }}
      animate={{
        backgroundSize: "100% 100%",
      }}
      transition={{
        duration: 1,
        ease: "circOut",
        delay, // Use the delay prop
      }}
      style={{
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left center",
        display: "inline",
      }}
      className={cn(
        `
relative inline-block pb-1 px-1 rounded-lg 
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
};

HeroHighlight.displayName = "HeroHighlight";
