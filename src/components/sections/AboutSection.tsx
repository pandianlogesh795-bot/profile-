"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { User, Award, GraduationCap, MapPin, Sparkles, Terminal, Code2, Zap } from "lucide-react";
import { PERSONAL_DATA } from "@/data/content";
import { TiltCard } from "../ui/TiltCard";
import { KineticText } from "../ui/KineticText";

// Animated Counter that counts up when in view
function AnimatedCounter({ value, duration = 1.5 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!inView) return;
    // Extract numeric part and suffix
    const numericMatch = value.match(/(\d+\.?\d*)/);
    if (!numericMatch) {
      setDisplayValue(value);
      return;
    }
    const target = parseFloat(numericMatch[1]);
    const suffix = value.replace(numericMatch[1], "");
    const startTime = Date.now();

    const tick = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;
      const formatted = target % 1 !== 0 ? current.toFixed(1) : Math.floor(current).toString();
      setDisplayValue(formatted + suffix);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value, duration]);

  return <div ref={ref}>{displayValue}</div>;
}

// Floating ambient shapes in background
function AmbientShape({ className, style }: { className: string; style?: React.CSSProperties }) {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      animate={{
        y: [0, -20, 0],
        rotate: [0, 10, 0],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration: 6 + Math.random() * 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={style}
    />
  );
}

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative z-10 py-28 sm:py-36 overflow-hidden">
      {/* Ambient Background Shapes */}
      <AmbientShape
        className="top-20 left-[5%] w-32 h-32 rounded-full border border-cyber-cyan/10"
        style={{ animationDelay: "0s" }}
      />
      <AmbientShape
        className="bottom-20 right-[8%] w-24 h-24 rounded-full border border-cyber-purple/10"
        style={{ animationDelay: "2s" }}
      />
      <AmbientShape
        className="top-1/2 left-[15%] w-16 h-16 border border-cyber-blue/15 rotate-45"
        style={{ animationDelay: "1s" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-20 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyber-cyan/30 bg-cyber-cyan/10 px-4 py-1.5 text-xs font-mono tracking-widest text-cyber-neon uppercase"
          >
            <User className="h-3.5 w-3.5" /> 01 // HOLOGRAPHIC DOSSIER
          </motion.div>
          <KineticText
            as="h2"
            text="Architecting Intelligence & Immersive Realities"
            className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-white text-center justify-center max-w-4xl"
          />
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "200px" }}
            viewport={{ once: true }}
            className="h-px bg-gradient-to-r from-transparent via-cyber-cyan to-transparent"
          />
        </div>

        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: 3D-Tilted Portrait Hologram */}
          <div className="lg:col-span-5 flex justify-center">
            <TiltCard
              maxRotation={14}
              className="w-full max-w-[420px] p-5 bg-gradient-to-b from-[#0C1222]/95 to-[#05070E]/98 border-cyber-cyan/30 shadow-[0_0_70px_rgba(10,132,255,0.25)]"
            >
              <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden border border-white/10 bg-black/50">
                {/* Portrait Image */}
                <Image
                  src={PERSONAL_DATA.profilePhoto}
                  alt={`${PERSONAL_DATA.name} — AI & Data Science Portfolio`}
                  fill
                  className="object-cover object-top filter brightness-110 contrast-105 transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 420px"
                  priority
                />

                {/* Scan line overlay */}
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,240,255,0.05)_51%)] bg-[length:100%_4px]" />

                {/* Top HUD bar */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 rounded-full border border-cyber-cyan/40 bg-black/70 px-3 py-1 text-[10px] font-mono text-cyber-neon backdrop-blur-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyber-neon animate-pulse" />
                    LOGESH P · AI PROFILE
                  </div>
                  <div className="rounded-full border border-white/20 bg-black/70 px-2 py-1 text-[10px] font-mono text-gray-400 backdrop-blur-md">
                    [CLASS:2028]
                  </div>
                </div>

                {/* Bottom Holographic HUD Badge */}
                <div className="absolute bottom-3 left-3 right-3 rounded-xl border border-cyber-cyan/40 bg-cyber-dark/90 p-3.5 backdrop-blur-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-display font-bold text-sm text-white">
                        {PERSONAL_DATA.name}
                      </div>
                      <div className="font-mono text-[10px] text-cyber-neon mt-0.5">
                        B.TECH AI &amp; DATA SCIENCE · AIHT
                      </div>
                    </div>
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyber-cyan/20 text-cyber-cyan">
                      <Terminal className="h-4 w-4" />
                    </div>
                  </div>
                  {/* Micro skill chips */}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {["Python", "C++", "Three.js", "ML", "UI/UX"].map(tag => (
                      <span key={tag} className="rounded px-1.5 py-0.5 text-[9px] font-mono bg-cyber-cyan/10 border border-cyber-cyan/20 text-cyber-neon/80">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </TiltCard>
          </div>

          {/* Right Column: Bio + Metrics */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-5 text-gray-300 text-base sm:text-lg leading-relaxed font-light">
              <motion.p
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Hello, I&apos;m{" "}
                <span className="font-semibold text-white">Logesh P</span>, an Artificial Intelligence &amp; Data Science engineer currently pursuing my B.Tech at{" "}
                <span className="text-cyber-cyan font-medium">Anand Institute of Higher Technology, Kazhipattur</span> (2024–2028).
              </motion.p>
              <motion.p
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                With over{" "}
                <span className="text-white font-medium">4+ years of experience as an Independent Writing &amp; Editing Professional</span>, I unite rigorous analytical logic with creative spatial visual storytelling. My focus spans Machine Learning algorithms, predictive analytics, WebGL/Three.js physics, and high-performance full-stack architectures.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Certified in <span className="text-cyber-cyan">C &amp; C++ programming</span>, excelling in national <span className="text-white">Kho Kho &amp; Athletics</span>, and building cybernetic interactive experiences that deliver depth on every interaction.
              </motion.p>
            </div>

            {/* Academic & Geographic Chips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-3"
            >
              {[
                { icon: GraduationCap, text: "Anand Institute of Higher Technology (2024–2028)", color: "text-cyber-cyan" },
                { icon: Award, text: "Writing & Editorial Specialist (4+ Yrs)", color: "text-cyber-purple" },
                { icon: MapPin, text: "Mamallapuram, Tamil Nadu – 603104", color: "text-cyber-neon" },
                { icon: Code2, text: "CTC Certified: C & C++ Programming", color: "text-cyber-blue" },
              ].map(({ icon: Icon, text, color }, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-xs font-mono text-gray-200 hover:border-cyber-cyan/40 transition-colors"
                >
                  <Icon className={`h-4 w-4 ${color} shrink-0`} />
                  <span>{text}</span>
                </div>
              ))}
            </motion.div>

            {/* Animated Counter Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              {PERSONAL_DATA.stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.5 }}
                  className="rounded-2xl border border-cyber-border bg-cyber-card/70 p-5 text-center backdrop-blur-md hover:border-cyber-cyan/50 transition-all hover:shadow-[0_0_20px_rgba(0,240,255,0.15)] group"
                >
                  <div className="font-display text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyber-neon group-hover:scale-110 transition-transform">
                    <AnimatedCounter value={stat.value} />
                  </div>
                  <div className="font-mono text-[11px] text-gray-400 uppercase tracking-wider mt-1.5">
                    {stat.label}
                  </div>
                  <div className="h-0.5 w-8 mx-auto mt-2 rounded-full bg-gradient-to-r from-cyber-blue to-cyber-neon opacity-50 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              ))}
            </div>

            {/* Achievements Row */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="rounded-2xl border border-white/8 bg-gradient-to-r from-[#080F1E]/60 to-[#04060A]/60 p-5 backdrop-blur-md"
            >
              <div className="flex items-center gap-2 mb-3">
                <Zap className="h-4 w-4 text-cyber-amber" />
                <span className="font-mono text-xs text-cyber-amber uppercase tracking-wider">Sports & Achievements</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "🏃 District Winner — 100m Athletics",
                  "🏐 Kho Kho Zonal Meet & State Match, Punjab",
                  "🏐 Volleyball Zonal Tournament",
                  "🎮 E-Sports Competitions",
                ].map((ach, i) => (
                  <span key={i} className="text-xs text-gray-300 bg-white/5 border border-white/8 rounded-lg px-3 py-1.5 font-mono">
                    {ach}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
