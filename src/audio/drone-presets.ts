import type { NarrativeState } from "../narrative/narrative-state";

export interface DronePreset {
  readonly freqs: readonly number[];
  readonly volume: number;
}

const SILENCE: DronePreset = { freqs: [], volume: 0 };

const presets: Record<NarrativeState, DronePreset> = {
  title: SILENCE,
  act1: {
    freqs: [55, 82.4, 110],
    volume: 0.12,
  },
  interlude1: {
    freqs: [65.4, 130.8, 261.6],
    volume: 0.09,
  },
  act2: {
    freqs: [49, 73.4, 98, 146.8],
    volume: 0.15,
  },
  interlude2: {
    freqs: [61.7, 123.5, 246.9, 494],
    volume: 0.1,
  },
  act3: {
    freqs: [55, 82.4, 110, 220, 329.6],
    volume: 0.16,
  },
  epilogue: {
    freqs: [65.4, 130.8, 196, 392],
    volume: 0.14,
  },
  end: {
    freqs: [55, 110, 165, 220, 330],
    volume: 0.11,
  },
};

export function dronePresetFor(state: NarrativeState): DronePreset {
  return presets[state];
}
