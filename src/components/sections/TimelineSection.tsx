"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Clock, GraduationCap, Briefcase, Sparkles, CheckCircle2, MapPin, Calendar } from "lucide-react";
import { TIMELINE } from "@/data/content";
import { TiltCard } from "../ui/TiltCard";
import { KineticText } from "../ui/KineticText";

export const TimelineSection: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="timeline" className="relative z-10 py-28 sm:py-36 overflow-hidden">
      {/* Background depth grid */}
      <div className="absolute inset-0 cyber-grid-bg opacity-30 pointer-events-none" />

      {/* Radial glow center */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-cyber-blue/5 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-20 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-cyber-cyan/30 bg-cyber-cyan/10 px-4 py-1.5 text-xs font-mono tracking-widest text-cyber-neon uppercase"
          >
            <Clock className="h-3.5 w-3.5" /> 03 // CHRONO TIME MACHINE
          </motion.div>
          <KineticText
            as="h2"
            text="Education & Professional Milestones"
            className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-white text-center justify-center max-w-4xl"
          />
          <p className="text-gray-400 text-sm sm:text-base max-w-xl font-light">
            A chronological journey from 2021 through 2028 — receding into 3D coordinate space with each milestone.
          </p>

          {/* Year indicators bar */}
          <div className="flex items-center gap-3 mt-4 flex-wrap justify-center">
            {["2021", "2022", "2023", "2024", "2025", "2026", "2028"].map((year, i) => (
              <motion.div
                key={year}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="font-mono text-xs px-3 py-1 rounded-full border border-cyber-cyan/20 bg-cyber-cyan/5 text-cyber-cyan/70"
              >
                {year}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Timeline Grid */}
        <div className="relative max-w-5xl mx-auto">
          {/* Glowing Center Laser Beam */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 bg-gradient-to-b from-cyber-cyan via-cyber-blue to-cyber-purple shadow-[0_0_20px_#00F0FF] origin-top"
          />

          <div className="space-y-16">
            {TIMELINE.map((item, index) => {
              const isEven = index % 2 === 0;
              const Icon =
                item.badge === "Education"
                  ? GraduationCap
                  : item.badge === "Innovation"
                  ? Sparkles
                  : Briefcase;

              const zDepth = index * 40;

              return (
                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    y: 60,
                    rotateY: isEven ? -25 : 25,
                    z: -zDepth,
                    scale: 0.9,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    rotateY: 0,
                    z: 0,
                    scale: 1,
                  }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{
                    duration: 0.85,
                    delay: index * 0.15,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`relative flex flex-col sm:flex-row items-start sm:items-center ${
                    isEven ? "sm:flex-row-reverse" : ""
                  }`}
                  style={{ transformStyle: "preserve-3d" }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Glowing Node on Timeline */}
                  <motion.div
                    className="absolute left-4 sm:left-1/2 -translate-x-1/2 flex h-12 w-12 items-center justify-center rounded-full border-2 bg-[#070A18] z-20"
                    animate={{
                      borderColor: hoveredIndex === index ? item.color : "rgba(34,211,238,0.6)",
                      boxShadow: hoveredIndex === index
                        ? `0 0 30px ${item.color}80, 0 0 60px ${item.color}30`
                        : "0 0 20px rgba(0,240,255,0.5)",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon className="h-5 w-5 text-cyber-neon" />
                  </motion.div>

                  {/* Connector Glow Line to card */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.4, duration: 0.6 }}
                    className={`absolute top-6 hidden sm:block h-0.5 w-[calc(50%-3rem)] bg-gradient-to-r ${
                      isEven
                        ? "right-1/2 mr-6 from-transparent to-cyber-cyan origin-right"
                        : "left-1/2 ml-6 from-cyber-cyan to-transparent origin-left"
                    }`}
                    style={{ boxShadow: "0 0 10px rgba(0,240,255,0.4)" }}
                  />

                  {/* Card Container */}
                  <div className="w-full sm:w-[calc(50%-3rem)] pl-16 sm:pl-0 sm:px-0">
                    <div className={`${isEven ? "sm:mr-8" : "sm:ml-8"}`}>
                      <TiltCard
                        maxRotation={8}
                        className={`border-cyber-border/80 bg-gradient-to-b from-cyber-card/90 to-[#070914]/95 backdrop-blur-xl transition-all duration-300 ${
                          hoveredIndex === index
                            ? "border-cyber-cyan/60 shadow-[0_0_40px_rgba(0,240,255,0.2)]"
                            : "hover:border-cyber-cyan/40"
                        }`}
                      >
                        {/* Badge & Period */}
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                          <span
                            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1 text-[11px] font-mono font-bold uppercase border"
                            style={{
                              borderColor: `${item.color}40`,
                              backgroundColor: `${item.color}15`,
                              color: item.color,
                            }}
                          >
                            {item.badge}
                          </span>
                          <div className="flex items-center gap-1.5 font-mono text-xs text-gray-400">
                            <Calendar className="h-3 w-3" />
                            {item.year}
                          </div>
                        </div>

                        {/* Role & Org */}
                        <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                          {item.role}
                        </h3>
                        <div className="font-mono text-xs font-medium mt-1" style={{ color: item.color }}>
                          {item.organization}
                        </div>

                        <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-2 font-mono">
                          <MapPin className="h-3 w-3 text-cyber-cyan shrink-0" />
                          <span>{item.location}</span>
                        </div>

                        <p className="my-4 text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
                          {item.description}
                        </p>

                        {/* Highlights */}
                        <div className="space-y-2 pt-3 border-t border-white/5">
                          {item.highlights.map((high, hIdx) => (
                            <div key={hIdx} className="flex items-start gap-2.5 text-xs text-gray-300">
                              <CheckCircle2
                                className="h-3.5 w-3.5 shrink-0 mt-0.5"
                                style={{ color: item.color }}
                              />
                              <span>{high}</span>
                            </div>
                          ))}
                        </div>

                        {/* Bottom period badge */}
                        <div className="mt-4 pt-3 border-t border-white/5">
                          <span className="font-mono text-[10px] text-gray-500">{item.period}</span>
                        </div>
                      </TiltCard>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Future Milestone */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative flex justify-center mt-20"
          >
            <div className="relative flex flex-col items-center">
              {/* Final Node */}
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-cyber-neon bg-[#070A18] shadow-[0_0_30px_rgba(0,240,255,0.6)]">
                <Sparkles className="h-6 w-6 text-cyber-neon" />
              </div>
              <div className="mt-4 text-center">
                <div className="font-display text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-cyber-neon">
                  2028
                </div>
                <div className="font-mono text-xs text-gray-400 mt-1">B.Tech Graduation · Frontier AI Industry</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
