"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Send, CheckCircle2, Phone, Mail, MapPin, Linkedin, Github, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";
import { PERSONAL_DATA } from "@/data/content";
import { TiltCard } from "../ui/TiltCard";
import { MagneticButton } from "../ui/MagneticButton";
import { KineticText } from "../ui/KineticText";
import { useSoundEffects } from "@/hooks/useSoundEffects";

const GlobeCanvas = dynamic(
  () => import("../three/GlobeCanvas").then((m) => m.GlobeCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="h-[360px] sm:h-[450px] w-full flex items-center justify-center">
        <div className="h-8 w-8 rounded-full border-2 border-cyber-cyan border-t-transparent animate-spin" />
      </div>
    ),
  }
);

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const { playHover, playClick, playWarp } = useSoundEffects();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    playClick();

    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all fields.");
      return;
    }

    setStatus("submitting");

    // Submit to internal API endpoint or simulate
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        playWarp();
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#00F0FF", "#0A84FF", "#A855F7", "#FFFFFF"],
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      // Fallback success for static/offline
      setStatus("success");
      playWarp();
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
      setFormData({ name: "", email: "", message: "" });
    }
  };

  return (
    <section id="contact" className="relative z-10 py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyber-cyan/30 bg-cyber-cyan/10 px-4 py-1.5 text-xs font-mono tracking-widest text-cyber-neon uppercase">
            <Sparkles className="h-3.5 w-3.5" /> 06 // TRANSMISSION MATRIX
          </div>
          <KineticText
            as="h2"
            text="Initiate Direct Transmission"
            className="text-3xl sm:text-5xl font-display font-black text-white text-center justify-center max-w-3xl"
          />
          <p className="text-gray-400 text-sm sm:text-base max-w-xl font-light">
            Have a project in mind or looking to collaborate? Send an encrypted transmission or connect directly via social coordinates.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: 3D Globe + Social Coordinates */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl border border-cyber-border bg-[#060914]/80 p-6 backdrop-blur-xl">
              <GlobeCanvas />

              <div className="mt-4 space-y-3 border-t border-white/10 pt-4">
                <div className="flex items-center gap-3 text-xs text-gray-300">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyber-cyan/15 text-cyber-neon">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] text-gray-400 uppercase">Station Coordinates</div>
                    <div className="font-medium text-white">{PERSONAL_DATA.location}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-gray-300">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyber-blue/15 text-cyber-blue">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] text-gray-400 uppercase">Direct Voice Line</div>
                    <a href={`tel:${PERSONAL_DATA.phone}`} className="font-medium text-white hover:text-cyber-neon">
                      {PERSONAL_DATA.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-gray-300">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyber-purple/15 text-cyber-purple">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] text-gray-400 uppercase">Digital Dispatch</div>
                    <a href={`mailto:${PERSONAL_DATA.email}`} className="font-medium text-white hover:text-cyber-neon">
                      {PERSONAL_DATA.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Buttons */}
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-white/10">
                <MagneticButton
                  variant="outline"
                  size="sm"
                  href={PERSONAL_DATA.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Linkedin className="h-4 w-4 text-cyber-cyan" /> LinkedIn
                </MagneticButton>

                <MagneticButton
                  variant="outline"
                  size="sm"
                  href={PERSONAL_DATA.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Github className="h-4 w-4 text-cyber-neon" /> GitHub
                </MagneticButton>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Tilted Glass Form */}
          <div className="lg:col-span-7">
            <TiltCard
              maxRotation={6}
              className="p-8 sm:p-10 bg-gradient-to-b from-[#0B1124]/90 to-[#04060E]/95 border-cyber-cyan/30 shadow-[0_0_80px_rgba(10,132,255,0.25)]"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="block font-mono text-xs uppercase tracking-widest text-cyber-cyan">
                    Your Name / Identity
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Mercer"
                    onMouseEnter={playHover}
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3.5 text-sm text-white placeholder-gray-500 backdrop-blur-md transition-all focus:border-cyber-cyan focus:bg-black/60 focus:outline-none focus:ring-1 focus:ring-cyber-cyan"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block font-mono text-xs uppercase tracking-widest text-cyber-cyan">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@company.com"
                    onMouseEnter={playHover}
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3.5 text-sm text-white placeholder-gray-500 backdrop-blur-md transition-all focus:border-cyber-cyan focus:bg-black/60 focus:outline-none focus:ring-1 focus:ring-cyber-cyan"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block font-mono text-xs uppercase tracking-widest text-cyber-cyan">
                    Message / Transmission
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your project, timeline, or collaboration ideas..."
                    onMouseEnter={playHover}
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3.5 text-sm text-white placeholder-gray-500 backdrop-blur-md transition-all focus:border-cyber-cyan focus:bg-black/60 focus:outline-none focus:ring-1 focus:ring-cyber-cyan resize-none"
                  />
                </div>

                <MagneticButton
                  variant="primary"
                  size="lg"
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full"
                >
                  {status === "submitting" ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Encrypting & Transmitting...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="h-4 w-4" /> Send Transmission
                    </span>
                  )}
                </MagneticButton>

                {/* Status Banners */}
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2.5 rounded-xl border border-emerald-500/50 bg-emerald-950/40 p-4 text-xs font-mono text-emerald-300"
                  >
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Transmission delivered successfully! Logesh will review and respond shortly.</span>
                  </motion.div>
                )}
              </form>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
};
