export type VoiceId = "kel" | "athro" | "vann" | "nia";

export interface VoiceProfile {
  readonly fundamentalHz: number;
  readonly formantsHz: readonly [number, number, number];
  readonly durationMs: number;
  readonly attackMs: number;
  readonly releaseMs: number;
}

const profiles: Record<VoiceId, VoiceProfile> = {
  athro: {
    fundamentalHz: 105,
    formantsHz: [530, 1200, 2500],
    durationMs: 520,
    attackMs: 80,
    releaseMs: 320,
  },
  vann: {
    fundamentalHz: 145,
    formantsHz: [660, 1200, 2400],
    durationMs: 320,
    attackMs: 30,
    releaseMs: 180,
  },
  kel: {
    fundamentalHz: 220,
    formantsHz: [740, 1180, 2640],
    durationMs: 380,
    attackMs: 40,
    releaseMs: 200,
  },
  nia: {
    fundamentalHz: 340,
    formantsHz: [820, 1450, 2800],
    durationMs: 220,
    attackMs: 20,
    releaseMs: 120,
  },
};

export const voiceIds: readonly VoiceId[] = ["athro", "vann", "kel", "nia"];

export function voiceProfileFor(id: VoiceId): VoiceProfile {
  return profiles[id];
}
