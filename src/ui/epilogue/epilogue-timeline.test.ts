import { describe, it, expect } from "vitest";
import {
  defaultEpilogueSequence,
  totalDurationMs,
  entryAt,
  type EpilogueEntry,
} from "./epilogue-timeline";

describe("defaultEpilogueSequence", () => {
  it("contains seven entries from Neolithique moyen to today", () => {
    expect(defaultEpilogueSequence.length).toBe(7);
  });

  it("has entries ordered by year ascending", () => {
    const years = defaultEpilogueSequence.map((e) => e.year);
    const sorted = [...years].sort((a, b) => a - b);
    expect(years).toEqual(sorted);
  });

  it("starts at 4500 BC and ends today", () => {
    expect(defaultEpilogueSequence[0].year).toBe(-4500);
    expect(defaultEpilogueSequence[defaultEpilogueSequence.length - 1].year).toBeGreaterThanOrEqual(2026);
  });

  it("every entry has strictly positive duration", () => {
    for (const entry of defaultEpilogueSequence) {
      expect(entry.durationMs).toBeGreaterThan(0);
    }
  });

  it("mentions the Celts arriving at some point", () => {
    const celts = defaultEpilogueSequence.find((e) =>
      e.title.toLowerCase().includes("celte"),
    );
    expect(celts).toBeDefined();
  });
});

describe("totalDurationMs", () => {
  it("returns 0 for empty sequence", () => {
    expect(totalDurationMs([])).toBe(0);
  });

  it("sums durations", () => {
    const seq: EpilogueEntry[] = [
      { id: "a", year: -4500, title: "A", variant: "first-stone", durationMs: 1000 },
      { id: "b", year: -4000, title: "B", variant: "first-stone", durationMs: 2500 },
      { id: "c", year: 0, title: "C", variant: "encounter", durationMs: 500 },
    ];
    expect(totalDurationMs(seq)).toBe(4000);
  });
});

describe("entryAt", () => {
  it("returns the entry at a valid index", () => {
    expect(entryAt(defaultEpilogueSequence, 0)?.year).toBe(-4500);
  });

  it("returns null for a negative index", () => {
    expect(entryAt(defaultEpilogueSequence, -1)).toBeNull();
  });

  it("returns null when index exceeds sequence length", () => {
    expect(entryAt(defaultEpilogueSequence, 999)).toBeNull();
  });
});
