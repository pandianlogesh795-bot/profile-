"use client";

import React, { ReactNode } from "react";
import { useMagnetic } from "@/hooks/useMagnetic";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { cn } from "@/lib/utils";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "cyber" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  target?: string;
  rel?: string;
  download?: boolean | string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className,
  variant = "primary",
  size = "md",
  href,
  onClick,
  target,
  rel,
  download,
  ...props
}) => {
  const buttonRef = useMagnetic<HTMLButtonElement | HTMLAnchorElement>({
    strength: 0.35,
  });
  const { playHover, playClick } = useSoundEffects();

  const baseStyles =
    "relative inline-flex items-center justify-center font-display font-medium rounded-full cursor-pointer select-none transition-all duration-300 active:scale-95 group overflow-hidden";

  const sizeStyles = {
    sm: "px-4 py-2 text-xs gap-2",
    md: "px-6 py-3 text-sm gap-2.5 tracking-wide",
    lg: "px-8 py-4 text-base gap-3 tracking-wider font-semibold",
  }[size];

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-cyber-blue via-cyan-500 to-cyber-neon text-white shadow-[0_0_25px_rgba(10,132,255,0.45)] hover:shadow-[0_0_35px_rgba(0,240,255,0.7)] hover:scale-105 border border-cyan-300/40",
    secondary:
      "bg-white/10 text-white hover:bg-white/20 backdrop-blur-md border border-white/20 hover:border-cyber-cyan/50 shadow-lg",
    cyber:
      "bg-cyber-dark text-cyber-neon border border-cyber-cyan/50 hover:bg-cyber-cyan/15 hover:border-cyber-neon hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]",
    outline:
      "bg-transparent text-white border border-white/30 hover:border-cyber-cyan hover:text-cyber-cyan backdrop-blur-sm",
    ghost:
      "bg-transparent text-gray-300 hover:text-white hover:bg-white/5",
  }[variant];

  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    playClick();
    if (onClick) onClick(e);
  };

  const handleMouseEnter = () => {
    playHover();
  };

  if (href) {
    return (
      <a
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        download={download}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        className={cn(baseStyles, sizeStyles, variantStyles, className)}
        data-cursor-magnetic="true"
      >
        <span className="relative z-10 flex items-center gap-2">{children}</span>
        <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full blur-sm" />
      </a>
    );
  }

  return (
    <button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      className={cn(baseStyles, sizeStyles, variantStyles, className)}
      data-cursor-magnetic="true"
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full blur-sm" />
    </button>
  );
};
