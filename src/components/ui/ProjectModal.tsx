"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, CheckCircle2, Cpu, Sparkles, Layers } from "lucide-react";
import { Project } from "@/data/content";
import { MagneticButton } from "./MagneticButton";
import { useSoundEffects } from "@/hooks/useSoundEffects";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const { playWarp, playClick } = useSoundEffects();

  useEffect(() => {
    if (project) {
      playWarp();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [project, playWarp]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            playClick();
            onClose();
          }}
          className="absolute inset-0 bg-cyber-dark/85 backdrop-blur-2xl"
        />

        {/* Modal Window with 3D Fold Transition */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88, rotateX: 15, y: 40 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, rotateX: -10, y: 30 }}
          transition={{ type: "spring", damping: 22, stiffness: 200 }}
          className="relative z-10 max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-cyber-cyan/30 bg-[#080B14]/95 p-6 sm:p-8 md:p-10 shadow-[0_0_80px_rgba(10,132,255,0.25)] scrollbar-thin scrollbar-thumb-cyber-cyan/30 scrollbar-track-transparent"
        >
          {/* Close Button */}
          <button
            onClick={() => {
              playClick();
              onClose();
            }}
            className="absolute top-6 right-6 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition-all duration-200 hover:border-cyber-cyan hover:bg-cyber-cyan/15 hover:text-white hover:rotate-90"
            aria-label="Close Case Study"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Header */}
          <div className="space-y-3 pr-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyber-cyan/40 bg-cyber-cyan/10 px-3 py-1 text-xs font-mono tracking-wider text-cyber-neon uppercase">
              <Sparkles className="h-3 w-3" /> {project.category}
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
              {project.title}
            </h2>
            <p className="text-lg text-cyan-200/80 font-light">
              {project.subtitle}
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="my-8 grid grid-cols-3 gap-3 sm:gap-4">
            {project.metrics.map((metric, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center backdrop-blur-md"
              >
                <div className="text-xl sm:text-2xl font-bold font-mono text-cyber-neon">
                  {metric.value}
                </div>
                <div className="mt-1 text-xs text-gray-400 uppercase tracking-wider">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

          {/* Narrative & Architecture */}
          <div className="space-y-6 text-gray-300">
            <div>
              <h4 className="text-sm font-mono uppercase tracking-widest text-cyber-cyan mb-2">
                Executive Overview
              </h4>
              <p className="text-base leading-relaxed text-gray-300">
                {project.longDescription}
              </p>
            </div>

            {/* Architectural Pipeline */}
            <div className="rounded-2xl border border-cyber-border bg-cyber-card/50 p-5">
              <div className="flex items-center gap-2 text-sm font-mono text-cyber-neon mb-2">
                <Cpu className="h-4 w-4" /> System Architecture Pipeline
              </div>
              <div className="font-mono text-xs sm:text-sm text-cyan-100 bg-black/40 p-3.5 rounded-xl border border-white/5 overflow-x-auto">
                {project.architecture}
              </div>
            </div>

            {/* Key Engineering Features */}
            <div>
              <h4 className="text-sm font-mono uppercase tracking-widest text-cyber-cyan mb-3">
                Key Engineering Highlights
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.features.map((feat, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-sm text-gray-300 bg-white/[0.02] p-3 rounded-xl border border-white/5"
                  >
                    <CheckCircle2 className="h-4 w-4 text-cyber-cyan shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack Tags */}
            <div>
              <h4 className="text-sm font-mono uppercase tracking-widest text-cyber-cyan mb-3 flex items-center gap-2">
                <Layers className="h-4 w-4" /> Technology Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-mono text-gray-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* CTAs */}
          {(project.demoUrl || project.githubUrl) && (
            <div className="mt-10 flex flex-wrap items-center gap-4 pt-6 border-t border-white/10">
              {project.demoUrl && (
                <MagneticButton
                  variant="primary"
                  size="md"
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4" /> Live Interactive Demo
                </MagneticButton>
              )}
              {project.githubUrl && (
                <MagneticButton
                  variant="secondary"
                  size="md"
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4" /> View Source on GitHub
                </MagneticButton>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
