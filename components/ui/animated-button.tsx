"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";

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
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 2000, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 2000, damping: 30 });

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const xPosition = (clientX - left - width / 2) * 0.05;
    const yPosition = (clientY - top - height / 2) * 0.05;
    x.set(xPosition);
    y.set(yPosition);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

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
      ref={ref}
      href={href}
      onClick={handleClick}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        x: mouseX,
        y: mouseY
      }}
      className={cn(
        "inline-flex items-center justify-center gap-3 px-6 py-3 text-white bg-btv-blue hover:bg-btv-blue-600 rounded-md transition-colors",
        variant === 'fullWidth' ? 'w-full' : 'w-fit',
        className
      )}
    >
      <motion.span className="text-lg md:text-2xl">
        {children}
      </motion.span>
      <motion.span 
        animate={{ x: mouseX.get() > 0 ? 5 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <ArrowRight size={20} className="stroke-current" />
      </motion.span>
    </motion.a>
  );
}
