"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const buttonVariants = {
  rest: { 
    x: 0,
    transition: { duration: 0.2, ease: "easeInOut" }
  },
  hover: { 
    x: 5,
    transition: { duration: 0.2, ease: "easeInOut" }
  }
};

const arrowVariants = {
  rest: { 
    x: 0,
    transition: { duration: 0.2, ease: "easeInOut" }
  },
  hover: { 
    x: 5,
    transition: { duration: 0.2, ease: "easeInOut" }
  }
};

interface AnimatedButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: 'fullWidth' | 'fitContent';
}

export function AnimatedButton({ 
  href, 
  children, 
  className,
  variant = 'fitContent' 
}: AnimatedButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - 32;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.a
      href={href}
      onClick={handleClick}
      initial="rest"
      whileHover="hover"
      animate="rest"
      className={cn(
        "inline-flex items-center justify-center gap-3 px-6 py-3 text-white bg-btv-blue hover:bg-btv-blue-600 rounded-md transition-colors",
        variant === 'fullWidth' ? 'w-full' : 'w-fit',
        className
      )}
    >
      <motion.span variants={buttonVariants}>
        {children}
      </motion.span>
      <motion.svg 
        variants={arrowVariants}
        xmlns="http://www.w3.org/2000/svg" 
        width="20" 
        height="20" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path d="M5 12h14"/>
        <path d="m12 5 7 7-7 7"/>
      </motion.svg>
    </motion.a>
  );
}
