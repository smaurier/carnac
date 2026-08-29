import { describe, it, expect } from "vitest";
import { skyPresetFor, type SkyPreset } from "./sky-presets";

const phases = ["dawn", "noon", "dusk", "night"] as const;

describe("skyPresetFor", () => {
  it("returns a preset for each of the four day phases", () => {
    for (const phase of phases) {
      const preset: SkyPreset = skyPresetFor(phase);
      expect(preset.topColor).toBeDefined();
      expect(preset.horizonColor).toBeDefined();
      expect(preset.bottomColor).toBeDefined();
      expect(preset.exponent).toBeGreaterThan(0);
    }
  });

  it("uses warm horizon at dawn and dusk, cooler at noon and night", () => {
    const dawnHorizon = skyPresetFor("dawn").horizonColor.toLowerCase();
    const duskHorizon = skyPresetFor("dusk").horizonColor.toLowerCase();
    const nightHorizon = skyPresetFor("night").horizonColor.toLowerCase();
    expect(dawnHorizon).not.toBe(nightHorizon);
    expect(duskHorizon).not.toBe(nightHorizon);
  });

  it("uses very dark top color at night (all channels < 64)", () => {
    const nightTop = skyPresetFor("night").topColor;
    const r = parseInt(nightTop.slice(1, 3), 16);
    const g = parseInt(nightTop.slice(3, 5), 16);
    const b = parseInt(nightTop.slice(5, 7), 16);
    expect(r).toBeLessThan(64);
    expect(g).toBeLessThan(64);
    expect(b).toBeLessThan(64);
  });

  it("uses only hex colors from the design palette", () => {
    const palette = new Set([
      "#2a1e1a",
      "#4a4844",
      "#7c7873",
      "#b5b0a8",
      "#e8dfc8",
      "#c89060",
      "#a65f35",
      "#8c3e28",
      "#e8a952",
      "#f0783c",
      "#3d4a55",
      "#1b2432",
      "#0e1520",
      "#6d8fa8",
    ]);
    for (const phase of phases) {
      const preset = skyPresetFor(phase);
      const colors = [preset.topColor, preset.horizonColor, preset.bottomColor];
      for (const c of colors) {
        expect(palette.has(c.toLowerCase())).toBe(true);
      }
    }
  });
});
