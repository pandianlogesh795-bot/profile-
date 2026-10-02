import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        cyber: {
          dark: "#050508",
          card: "rgba(13, 17, 28, 0.65)",
          border: "rgba(34, 211, 238, 0.15)",
          blue: "#0A84FF",
          cyan: "#22D3EE",
          neon: "#00F0FF",
          purple: "#A855F7",
          crimson: "#FF2A54",
          amber: "#F59E0B"
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-space-grotesk)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      animation: {
        "float-slow": "float 8s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "spin-slow": "spin 25s linear infinite",
        "scanline": "scanline 6s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-15px) rotate(1.5deg)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4", filter: "drop-shadow(0 0 15px rgba(10, 132, 255, 0.4))" },
          "50%": { opacity: "0.85", filter: "drop-shadow(0 0 30px rgba(34, 211, 238, 0.8))" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(1000%)" },
        }
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "cyber-grid": "linear-gradient(to right, rgba(34, 211, 238, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(34, 211, 238, 0.05) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};

export default config;
