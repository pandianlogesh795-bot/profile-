"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Terminal, FileDown } from "lucide-react";
import { NAV_LINKS, PERSONAL_DATA } from "@/data/content";
import { AudioController } from "../ui/AudioController";
import { MagneticButton } from "../ui/MagneticButton";
import { useSoundEffects } from "@/hooks/useSoundEffects";

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { playHover, playClick } = useSoundEffects();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? "py-3 bg-cyber-dark/80 backdrop-blur-2xl border-b border-cyber-border/80 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo / Monogram */}
          <a
            href="#hero"
            onMouseEnter={playHover}
            onClick={playClick}
            className="flex items-center gap-3 group select-none"
            data-cursor-magnetic="true"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyber-blue to-cyan-500 p-0.5 shadow-[0_0_20px_rgba(0,240,255,0.4)] group-hover:shadow-[0_0_30px_rgba(0,240,255,0.8)] transition-shadow">
              <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#070A14]">
                <Terminal className="h-5 w-5 text-cyber-neon transition-transform group-hover:scale-110" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-lg font-black tracking-wider text-white group-hover:text-cyber-neon transition-colors">
                LOGESH P
              </span>
              <span className="text-[10px] font-mono tracking-widest text-cyan-400/80 uppercase">
                AI & 3D CREATIVE
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 rounded-full border border-cyber-border bg-cyber-card/60 px-4 py-1.5 backdrop-blur-xl shadow-lg">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onMouseEnter={playHover}
                onClick={playClick}
                className="rounded-full px-4 py-1.5 text-xs font-mono uppercase tracking-wider text-gray-300 transition-all duration-200 hover:text-cyber-neon hover:bg-white/10"
                data-cursor-magnetic="true"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Stack (Audio + Resume + Mobile Menu) */}
          <div className="flex items-center gap-3">
            <AudioController />

            <MagneticButton
              variant="primary"
              size="sm"
              href={PERSONAL_DATA.resumePath}
              download="Logesh_P_Resume.pdf"
              className="hidden lg:inline-flex"
            >
              <FileDown className="h-3.5 w-3.5" />
              <span>Resume</span>
            </MagneticButton>

            {/* Mobile Hamburger */}
            <button
              onClick={() => {
                playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="flex md:hidden h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-200 hover:border-cyber-cyan hover:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 flex flex-col justify-center bg-cyber-dark/95 backdrop-blur-2xl p-6 md:hidden"
          >
            <div className="flex flex-col items-center gap-6">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => {
                    playClick();
                    setMobileMenuOpen(false);
                  }}
                  className="font-display text-2xl font-bold tracking-wider text-gray-200 hover:text-cyber-neon"
                >
                  {link.name}
                </a>
              ))}
              <MagneticButton
                variant="primary"
                size="md"
                href={PERSONAL_DATA.resumePath}
                download="Logesh_P_Resume.pdf"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-4"
              >
                <FileDown className="h-4 w-4" /> Download Resume
              </MagneticButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
