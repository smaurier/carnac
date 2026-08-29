import { describe, it, expect } from "vitest";
import {
  voiceProfileFor,
  voiceIds,
  type VoiceId,
  type VoiceProfile,
} from "./vocalizations";

describe("voiceProfileFor", () => {
  it("returns a profile for each of the four MVP voices", () => {
    for (const id of voiceIds) {
      const profile = voiceProfileFor(id);
      expect(profile).toBeDefined();
      expect(profile.fundamentalHz).toBeGreaterThan(0);
      expect(profile.formantsHz).toHaveLength(3);
      expect(profile.durationMs).toBeGreaterThan(0);
    }
  });

  it("orders fundamentals from Athro (deepest) to Nia (highest)", () => {
    const athro = voiceProfileFor("athro").fundamentalHz;
    const vann = voiceProfileFor("vann").fundamentalHz;
    const kel = voiceProfileFor("kel").fundamentalHz;
    const nia = voiceProfileFor("nia").fundamentalHz;
    expect(athro).toBeLessThan(vann);
    expect(vann).toBeLessThan(kel);
    expect(kel).toBeLessThan(nia);
  });

  it("keeps every fundamental within a plausible human vocal range (80-500 Hz)", () => {
    for (const id of voiceIds) {
      const { fundamentalHz } = voiceProfileFor(id);
      expect(fundamentalHz).toBeGreaterThanOrEqual(80);
      expect(fundamentalHz).toBeLessThanOrEqual(500);
    }
  });

  it("keeps every formant within a plausible speech range (200-4000 Hz)", () => {
    for (const id of voiceIds) {
      const { formantsHz } = voiceProfileFor(id);
      for (const f of formantsHz) {
        expect(f).toBeGreaterThanOrEqual(200);
        expect(f).toBeLessThanOrEqual(4000);
      }
    }
  });

  it("keeps envelope timings coherent (attack + release <= duration)", () => {
    for (const id of voiceIds) {
      const p: VoiceProfile = voiceProfileFor(id);
      expect(p.attackMs).toBeGreaterThanOrEqual(0);
      expect(p.releaseMs).toBeGreaterThanOrEqual(0);
      expect(p.attackMs + p.releaseMs).toBeLessThanOrEqual(p.durationMs + 50);
    }
  });
});

describe("voiceIds", () => {
  it("contains exactly the four MVP characters", () => {
    expect([...voiceIds].sort()).toEqual<VoiceId[]>([
      "athro",
      "kel",
      "nia",
      "vann",
    ]);
  });
});
