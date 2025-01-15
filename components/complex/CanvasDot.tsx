"use client";

import { useEffect, useRef, useState } from "react";
import { MotionValue, useTransform } from "framer-motion";

interface CanvasDotProps {
  dotRef: React.RefObject<HTMLHeadingElement>;
  heroRef: React.RefObject<HTMLDivElement>;
  yMotionValue: MotionValue<number>;
}

// Synchronized with HeroHighlight timing
const DOT_SHOW_DELAY = 750; // Show dot right after text finishes shrinking (600ms + 300ms)

export function CanvasDot({ dotRef, heroRef, yMotionValue }: CanvasDotProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const radiusRef = useRef(0);
  const startTimeRef = useRef<number | null>(null);
  const [showDot, setShowDot] = useState(false);
  const initialYRef = useRef<number | null>(null);
  const [dotPosition, setDotPosition] = useState({ x: 0, y: 0 });
  const targetRadius = 13;

  // Get initial Y position when component mounts
  useEffect(() => {
    if (dotRef.current && heroRef.current) {
      const dotBounds = dotRef.current.getBoundingClientRect();
      const heroBounds = heroRef.current.getBoundingClientRect();
      initialYRef.current = dotBounds.top - heroBounds.top + (dotBounds.height / 2);
      // Set initial X position
      setDotPosition({
        x: dotBounds.left - heroBounds.left + (dotBounds.width / 2),
        y: initialYRef.current
      });
    }
  }, []);

  // Subscribe to y motion value changes
  useEffect(() => {
    const unsubscribe = yMotionValue.onChange(latest => {
      if (initialYRef.current !== null) {
        setDotPosition(prev => ({
          ...prev,
          y: initialYRef.current! + latest
        }));
      }
    });

    return () => unsubscribe();
  }, [yMotionValue]);

  useEffect(() => {
    const timer = setTimeout(() => setShowDot(true), DOT_SHOW_DELAY);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (
      !showDot ||
      !canvasRef.current ||
      !dotRef.current ||
      !heroRef.current ||
      initialYRef.current === null
    )
      return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    let dotX = dotPosition.x;
    let dotY = dotPosition.y;
    let targetX = dotPosition.x;
    let targetY = dotPosition.y;
    const speed = 0.1;

    const updateCanvasSize = () => {
      const currentHeroBounds = heroRef.current?.getBoundingClientRect();
      if (!currentHeroBounds) return;

      canvas.width = currentHeroBounds.width;
      canvas.height = currentHeroBounds.height;
    };

    // Animate radius
    const easeInOutQuad = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    
    const animateRadius = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      
      const elapsed = timestamp - startTimeRef.current;
      const duration = 100; // Animation duration in ms
      const progress = Math.min(elapsed / duration, 1);
      
      radiusRef.current = easeInOutQuad(progress) * targetRadius;
      
      if (progress < 1) {
        requestAnimationFrame(animateRadius);
      }
    };

    requestAnimationFrame(animateRadius);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth movement towards target
      dotX += (targetX - dotX) * speed;
      dotY += (targetY - dotY) * speed;

      // Draw the dot
      ctx.beginPath();
      ctx.arc(dotX, dotY, radiusRef.current, 0, 2 * Math.PI);
      ctx.fillStyle = "#1d83c4";
      ctx.fill();

      requestAnimationFrame(draw);
    };

    window.addEventListener("resize", updateCanvasSize);
    updateCanvasSize();
    draw();

    const onMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const distance = Math.sqrt((mouseX - dotX) ** 2 + (mouseY - dotY) ** 2);

      if (distance < 200) {
        targetX = mouseX;
        targetY = mouseY;
      } else {
        targetX = dotPosition.x;
        targetY = dotPosition.y;
      }
    };

    const onMouseLeave = () => {
      targetX = dotPosition.x;
      targetY = dotPosition.y;
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [showDot, dotRef, heroRef, dotPosition]);

  if (!showDot) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
