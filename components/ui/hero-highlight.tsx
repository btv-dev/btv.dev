"use client";
import { cn } from "@/lib/utils";
import { useMotionValue, motion, useMotionTemplate } from "framer-motion";
import React, { forwardRef } from "react";
interface HeroHighlightProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  deactivateDots?: boolean;
}

export const HeroHighlight = forwardRef<HTMLDivElement, HeroHighlightProps>(
  ({ children, className, containerClassName, deactivateDots = false }, ref) => {
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
        {!deactivateDots && (
          <>
            <div className="absolute inset-0 bg-dot-thick-neutral-300 dark:bg-dot-thick-neutral-800 pointer-events-none" />
            <motion.div
              className="pointer-events-none bg-dot-thick-btv-blue-500 dark:bg-dot-thick-btv-blue-500 absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
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
          </>
        )}
        {/* Linear Gradient Overlays */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: `linear-gradient(to top, rgb(255, 255, 255) 0%, transparent 15rem)`,
          }}
        />

        {/* Content */}
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
  delay?: number;
}) => {
  return (
    <motion.div
      className={cn("relative inline-flex items-center justify-center whitespace-nowrap leading-8 sm:leading-tight", className)}
      initial={{
        scale: 1,
      }}
      animate={{
        scale: [1, 1.02, 1],
      }}
      transition={{
        scale: {
          duration: 0.5,
          times: [0, 0.6, 1],
          ease: "anticipate",
          delay,
        },
      }}
    >
      {/* Base black text */}
      <span className="relative whitespace-nowrap px-[0.1em]">
        {children}
      </span>

      {/* Highlight and white text layer */}
      <motion.span
        className="absolute inset-0 whitespace-nowrap flex items-center justify-center"
        initial={{
          WebkitMaskImage: "linear-gradient(to right, black 0%, transparent 0%)",
          maskImage: "linear-gradient(to right, black 0%, transparent 0%)",
        }}
        animate={{
          WebkitMaskImage: "linear-gradient(to right, black 100%, transparent 100%)",
          maskImage: "linear-gradient(to right, black 100%, transparent 100%)",
        }}
        transition={{
          duration: 0.4,
          ease: "circInOut",
          delay,
        }}
        style={{
          backgroundImage:
            "linear-gradient(120deg, var(--highlight-color, #1D83C4) 0%, var(--highlight-color, #75beeb) 100%)",
          backgroundSize: "100% 100%",
          color: "white",
          borderRadius: "0.2em",
        }}
      >
        {children}
      </motion.span>
    </motion.div>
  );
};

HeroHighlight.displayName = "HeroHighlight";
