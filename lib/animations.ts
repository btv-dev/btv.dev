import { Variants } from "framer-motion";

// Default transition configuration
export const defaultTransition = {
  duration: 0.5,
  ease: [0.32, 0.23, 0, 1] // Custom easing curve for smooth deceleration
};

// Default viewport configuration
export const defaultViewport = { 
  once: true, 
  amount: 0.3,  // Trigger when 30% of the element is in view
  margin: "0px 0px -100px 0px" // Negative margin means it triggers 100px before coming into view
};

// Stagger configuration for parent containers
export const staggerContainer: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

// Variants for different animation types
export const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: defaultTransition
  }
};

export const fadeVariant: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: defaultTransition
  }
};

export const slideInVariant: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: defaultTransition
  }
};
