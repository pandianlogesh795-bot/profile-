import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

export function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}

export function mapRange(
  val: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((val - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}
