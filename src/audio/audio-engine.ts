import type { DronePreset } from "./drone-presets";

interface Voice {
  oscillator: OscillatorNode;
  gain: GainNode;
  freq: number;
}

const FADE_TIME_SEC = 0.4;
const DETUNE_CENTS_JITTER = 6;

export class AudioEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private voices: Voice[] = [];
  private muted = false;
  private currentMasterVolume = 0;

  ensureContext(): boolean {
    if (this.ctx) return true;
    const Ctor: typeof AudioContext | undefined =
      typeof window !== "undefined"
        ? (window.AudioContext ??
          (window as unknown as { webkitAudioContext?: typeof AudioContext })
            .webkitAudioContext)
        : undefined;
    if (!Ctor) return false;
    this.ctx = new Ctor();
    this.master = this.ctx.createGain();
    this.master.gain.value = 0;
    this.master.connect(this.ctx.destination);
    return true;
  }

  applyPreset(preset: DronePreset): void {
    if (!this.ensureContext() || !this.ctx || !this.master) return;
    const now = this.ctx.currentTime;

    this.currentMasterVolume = preset.volume;
    const targetMaster = this.muted ? 0 : preset.volume;
    this.master.gain.cancelScheduledValues(now);
    this.master.gain.setValueAtTime(this.master.gain.value, now);
    this.master.gain.linearRampToValueAtTime(targetMaster, now + FADE_TIME_SEC);

    this.stopExtraVoices(preset.freqs.length, now);
    this.reconcileVoices(preset.freqs, now);
  }

  setMuted(muted: boolean): void {
    this.muted = muted;
    if (!this.ctx || !this.master) return;
    const now = this.ctx.currentTime;
    const target = muted ? 0 : this.currentMasterVolume;
    this.master.gain.cancelScheduledValues(now);
    this.master.gain.setValueAtTime(this.master.gain.value, now);
    this.master.gain.linearRampToValueAtTime(target, now + FADE_TIME_SEC);
  }

  isMuted(): boolean {
    return this.muted;
  }

  dispose(): void {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    for (const voice of this.voices) {
      voice.gain.gain.cancelScheduledValues(now);
      voice.gain.gain.linearRampToValueAtTime(0, now + FADE_TIME_SEC);
      voice.oscillator.stop(now + FADE_TIME_SEC + 0.05);
    }
    this.voices = [];
    void this.ctx.close();
    this.ctx = null;
    this.master = null;
  }

  private reconcileVoices(freqs: readonly number[], now: number): void {
    if (!this.ctx || !this.master) return;
    for (let i = 0; i < freqs.length; i += 1) {
      const target = freqs[i];
      const existing = this.voices[i];
      if (existing) {
        existing.oscillator.frequency.cancelScheduledValues(now);
        existing.oscillator.frequency.setValueAtTime(existing.freq, now);
        existing.oscillator.frequency.linearRampToValueAtTime(
          target,
          now + FADE_TIME_SEC,
        );
        existing.freq = target;
      } else {
        this.voices.push(this.createVoice(target, now));
      }
    }
  }

  private stopExtraVoices(keep: number, now: number): void {
    if (!this.ctx || !this.master) return;
    const extras = this.voices.slice(keep);
    for (const voice of extras) {
      voice.gain.gain.cancelScheduledValues(now);
      voice.gain.gain.setValueAtTime(voice.gain.gain.value, now);
      voice.gain.gain.linearRampToValueAtTime(0, now + FADE_TIME_SEC);
      voice.oscillator.stop(now + FADE_TIME_SEC + 0.05);
    }
    this.voices = this.voices.slice(0, keep);
  }

  private createVoice(freq: number, now: number): Voice {
    if (!this.ctx || !this.master) throw new Error("audio context missing");
    const oscillator = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = freq;
    oscillator.detune.value = (Math.random() - 0.5) * DETUNE_CENTS_JITTER * 2;
    gain.gain.value = 0;
    gain.gain.linearRampToValueAtTime(1 / Math.max(1, this.voices.length + 1), now + FADE_TIME_SEC);
    oscillator.connect(gain);
    gain.connect(this.master);
    oscillator.start(now);
    return { oscillator, gain, freq };
  }
}

let sharedEngine: AudioEngine | null = null;

export function getAudioEngine(): AudioEngine {
  if (!sharedEngine) sharedEngine = new AudioEngine();
  return sharedEngine;
}
