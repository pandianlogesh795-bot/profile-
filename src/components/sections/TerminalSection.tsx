"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, ChevronRight, Download, ExternalLink } from "lucide-react";
import { PERSONAL_DATA, SKILLS, PROJECTS } from "@/data/content";

interface TerminalLine {
  type: "input" | "output" | "error" | "system";
  content: string | React.ReactNode;
  id: string;
}

const COMMANDS: Record<string, () => React.ReactNode | string> = {
  help: () => (
    <div className="space-y-1">
      <div className="text-cyber-cyan font-bold mb-2">Available Commands:</div>
      {[
        ["whoami", "Display identity profile of Logesh P"],
        ["skills", "List all technical competencies"],
        ["projects", "Enumerate flagship projects"],
        ["education", "Show academic credentials"],
        ["experience", "Show professional background"],
        ["contact", "Display contact coordinates"],
        ["github", "Open GitHub repositories"],
        ["linkedin", "Open LinkedIn profile"],
        ["download-resume", "Trigger resume PDF download"],
        ["achievements", "List sports & academic achievements"],
        ["certifications", "Show certifications"],
        ["clear", "Clear the terminal"],
      ].map(([cmd, desc]) => (
        <div key={cmd} className="flex gap-4">
          <span className="text-cyber-neon w-28 shrink-0">{cmd}</span>
          <span className="text-gray-400">{desc}</span>
        </div>
      ))}
    </div>
  ),

  whoami: () => (
    <div className="space-y-2">
      <div className="text-white font-bold text-base">LOGESH P</div>
      <div className="space-y-1">
        {[
          ["Role", "B.Tech AI & Data Science Student"],
          ["Institution", "Anand Institute of Higher Technology"],
          ["Location", "Mamallapuram – 603104, Tamil Nadu, India"],
          ["Phone", "+91 9600784369"],
          ["Email", "pandianlogesh795@gmail.com"],
          ["Status", "✅ Available for Internships & Opportunities"],
          ["Languages", "Tamil (Native) | English (Professional)"],
        ].map(([key, val]) => (
          <div key={key} className="flex gap-3">
            <span className="text-cyber-cyan w-28 shrink-0 text-xs">{key}:</span>
            <span className="text-gray-200 text-xs">{val}</span>
          </div>
        ))}
      </div>
    </div>
  ),

  skills: () => (
    <div className="space-y-3">
      <div className="text-cyber-cyan font-bold mb-2">Technical Competencies:</div>
      {["Languages & Core", "AI & ML", "Frontend & 3D", "Design & Tools"].map(category => (
        <div key={category}>
          <div className="text-cyber-neon text-xs font-mono mb-1.5">[ {category} ]</div>
          <div className="flex flex-wrap gap-2 ml-2">
            {SKILLS.filter(s => s.category === category).map(s => (
              <span key={s.name} className="text-xs border border-cyber-cyan/30 rounded px-2 py-0.5 text-gray-200 font-mono">
                {s.name} <span className="text-cyber-cyan">{s.level}%</span>
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),

  projects: () => (
    <div className="space-y-3">
      <div className="text-cyber-cyan font-bold mb-2">Flagship Projects:</div>
      {PROJECTS.map((p, i) => (
        <div key={p.id} className="border-l-2 border-cyber-cyan/30 pl-3">
          <div className="text-white text-sm font-bold">{String(i + 1).padStart(2, "0")} {p.title}</div>
          <div className="text-cyber-neon text-[10px] font-mono">{p.subtitle}</div>
          <div className="text-gray-400 text-xs mt-0.5">{p.description}</div>
          <div className="flex flex-wrap gap-1 mt-1">
            {p.tags.slice(0, 3).map(tag => (
              <span key={tag} className="text-[9px] text-cyan-300/70 font-mono">[{tag}]</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),

  education: () => (
    <div className="space-y-2">
      <div className="text-white font-bold">Academic Background:</div>
      <div className="border border-cyber-cyan/20 rounded-lg p-3 bg-cyber-cyan/5">
        <div className="text-cyber-neon font-mono text-sm">Anand Institute of Higher Technology</div>
        <div className="text-white text-xs mt-1">B.Tech — Artificial Intelligence & Data Science</div>
        <div className="text-gray-400 text-xs font-mono mt-1">📅 January 2024 – December 2028</div>
        <div className="text-gray-400 text-xs font-mono">📍 Kazhipattur, Chengalpattu, Tamil Nadu</div>
        <div className="text-gray-300 text-xs mt-2">
          Currently pursuing (3rd Year). Focus: ML algorithms, neural networks, C/C++ computation, data science.
        </div>
      </div>
    </div>
  ),

  experience: () => (
    <div className="space-y-2">
      <div className="text-white font-bold">Professional Experience:</div>
      <div className="border border-cyber-blue/20 rounded-lg p-3 bg-cyber-blue/5">
        <div className="text-cyber-cyan font-mono text-sm">Independent Writing & Editing Professional</div>
        <div className="text-gray-400 text-xs font-mono mt-1">📅 December 2021 – December 2025 (4 years 1 month)</div>
        <div className="text-gray-400 text-xs font-mono">🌐 Remote / Mamallapuram, India</div>
        <div className="text-gray-300 text-xs mt-2">
          Technical documentation, creative editorial, digital communication strategy for diverse clients.
        </div>
      </div>
    </div>
  ),

  contact: () => (
    <div className="space-y-1.5">
      <div className="text-cyber-cyan font-bold mb-2">Contact Coordinates:</div>
      {[
        ["📧 Email", "pandianlogesh795@gmail.com"],
        ["📱 Phone", "+91 9600784369"],
        ["💼 LinkedIn", "linkedin.com/in/logesh-p-6297a639a"],
        ["🔗 GitHub", "github.com/pandianlogesh795-bot"],
        ["📍 Location", "No.50, Ambedkar Street, Mamallapuram – 603104"],
      ].map(([label, value]) => (
        <div key={label} className="flex gap-3 text-xs">
          <span className="text-cyber-neon w-24 shrink-0 font-mono">{label}</span>
          <span className="text-gray-200">{value}</span>
        </div>
      ))}
    </div>
  ),

  achievements: () => (
    <div className="space-y-2">
      <div className="text-cyber-cyan font-bold mb-2">Sports & Academic Achievements:</div>
      {[
        "🏃 District Winner — 100m Athletics",
        "🏅 Represented at Kho Kho Zonal Meet",
        "🏅 State Kho Kho Match — Punjab",
        "🏐 Participated in Volleyball Zonal Tournament",
        "🎮 Participated in E-Sports Competitions",
      ].map((ach, i) => (
        <div key={i} className="flex items-center gap-2 text-xs text-gray-200">
          <ChevronRight className="h-3 w-3 text-cyber-cyan shrink-0" />
          {ach}
        </div>
      ))}
    </div>
  ),

  certifications: () => (
    <div className="space-y-2">
      <div className="text-cyber-cyan font-bold mb-2">Certifications:</div>
      <div className="flex items-center gap-2 text-xs text-gray-200">
        <ChevronRight className="h-3 w-3 text-cyber-cyan" />
        <span className="text-white font-medium">CTC Certificate</span> — C and C++ Programming
      </div>
    </div>
  ),

  "download-resume": () => (
    <div className="space-y-2">
      <div className="text-cyber-neon">Initiating resume download...</div>
      <div className="text-gray-400 text-xs">File: Logesh_P_Resume.pdf</div>
    </div>
  ),

  github: () => "Opening GitHub profile: github.com/pandianlogesh795-bot",
  linkedin: () => "Opening LinkedIn: linkedin.com/in/logesh-p-6297a639a",
  clear: () => "CLEAR",
};

function TypeWriter({ text, onDone }: { text: string; onDone?: () => void }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        onDone?.();
      }
    }, 12);
    return () => clearInterval(interval);
  }, [text, onDone]);

  return <span>{displayed}</span>;
}

export const TerminalSection: React.FC = () => {
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      type: "system",
      id: "boot",
      content: (
        <div className="space-y-1">
          <div className="text-cyber-neon">LOGESH P CYBERNETIC AI TERMINAL v2.0</div>
          <div className="text-gray-500 text-xs">████████████████████████████████</div>
          <div className="text-gray-400 text-xs">System online. Type <span className="text-cyber-cyan">`help`</span> for commands.</div>
        </div>
      ),
    },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isProcessing, setIsProcessing] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const executeCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    const newLines: TerminalLine[] = [
      {
        type: "input",
        id: `input-${Date.now()}`,
        content: cmd,
      },
    ];

    if (trimmed === "clear") {
      setLines([
        {
          type: "system",
          id: `clear-${Date.now()}`,
          content: <div className="text-gray-500 text-xs">Terminal cleared.</div>,
        },
      ]);
      return;
    }

    if (trimmed === "github") {
      window.open(PERSONAL_DATA.github, "_blank");
    }
    if (trimmed === "linkedin") {
      window.open(PERSONAL_DATA.linkedIn, "_blank");
    }
    if (trimmed === "download-resume") {
      const a = document.createElement("a");
      a.href = "/Logesh_P_Resume.pdf";
      a.download = "Logesh_P_Resume.pdf";
      a.click();
    }

    const handler = COMMANDS[trimmed];
    if (handler) {
      const result = handler();
      newLines.push({
        type: "output",
        id: `output-${Date.now()}`,
        content: result,
      });
    } else {
      newLines.push({
        type: "error",
        id: `error-${Date.now()}`,
        content: `Command not found: '${trimmed}'. Type 'help' for available commands.`,
      });
    }

    setLines(prev => [...prev, ...newLines]);
    setHistory(prev => [cmd, ...prev.slice(0, 49)]);
    setHistoryIndex(-1);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const newIndex = Math.min(historyIndex + 1, history.length - 1);
      setHistoryIndex(newIndex);
      setInput(history[newIndex] || "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const newIndex = Math.max(historyIndex - 1, -1);
      setHistoryIndex(newIndex);
      setInput(newIndex === -1 ? "" : history[newIndex]);
    } else if (e.key === "Tab") {
      e.preventDefault();
      const match = Object.keys(COMMANDS).find(cmd => cmd.startsWith(input.toLowerCase()));
      if (match) setInput(match);
    }
  };

  return (
    <section id="terminal" className="relative z-10 py-28 sm:py-36 overflow-hidden">
      <div className="absolute inset-0 cyber-grid-bg opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-cyber-cyan/30 bg-cyber-cyan/10 px-4 py-1.5 text-xs font-mono tracking-widest text-cyber-neon uppercase"
          >
            <Terminal className="h-3.5 w-3.5" /> 05 // CYBERNETIC AI TERMINAL
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-white text-center max-w-4xl"
          >
            Interactive AI Persona CLI
          </motion.h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-xl font-light">
            An embedded cybernetic command-line interface. Type <span className="text-cyber-cyan font-mono">`help`</span> to get started.
          </p>
        </div>

        {/* Terminal Window */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto"
        >
          {/* Title Bar */}
          <div className="flex items-center justify-between rounded-t-2xl border border-b-0 border-cyber-cyan/25 bg-[#0A0F1E] px-5 py-3.5">
            <div className="flex items-center gap-2.5">
              <div className="h-3 w-3 rounded-full bg-red-500/80" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <div className="h-3 w-3 rounded-full bg-green-500/80" />
            </div>
            <div className="font-mono text-xs text-gray-400 flex items-center gap-2">
              <Terminal className="h-3.5 w-3.5 text-cyber-cyan" />
              logesh@ai-terminal ~ v2.0
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-cyber-neon animate-pulse" />
              <span className="font-mono text-[10px] text-cyber-neon">ONLINE</span>
            </div>
          </div>

          {/* Terminal Body */}
          <div
            className="rounded-b-2xl border border-cyber-cyan/25 bg-[#060914]/95 backdrop-blur-xl shadow-[0_0_60px_rgba(0,240,255,0.1)] cursor-text"
            style={{ minHeight: "480px" }}
            onClick={() => inputRef.current?.focus()}
          >
            {/* Scan line overlay */}
            <div className="pointer-events-none absolute inset-0 rounded-b-2xl bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,240,255,0.025)_51%)] bg-[length:100%_4px]" />

            {/* Output Area */}
            <div className="h-[380px] overflow-y-auto p-5 space-y-3 font-mono text-sm">
              {lines.map((line) => (
                <AnimatePresence key={line.id}>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className={
                      line.type === "input"
                        ? "flex items-start gap-2"
                        : line.type === "error"
                        ? "text-red-400 text-xs ml-4"
                        : line.type === "system"
                        ? "text-gray-300"
                        : "text-gray-200 ml-4 text-xs"
                    }
                  >
                    {line.type === "input" && (
                      <>
                        <span className="text-cyber-neon shrink-0">logesh@ai</span>
                        <span className="text-gray-500">:</span>
                        <span className="text-cyber-cyan">~</span>
                        <span className="text-gray-500">$</span>
                        <span className="text-white">{line.content as string}</span>
                      </>
                    )}
                    {line.type !== "input" && (
                      <div className="w-full">{line.content}</div>
                    )}
                  </motion.div>
                </AnimatePresence>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input Line */}
            <div className="flex items-center gap-2 border-t border-cyber-cyan/15 px-5 py-3.5">
              <span className="text-cyber-neon font-mono text-sm shrink-0">logesh@ai</span>
              <span className="text-gray-500 font-mono">:</span>
              <span className="text-cyber-cyan font-mono">~</span>
              <span className="text-gray-500 font-mono">$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent font-mono text-sm text-white outline-none caret-cyber-neon placeholder-gray-600"
                placeholder="type a command..."
                autoComplete="off"
                spellCheck={false}
              />
              <span className="terminal-cursor" />
            </div>
          </div>

          {/* Quick Command Buttons */}
          <div className="flex flex-wrap gap-2 mt-4 justify-center">
            {["help", "whoami", "skills", "projects", "contact", "download-resume"].map((cmd) => (
              <button
                key={cmd}
                onClick={() => {
                  executeCommand(cmd);
                  inputRef.current?.focus();
                }}
                className="font-mono text-xs border border-cyber-cyan/30 bg-cyber-cyan/5 text-cyber-neon/80 px-3 py-1.5 rounded-lg hover:border-cyber-cyan hover:bg-cyber-cyan/15 hover:text-cyber-neon transition-all"
              >
                {cmd}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
