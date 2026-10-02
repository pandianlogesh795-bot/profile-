"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

interface UseMagneticOptions {
  strength?: number;
  ease?: string;
  duration?: number;
}

export function useMagnetic<T extends HTMLElement = HTMLElement>(
  options: UseMagneticOptions = {}
) {
  const { strength = 0.35, ease = "power2.out", duration = 0.6 } = options;
  const elementRef = useRef<T | null>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    let bounds: DOMRect;

    const onMouseEnter = () => {
      bounds = el.getBoundingClientRect();
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!bounds) bounds = el.getBoundingClientRect();
      const centerX = bounds.left + bounds.width / 2;
      const centerY = bounds.top + bounds.height / 2;

      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      gsap.to(el, {
        x: deltaX,
        y: deltaY,
        duration: duration,
        ease: ease,
        overwrite: "auto",
      });
    };

    const onMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: duration * 1.2,
        ease: "elastic.out(1.1, 0.4)",
        overwrite: "auto",
      });
    };

    el.addEventListener("mouseenter", onMouseEnter);
    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseleave", onMouseLeave);

    return () => {
      el.removeEventListener("mouseenter", onMouseEnter);
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseleave", onMouseLeave);
      gsap.killTweensOf(el);
    };
  }, [strength, ease, duration]);

  return elementRef;
}
