"use client";

import { useEffect, useRef } from "react";

export function AnimatedLogo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const header = headerRef.current;
    if (!canvas || !header) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dotSize = 15;

    const drawDot = (centerX: number, centerY: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#1d83c4";
      ctx.beginPath();
      ctx.arc(centerX, centerY, dotSize, 0, 2 * Math.PI);
      ctx.fill();
    };

    const resizeCanvas = () => {
      const headerStyles = header.getBoundingClientRect();
      canvas.width = headerStyles.width * window.devicePixelRatio;
      canvas.height = headerStyles.height * window.devicePixelRatio;
      canvas.style.width = `${headerStyles.width}px`;
      canvas.style.height = `${headerStyles.height}px`;

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      drawDot(centerX, centerY);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <header ref={headerRef} className="relative w-full h-[70vh] md:h-[50vh]">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full z-10"
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-12">
        <h1 className="font-mono text-6xl leading-none m-0">btv</h1>
        <h1 className="font-mono text-6xl leading-none m-0">dev</h1>
      </div>
    </header>
  );
}
