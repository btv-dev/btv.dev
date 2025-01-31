"use client";

import { useEffect, useRef, useState } from "react";
import { MotionValue } from "framer-motion";

interface CanvasDotProps {
  dotRef: React.RefObject<HTMLHeadingElement>;
  heroRef: React.RefObject<HTMLDivElement>;
  yMotionValue: MotionValue<number>;
}

// Synchronized with HeroHighlight timing
const DOT_SHOW_DELAY = 750; // Show dot right after text finishes shrinking (600ms + 300ms)
const MOUSE_FOLLOW_DELAY = 6300; // Start following mouse after last highlight (6.1s + small buffer)

export function CanvasDot({ dotRef, heroRef, yMotionValue }: CanvasDotProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const radiusRef = useRef(0);
  const startTimeRef = useRef<number | null>(null);
  const [showDot, setShowDot] = useState(false);
  const [canFollowMouse, setCanFollowMouse] = useState(false);
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
  }, [dotRef, heroRef]);

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
  }, [yMotionValue, initialYRef]);

  useEffect(() => {
    const timer = setTimeout(() => setShowDot(true), DOT_SHOW_DELAY);
    const mouseTimer = setTimeout(() => setCanFollowMouse(true), MOUSE_FOLLOW_DELAY);
    return () => {
      clearTimeout(timer);
      clearTimeout(mouseTimer);
    };
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

      // Draw the shadow dot at origin
      ctx.beginPath();
      ctx.arc(dotPosition.x, dotPosition.y, radiusRef.current * 0.9, 0, 2 * Math.PI);
      ctx.fillStyle = "transparent"; // clear background dot
      ctx.strokeStyle = "#1d83c4"; // thinner border
      ctx.lineWidth = 2; // Thinner border
      ctx.stroke();

      // Smooth movement towards target
      dotX += (targetX - dotX) * (speed * 2); // Increase speed factor for faster return
      dotY += (targetY - dotY) * (speed * 2); // Increase speed factor for faster return

      // Draw the dot that follows the cursor
      ctx.fillStyle = '#1d83c4'; // Solid color for the cursor dot
      ctx.beginPath();
      ctx.arc(dotX, dotY, radiusRef.current, 0, 2 * Math.PI);
      ctx.fill(); // Fill the dot completely

      requestAnimationFrame(draw);
    };

    window.addEventListener("resize", updateCanvasSize);
    updateCanvasSize();
    draw();

    const onMouseMove = (e: MouseEvent) => {
      // Don't follow mouse until all animations are complete
      if (!heroRef.current || !canFollowMouse) return;
      
      const heroBounds = heroRef.current.getBoundingClientRect();
      const mouseX = e.clientX - heroBounds.left;
      const mouseY = e.clientY - heroBounds.top;

      // Calculate distance from mouse to dot's origin
      const distanceToOrigin = Math.sqrt(
        Math.pow(mouseX - dotPosition.x, 2) + 
        Math.pow(mouseY - dotPosition.y, 2)
      );

      // Check if mouse is within hero bounds and not too close to origin
      if (
        mouseX >= 0 &&
        mouseX <= heroBounds.width &&
        mouseY >= 0 &&
        mouseY <= heroBounds.height &&
        distanceToOrigin > 300 // Return to origin if mouse is within 300px
      ) {
        targetX = mouseX;
        targetY = mouseY;
      } else {
        // Return to home position
        targetX = dotPosition.x;
        targetY = dotPosition.y;
      }
    };

    const onMouseLeave = () => {
      // Return to home position
      targetX = dotPosition.x;
      targetY = dotPosition.y;
    };

    const onScroll = () => {
      targetX = dotPosition.x;
      targetY = dotPosition.y;
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("scroll", onScroll);
    };
  }, [showDot, dotRef, heroRef, dotPosition, targetRadius, canFollowMouse]);

  if (!showDot) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
