"use client";

import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { soundEngine } from "@/lib/audio";
import { useSoundEffects } from "@/hooks/useSoundEffects";

export const AudioController: React.FC = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlayingAmbient, setIsPlayingAmbient] = useState(false);
  const trackRef = useRef<HTMLAudioElement>(null);
  const hasStartedTrackRef = useRef(false);
  const trackRequestPendingRef = useRef(false);
  const { playClick, toggleAmbient } = useSoundEffects();

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const tryPlayTrack = () => {
      if (
        hasStartedTrackRef.current ||
        trackRequestPendingRef.current ||
        track.ended ||
        track.error
      ) {
        return;
      }

      trackRequestPendingRef.current = true;
      void track
        .play()
        .then(() => {
          hasStartedTrackRef.current = true;
        })
        .catch(() => {})
        .finally(() => {
          trackRequestPendingRef.current = false;
        });
    };

    tryPlayTrack();
    document.addEventListener("pointerdown", tryPlayTrack);
    document.addEventListener("keydown", tryPlayTrack);

    return () => {
      document.removeEventListener("pointerdown", tryPlayTrack);
      document.removeEventListener("keydown", tryPlayTrack);
    };
  }, []);

  const handleToggleMute = () => {
    playClick();
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (trackRef.current) trackRef.current.muted = nextMuted;
    soundEngine.setMuted?.(nextMuted);
  };

  const handleToggleAmbient = () => {
    playClick();
    const active = toggleAmbient();
    setIsPlayingAmbient(active);
  };

  return (
    <div className="flex items-center gap-2">
      <audio ref={trackRef} src="/bio%20song.mpeg" preload="auto" loop={false} />

      {/* Ambient Sci-Fi soundtrack / drone toggle */}
      <button
        onClick={handleToggleAmbient}
        className={`relative flex h-9 items-center gap-2 rounded-full border px-3 text-xs font-mono transition-all duration-300 ${
          isPlayingAmbient
            ? "border-cyber-cyan bg-cyber-cyan/20 text-cyber-neon shadow-[0_0_15px_rgba(34,211,238,0.4)]"
            : "border-white/10 bg-white/5 text-gray-400 hover:border-white/30 hover:text-white"
        }`}
        title="Toggle Ambient Soundscape"
      >
        <span className="flex h-2 w-2 relative">
          {isPlayingAmbient && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-cyan opacity-75" />
          )}
          <span
            className={`relative inline-flex rounded-full h-2 w-2 ${
              isPlayingAmbient ? "bg-cyber-cyan" : "bg-gray-500"
            }`}
          />
        </span>
        <span className="hidden sm:inline">
          {isPlayingAmbient ? "CYBER AUDIO: ON" : "AUDIO FX"}
        </span>
      </button>

      {/* Mute toggle button */}
      <button
        onClick={handleToggleMute}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition-all duration-200 hover:border-cyber-cyan hover:bg-cyber-cyan/15 hover:text-white"
        title={isMuted ? "Unmute Audio" : "Mute Audio"}
        aria-label="Toggle Mute"
      >
        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      </button>
    </div>
  );
};
