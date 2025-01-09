"use client";

import { CSSProperties, useEffect, useRef, useState } from "react";

export function AnimatedLogo() {
  const headerRef = useRef<HTMLElement>(null);
  const heading1Ref = useRef<HTMLHeadingElement>(null);
  const heading2Ref = useRef<HTMLHeadingElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const staticCircleRef = useRef<HTMLDivElement>(null);

  const [dotStyle, setDotStyle] = useState<CSSProperties>({
    position: "absolute",
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    backgroundColor: "#1d83c4",
    transform: "scale(0)",
    transition: "transform 0.5s ease-out",
    pointerEvents: "none",
    left: "0px",
    top: "0px",
    zIndex: 10,
  });

  useEffect(() => {
    const header = headerRef.current;
    const heading1 = heading1Ref.current;
    const heading2 = heading2Ref.current;
    const dot = dotRef.current;
    const staticCircle = staticCircleRef.current;
    if (!header || !heading1 || !heading2 || !dot || !staticCircle) return;

    // Initialize static circle styles for fading
    staticCircle.style.opacity = "0";
    staticCircle.style.transition = "opacity 0.5s ease";

    let animationFrameId: number;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    const easeFactor = 0.1;
    const proximityThreshold = 250;
    const maxDistanceFromCenter = 250;
    const nudgeDistance = 10;
    const resetLockDistance = 20;

    let centerX = 0;
    let centerY = 0;
    let isLocked = false;
    let canLock = true;

    const positionDot = () => {
      const heading1Rect = heading1.getBoundingClientRect();
      const heading2Rect = heading2.getBoundingClientRect();

      centerX =
        (heading1Rect.left +
          heading1Rect.right +
          heading2Rect.left +
          heading2Rect.right) /
        4;
      centerY = (heading1Rect.bottom + heading2Rect.top) / 2;

      setDotStyle((prev) => ({
        ...prev,
        left: `${centerX - parseFloat(prev.width?.toString() || "0") / 2}px`,
        top: `${centerY - parseFloat(prev.height?.toString() || "0") / 2}px`,
      }));

      // Position static circle at the origin
      staticCircle.style.left = `${
        centerX - parseFloat(dotStyle.width?.toString() || "0") / 2
      }px`;
      staticCircle.style.top = `${
        centerY - parseFloat(dotStyle.height?.toString() || "0") / 2
      }px`;

      currentX = centerX - parseFloat(dotStyle.width?.toString() || "0") / 2;
      currentY = centerY - parseFloat(dotStyle.height?.toString() || "0") / 2;
      targetX = currentX;
      targetY = currentY;

      dot.style.left = `${currentX}px`;
      dot.style.top = `${currentY}px`;
    };

    positionDot();
    window.addEventListener("resize", positionDot);

    requestAnimationFrame(() => {
      setDotStyle((prev) => ({
        ...prev,
        transform: "scale(1)",
      }));
    });

    const createTrail = (
      x: number,
      y: number,
      width: string,
      height: string
    ) => {
      const trail = document.createElement("div");
      trail.style.position = "absolute";
      trail.style.width = width;
      trail.style.height = height;
      trail.style.borderRadius = "50%";
      trail.style.backgroundColor = "lightblue";
      trail.style.left = `${x}px`;
      trail.style.top = `${y}px`;
      trail.style.opacity = "0.7";
      trail.style.pointerEvents = "none";
      trail.style.zIndex = "5";
      header.appendChild(trail);
      setTimeout(() => {
        trail.remove();
      }, 500);
    };

    const animateDot = () => {
      // While locked, show static circle and leave trails
      if (isLocked) {
        staticCircle.style.opacity = "1"; // Fade in static circle
        createTrail(
          currentX,
          currentY,
          dotStyle.width?.toString() || "0",
          dotStyle.height?.toString() || "0"
        );
      }

      currentX += (targetX - currentX) * easeFactor;
      currentY += (targetY - currentY) * easeFactor;
      dot.style.left = `${currentX}px`;
      dot.style.top = `${currentY}px`;

      // If not locked and near the origin, fade out static circle
      if (!isLocked) {
        const distanceToOrigin = Math.hypot(
          currentX -
            (centerX - parseFloat(dotStyle.width?.toString() || "0") / 2),
          currentY -
            (centerY - parseFloat(dotStyle.height?.toString() || "0") / 2)
        );
        if (distanceToOrigin < resetLockDistance) {
          staticCircle.style.opacity = "0"; // Fade out when dot at rest at origin
        }
      }

      if (
        Math.abs(targetX - currentX) > 0.5 ||
        Math.abs(targetY - currentY) > 0.5
      ) {
        animationFrameId = requestAnimationFrame(animateDot);
      } else {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = 0;
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      const dotRect = dot.getBoundingClientRect();
      const dotCenterX = dotRect.left + dotRect.width / 2;
      const dotCenterY = dotRect.top + dotRect.height / 2;
      const distanceToDotCenter = Math.hypot(
        e.clientX - dotCenterX,
        e.clientY - dotCenterY
      );

      if (canLock && !isLocked && distanceToDotCenter < proximityThreshold) {
        isLocked = true;
      }

      if (isLocked) {
        targetX = e.clientX - dotRect.width / 2;
        targetY = e.clientY - dotRect.height / 2;
      } else {
        const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
        targetX = centerX - dotRect.width / 2 + Math.cos(angle) * nudgeDistance;
        targetY =
          centerY - dotRect.height / 2 + Math.sin(angle) * nudgeDistance;
      }

      const distanceFromCenter = Math.hypot(
        currentX + dotRect.width / 2 - centerX,
        currentY + dotRect.height / 2 - centerY
      );
      if (distanceFromCenter > maxDistanceFromCenter) {
        isLocked = false;
        canLock = false;
        targetX = centerX - dotRect.width / 2;
        targetY = centerY - dotRect.height / 2;
      }

      const distanceToOrigin = Math.hypot(
        currentX + dotRect.width / 2 - centerX,
        currentY + dotRect.height / 2 - centerY
      );
      if (!canLock && distanceToOrigin < resetLockDistance) {
        canLock = true;
      }

      if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(animateDot);
      }
    };

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("resize", positionDot);
      window.removeEventListener("mousemove", onMouseMove);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [dotStyle.width, dotStyle.height]);

  return (
    <header ref={headerRef} className="relative w-full h-[30vh] md:h-[30vh]">
      {/* Static circle element */}
      <div
        ref={staticCircleRef}
        style={{
          position: "absolute",
          width: "30px",
          height: "30px",
          borderRadius: "50%",
          border: "2px solid lightblue",
          pointerEvents: "none",
          opacity: 0,
          transition: "opacity 0.5s ease",
          zIndex: 5,
        }}
      />
      <div ref={dotRef} style={dotStyle} />
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-12"
        style={{ zIndex: 10 }}
      >
        <h1
          ref={heading1Ref}
          className=" font-rubik-mono-one text-5xl text-gray-800 leading-none m-0"
        >
          BTV
        </h1>
        <h1
          ref={heading2Ref}
          className=" font-rubik-mono-one text-5xl text-gray-800 leading-none m-0"
        >
          dev
        </h1>
      </div>
    </header>
  );
}
