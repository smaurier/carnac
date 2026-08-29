import { describe, it, expect } from "vitest";
import { dronePresetFor, type DronePreset } from "./drone-presets";

describe("dronePresetFor", () => {
  it("returns silence for the title screen", () => {
    const preset = dronePresetFor("title");
    expect(preset.volume).toBe(0);
    expect(preset.freqs).toEqual([]);
  });

  it("returns a low drone during act1", () => {
    const preset = dronePresetFor("act1");
    expect(preset.volume).toBeGreaterThan(0);
    expect(preset.freqs.length).toBeGreaterThan(0);
    expect(Math.min(...preset.freqs)).toBeLessThan(100);
  });

  it("returns a colder drone for interlude1", () => {
    const preset = dronePresetFor("interlude1");
    expect(preset.freqs.length).toBeGreaterThan(0);
  });

  it("layers additional partials during act3", () => {
    const act1 = dronePresetFor("act1");
    const act3 = dronePresetFor("act3");
    expect(act3.freqs.length).toBeGreaterThanOrEqual(act1.freqs.length);
  });

  it("returns a resolved chord for the end screen", () => {
    const preset = dronePresetFor("end");
    expect(preset.freqs.length).toBeGreaterThan(1);
  });

  it("keeps every preset within safe volume bounds (0-0.35)", () => {
    const states = ["title", "act1", "interlude1", "act2", "interlude2", "act3", "epilogue", "end"] as const;
    for (const state of states) {
      const preset: DronePreset = dronePresetFor(state);
      expect(preset.volume).toBeGreaterThanOrEqual(0);
      expect(preset.volume).toBeLessThanOrEqual(0.35);
    }
  });

  it("keeps every partial within audible-safe range (20-2000 Hz)", () => {
    const states = ["title", "act1", "interlude1", "act2", "interlude2", "act3", "epilogue", "end"] as const;
    for (const state of states) {
      const preset = dronePresetFor(state);
      for (const freq of preset.freqs) {
        expect(freq).toBeGreaterThanOrEqual(20);
        expect(freq).toBeLessThanOrEqual(2000);
      }
    }
  });
});
