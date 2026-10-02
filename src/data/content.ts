export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: "AI & ML" | "Web3D & Creative" | "Data Science" | "Full-Stack";
  description: string;
  longDescription: string;
  image: string;
  accentColor: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  features: string[];
  architecture: string;
  demoUrl: string;
  githubUrl: string;
}

export interface SkillItem {
  name: string;
  level: number; // 0-100
  category: "AI & ML" | "Frontend & 3D" | "Languages & Core" | "Design & Tools";
  color: string;
  iconName: string;
  description: string;
  orbitRadius?: number;
  speed?: number;
}

export interface TimelineItem {
  year: string;
  period: string;
  role: string;
  organization: string;
  location: string;
  description: string;
  highlights: string[];
  badge: string;
  color: string;
}

export const PERSONAL_DATA = {
  name: "Logesh P",
  title: "AI & Data Science Student | Full-Stack Creative Developer",
  tagline: "B.Tech AI & Data Science Student | Python, C & C++, JS | Web Development | UI/UX Design | AI & Data Science",
  bio: "Passionate AI & Data Science undergraduate at Anand Institute of Higher Technology with 4+ years of professional writing and creative editing experience. Bridging the gap between cutting-edge Machine Learning models, spatial 3D web interfaces, and high-impact digital experiences.",
  location: "No. 50, Ambedkar Street, Mamallapuram – 603104, Tamil Nadu, India",
  phone: "+91 96007 84369",
  email: "pandianlogesh795@gmail.com",
  linkedIn: "https://www.linkedin.com/in/logesh-p-6297a639a",
  github: "https://github.com/pandianlogesh795-bot",
  resumePath: "/Logesh_P_Resume.pdf",
  profileImage: "/profile.png",
  profilePhoto: "/profile.jpg",
  roles: [
    "AI & Data Science Specialist",
    "Creative 3D Web Architect",
    "Python & ML Developer",
    "UI/UX & Product Designer"
  ],
  stats: [
    { label: "Years Experience", value: "4+", suffix: "Years" },
    { label: "Core Technologies", value: "12+", suffix: "Techs" },
    { label: "Graduation Target", value: "2028", suffix: "B.Tech" },
    { label: "Engineering Precision", value: "99.9%", suffix: "Score" },
  ],
};

export const SKILLS: SkillItem[] = [
  // Languages & Core
  { name: "Python", level: 95, category: "Languages & Core", color: "#38BDF8", iconName: "Terminal", description: "Deep learning pipelines, scientific data scripting & automation" },
  { name: "C & C++", level: 88, category: "Languages & Core", color: "#818CF8", iconName: "Cpu", description: "Low-level algorithms, data structures & system memory optimization" },
  { name: "JavaScript", level: 92, category: "Languages & Core", color: "#FACC15", iconName: "Code2", description: "Modern ES6+, async architectures & interactive browser applications" },
  { name: "TypeScript", level: 86, category: "Languages & Core", color: "#60A5FA", iconName: "FileCode", description: "Strict type safety, scalable interfaces & enterprise modular code" },
  
  // AI & Data Science
  { name: "Machine Learning", level: 90, category: "AI & ML", color: "#22D3EE", iconName: "BrainCircuit", description: "Supervised/unsupervised models, gradient boosting & pattern recognition" },
  { name: "Data Science & Viz", level: 88, category: "AI & ML", color: "#34D399", iconName: "BarChart3", description: "Pandas, NumPy, Matplotlib, exploratory data mining & insights" },
  { name: "Deep Learning & NLP", level: 82, category: "AI & ML", color: "#A78BFA", iconName: "Sparkles", description: "Neural network architectures, tensor ops & sequence modeling" },
  
  // Frontend & 3D
  { name: "React & Next.js", level: 92, category: "Frontend & 3D", color: "#00F0FF", iconName: "Atom", description: "Server components, App Router, high-speed SSR & reactive state" },
  { name: "Three.js & WebGL", level: 85, category: "Frontend & 3D", color: "#0A84FF", iconName: "Boxes", description: "Spatial 3D scenes, custom shaders, R3F & particle physics" },
  { name: "Tailwind CSS", level: 96, category: "Frontend & 3D", color: "#38BDF8", iconName: "Palette", description: "Modern responsive styling, glassmorphism & fluid micro-interactions" },
  { name: "GSAP & Motion", level: 88, category: "Frontend & 3D", color: "#4ADE80", iconName: "Zap", description: "ScrollTrigger choreography, timeline easing & cinematic stage flow" },
  
  // Design & Tools
  { name: "UI/UX Design", level: 90, category: "Design & Tools", color: "#FB7185", iconName: "Layout", description: "User journey mapping, wireframing, typography & dark-mode aesthetics" },
  { name: "Adobe Photoshop", level: 94, category: "Design & Tools", color: "#38BDF8", iconName: "Image", description: "Digital compositing, lighting retouching, poster graphics & art direction" },
  { name: "Figma", level: 89, category: "Design & Tools", color: "#F43F5E", iconName: "Figma", description: "Design systems, auto-layout tokens & interactive 3D UI prototypes" },
  { name: "Git & GitHub", level: 92, category: "Design & Tools", color: "#FB923C", iconName: "GitBranch", description: "Version control, branch workflows, collaborative CI/CD releases" }
];

export const TIMELINE: TimelineItem[] = [
  {
    year: "2024 – 2028",
    period: "January 2024 – December 2028 (Ongoing)",
    role: "B.Tech — Artificial Intelligence & Data Science",
    organization: "Anand Institute of Higher Technology",
    location: "Chennai / Kazhipattur, Tamil Nadu",
    description: "Rigorous academic curriculum exploring machine learning algorithms, deep neural networks, computational statistics, data structures in C/C++, and advanced AI software architecture.",
    highlights: [
      "Specialized in Artificial Intelligence algorithms & predictive modeling",
      "Building high-performance computation projects in Python and C++",
      "Active research in real-time computer vision and multimodal intelligence"
    ],
    badge: "Education",
    color: "#00F0FF"
  },
  {
    year: "2021 – 2025",
    period: "December 2021 – December 2025 (4 Years 1 Month)",
    role: "Independent Writing & Editing Professional",
    organization: "Freelance & Autonomous Publications",
    location: "Mamallapuram / Remote, India",
    description: "Executed high-standard technical documentation, creative narrative composition, structural editorial refinement, and digital communication strategy for diverse global clients.",
    highlights: [
      "Crafted technical guides, analytical articles, and design documentation",
      "Mastered meticulous attention to detail, narrative pacing & typography",
      "Collaborated remotely with international creators and tech communities"
    ],
    badge: "Professional Experience",
    color: "#0A84FF"
  },
  {
    year: "2024 – Present",
    period: "Continuous Innovation",
    role: "Autonomous 3D & AI Systems Developer",
    organization: "Personal Lab & Open Source",
    location: "GitHub: pandianlogesh795-bot",
    description: "Architecting interactive 3D WebGL experiences, generative AI agent workflows, and reactive web applications combining mathematical physics with modern design aesthetics.",
    highlights: [
      "Developed spatial WebGL and React Three Fiber interactive experiments",
      "Trained custom neural models for computer vision and anomaly detection",
      "Maintains active repository of open-source creative tools and utilities"
    ],
    badge: "Innovation",
    color: "#A855F7"
  }
];

export const PROJECTS: Project[] = [
  {
    id: "medimate",
    title: "MediMate",
    subtitle: "Medication Management & AI Health Assistant",
    category: "Full-Stack",
    description: "A responsive health dashboard for managing medication schedules and stock, receiving dose reminders, and tracking adherence, with an AI health assistant.",
    longDescription: "MediMate helps people organize medication schedules, monitor remaining stock, and review dose history and adherence analytics. It includes configurable reminders with audio and voice alerts, multilingual support, and an AI health assistant with an offline fallback.",
    image: "",
    accentColor: "#22D3EE",
    tags: ["JavaScript", "Node.js", "Express", "Gemini API", "HTML", "CSS"],
    metrics: [
      { label: "Reminders", value: "Voice + audio" },
      { label: "Languages", value: "EN / TA / HI" },
      { label: "AI assistant", value: "Gemini + offline" }
    ],
    features: [
      "Create and manage medication schedules, dosage details, and stock levels",
      "Configurable dose reminders with audio alerts, snooze, and text-to-speech",
      "Medication history and daily, weekly, and monthly adherence analytics",
      "Multilingual interface and Gemini assistant with rule-based offline fallback"
    ],
    architecture: "JavaScript Web App → Node.js / Express API → Gemini Assistant (with offline fallback)",
    demoUrl: "https://medi-mate-olive.vercel.app/",
    githubUrl: "https://github.com/pandianlogesh795-bot/Medi-Mate"
  }
];

export const NAV_LINKS = [
  { name: "Hero", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Timeline", href: "#timeline" },
  { name: "Projects", href: "#projects" },
  { name: "Certificates", href: "#certificates" },
  { name: "Resume", href: "#resume" },
  { name: "Contact", href: "#contact" }
];
