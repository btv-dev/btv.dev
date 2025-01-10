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

    let animationFrameId = 0;
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

    /**
     * Position the dot initially at the center
     * between the two headings, **in the container’s local space**.
     */
    const positionDot = () => {
      // Get container rect (the header)
      const containerRect = header.getBoundingClientRect();

      // Get heading rects in **viewport** coords
      const heading1Rect = heading1.getBoundingClientRect();
      const heading2Rect = heading2.getBoundingClientRect();

      // Convert heading positions into **container-relative** coords
      const h1Left = heading1Rect.left - containerRect.left;
      const h1Right = heading1Rect.right - containerRect.left;
      const h1Bottom = heading1Rect.bottom - containerRect.top;

      const h2Left = heading2Rect.left - containerRect.left;
      const h2Right = heading2Rect.right - containerRect.left;
      const h2Top = heading2Rect.top - containerRect.top;

      // Center X: average of left/right edges of both headings
      centerX = (h1Left + h1Right + h2Left + h2Right) / 4;
      // Center Y: midpoint between heading1's bottom and heading2's top
      centerY = (h1Bottom + h2Top) / 2;

      // Compute the dot's numeric width/height
      const dotWidth = parseFloat(dotStyle.width?.toString() || "30");
      const dotHeight = parseFloat(dotStyle.height?.toString() || "30");

      // Place the dot in the container
      const startX = centerX - dotWidth / 2;
      const startY = centerY - dotHeight / 2;

      setDotStyle((prev) => ({
        ...prev,
        left: `${startX}px`,
        top: `${startY}px`,
      }));

      // Also position the static circle at that same origin
      staticCircle.style.left = `${startX}px`;
      staticCircle.style.top = `${startY}px`;

      // Update current/target
      currentX = startX;
      currentY = startY;
      targetX = startX;
      targetY = startY;
    };

    positionDot();
    window.addEventListener("resize", positionDot);

    // Animate the dot in with scale
    requestAnimationFrame(() => {
      setDotStyle((prev) => ({
        ...prev,
        transform: "scale(1)",
      }));
    });

    // Simple function to create a short-lived trail
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

    // Smoothly animate dot towards targetX / targetY
    const animateDot = () => {
      // Show static circle if locked
      if (isLocked) {
        staticCircle.style.opacity = "1";
        // Leave behind a trail
        createTrail(
          currentX,
          currentY,
          dotStyle.width?.toString() || "30px",
          dotStyle.height?.toString() || "30px"
        );
      }

      // Ease current position
      currentX += (targetX - currentX) * easeFactor;
      currentY += (targetY - currentY) * easeFactor;

      dot.style.left = `${currentX}px`;
      dot.style.top = `${currentY}px`;

      // If not locked and near the origin, fade out the static circle
      if (!isLocked) {
        const distanceToOrigin = Math.hypot(
          currentX -
            (centerX - parseFloat(dotStyle.width?.toString() || "0") / 2),
          currentY -
            (centerY - parseFloat(dotStyle.height?.toString() || "0") / 2)
        );
        if (distanceToOrigin < resetLockDistance) {
          staticCircle.style.opacity = "0";
        }
      }

      // Keep animating until close enough to target
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

    // On mouse move, decide if the dot should follow the mouse
    // or just 'nudge' from the center.
    const onMouseMove = (e: MouseEvent) => {
      // Container rect (for offset)
      const containerRect = header.getBoundingClientRect();
      const x = e.clientX - containerRect.left;
      const y = e.clientY - containerRect.top;

      const dotRect = dot.getBoundingClientRect();
      // Dot center in container space:
      // currentX/currentY are top-left in container coords,
      // so add half the dot size to get its center.
      const dotCenterX = currentX + dotRect.width / 2;
      const dotCenterY = currentY + dotRect.height / 2;

      // Distance to the dot's center
      const distanceToDotCenter = Math.hypot(x - dotCenterX, y - dotCenterY);

      // Lock if mouse is close enough to dot
      if (canLock && !isLocked && distanceToDotCenter < proximityThreshold) {
        isLocked = true;
      }

      // If locked, follow the mouse
      if (isLocked) {
        targetX = x - dotRect.width / 2;
        targetY = y - dotRect.height / 2;
      } else {
        // Nudge slightly away from center
        const angle = Math.atan2(y - centerY, x - centerX);
        targetX = centerX - dotRect.width / 2 + Math.cos(angle) * nudgeDistance;
        targetY =
          centerY - dotRect.height / 2 + Math.sin(angle) * nudgeDistance;
      }

      // Check distance from center, unlock if we exceed some max distance
      const distanceFromCenter = Math.hypot(
        dotCenterX - centerX,
        dotCenterY - centerY
      );
      if (distanceFromCenter > maxDistanceFromCenter) {
        isLocked = false;
        canLock = false;
        targetX = centerX - dotRect.width / 2;
        targetY = centerY - dotRect.height / 2;
      }

      // Once dot returns near center, re-allow locking
      const distanceToOrigin = Math.hypot(
        dotCenterX - centerX,
        dotCenterY - centerY
      );
      if (!canLock && distanceToOrigin < resetLockDistance) {
        canLock = true;
      }

      // Kick off animation if not already running
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
          className="font-rubik-mono-one text-5xl text-gray-800 leading-none m-0"
        >
          BTV
        </h1>
        <h1
          ref={heading2Ref}
          className="font-rubik-mono-one text-5xl text-gray-800 leading-none m-0"
        >
          dev
        </h1>
      </div>
    </header>
  );
}
