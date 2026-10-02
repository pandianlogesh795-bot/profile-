"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Orbit, Sparkles, Layers, Cpu, Code, Palette } from "lucide-react";
import { SKILLS, SkillItem } from "@/data/content";
import { TiltCard } from "../ui/TiltCard";
import { KineticText } from "../ui/KineticText";

const SkillsSphereCanvas = dynamic(
  () => import("../three/SkillsSphereCanvas").then((m) => m.SkillsSphereCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="relative h-[480px] sm:h-[580px] w-full rounded-3xl overflow-hidden border border-cyber-border bg-gradient-to-b from-[#060814]/80 to-[#03040A]/95 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 rounded-full border-2 border-cyber-cyan border-t-transparent animate-spin" />
          <span className="font-mono text-xs text-cyber-neon tracking-widest uppercase">Initializing 3D Constellation...</span>
        </div>
      </div>
    ),
  }
);

const CATEGORIES = [
  { name: "All Matrix", icon: Sparkles },
  { name: "AI & ML", icon: Cpu },
  { name: "Frontend & 3D", icon: Layers },
  { name: "Languages & Core", icon: Code },
  { name: "Design & Tools", icon: Palette },
];

export const SkillsUniverse: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Matrix");
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);

  const filteredSkills =
    selectedCategory === "All Matrix"
      ? SKILLS
      : SKILLS.filter((s) => s.category === selectedCategory);

  return (
    <section id="skills" className="relative z-10 py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyber-cyan/30 bg-cyber-cyan/10 px-4 py-1.5 text-xs font-mono tracking-widest text-cyber-neon uppercase">
            <Orbit className="h-3.5 w-3.5" /> 02 // 3D SKILL CONSTELLATION
          </div>
          <KineticText
            as="h2"
            text="The Creative Universe & Tech Matrix"
            className="text-3xl sm:text-5xl font-display font-black text-white text-center justify-center max-w-3xl"
          />
          <p className="text-gray-400 text-sm sm:text-base max-w-xl font-light">
            An interactive 3D celestial cloud of AI, WebGL, systems programming, and design capabilities. Drag the sphere in real-time to inspect orbital nodes.
          </p>
        </div>

        {/* 3D Celestial Orbit Canvas */}
        <div className="mb-14">
          <SkillsSphereCanvas
            onSelectSkill={(skill) => setSelectedSkill(skill)}
            selectedSkill={selectedSkill}
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-mono tracking-wider transition-all duration-300 ${
                  isActive
                    ? "border border-cyber-cyan bg-cyber-cyan/20 text-cyber-neon shadow-[0_0_20px_rgba(0,240,255,0.4)] scale-105"
                    : "border border-white/10 bg-white/5 text-gray-400 hover:border-white/20 hover:text-white"
                }`}
                data-cursor-magnetic="true"
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Detailed Grid of Skill Cards with Animated Proficiency Bars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
            >
              <TiltCard
                maxRotation={8}
                className={`h-full cursor-pointer transition-all duration-300 ${
                  selectedSkill?.name === skill.name
                    ? "border-cyber-cyan ring-2 ring-cyber-neon/40 shadow-[0_0_30px_rgba(0,240,255,0.3)]"
                    : ""
                }`}
                onClick={() => setSelectedSkill(skill)}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-display text-lg font-bold text-white group-hover:text-cyber-neon transition-colors">
                      {skill.name}
                    </h3>
                    <span className="font-mono text-[11px] text-gray-400 uppercase tracking-wider">
                      {skill.category}
                    </span>
                  </div>
                  <span className="font-mono text-sm font-bold text-cyber-cyan">
                    {skill.level}%
                  </span>
                </div>

                <p className="my-3 text-xs text-gray-300 leading-relaxed font-light">
                  {skill.description}
                </p>

                {/* Animated Glowing Progress Bar */}
                <div className="mt-4 h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-cyber-blue to-cyber-neon shadow-[0_0_10px_#00F0FF]"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.04, ease: "easeOut" }}
                  />
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
