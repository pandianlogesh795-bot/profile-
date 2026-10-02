// Procedural Web Audio API sound designer for sci-fi UI interactions

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private ambientOsc: OscillatorNode | null = null;
  private ambientGain: GainNode | null = null;
  private isAmbientPlaying: boolean = false;

  private initCtx() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted && this.ambientGain && this.ctx) {
      this.ambientGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.1);
    } else if (!muted && this.ambientGain && this.ctx && this.isAmbientPlaying) {
      this.ambientGain.gain.setTargetAtTime(0.04, this.ctx.currentTime, 0.2);
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // Futuristic subtle hover tick
  public playHover() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(580, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch {
      // AudioContext might be blocked until user gesture
    }
  }

  // Crisp digital click
  public playClick() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(1200, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(240, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.09);
    } catch {
      // Ignore
    }
  }

  // Cinematic warp / modal swoosh
  public playWarp() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(110, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, this.ctx.currentTime + 0.25);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(300, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(2400, this.ctx.currentTime + 0.2);

      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.3);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.3);
    } catch {
      // Ignore
    }
  }

  // Cosmic ambient drone toggle
  public toggleAmbient(): boolean {
    this.initCtx();
    if (!this.ctx) return false;

    if (this.isAmbientPlaying) {
      if (this.ambientGain) {
        this.ambientGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.3);
      }
      setTimeout(() => {
        if (this.ambientOsc) {
          try {
            this.ambientOsc.stop();
            this.ambientOsc.disconnect();
          } catch {
            // Already stopped
          }
          this.ambientOsc = null;
        }
      }, 400);
      this.isAmbientPlaying = false;
      return false;
    } else {
      try {
        const osc1 = this.ctx.createOscillator();
        const osc2 = this.ctx.createOscillator();
        const filter = this.ctx.createBiquadFilter();
        const gain = this.ctx.createGain();

        osc1.type = "sine";
        osc1.frequency.setValueAtTime(55, this.ctx.currentTime); // A1 note

        osc2.type = "sine";
        osc2.frequency.setValueAtTime(110.5, this.ctx.currentTime); // A2 slight beat

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(220, this.ctx.currentTime);

        gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(this.isMuted ? 0.0001 : 0.035, this.ctx.currentTime + 1.5);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc1.start();
        osc2.start();

        this.ambientOsc = osc1;
        this.ambientGain = gain;
        this.isAmbientPlaying = true;
        return true;
      } catch {
        return false;
      }
    }
  }

  public isAmbientActive(): boolean {
    return this.isAmbientPlaying;
  }
}

export const soundEngine = typeof window !== "undefined" ? new SoundEngine() : ({} as SoundEngine);
