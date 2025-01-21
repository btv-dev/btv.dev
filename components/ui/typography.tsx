'use client';

import { cn } from "@/lib/utils";
import { forwardRef, ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { fadeUpVariant, fadeVariant, defaultViewport } from "@/lib/animations";

interface TypographyProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  useParentAnimation?: boolean;
}

// H1
export const H1 = forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ children, className, variants = fadeUpVariant, initial = "hidden", viewport = defaultViewport, useParentAnimation, ...props }, ref) => {
    const motionProps = useParentAnimation ? {
      variants: variants
    } : {
      variants: variants,
      initial: initial,
      whileInView: "visible",
      viewport: viewport
    };

    return (
      <motion.h1
        ref={ref}
        className={cn(
          "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
          className
        )}
        {...motionProps}
        {...props}
      >
        {children}
      </motion.h1>
    );
  }
);

H1.displayName = "H1";

// H2
export const H2 = forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ children, className, variants = fadeUpVariant, initial = "hidden", viewport = defaultViewport, useParentAnimation, ...props }, ref) => {
    const motionProps = useParentAnimation ? {
      variants: variants
    } : {
      variants: variants,
      initial: initial,
      whileInView: "visible",
      viewport: viewport
    };

    return (
      <motion.h2
        ref={ref}
        className={cn(
          "scroll-m-20 pb-2 text-3xl md:text-5xl font-semibold tracking-tight first:mt-0 font-rubik-mono-one",
          "text-btv-blue mb-4",
          className,
        )}
        {...motionProps}
        {...props}
      >
        {children}
      </motion.h2>
    );
  }
);

H2.displayName = "H2";

// H3
export const H3 = forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ children, className, variants = fadeUpVariant, initial = "hidden", viewport = defaultViewport, useParentAnimation, ...props }, ref) => {
    const motionProps = useParentAnimation ? {
      variants: variants
    } : {
      variants: variants,
      initial: initial,
      whileInView: "visible",
      viewport: viewport
    };

    return (
      <motion.h3
        ref={ref}
        className={cn(
          "scroll-m-20 text-center text-xl font-semibold tracking-tight",
          className
        )}
        {...motionProps}
        {...props}
      >
        {children}
      </motion.h3>
    );
  }
);

H3.displayName = "H3";

// Paragraph
export const Paragraph = forwardRef<HTMLParagraphElement, TypographyProps>(
  ({ children, className, variants = fadeVariant, initial = "hidden", viewport = defaultViewport, useParentAnimation, ...props }, ref) => {
    const motionProps = useParentAnimation ? {
      variants: variants
    } : {
      variants: variants,
      initial: initial,
      whileInView: "visible",
      viewport: viewport
    };

    return (
      <motion.p
        ref={ref}
        className={cn("leading-7 [&:not(:first-child)]:mt-6 text-lg md:text-xl", className)}
        {...motionProps}
        {...props}
      >
        {children}
      </motion.p>
    );
  }
);

Paragraph.displayName = "Paragraph";

// Subtitle
export const Subtitle = forwardRef<HTMLParagraphElement, TypographyProps>(
  ({ children, className, variants = fadeVariant, initial = "hidden", viewport = defaultViewport, useParentAnimation, ...props }, ref) => {
    const motionProps = useParentAnimation ? {
      variants: variants
    } : {
      variants: variants,
      initial: initial,
      whileInView: "visible",
      viewport: viewport
    };

    return (
      <motion.p 
        ref={ref} 
        className={cn("text-xl text-muted-foreground", className)}
        {...motionProps}
        {...props}
      >
        {children}
      </motion.p>
    );
  }
);

Subtitle.displayName = "Subtitle";

// UL
export const UL = forwardRef<HTMLUListElement, HTMLMotionProps<"ul">>(
  ({ children, className, variants = fadeVariant, initial = "hidden", viewport = defaultViewport, ...props }, ref) => {
    return (
      <motion.ul
        ref={ref}
        className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)}
        variants={variants}
        initial={initial}
        whileInView="visible"
        viewport={viewport}
        {...props}
      >
        {children}
      </motion.ul>
    );
  }
);

UL.displayName = "UL";

// OL
export const OL = forwardRef<HTMLOListElement, HTMLMotionProps<"ol">>(
  ({ children, className, variants = fadeVariant, initial = "hidden", viewport = defaultViewport, ...props }, ref) => {
    return (
      <motion.ol
        ref={ref}
        className={cn("my-6 ml-6 list-decimal [&>li]:mt-2", className)}
        variants={variants}
        initial={initial}
        whileInView="visible"
        viewport={viewport}
        {...props}
      >
        {children}
      </motion.ol>
    );
  }
);

OL.displayName = "OL";

// LI
export const LI = forwardRef<HTMLLIElement, HTMLMotionProps<"li">>(
  ({ children, className, variants = fadeVariant, initial = "hidden", viewport = defaultViewport, ...props }, ref) => {
    return (
      <motion.li 
        ref={ref} 
        className={cn("mt-2", className)}
        variants={variants}
        initial={initial}
        whileInView="visible"
        viewport={viewport}
        {...props}
      >
        {children}
      </motion.li>
    );
  }
);

LI.displayName = "LI";
