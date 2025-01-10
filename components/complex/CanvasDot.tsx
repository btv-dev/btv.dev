"use client";

import { useEffect, useRef } from "react";

interface CanvasDotProps {
  btvRef: React.RefObject<HTMLHeadingElement>;
  devRef: React.RefObject<HTMLHeadingElement>;
}

export function CanvasDot({ btvRef, devRef }: CanvasDotProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight; // Full document height
    };

    const calculateCenter = () => {
      const btv = btvRef.current;
      const dev = devRef.current;

      if (!btv || !dev) return { x: canvas.width / 2, y: canvas.height / 2 };

      const btvBounds = btv.getBoundingClientRect();
      const devBounds = dev.getBoundingClientRect();

      // Adjust positions to account for full document layout
      const btvCenterX = btvBounds.left + btvBounds.width / 2 + window.scrollX;
      const btvCenterY = btvBounds.top + btvBounds.height / 2 + window.scrollY;

      const devCenterX = devBounds.left + devBounds.width / 2 + window.scrollX;
      const devCenterY = devBounds.top + devBounds.height / 2 + window.scrollY;

      // Calculate the midpoint
      const centerX = (btvCenterX + devCenterX) / 2;
      const centerY = (btvCenterY + devCenterY) / 2;

      return { x: centerX, y: centerY };
    };

    const drawDot = (radius: number) => {
      const { x, y } = calculateCenter();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = "#1d83c4";
      ctx.fill();
      ctx.closePath();
    };

    const growDot = () => {
      let radius = 0;
      const targetRadius = 10;
      const growthSpeed = 0.5;

      const animate = () => {
        drawDot(radius);
        radius = Math.min(radius + growthSpeed, targetRadius);

        if (radius < targetRadius) {
          requestAnimationFrame(animate);
        }
      };

      animate();
    };

    const initializeCanvas = () => {
      resizeCanvas();
      growDot();

      window.addEventListener("resize", () => {
        resizeCanvas();
        drawDot(10); // Redraw the dot after resize
      });
    };

    const delayTimeout = setTimeout(() => {
      initializeCanvas();
    }, 500);

    return () => {
      clearTimeout(delayTimeout);
      window.removeEventListener("resize", () => drawDot(10));
    };
  }, [btvRef, devRef]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: -1,
      }}
    />
  );
}
