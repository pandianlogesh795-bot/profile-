"use client";

import React, { useState, useRef, useEffect, useCallback, FormEvent } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Layers,
  ArrowRight,
  Maximize2,
  Github,
  Cpu,
  Zap,
  Plus,
  X,
} from "lucide-react";
import { PROJECTS, Project } from "@/data/content";
import { ProjectModal } from "../ui/ProjectModal";
import { MagneticButton } from "../ui/MagneticButton";
import { KineticText } from "../ui/KineticText";
import { useSoundEffects } from "@/hooks/useSoundEffects";

// Holographic project card with ripple shader effect (CSS-based)
function ProjectCard({
  project,
  offset,
  isActive,
  onClick,
  index,
  total,
}: {
  project: Project;
  offset: number;
  isActive: boolean;
  onClick: () => void;
  index: number;
  total: number;
}) {
  const { playHover } = useSoundEffects();
  const [ripple, setRipple] = useState(false);

  const translateX = offset * 340;
  const translateZ = -Math.abs(offset) * 200;
  const rotateY = -offset * 28;
  const scale = isActive ? 1.0 : Math.max(0.72, 1 - Math.abs(offset) * 0.17);
  const opacity = isActive ? 1 : Math.max(0.2, 1 - Math.abs(offset) * 0.48);
  const zIndex = 30 - Math.abs(offset) * 5;

  const handleClick = () => {
    setRipple(true);
    setTimeout(() => setRipple(false), 500);
    onClick();
  };

  return (
    <motion.div
      animate={{
        x: translateX,
        z: translateZ,
        rotateY: rotateY,
        scale: scale,
        opacity: opacity,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 26 }}
      onClick={handleClick}
      onMouseEnter={() => isActive && playHover()}
      style={{ zIndex }}
      className={`absolute w-[310px] sm:w-[420px] md:w-[490px] cursor-pointer rounded-3xl border p-6 sm:p-8 backdrop-blur-2xl [transform-style:preserve-3d] transition-shadow duration-300 overflow-hidden ${
        isActive
          ? "border-cyber-cyan/70 bg-gradient-to-b from-[#0F172A]/96 to-[#060913]/99 shadow-[0_0_70px_rgba(0,240,255,0.35),inset_0_0_30px_rgba(0,240,255,0.05)] ring-1 ring-cyber-cyan/40"
          : "border-white/8 bg-[#070B16]/85 shadow-2xl hover:border-white/20"
      }`}
    >
      {/* Ripple effect on click */}
      {ripple && (
        <span className="absolute inset-0 rounded-3xl bg-cyber-cyan/10 animate-ping pointer-events-none" />
      )}

      {/* Holographic shimmer layer for active card */}
      {isActive && (
        <div className="absolute inset-0 rounded-3xl pointer-events-none holo-shimmer opacity-30" />
      )}

      {/* Top Category Badge */}
      <div className="flex items-center justify-between mb-5">
        <span
          className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-mono uppercase"
          style={{
            borderColor: `${project.accentColor}50`,
            backgroundColor: `${project.accentColor}15`,
            color: project.accentColor,
          }}
        >
          <Layers className="h-3 w-3" /> {project.category}
        </span>
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-gray-500">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          {isActive && (
            <span
              className="flex h-7 w-7 items-center justify-center rounded-full"
              style={{ backgroundColor: `${project.accentColor}20`, color: project.accentColor }}
            >
              <Maximize2 className="h-3.5 w-3.5" />
            </span>
          )}
        </div>
      </div>

      {/* Project Title & Subtitle */}
      <h3 className="font-display text-2xl sm:text-3xl font-black text-white tracking-tight">
        {project.title}
      </h3>
      <p className="font-mono text-xs mt-1.5 mb-5" style={{ color: project.accentColor + "CC" }}>
        {project.subtitle}
      </p>

      {/* Metrics Display Panel */}
      <div className="my-4 rounded-2xl border border-white/8 bg-black/50 p-4 grid grid-cols-3 gap-3 group">
        {project.metrics.map((m, i) => (
          <div key={i} className="text-center">
            <div
              className="font-display text-lg font-black group-hover:scale-105 transition-transform"
              style={{ color: project.accentColor }}
            >
              {m.value}
            </div>
            <div className="font-mono text-[9px] text-gray-500 uppercase mt-0.5">{m.label}</div>
          </div>
        ))}
        {/* Scanline */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,240,255,0.04)_51%)] bg-[length:100%_4px] rounded-2xl" />
      </div>

      {/* Description */}
      <p className="text-xs sm:text-sm text-gray-300 line-clamp-2 leading-relaxed font-light mb-4">
        {project.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.tags.slice(0, 4).map((tag, tIdx) => (
          <span
            key={tIdx}
            className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-mono text-gray-300"
          >
            {tag}
          </span>
        ))}
        {project.tags.length > 4 && (
          <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-mono text-gray-500">
            +{project.tags.length - 4}
          </span>
        )}
      </div>

      {/* Active Action Strip */}
      {isActive && (
        <div className="flex items-center justify-between pt-4 border-t border-white/8">
          <span className="text-xs font-mono flex items-center gap-1" style={{ color: project.accentColor }}>
            Open 3D Case Study <ArrowRight className="h-3.5 w-3.5" />
          </span>
          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} aria-label="View source code" title="View source code">
                <Github className="h-4 w-4 text-gray-400 hover:text-white transition-colors" />
              </a>
            )}
            {project.demoUrl && (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} aria-label="Open live demo" title="Open live demo">
                <ExternalLink className="h-4 w-4 text-gray-400 hover:text-cyber-neon transition-colors" />
              </a>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}

export const ProjectsShowcase: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(PROJECTS);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [hasLoadedProjects, setHasLoadedProjects] = useState(false);
  const [formError, setFormError] = useState("");
  const { playClick, playWarp } = useSoundEffects();
  const touchStartX = useRef<number | null>(null);
  const dragStartX = useRef<number | null>(null);
  const isDragging = useRef(false);

  useEffect(() => {
    try {
      const savedProjects = window.localStorage.getItem("portfolio-projects");
      if (savedProjects) {
        const parsedProjects = JSON.parse(savedProjects) as Project[];
        if (Array.isArray(parsedProjects)) {
          const defaultIds = new Set(PROJECTS.map((project) => project.id));
          setProjects([
            ...PROJECTS,
            ...parsedProjects.filter((project) => !defaultIds.has(project.id)),
          ]);
        }
      }
    } catch {
      window.localStorage.removeItem("portfolio-projects");
    }
    setHasLoadedProjects(true);
  }, []);

  useEffect(() => {
    if (hasLoadedProjects) {
      window.localStorage.setItem("portfolio-projects", JSON.stringify(projects));
    }
  }, [hasLoadedProjects, projects]);

  const nextSlide = useCallback(() => {
    if (projects.length < 2) return;
    playClick();
    setActiveIndex((prev) => (prev + 1) % projects.length);
  }, [playClick, projects.length]);

  const prevSlide = useCallback(() => {
    if (projects.length < 2) return;
    playClick();
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  }, [playClick, projects.length]);

  const addProject = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title = String(formData.get("title") ?? "").trim();
    const description = String(formData.get("description") ?? "").trim();
    const category = String(formData.get("category") ?? "Full-Stack") as Project["category"];
    const tags = String(formData.get("tags") ?? "")
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    if (!title || !description) {
      setFormError("Add a project name and description to continue.");
      return;
    }

    const project: Project = {
      id: `${Date.now()}`,
      title,
      subtitle: category,
      category,
      description,
      longDescription: description,
      image: "",
      accentColor: "#22D3EE",
      tags,
      metrics: [{ label: "Status", value: "Personal project" }],
      features: [],
      architecture: "",
      demoUrl: String(formData.get("demoUrl") ?? "").trim(),
      githubUrl: String(formData.get("githubUrl") ?? "").trim(),
    };

    setProjects((current) => [...current, project]);
    setActiveIndex(projects.length);
    setFormError("");
    setIsAddFormOpen(false);
    event.currentTarget.reset();
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedProject || projects.length < 2) return;
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProject, projects.length, nextSlide, prevSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) nextSlide();
    if (diff < -50) prevSlide();
    touchStartX.current = null;
  };

  // Mouse drag
  const handleMouseDown = (e: React.MouseEvent) => {
    dragStartX.current = e.clientX;
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragStartX.current !== null && Math.abs(e.clientX - dragStartX.current) > 5) {
      isDragging.current = true;
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (dragStartX.current !== null && isDragging.current) {
      const diff = dragStartX.current - e.clientX;
      if (diff > 60) nextSlide();
      if (diff < -60) prevSlide();
    }
    dragStartX.current = null;
    isDragging.current = false;
  };

  return (
    <section id="projects" className="relative z-10 py-28 sm:py-36 overflow-hidden select-none">
      {/* Section radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[900px] h-[600px] rounded-full bg-cyber-purple/5 blur-[180px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-20 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-cyber-cyan/30 bg-cyber-cyan/10 px-4 py-1.5 text-xs font-mono tracking-widest text-cyber-neon uppercase"
          >
            <Sparkles className="h-3.5 w-3.5" /> 04 // HOLOGRAPHIC PROJECT DECK
          </motion.div>
          <KineticText
            as="h2"
            text="Selected Projects"
            className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-white text-center justify-center max-w-4xl"
          />
          <p className="text-gray-400 text-sm sm:text-base max-w-xl font-light">
            A collection of work in progress and finished projects.
          </p>
        </div>

        {projects.length === 0 ? (
          <div className="mx-auto flex min-h-[360px] max-w-3xl flex-col items-center justify-center border border-dashed border-white/20 px-6 py-12 text-center">
            <Layers className="mb-5 h-8 w-8 text-cyber-cyan" />
            <h3 className="font-display text-2xl font-bold text-white">No projects added yet</h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-gray-400">
              Add your own work here. Project details are saved in this browser.
            </p>
            <button
              type="button"
              onClick={() => setIsAddFormOpen(true)}
              className="mt-7 inline-flex items-center gap-2 border border-cyber-cyan/50 bg-cyber-cyan/10 px-5 py-3 font-mono text-sm text-cyber-neon transition-colors hover:bg-cyber-cyan/20"
            >
              <Plus className="h-4 w-4" /> Add project
            </button>
          </div>
        ) : (
          <>
        {/* Curved 3D Stage */}
        <div
          className="relative min-h-[480px] sm:h-[560px] w-full flex items-center justify-center [perspective:1600px] cursor-grab active:cursor-grabbing"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          {projects.map((project, index) => {
            const count = projects.length;
            let offset = index - activeIndex;
            if (offset > count / 2) offset -= count;
            if (offset < -count / 2) offset += count;
            const isVisible = Math.abs(offset) <= 2;
            if (!isVisible) return null;

            return (
              <ProjectCard
                key={project.id}
                project={project}
                offset={offset}
                isActive={offset === 0}
                index={index}
                total={count}
                onClick={() => {
                  if (isDragging.current) return;
                  if (offset === 0) {
                    playWarp();
                    setSelectedProject(project);
                  } else {
                    playClick();
                    setActiveIndex(index);
                  }
                }}
              />
            );
          })}
        </div>

        {/* Carousel Controls */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Progress Indicators */}
          <div className="flex items-center gap-2">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => { playClick(); setActiveIndex(i); }}
                className={`rounded-full transition-all duration-300 ${
                  activeIndex === i
                    ? "w-10 h-2 bg-gradient-to-r from-cyber-blue to-cyber-neon shadow-[0_0_12px_#00F0FF]"
                    : "w-2 h-2 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Active project name */}
          <div className="font-mono text-xs text-gray-500">
            <span className="text-cyber-neon">{projects[activeIndex]?.title}</span> — {projects[activeIndex]?.category}
          </div>

          {/* Nav Buttons */}
          <div className="flex items-center gap-3">
            <MagneticButton variant="outline" size="sm" onClick={prevSlide} aria-label="Previous Project">
              <ChevronLeft className="h-4 w-4" /> Prev
            </MagneticButton>
            <MagneticButton variant="outline" size="sm" onClick={nextSlide} aria-label="Next Project">
              Next <ChevronRight className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton
              variant="primary"
              size="sm"
              onClick={() => { playWarp(); setSelectedProject(projects[activeIndex]); }}
            >
              <ExternalLink className="h-3.5 w-3.5" /> Case Study
            </MagneticButton>
          </div>
        </div>

        {/* Tech Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-3"
        >
          {Array.from(new Set(projects.flatMap(p => p.tags))).slice(0, 12).map((tag, i) => (
            <span key={i} className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1 text-[10px] font-mono text-gray-400">
              {tag}
            </span>
          ))}
        </motion.div>
          </>
        )}

        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setIsAddFormOpen(true)}
            className="inline-flex items-center gap-2 border border-white/15 px-4 py-2.5 font-mono text-xs text-gray-300 transition-colors hover:border-cyber-cyan/60 hover:text-cyber-neon"
          >
            <Plus className="h-4 w-4" /> Add project
          </button>
        </div>
      </div>

      {isAddFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm" role="presentation">
          <form onSubmit={addProject} className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto border border-cyber-cyan/30 bg-[#080B14] p-6 shadow-[0_0_60px_rgba(0,240,255,0.12)] sm:p-8">
            <button type="button" onClick={() => setIsAddFormOpen(false)} aria-label="Close add project form" className="absolute right-5 top-5 text-gray-400 hover:text-white">
              <X className="h-5 w-5" />
            </button>
            <h3 className="pr-8 font-display text-2xl font-bold text-white">Add a project</h3>
            <p className="mt-1 text-sm text-gray-400">Your entry will be stored in this browser.</p>
            <div className="mt-6 grid gap-4">
              <label className="grid gap-1.5 text-xs font-mono uppercase text-gray-400">
                Project name
                <input name="title" required maxLength={80} className="border border-white/15 bg-black/40 px-3 py-2.5 text-sm normal-case text-white outline-none focus:border-cyber-cyan" />
              </label>
              <label className="grid gap-1.5 text-xs font-mono uppercase text-gray-400">
                Description
                <textarea name="description" required rows={3} maxLength={500} className="resize-y border border-white/15 bg-black/40 px-3 py-2.5 text-sm normal-case text-white outline-none focus:border-cyber-cyan" />
              </label>
              <label className="grid gap-1.5 text-xs font-mono uppercase text-gray-400">
                Category
                <select name="category" className="border border-white/15 bg-[#10141e] px-3 py-2.5 text-sm normal-case text-white outline-none focus:border-cyber-cyan">
                  <option>Full-Stack</option>
                  <option>AI &amp; ML</option>
                  <option>Web3D &amp; Creative</option>
                  <option>Data Science</option>
                </select>
              </label>
              <label className="grid gap-1.5 text-xs font-mono uppercase text-gray-400">
                Technologies <span className="normal-case">(comma separated)</span>
                <input name="tags" placeholder="React, TypeScript" className="border border-white/15 bg-black/40 px-3 py-2.5 text-sm normal-case text-white outline-none focus:border-cyber-cyan" />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-1.5 text-xs font-mono uppercase text-gray-400">
                  Live link <span className="normal-case">(optional)</span>
                  <input name="demoUrl" type="url" placeholder="https://" className="min-w-0 border border-white/15 bg-black/40 px-3 py-2.5 text-sm normal-case text-white outline-none focus:border-cyber-cyan" />
                </label>
                <label className="grid gap-1.5 text-xs font-mono uppercase text-gray-400">
                  Source code <span className="normal-case">(optional)</span>
                  <input name="githubUrl" type="url" placeholder="https://github.com/..." className="min-w-0 border border-white/15 bg-black/40 px-3 py-2.5 text-sm normal-case text-white outline-none focus:border-cyber-cyan" />
                </label>
              </div>
            </div>
            {formError && <p role="alert" className="mt-4 text-sm text-rose-400">{formError}</p>}
            <div className="mt-6 flex justify-end gap-3">
              <button type="button" onClick={() => setIsAddFormOpen(false)} className="px-4 py-2 text-sm text-gray-400 hover:text-white">Cancel</button>
              <button type="submit" className="inline-flex items-center gap-2 border border-cyber-cyan/50 bg-cyber-cyan/10 px-4 py-2 font-mono text-sm text-cyber-neon hover:bg-cyber-cyan/20">
                <Plus className="h-4 w-4" /> Save project
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 3D Case Study Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
};
