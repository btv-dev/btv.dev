"use client";
import { cn } from "@/lib/utils";
import { useMotionValue, motion, useMotionTemplate } from "framer-motion";
import React, { forwardRef } from "react";
interface HeroHighlightProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  fadeTop?: boolean;
  fadeBottom?: boolean;
}

export const DotsBackground = forwardRef<HTMLDivElement, HeroHighlightProps>(
  ({ children, className, containerClassName, fadeTop, fadeBottom }, ref) => {
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
          "relative flex items-center bg-white dark:bg-black justify-center w-full group",
          containerClassName
        )}
        onMouseMove={handleMouseMove}
        ref={ref}
      >
        <div className="absolute inset-0 bg-dot-thick-neutral-200 dark:bg-dot-thick-neutral-800  pointer-events-none" />
        <motion.div
          className="pointer-events-none bg-dot-thick-indigo-400 dark:bg-dot-thick-indigo-500  absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
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

        {/* Linear Gradient Overlays */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background:
              [
                fadeTop &&
                  "linear-gradient(to bottom, rgb(255, 255, 255) 0%, transparent 15rem)",
                fadeBottom &&
                  "linear-gradient(to top, rgb(255, 255, 255) 0%, transparent 15rem)",
              ]
                .filter(Boolean)
                .join(", ") || "none",
          }}
        />

        {/* Content */}
        <div className={cn("z-20 py-52 w-full", className)}>{children}</div>
      </div>
    );
  }
);

DotsBackground.displayName = "DotsBackground";
