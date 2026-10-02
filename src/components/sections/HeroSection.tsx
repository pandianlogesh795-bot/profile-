"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Sparkles, FileText, Send, Compass, Zap } from "lucide-react";
import { PERSONAL_DATA } from "@/data/content";
import dynamic from "next/dynamic";
import { MagneticButton } from "../ui/MagneticButton";

const HeroCanvas = dynamic(() => import("../three/HeroCanvas").then(m => m.HeroCanvas), { ssr: false });

// Kinetic character-split headline
function KineticHeadline({ text }: { text: string }) {
  const letters = Array.from(text);
  return (
    <div className="flex flex-wrap justify-center items-end overflow-hidden" aria-label={text}>
      {letters.map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: "110%", rotateX: 90, opacity: 0 }}
          animate={{ y: "0%", rotateX: 0, opacity: 1 }}
          transition={{
            duration: 0.7,
            delay: 0.3 + i * 0.045,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="inline-block"
          style={{ transformOrigin: "bottom center", transformStyle: "preserve-3d" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  );
}

// Scroll velocity skew effect
function useScrollVelocity() {
  const velocity = useRef(0);
  const lastScrollY = useRef(0);
  const [skewY, setSkewY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          velocity.current = currentScrollY - lastScrollY.current;
          lastScrollY.current = currentScrollY;
          const targetSkew = Math.max(-4, Math.min(4, velocity.current * -0.08));
          setSkewY(targetSkew);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Decay skew back to 0
    const decay = setInterval(() => {
      setSkewY(prev => prev * 0.85);
    }, 16);

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(decay);
    };
  }, []);

  return skewY;
}

export const HeroSection: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const skewY = useScrollVelocity();

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % PERSONAL_DATA.roles.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between pt-32 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden select-none"
    >
      {/* 3D WebGL Background Canvas */}
      <HeroCanvas />

      {/* Scroll velocity skew wrapper */}
      <div
        className="relative z-10 max-w-7xl mx-auto w-full my-auto flex flex-col items-center text-center pointer-events-none transition-transform duration-150"
        style={{ transform: `skewY(${skewY}deg)` }}
      >
        {/* Status Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: -24, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-cyber-cyan/50 bg-cyber-dark/90 px-5 py-2 backdrop-blur-xl shadow-[0_0_25px_rgba(0,240,255,0.35)] mb-8"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-neon opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyber-cyan" />
          </span>
          <span className="font-mono text-xs tracking-widest text-cyber-neon uppercase">
            Available for AI &amp; 3D Roles · Mamallapuram, TN
          </span>
        </motion.div>

        {/* Oversized Kinetic 3D Headline: LOGESH P */}
        <div className="relative w-full max-w-6xl overflow-hidden" style={{ perspective: "1200px" }}>
          <div className="font-display text-7xl sm:text-9xl md:text-[11rem] lg:text-[13rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-500 drop-shadow-[0_20px_50px_rgba(0,0,0,0.95)] leading-none">
            <KineticHeadline text="LOGESH P" />
          </div>

          {/* Holographic underline */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.85 }}
            className="mx-auto h-[2px] w-4/5 bg-gradient-to-r from-transparent via-cyber-cyan to-transparent shadow-[0_0_25px_#00F0FF] my-4 origin-center"
          />
        </div>

        {/* Dynamic Rotating Role Text */}
        <div className="h-12 flex items-center justify-center my-3 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={roleIndex}
              initial={{ y: 30, opacity: 0, filter: "blur(8px)", rotateX: -45 }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)", rotateX: 0 }}
              exit={{ y: -30, opacity: 0, filter: "blur(8px)", rotateX: 45 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-2.5 font-mono text-lg sm:text-2xl md:text-3xl text-cyber-cyan font-medium tracking-wide"
              style={{ textShadow: "0 0 20px rgba(0,240,255,0.6)" }}
            >
              <Sparkles className="h-5 w-5 text-cyber-neon" />
              <span>{PERSONAL_DATA.roles[roleIndex]}</span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="max-w-2xl text-sm sm:text-base text-gray-300 font-normal leading-relaxed mt-2"
        >
          B.Tech Artificial Intelligence &amp; Data Science · Anand Institute of Higher Technology<br />
          <span className="text-cyber-cyan/80">Python · C &amp; C++ · JavaScript · Three.js · UI/UX</span>
        </motion.p>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="pointer-events-auto flex flex-wrap items-center justify-center gap-6 mt-8 mb-2"
        >
          {PERSONAL_DATA.stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="font-display text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-cyber-neon">
                {stat.value}
              </div>
              <div className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0 }}
          className="pointer-events-auto mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton variant="primary" size="lg" href="#skills">
            <Compass className="h-5 w-5" /> Explore Universe
          </MagneticButton>

          <MagneticButton variant="secondary" size="lg" href="#resume">
            <FileText className="h-5 w-5" /> View Resume
          </MagneticButton>

          <MagneticButton variant="cyber" size="lg" href="#contact">
            <Send className="h-5 w-5" /> Get in Touch
          </MagneticButton>
        </motion.div>
      </div>

      {/* Bottom Scroll Cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="relative z-10 mx-auto flex flex-col items-center gap-2 pointer-events-auto"
      >
        <a
          href="#about"
          className="flex flex-col items-center gap-2 text-xs font-mono tracking-widest text-cyan-400/80 hover:text-cyber-neon transition-colors group"
        >
          <span className="group-hover:text-cyber-neon transition-colors">SCROLL TO ENTER</span>
          <div className="flex h-9 w-5 items-start justify-center rounded-full border border-cyber-cyan/40 p-1 group-hover:border-cyber-neon/60 transition-colors">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
              className="h-1.5 w-1.5 rounded-full bg-cyber-neon shadow-[0_0_10px_#00F0FF]"
            />
          </div>
          <ChevronDown className="h-4 w-4 animate-bounce text-cyber-cyan" />
        </a>
      </motion.div>
    </section>
  );
};
