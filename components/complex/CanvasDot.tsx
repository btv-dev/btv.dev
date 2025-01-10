"use client";

import { useEffect, useRef, useState } from "react";

interface CanvasDotProps {
  btvRef: React.RefObject<HTMLHeadingElement>;
  devRef: React.RefObject<HTMLHeadingElement>;
  parentRef: React.RefObject<HTMLDivElement>;
}

export function CanvasDot({ btvRef, devRef, parentRef }: CanvasDotProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const radiusRef = useRef(0); // Use a ref to track radius directly
  const startTimeRef = useRef<number | null>(null);
  const [showDot, setShowDot] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowDot(true), 500);
    return () => clearTimeout(timer);
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

    const updateCanvasSize = () => {
      canvas.width = document.body.scrollWidth;
      canvas.height = document.body.scrollHeight;
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    const btvBounds = btvRef.current.getBoundingClientRect();
    const devBounds = devRef.current.getBoundingClientRect();
    const parentBounds = parentRef.current.getBoundingClientRect();

    const centerX = (btvBounds.right + devBounds.left) / 2;
    const centerY = (btvBounds.bottom + devBounds.top) / 2 + window.scrollY;

    let dotX = centerX;
    let dotY = centerY;
    let targetX = centerX;
    let targetY = centerY;
    const speed = 0.1;

    const targetRadius = 10;
    const animationDuration = 500; // Animation duration in ms

    // Ease-in-out quad function
    const easeInOutQuad = (t: number) =>
      t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    const animateRadius = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / animationDuration, 1);

      radiusRef.current = easeInOutQuad(progress) * targetRadius;

      if (progress < 1) {
        requestAnimationFrame(animateRadius);
      }
    };

    requestAnimationFrame(animateRadius);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      dotX += (targetX - dotX) * speed;
      dotY += (targetY - dotY) * speed;

      ctx.beginPath();
      ctx.arc(dotX, dotY, radiusRef.current, 0, 2 * Math.PI);
      ctx.fillStyle = "#1d83c4";
      ctx.fill();

      requestAnimationFrame(draw);
    };

    const onMouseMove = (e: MouseEvent) => {
      const parentScrollX = parentRef.current?.scrollLeft || 0;
      const parentScrollY = parentRef.current?.scrollTop || 0;

      if (!parentRef.current) return;

      const parentBoundsWithScroll = parentRef.current.getBoundingClientRect();

      const adjustedX = e.clientX - parentBoundsWithScroll.left + parentScrollX;
      const adjustedY = e.clientY - parentBoundsWithScroll.top + parentScrollY;

      targetX = Math.max(0, Math.min(parentBounds.width, adjustedX));
      targetY = Math.max(0, Math.min(parentBounds.height, adjustedY));
    };

    const onMouseLeave = () => {
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
  }, [showDot, btvRef, devRef, parentRef]);

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
