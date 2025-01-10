"use client";

import { useEffect, useRef, useState } from "react";

interface CanvasDotProps {
  btvRef: React.RefObject<HTMLHeadingElement>;
  devRef: React.RefObject<HTMLHeadingElement>;
  parentRef: React.RefObject<HTMLDivElement>; // New parent ref
}

export function CanvasDot({ btvRef, devRef, parentRef }: CanvasDotProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showDot, setShowDot] = useState(false);
  const [dotRadius, setDotRadius] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setShowDot(true), 500);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  useEffect(() => {
    if (
      !showDot ||
      !canvasRef.current ||
      !btvRef.current ||
      !devRef.current ||
      !parentRef.current
    )
      return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    // Resize canvas to cover the whole page
    const updateCanvasSize = () => {
      canvas.width = document.body.scrollWidth;
      canvas.height = document.body.scrollHeight;
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    const btvBounds = btvRef.current.getBoundingClientRect();
    const devBounds = devRef.current.getBoundingClientRect();
    const parentBounds = parentRef.current.getBoundingClientRect();

    // Account for scroll position when calculating initial dot position
    const centerX = (btvBounds.right + devBounds.left) / 2;
    const centerY = (btvBounds.bottom + devBounds.top) / 2 + window.scrollY;

    let dotX = centerX;
    let dotY = centerY;
    let targetX = centerX;
    let targetY = centerY;
    const speed = 0.1;

    const animateRadius = () => {
      const growSpeed = 0.05;
      if (dotRadius < 10) {
        setDotRadius((prev) => Math.min(prev + growSpeed, 10));
        requestAnimationFrame(animateRadius);
      }
    };

    // Trigger the radius animation
    animateRadius();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smoothly move the dot towards the target
      dotX += (targetX - dotX) * speed;
      dotY += (targetY - dotY) * speed;

      // Draw the dot
      ctx.beginPath();
      ctx.arc(dotX, dotY, dotRadius, 0, 2 * Math.PI);
      ctx.fillStyle = "#1d83c4";
      ctx.fill();

      requestAnimationFrame(draw);
    };

    const onMouseMove = (e: MouseEvent) => {
      const parentScrollX = parentRef.current?.scrollLeft || 0;
      const parentScrollY = parentRef.current?.scrollTop || 0;

      const parentBoundsWithScroll = parentRef.current.getBoundingClientRect();

      const adjustedX = e.clientX - parentBoundsWithScroll.left + parentScrollX;
      const adjustedY = e.clientY - parentBoundsWithScroll.top + parentScrollY;

      // Restrict the target coordinates within the parent boundaries
      targetX = Math.max(0, Math.min(parentBounds.width, adjustedX));

      targetY = Math.max(0, Math.min(parentBounds.height, adjustedY));
    };

    const onMouseLeave = () => {
      // Reset to initial position when the cursor leaves the screen
      targetX = centerX;
      targetY = centerY;
    };

    parentRef.current.addEventListener("mousemove", onMouseMove);
    parentRef.current.addEventListener("mouseleave", onMouseLeave);

    draw();

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      parentRef.current?.removeEventListener("mousemove", onMouseMove);
      parentRef.current?.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [showDot, btvRef, devRef, parentRef, dotRadius]);

  if (!showDot) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: -1,
      }}
    />
  );
}
