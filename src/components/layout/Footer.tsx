"use client";

import React from "react";
import { Linkedin, Github, Phone, Mail, MapPin, ArrowUpRight, Sparkles } from "lucide-react";
import { PERSONAL_DATA } from "@/data/content";
import { useSoundEffects } from "@/hooks/useSoundEffects";

export const Footer: React.FC = () => {
  const { playHover, playClick } = useSoundEffects();

  return (
    <footer className="relative z-10 overflow-hidden border-t border-cyber-border bg-[#030408] pt-16 pb-12 text-white">
      {/* 3D Skewed Infinite Marquee */}
      <div className="relative w-full overflow-hidden py-6 select-none [transform:skewY(-2deg)] bg-gradient-to-r from-cyber-blue/10 via-cyber-cyan/20 to-cyber-purple/10 border-y border-cyber-cyan/30 shadow-[0_0_50px_rgba(0,240,255,0.15)] mb-16">
        <div className="flex w-[200%] animate-[marquee_20s_linear_infinite] whitespace-nowrap">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 mx-4">
              <span className="font-display text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyber-neon drop-shadow-[0_0_20px_rgba(0,240,255,0.5)]">
                LOGESH P
              </span>
              <span className="h-3 w-3 rounded-full bg-cyber-neon shadow-[0_0_10px_#00F0FF]" />
              <span className="font-display text-3xl sm:text-5xl font-light tracking-tight text-cyan-300/80">
                AI & DATA SCIENCE
              </span>
              <span className="h-3 w-3 rounded-full bg-cyber-purple shadow-[0_0_10px_#A855F7]" />
              <span className="font-display text-3xl sm:text-5xl font-light tracking-tight text-gray-300">
                CREATIVE 3D DEVELOPER
              </span>
              <span className="h-3 w-3 rounded-full bg-cyber-blue shadow-[0_0_10px_#0A84FF]" />
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Bio */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-2 text-cyber-neon font-mono text-sm tracking-wider">
              <Sparkles className="h-4 w-4" /> B.TECH AI & DATA SCIENCE
            </div>
            <h3 className="font-display text-3xl font-bold tracking-tight text-white">
              Let&apos;s build next-generation spatial AI experiences together.
            </h3>
            <p className="text-gray-400 text-sm max-w-lg leading-relaxed">
              Available for ambitious AI engineering roles, high-performance WebGL contracts, and collaborative research initiatives.
            </p>
          </div>

          {/* Col 2: Direct Contact Details */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-cyber-cyan">
              Location & Coordinates
            </h4>
            <div className="flex items-start gap-2.5 text-xs text-gray-300">
              <MapPin className="h-4 w-4 text-cyber-cyan shrink-0 mt-0.5" />
              <span>{PERSONAL_DATA.location}</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-gray-300 pt-2">
              <Phone className="h-4 w-4 text-cyber-cyan shrink-0" />
              <a href={`tel:${PERSONAL_DATA.phone}`} className="hover:text-cyber-neon transition-colors">
                {PERSONAL_DATA.phone}
              </a>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-gray-300">
              <Mail className="h-4 w-4 text-cyber-cyan shrink-0" />
              <a href={`mailto:${PERSONAL_DATA.email}`} className="hover:text-cyber-neon transition-colors">
                {PERSONAL_DATA.email}
              </a>
            </div>
          </div>

          {/* Col 3: Social Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-cyber-cyan">
              Network & Hubs
            </h4>
            <div className="flex flex-col gap-2">
              <a
                href={PERSONAL_DATA.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playHover}
                onClick={playClick}
                className="inline-flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-3 text-xs text-gray-200 transition-all hover:border-cyber-cyan hover:bg-cyber-cyan/10 hover:text-white"
                data-cursor-magnetic="true"
              >
                <span className="flex items-center gap-2">
                  <Linkedin className="h-4 w-4 text-cyber-cyan" /> LinkedIn Profile
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 text-gray-400" />
              </a>

              <a
                href={PERSONAL_DATA.github}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playHover}
                onClick={playClick}
                className="inline-flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-3 text-xs text-gray-200 transition-all hover:border-cyber-cyan hover:bg-cyber-cyan/10 hover:text-white"
                data-cursor-magnetic="true"
              >
                <span className="flex items-center gap-2">
                  <Github className="h-4 w-4 text-cyber-neon" /> GitHub Repositories
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 text-gray-400" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-400">
          <div>
            © {new Date().getFullYear()} Logesh P. Engineered with Next.js 15, Three.js & Tailwind CSS.
          </div>
          <div className="flex items-center gap-6">
            <span>Mamallapuram, TN, India</span>
            <span>AI & DS Class of 2028</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
