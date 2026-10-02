"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { soundEngine } from "@/lib/audio";

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [alreadyLoaded, setAlreadyLoaded] = useState(false);

  useEffect(() => {
    // If the user already visited in this session, skip the preloader entirely
    if (typeof window !== "undefined" && sessionStorage.getItem("lp_preloaded")) {
      setAlreadyLoaded(true);
      setIsFinished(true);
      onComplete();
      return;
    }

    // Fast, responsive loading progression
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 22) + 14;
      if (current >= 100) {
        current = 100;
        setProgress(100);
        clearInterval(interval);
        try {
          soundEngine.playWarp?.();
        } catch {}
        try {
          sessionStorage.setItem("lp_preloaded", "1");
        } catch {}
        setTimeout(() => {
          setIsFinished(true);
          onComplete();
        }, 150);
      } else {
        setProgress(current);
      }
    }, 28);

    // Hard fallback: max 600ms total
    const safetyTimeout = setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      try {
        sessionStorage.setItem("lp_preloaded", "1");
      } catch {}
      setIsFinished(true);
      onComplete();
    }, 600);

    return () => {
      clearInterval(interval);
      clearTimeout(safetyTimeout);
    };
  }, [onComplete]);

  // Click to skip immediately
  const handleSkip = () => {
    try {
      sessionStorage.setItem("lp_preloaded", "1");
    } catch {}
    setIsFinished(true);
    onComplete();
  };

  if (alreadyLoaded) return null;

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.03,
            filter: "blur(10px)",
            transition: { duration: 0.45, ease: [0.76, 0, 0.24, 1] },
          }}
          onClick={handleSkip}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#040508] text-white select-none cursor-pointer overflow-hidden"
          title="Click to enter immediately"
        >
          {/* Cyber Ambient Radial Glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[450px] h-[450px] rounded-full bg-cyber-blue/15 blur-[100px] animate-pulse" />
          </div>

          {/* Futuristic Geometric Wireframe Orb */}
          <div className="relative h-36 w-36 mb-6 flex items-center justify-center">
            {/* Outer Rotating Ring */}
            <div className="absolute inset-0 rounded-full border border-cyber-cyan/35 animate-[spin_6s_linear_infinite]" />
            {/* Middle Counter-Rotating Ring */}
            <div className="absolute inset-2.5 rounded-full border border-dashed border-cyber-purple/45 animate-[spin_8s_linear_infinite_reverse]" />
            {/* Inner Glowing Hexagon / Core */}
            <div className="absolute inset-7 rounded-2xl border border-cyber-neon/70 rotate-45 shadow-[0_0_25px_rgba(0,240,255,0.4)]" />
            {/* Center Monogram */}
            <div className="font-display text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-cyber-neon drop-shadow-[0_0_15px_#00F0FF]">
              LP
            </div>
          </div>

          {/* Holographic Progress Counter */}
          <div className="relative z-10 flex flex-col items-center gap-2.5">
            <div className="flex items-baseline gap-1.5">
              <span className="font-mono text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-white to-cyber-neon drop-shadow-[0_0_20px_rgba(0,240,255,0.7)]">
                {progress}
              </span>
              <span className="font-mono text-lg text-cyber-neon">%</span>
            </div>

            {/* Glowing Progress Bar */}
            <div className="w-52 sm:w-60 h-1.5 rounded-full bg-white/10 overflow-hidden border border-cyber-border p-[1px]">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-cyber-blue via-cyan-400 to-cyber-neon shadow-[0_0_15px_#00F0FF]"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>

            {/* Status Text */}
            <div className="flex items-center gap-2 font-mono text-[10px] text-cyan-300/80 tracking-widest uppercase mt-2">
              <span className="inline-block h-2 w-2 rounded-full bg-cyber-neon animate-ping" />
              <span>INITIALIZING LOGESH P 3D CORE</span>
            </div>

            <div className="text-[10px] font-mono text-gray-500 mt-0.5">
              Click anywhere to skip
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
