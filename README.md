# 🌌 Logesh P — 3D Immersive Cinematic Portfolio

An award-winning Awwwards-inspired 3D personal portfolio engineered for **Logesh P** (B.Tech AI & Data Science Student at Anand Institute of Higher Technology, Full-Stack Developer, and UI/UX Designer).

Built with **Next.js 15 (App Router)**, **React Three Fiber**, **Three.js**, **GSAP ScrollTrigger**, **Framer Motion**, **Lenis Smooth Scroll**, and **Tailwind CSS**.

---

## ⚡ Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/) + TypeScript
- **3D & WebGL**: [Three.js](https://threejs.org/) + [@react-three/fiber](https://r3f.docs.pmnd.rs/) + [@react-three/drei](https://github.com/pmndrs/drei)
- **Animation & Motion**: [GSAP](https://gsap.com/) (ScrollTrigger) + [Framer Motion](https://www.framer.com/motion/)
- **Smooth Inertial Scrolling**: [Lenis](https://lenis.darkroom.engineering/) (synced with GSAP Ticker)
- **Sound Design**: Procedural Web Audio API sound generator (no external audio files needed)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + Glassmorphism & Cyber Glow Tokens
- **Icons & Visuals**: [Lucide React](https://lucide.dev/) + Canvas Confetti

---

## 🚀 Key Features

1. **3D Preloader**: 0→100% asset loading sequence with rotating wireframe icosahedron and warp particle burst.
2. **Cinematic Hero**: Fullscreen 3D canvas featuring 2,200 interactive cursor-repelling particles, glowing mesh distort torus knot, oversized kinetic typography (**LOGESH P**), and 3D floating photo standee with cyan/electric blue rim light.
3. **Holographic Dossier (About)**: 3D-tilted card with portrait, detailed engineering bio, and animated stats counters.
4. **The Creative Universe (Skills)**: Draggable, auto-orbiting 3D celestial sphere of skill nodes (Python, C, C++, JS, React, Three.js, ML, Data Science, Figma, Photoshop, etc.) with holographic radar rings + categorized matrix grid.
5. **3D Orbital Timeline (Education & Experience)**: Receding 3D spatial orbit with glowing laser connector line tracking academic progression at Anand Institute of Higher Technology and 4+ years of professional writing and editing.
6. **3D Curved Slide Deck (Showpiece Projects)**: Horizontal curved 3D project carousel with momentum dragging, keyboard arrow support, ripple shaders, and fullscreen 3D case study modal dialogs.
7. **Cybernetic AI Terminal (Interactive CLI)**: Embedded hacker terminal with command parser (`help`, `whoami`, `skills`, `projects`, `education`, `experience`, `contact`, `download-resume`, `achievements`, `certifications`), history navigation, and tab completion.
8. **3D Resume Hub**: 3D flip-open book interaction with embedded document reader for `Logesh_P_Resume.pdf`, zoom controls, tabbed overview, and instant Download button.
9. **Transmission Matrix (Contact)**: 3D glass form, interactive 3D particle globe, and direct social links (LinkedIn, GitHub, Mobile, Email).
10. **Global Interactive System**: Blended magnetic spring cursor, procedural sci-fi audio sound effects, and dark mode styling.

---

## 📦 Project Structure

```
ps profile/
├── public/
│   ├── profile.png            # Transparent cutout of Logesh P
│   ├── profile.jpg            # Original portrait of Logesh P
│   └── Logesh_P_Resume.pdf    # Official Resume PDF
├── src/
│   ├── app/
│   │   ├── api/contact/       # Message submission API route
│   │   ├── globals.css        # Cyber tokens, glassmorphism, keyframes
│   │   ├── layout.tsx         # Google fonts, SEO OpenGraph, JSON-LD Person schema
│   │   └── page.tsx           # Main coordinator page
│   ├── components/
│   │   ├── layout/            # Navbar, Footer, CustomCursor, Preloader
│   │   ├── sections/          # Hero, About, Skills, Timeline, Projects, Terminal, Resume, Contact
│   │   ├── three/             # R3F scenes: HeroCanvas, SkillsSphereCanvas, TimelineCanvas, GlobeCanvas, BackgroundMesh
│   │   └── ui/                # TiltCard, MagneticButton, KineticText, ProjectModal, AudioController
│   ├── data/
│   │   └── content.ts         # Centralized data file (Edit all content here!)
│   ├── hooks/                 # useMagnetic, useTilt, useSoundEffects, useScrollProgress
│   └── lib/                   # utils.ts, audio.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── vercel.json
```

---

## 🛠️ Getting Started

### 1. Install Dependencies
```bash
npm install --legacy-peer-deps
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
npm run start
```

---

## ✏️ How to Customize

All website information, projects, skills, timeline events, and links are centralized in a single file:
👉 **`src/data/content.ts`**

- **Change Personal Details / Contact**: Update `PERSONAL_DATA` object.
- **Add / Modify Projects**: Update the `PROJECTS` array.
- **Update Skills & Proficiency Levels**: Modify the `SKILLS` array.
- **Update Timeline Milestones**: Modify the `TIMELINE` array.
- **Replace Images / PDF**: Drop updated files with the same names into `/public/`.

---

## 🌐 Deploying to Vercel

1. Push your repository to GitHub (`https://github.com/pandianlogesh795-bot/logesh-cinematic-3d-portfolio`).
2. Import the repository into [Vercel](https://vercel.com).
3. The included `vercel.json` will automatically configure the build command and legacy peer dependencies flag.
4. Click **Deploy**!
