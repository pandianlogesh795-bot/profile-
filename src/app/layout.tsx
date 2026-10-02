import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { PERSONAL_DATA } from "@/data/content";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://logesh-portfolio.vercel.app"),
  title: "Logesh P — 3D Immersive Portfolio | AI & Data Science Specialist",
  description:
    "Official 3D immersive portfolio of Logesh P. B.Tech Artificial Intelligence & Data Science student at Anand Institute of Higher Technology, Full-Stack Web Developer, and Creative 3D Designer.",
  keywords: [
    "Logesh P",
    "Logesh Portfolio",
    "AI & Data Science",
    "Three.js Portfolio",
    "React Three Fiber",
    "Creative Developer",
    "Next.js 15",
    "Python Developer",
    "Machine Learning Engineer",
    "Mamallapuram",
    "Anand Institute of Higher Technology"
  ],
  authors: [{ name: "Logesh P", url: PERSONAL_DATA.linkedIn }],
  creator: "Logesh P",
  openGraph: {
    title: "Logesh P — 3D Immersive Portfolio | AI & Data Science Specialist",
    description:
      "Explore the interactive 3D universe of Logesh P — B.Tech AI & DS student, Full-Stack Developer, and Creative 3D Web Designer.",
    url: "https://logesh-portfolio.vercel.app",
    siteName: "Logesh P 3D Portfolio",
    images: [
      {
        url: "/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Logesh P — AI & Data Science Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Logesh P — 3D Immersive Portfolio",
    description:
      "B.Tech AI & Data Science student, Full-Stack Developer, and Creative 3D Designer.",
    images: ["/profile.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PERSONAL_DATA.name,
    jobTitle: "Artificial Intelligence & Data Science Specialist",
    description: PERSONAL_DATA.bio,
    url: "https://logesh-portfolio.vercel.app",
    sameAs: [
      PERSONAL_DATA.linkedIn,
      PERSONAL_DATA.github,
    ],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Anand Institute of Higher Technology",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "No. 50, Ambedkar Street",
      addressLocality: "Mamallapuram",
      postalCode: "603104",
      addressRegion: "Tamil Nadu",
      addressCountry: "India",
    },
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} dark`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased bg-[#040508] text-slate-100 selection:bg-cyan-400 selection:text-black">
        {children}
      </body>
    </html>
  );
}
