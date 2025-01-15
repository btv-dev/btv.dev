"use client";

import { useEffect, useState } from "react";

interface VisualDotProps {
  targetRef: React.RefObject<HTMLElement>;
}

export function VisualDot({ targetRef }: VisualDotProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (!targetRef.current) return;

    // Get initial center position
    const updateCenterPosition = () => {
      const rect = targetRef.current?.getBoundingClientRect();
      if (!rect) return;

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2 + window.scrollY;
      setPosition({ x: centerX, y: centerY });
    };

    // Update center on resize and scroll
    updateCenterPosition();
    window.addEventListener("resize", updateCenterPosition);
    window.addEventListener("scroll", updateCenterPosition);

    // Handle mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY + window.scrollY;

      // Calculate distance from current position to mouse
      const distance = Math.sqrt(
        Math.pow(mouseX - position.x, 2) + Math.pow(mouseY - position.y, 2)
      );

      // Follow cursor if within 200px, otherwise return to center
      if (distance < 200) {
        setIsFollowing(true);
        setPosition({ x: mouseX, y: mouseY });
      } else {
        setIsFollowing(false);
        updateCenterPosition();
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", updateCenterPosition);
      window.removeEventListener("scroll", updateCenterPosition);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [targetRef, position]);

  return (
    <div
      style={{
        position: "absolute",
        top: position.y,
        left: position.x,
        width: "26px",
        height: "26px",
        marginLeft: "-13px",
        marginTop: "-13px",
        borderRadius: "50%",
        backgroundColor: "#1d83c4",
        transition: isFollowing ? "none" : "all 0.3s ease-out",
        pointerEvents: "none",
      }}
    />
  );
}
