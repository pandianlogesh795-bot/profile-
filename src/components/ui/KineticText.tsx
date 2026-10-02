"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface KineticTextProps extends Omit<HTMLMotionProps<"div">, "children"> {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
}

export const KineticText: React.FC<KineticTextProps> = ({
  text,
  className,
  delay = 0,
  stagger = 0.025,
  as: Component = "span",
  ...props
}) => {
  const letters = Array.from(text);

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay * i,
      },
    }),
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 40,
      rotateX: 90,
      filter: "blur(8px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring" as const,
        damping: 14,
        stiffness: 120,
      },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={cn("inline-flex flex-wrap [perspective:1000px]", className)}
      {...props}
    >
      {letters.map((char, index) => (
        <motion.span
          key={index}
          variants={child}
          className="inline-block [transform-style:preserve-3d] will-change-transform"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
};
