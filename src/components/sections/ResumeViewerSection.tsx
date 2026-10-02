"use client";

import React, { useEffect, useState } from "react";
import {
  FileText,
  Download,
  FileUp,
  ZoomIn,
  ZoomOut,
  ExternalLink,
  GraduationCap,
  Briefcase,
  Code2,
  Maximize,
  BookOpen,
  Award,
  RotateCcw,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PERSONAL_DATA } from "@/data/content";
import { TiltCard } from "../ui/TiltCard";
import { MagneticButton } from "../ui/MagneticButton";
import { KineticText } from "../ui/KineticText";
import { useSoundEffects } from "@/hooks/useSoundEffects";

export const ResumeViewerSection: React.FC = () => {
  const [zoomLevel, setZoomLevel] = useState(100);
  const [activeTab, setActiveTab] = useState<"viewer" | "overview">("viewer");
  const [isFlipped, setIsFlipped] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [localResume, setLocalResume] = useState<{ file: File; url: string } | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const { playHover, playClick, playWarp } = useSoundEffects();
  const resumeUrl = localResume?.url ?? PERSONAL_DATA.resumePath;
  const resumeName = localResume?.file.name ?? "Logesh_P_Resume.pdf";

  useEffect(() => {
    return () => {
      if (localResume) URL.revokeObjectURL(localResume.url);
    };
  }, [localResume]);

  const handleResumeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    event.currentTarget.value = "";
    if (!file) return;

    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      setUploadError("Choose a PDF file to preview it here.");
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      setUploadError("The PDF must be 20 MB or smaller.");
      return;
    }

    setLocalResume({ file, url: URL.createObjectURL(file) });
    setUploadError(null);
    setZoomLevel(100);
    playClick();
  };

  const handleRestoreDefault = () => {
    setLocalResume(null);
    setUploadError(null);
    playClick();
  };

  const handleZoomIn = () => {
    playClick();
    setZoomLevel((prev) => Math.min(150, prev + 15));
  };

  const handleZoomOut = () => {
    playClick();
    setZoomLevel((prev) => Math.max(75, prev - 15));
  };

  const handleOpen = () => {
    if (!hasOpened) {
      playWarp();
      setIsFlipped(true);
      setTimeout(() => setHasOpened(true), 700);
    }
  };

  return (
    <section id="resume" className="relative z-10 py-28 sm:py-36 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[700px] h-[400px] rounded-full bg-cyber-blue/5 blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-cyber-cyan/30 bg-cyber-cyan/10 px-4 py-1.5 text-xs font-mono tracking-widest text-cyber-neon uppercase"
          >
            <FileText className="h-3.5 w-3.5" /> 06 // 3D RESUME HUB
          </motion.div>
          <KineticText
            as="h2"
            text="Interactive Dossier & Resume Reader"
            className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-white text-center justify-center max-w-4xl"
          />
          <p className="text-gray-400 text-sm sm:text-base max-w-xl font-light">
            Preview the bundled resume or choose a PDF from your device to inspect and download it here.
          </p>
        </div>

        {/* 3D Flip Book Entry */}
        <AnimatePresence>
          {!hasOpened && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex justify-center mb-10"
            >
              <motion.div
                style={{
                  perspective: 800,
                  perspectiveOrigin: "center",
                }}
              >
                <motion.div
                  animate={{
                    rotateY: isFlipped ? 180 : 0,
                    scale: isFlipped ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformStyle: "preserve-3d" }}
                  className="relative cursor-pointer"
                  onClick={handleOpen}
                >
                  {/* Front: Closed Book */}
                  <div
                    className="w-64 h-80 rounded-2xl flex flex-col items-center justify-center gap-4 border border-cyber-cyan/40 bg-gradient-to-b from-[#0B1226] to-[#060914] shadow-[0_0_50px_rgba(0,240,255,0.2)]"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <div className="w-16 h-20 rounded-lg bg-gradient-to-b from-cyber-blue to-cyber-neon flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.4)]">
                      <BookOpen className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-center">
                      <div className="font-display text-lg font-bold text-white">Resume</div>
                      <div className="font-mono text-xs text-cyber-neon mt-1">Logesh P</div>
                    </div>
                    <div className="text-xs font-mono text-gray-400">Click to open →</div>
                    {/* Spine */}
                    <div className="absolute left-0 inset-y-0 w-4 rounded-l-2xl bg-gradient-to-b from-cyber-blue/60 to-cyber-cyan/30" />
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tab & Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          {/* Tabs */}
          <div className="flex items-center gap-2 rounded-full border border-cyber-border bg-cyber-card/60 p-1.5 backdrop-blur-md">
            <button
              onClick={() => { playClick(); setActiveTab("viewer"); }}
              onMouseEnter={playHover}
              className={`rounded-full px-5 py-2 text-xs font-mono tracking-wider transition-all duration-300 ${
                activeTab === "viewer"
                  ? "bg-cyber-cyan/20 border border-cyber-cyan text-cyber-neon shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              PDF Viewer
            </button>
            <button
              onClick={() => { playClick(); setActiveTab("overview"); }}
              onMouseEnter={playHover}
              className={`rounded-full px-5 py-2 text-xs font-mono tracking-wider transition-all duration-300 ${
                activeTab === "overview"
                  ? "bg-cyber-cyan/20 border border-cyber-cyan text-cyber-neon shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Quick Summary
            </button>
          </div>

          {/* Viewer Tools & Download CTA */}
          <div className="flex flex-wrap items-center justify-end gap-3">
            <input
              id="resume-pdf-upload"
              type="file"
              accept="application/pdf,.pdf"
              onChange={handleResumeUpload}
              className="peer sr-only"
              aria-label="Choose a resume PDF"
            />
            <label
              htmlFor="resume-pdf-upload"
              onMouseEnter={playHover}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-cyber-cyan/40 bg-cyber-cyan/10 px-4 py-2 text-xs font-mono text-cyber-neon transition-colors hover:bg-cyber-cyan/20 peer-focus-visible:ring-2 peer-focus-visible:ring-cyber-cyan"
            >
              <FileUp className="h-4 w-4" /> Choose PDF
            </label>
            {localResume && (
              <button
                type="button"
                onClick={handleRestoreDefault}
                onMouseEnter={playHover}
                title="Restore bundled resume"
                aria-label="Restore bundled resume"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-gray-300 transition-colors hover:border-cyber-cyan/50 hover:text-cyber-cyan"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            )}
            {activeTab === "viewer" && (
              <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-md text-xs font-mono text-gray-300">
                <button onClick={handleZoomOut} className="p-1 hover:text-cyber-cyan transition-colors" title="Zoom Out">
                  <ZoomOut className="h-4 w-4" />
                </button>
                <span className="w-12 text-center text-cyber-neon">{zoomLevel}%</span>
                <button onClick={handleZoomIn} className="p-1 hover:text-cyber-cyan transition-colors" title="Zoom In">
                  <ZoomIn className="h-4 w-4" />
                </button>
              </div>
            )}
            <MagneticButton variant="primary" size="sm" href={resumeUrl} download={resumeName}>
              <Download className="h-4 w-4" /> Download Resume
            </MagneticButton>
          </div>
        </div>
        <p className="mb-4 text-right text-xs font-mono text-gray-500" aria-live="polite">
          {uploadError ?? (localResume ? `Previewing ${resumeName} from this device. It is not uploaded.` : "Showing the bundled resume.")}
        </p>

        {/* Main Viewer Panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <TiltCard
            maxRotation={3}
            className="p-3 sm:p-5 bg-[#070914]/92 border-cyber-cyan/30 shadow-[0_0_80px_rgba(10,132,255,0.2)]"
          >
            {activeTab === "viewer" ? (
              <div className="relative aspect-[3/4] sm:aspect-[4/3] md:aspect-[16/10] w-full rounded-2xl overflow-hidden border border-white/10 bg-[#05060C]">
                <iframe
                  key={resumeUrl}
                  src={`${resumeUrl}#zoom=${zoomLevel}`}
                  className="h-full w-full border-none transition-all duration-300"
                  title={`${resumeName} preview`}
                />
                {/* Scan line overlay */}
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,240,255,0.03)_51%)] bg-[length:100%_4px]" />
                {/* Bottom Action Bar */}
                <div className="absolute bottom-4 right-4 flex items-center gap-2">
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${resumeName} fullscreen`}
                    className="flex items-center gap-1.5 rounded-full border border-cyber-cyan/40 bg-cyber-dark/90 px-4 py-2 text-xs font-mono text-cyber-neon backdrop-blur-md hover:bg-cyber-cyan/20 transition-all"
                  >
                    <Maximize className="h-3.5 w-3.5" /> Fullscreen
                  </a>
                </div>
              </div>
            ) : (
              /* Quick Summary Tab */
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 sm:p-6">
                {/* Education */}
                <div className="rounded-2xl border border-cyber-cyan/20 bg-cyber-cyan/5 p-5 space-y-3 hover:border-cyber-cyan/40 transition-colors">
                  <div className="flex items-center gap-2 text-cyber-cyan font-mono text-xs uppercase tracking-wider">
                    <GraduationCap className="h-4 w-4" /> Education
                  </div>
                  <h4 className="font-display text-base font-bold text-white">Anand Institute of Higher Technology</h4>
                  <div className="font-mono text-xs text-cyber-neon">B.Tech — AI & Data Science</div>
                  <div className="text-xs text-gray-400 font-mono">Jan 2024 – Dec 2028 (Ongoing)</div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Specializing in ML algorithms, deep neural networks, C/C++ computation, and data science. Currently 3rd Year.
                  </p>
                </div>

                {/* Experience */}
                <div className="rounded-2xl border border-cyber-purple/20 bg-cyber-purple/5 p-5 space-y-3 hover:border-cyber-purple/40 transition-colors">
                  <div className="flex items-center gap-2 text-cyber-purple font-mono text-xs uppercase tracking-wider">
                    <Briefcase className="h-4 w-4" /> Experience
                  </div>
                  <h4 className="font-display text-base font-bold text-white">Independent Writing & Editing</h4>
                  <div className="font-mono text-xs text-purple-300">Freelance & Autonomous Publications</div>
                  <div className="text-xs text-gray-400 font-mono">Dec 2021 – Dec 2025 · 4 Yrs 1 Mo</div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Technical documentation, creative editorial, and digital communication strategy for diverse global clients.
                  </p>
                </div>

                {/* Skills & Certifications */}
                <div className="rounded-2xl border border-cyber-neon/20 bg-cyber-neon/5 p-5 space-y-3 hover:border-cyber-neon/40 transition-colors">
                  <div className="flex items-center gap-2 text-cyber-neon font-mono text-xs uppercase tracking-wider">
                    <Code2 className="h-4 w-4" /> Skills & Certs
                  </div>
                  <h4 className="font-display text-base font-bold text-white">Core Competencies</h4>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {["Python", "C & C++", "JavaScript", "React", "Three.js", "ML", "Data Science", "UI/UX", "Photoshop", "Git"].map((s, idx) => (
                      <span key={idx} className="rounded px-2 py-1 text-[10px] font-mono border border-cyber-neon/20 bg-cyber-neon/10 text-cyan-200">
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                    <Award className="h-3.5 w-3.5 text-cyber-amber" />
                    <span className="text-xs text-gray-300 font-mono">CTC Certificate: C &amp; C++</span>
                  </div>
                  <a
                    href={PERSONAL_DATA.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-mono text-cyber-cyan hover:underline mt-1"
                  >
                    LinkedIn Endorsements <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            )}
          </TiltCard>
        </motion.div>
      </div>
    </section>
  );
};
