'use client';

import { cn } from "@/lib/utils";
import { forwardRef, ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface TypographyProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
}

const defaultTransition = {
  duration: 0.7,
  ease: [0.32, 0.23, 0, 1]  // Custom easing curve for smooth deceleration
};

// Default viewport configuration for all components
const defaultViewport = { 
  once: true, 
  amount: 0.3,  // Trigger when 30% of the element is in view
  margin: "0px 0px -100px 0px" // Negative margin means it triggers 100px before coming into view
};

// Default animation variants for different typography types
const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: defaultTransition
  }
};

const paragraphVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: defaultTransition
  }
};

const listVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: defaultTransition
  }
};

const listItemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: defaultTransition
  }
};

// H1
export const H1 = forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ children, className, variants = headingVariants, initial = "hidden", viewport = defaultViewport, ...props }, ref) => {
    return (
      <motion.h1
        ref={ref}
        className={cn(
          "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
          className
        )}
        variants={variants}
        initial={initial}
        whileInView="visible"
        viewport={viewport}
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
  ({ children, className, variants = headingVariants, initial = "hidden", viewport = defaultViewport, ...props }, ref) => {
    return (
      <motion.h2
        ref={ref}
        className={cn(
          "scroll-m-20 pb-2 text-3xl md:text-5xl font-semibold tracking-tight first:mt-0 font-rubik-mono-one",
          "text-btv-blue mb-4",
          className,
        )}
        variants={variants}
        initial={initial}
        whileInView="visible"
        viewport={viewport}
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
  ({ children, className, variants = headingVariants, initial = "hidden", viewport = defaultViewport, ...props }, ref) => {
    return (
      <motion.h3
        ref={ref}
        className={cn(
          "scroll-m-20 text-center text-xl font-semibold tracking-tight",
          className
        )}
        variants={variants}
        initial={initial}
        whileInView="visible"
        viewport={viewport}
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
  ({ children, className, variants = paragraphVariants, initial = "hidden", viewport = defaultViewport, ...props }, ref) => {
    return (
      <motion.p
        ref={ref}
        className={cn("leading-7 [&:not(:first-child)]:mt-6 text-lg md:text-xl", className)}
        variants={variants}
        initial={initial}
        whileInView="visible"
        viewport={viewport}
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
  ({ children, className, variants = paragraphVariants, initial = "hidden", viewport = defaultViewport, ...props }, ref) => {
    return (
      <motion.p 
        ref={ref} 
        className={cn("text-xl text-muted-foreground", className)}
        variants={variants}
        initial={initial}
        whileInView="visible"
        viewport={viewport}
        {...props}
      >
        {children}
      </motion.p>
    );
  }
);

Subtitle.displayName = "Subtitle";

// UL
export const UL = forwardRef<HTMLUListElement, TypographyProps>(
  ({ children, className, variants = listVariants, initial = "hidden", viewport = defaultViewport, ...props }, ref) => {
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
export const OL = forwardRef<HTMLOListElement, TypographyProps>(
  ({ children, className, variants = listVariants, initial = "hidden", viewport = defaultViewport, ...props }, ref) => {
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
export const LI = forwardRef<HTMLLIElement, TypographyProps>(
  ({ children, className, variants = listItemVariants, initial = "hidden", viewport = defaultViewport, ...props }, ref) => {
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
