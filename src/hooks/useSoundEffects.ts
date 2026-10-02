"use client";

import { useCallback } from "react";
import { soundEngine } from "@/lib/audio";

export function useSoundEffects() {
  const playHover = useCallback(() => {
    soundEngine.playHover?.();
  }, []);

  const playClick = useCallback(() => {
    soundEngine.playClick?.();
  }, []);

  const playWarp = useCallback(() => {
    soundEngine.playWarp?.();
  }, []);

  const toggleAmbient = useCallback(() => {
    return soundEngine.toggleAmbient?.() ?? false;
  }, []);

  return { playHover, playClick, playWarp, toggleAmbient };
}
