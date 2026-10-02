"use client";

import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";

export const CustomCursor: React.FC = () => {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable custom cursor on mobile touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!dot || !ring) return;

    setIsVisible(true);

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: pos.x, y: pos.y };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      gsap.to(dot, {
        x: mouse.x,
        y: mouse.y,
        duration: 0.08,
        ease: "power2.out",
      });

      gsap.to(ring, {
        x: mouse.x,
        y: mouse.y,
        duration: 0.35,
        ease: "power3.out",
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-cursor-magnetic]") ||
        target.classList.contains("cursor-pointer")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Precision Core Dot */}
      <div
        ref={cursorDotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyber-neon mix-blend-screen shadow-[0_0_10px_#00F0FF]"
      />

      {/* Outer Magnetic Spring Ring */}
      <div
        ref={cursorRingRef}
        className={`pointer-events-none fixed top-0 left-0 z-[9998] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyber-cyan/60 transition-all duration-300 ease-out mix-blend-screen ${
          isHovered
            ? "h-14 w-14 bg-cyber-cyan/15 border-cyber-neon scale-110 shadow-[0_0_20px_rgba(0,240,255,0.6)]"
            : "h-8 w-8 bg-transparent scale-100"
        }`}
      />
    </>
  );
};
