"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

interface UseTiltOptions {
  maxRotation?: number;
  perspective?: number;
  scale?: number;
  speed?: number;
  glare?: boolean;
}

export function useTilt<T extends HTMLElement = HTMLElement>(
  options: UseTiltOptions = {}
) {
  const {
    maxRotation = 14,
    perspective = 1000,
    scale = 1.03,
    speed = 400,
    glare = true,
  } = options;

  const cardRef = useRef<T | null>(null);
  const glareRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    el.style.transformStyle = "preserve-3d";
    el.style.perspective = `${perspective}px`;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const px = (x / rect.width) * 2 - 1; // -1 to 1
      const py = (y / rect.height) * 2 - 1; // -1 to 1

      const rotateY = px * maxRotation;
      const rotateX = -py * maxRotation;

      gsap.to(el, {
        rotateX,
        rotateY,
        scale,
        duration: speed / 1000,
        ease: "power2.out",
        overwrite: "auto",
      });

      if (glare && glareRef.current) {
        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;
        glareRef.current.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.22) 0%, rgba(34, 211, 238, 0.08) 40%, transparent 80%)`;
        glareRef.current.style.opacity = "1";
      }
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.8,
        ease: "elastic.out(1, 0.5)",
        overwrite: "auto",
      });

      if (glare && glareRef.current) {
        glareRef.current.style.opacity = "0";
      }
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
      gsap.killTweensOf(el);
    };
  }, [maxRotation, perspective, scale, speed, glare]);

  return { cardRef, glareRef };
}
