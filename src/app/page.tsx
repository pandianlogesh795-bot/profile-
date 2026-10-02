"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsUniverse } from "@/components/sections/SkillsUniverse";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { ProjectsShowcase } from "@/components/sections/ProjectsShowcase";
import { CertificatesSection } from "@/components/sections/CertificatesSection";
import { ResumeViewerSection } from "@/components/sections/ResumeViewerSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/layout/Footer";
import { Preloader } from "@/components/layout/Preloader";
import { useScrollProgress } from "@/hooks/useScrollProgress";

// Lazy-load heavy WebGL clients
const CustomCursor = dynamic(
  () => import("@/components/layout/CustomCursor").then((m) => m.CustomCursor),
  { ssr: false }
);

const BackgroundMesh = dynamic(
  () => import("@/components/three/BackgroundMesh").then((m) => m.BackgroundMesh),
  { ssr: false }
);

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  useScrollProgress();

  useEffect(() => {
    // Safety auto-reveal fallback: guaranteed page visibility within 1 second
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative min-h-screen w-full bg-[#040508] text-white selection:bg-cyan-400 selection:text-black">
      {/* 3D Preloader */}
      <Preloader onComplete={() => setLoaded(true)} />

      {/* Interactive Spring Cursor */}
      <CustomCursor />

      {/* Ambient 3D Floating Background */}
      <BackgroundMesh />

      {/* Main Layout - immediately ready behind preloader overlay */}
      <div className="relative w-full opacity-100">
        <Navbar />

        {/* Page Sections */}
        <HeroSection />
        <AboutSection />
        <SkillsUniverse />
        <TimelineSection />
        <ProjectsShowcase />
        <CertificatesSection />
        <ResumeViewerSection />
        <ContactSection />

        <Footer />
      </div>
    </main>
  );
}
