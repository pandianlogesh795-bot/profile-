"use client";

import React, { ReactNode } from "react";
import { useTilt } from "@/hooks/useTilt";
import { cn } from "@/lib/utils";

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  maxRotation?: number;
  perspective?: number;
  scale?: number;
  glare?: boolean;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className,
  maxRotation = 10,
  perspective = 1000,
  scale = 1.02,
  glare = true,
  ...props
}) => {
  const { cardRef, glareRef } = useTilt<HTMLDivElement>({
    maxRotation,
    perspective,
    scale,
    glare,
  });

  return (
    <div
      ref={cardRef}
      className={cn(
        "relative rounded-2xl border border-cyber-border bg-cyber-card/75 backdrop-blur-xl p-6 transition-colors duration-300 overflow-hidden shadow-2xl hover:border-cyber-cyan/40 group",
        className
      )}
      {...props}
    >
      {/* Specular glare overlay */}
      {glare && (
        <div
          ref={glareRef}
          className="pointer-events-none absolute inset-0 z-20 rounded-2xl opacity-0 transition-opacity duration-300"
        />
      )}
      <div className="relative z-10 [transform-style:preserve-3d]">
        {children}
      </div>
    </div>
  );
};
