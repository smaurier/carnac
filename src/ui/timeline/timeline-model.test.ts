import { describe, it, expect } from "vitest";
import {
  yearToPosition,
  getEpochAtYear,
  defaultCarnacTimeline,
  type Timeline,
} from "./timeline-model";

describe("yearToPosition", () => {
  const simpleTimeline: Timeline = {
    minYear: 0,
    maxYear: 100,
    epochs: [],
  };

  it("returns 0 at minYear", () => {
    expect(yearToPosition(0, simpleTimeline)).toBe(0);
  });

  it("returns 100 at maxYear", () => {
    expect(yearToPosition(100, simpleTimeline)).toBe(100);
  });

  it("returns 50 at midpoint", () => {
    expect(yearToPosition(50, simpleTimeline)).toBe(50);
  });

  it("clamps values below minYear to 0", () => {
    expect(yearToPosition(-10, simpleTimeline)).toBe(0);
  });

  it("clamps values above maxYear to 100", () => {
    expect(yearToPosition(200, simpleTimeline)).toBe(100);
  });

  it("handles negative year ranges (BC dates)", () => {
    const bcTimeline: Timeline = {
      minYear: -1000,
      maxYear: 1000,
      epochs: [],
    };
    expect(yearToPosition(0, bcTimeline)).toBe(50);
    expect(yearToPosition(-500, bcTimeline)).toBe(25);
  });
});

describe("getEpochAtYear", () => {
  const timeline: Timeline = {
    minYear: -10000,
    maxYear: 2000,
    epochs: [
      { id: "a", label: "Epoch A", startYear: -10000 },
      { id: "b", label: "Epoch B", startYear: -5000 },
      { id: "c", label: "Epoch C", startYear: 0 },
    ],
  };

  it("returns the first epoch at minYear", () => {
    expect(getEpochAtYear(-10000, timeline)?.id).toBe("a");
  });

  it("returns the correct epoch within its range", () => {
    expect(getEpochAtYear(-7500, timeline)?.id).toBe("a");
    expect(getEpochAtYear(-2500, timeline)?.id).toBe("b");
    expect(getEpochAtYear(500, timeline)?.id).toBe("c");
  });

  it("returns the last epoch after all startYears", () => {
    expect(getEpochAtYear(1999, timeline)?.id).toBe("c");
  });

  it("clamps years outside the timeline range", () => {
    expect(getEpochAtYear(-99999, timeline)?.id).toBe("a");
    expect(getEpochAtYear(99999, timeline)?.id).toBe("c");
  });

  it("returns null when the timeline has no epochs", () => {
    const empty: Timeline = { minYear: 0, maxYear: 100, epochs: [] };
    expect(getEpochAtYear(50, empty)).toBeNull();
  });
});

describe("defaultCarnacTimeline", () => {
  it("contains all expected epochs in chronological order", () => {
    const ids = defaultCarnacTimeline.epochs.map((e) => e.id);
    expect(ids).toEqual([
      "paleo",
      "meso",
      "neo-early",
      "neo-mid",
      "bronze",
      "iron",
      "roman",
      "medieval",
      "modern",
      "today",
    ]);
  });

  it("spans from deep Paleolithic to today", () => {
    expect(defaultCarnacTimeline.minYear).toBeLessThanOrEqual(-30000);
    expect(defaultCarnacTimeline.maxYear).toBeGreaterThanOrEqual(2026);
  });

  it("places Néolithique moyen at 4500 BC (game start)", () => {
    const neoMid = defaultCarnacTimeline.epochs.find((e) => e.id === "neo-mid");
    expect(neoMid?.startYear).toBe(-4500);
  });

  it("locates the game start cursor between 80% and 90%", () => {
    const gameStartYear = -4500;
    const position = yearToPosition(gameStartYear, defaultCarnacTimeline);
    expect(position).toBeGreaterThan(80);
    expect(position).toBeLessThan(90);
  });

  it("ensures epochs are strictly ordered by startYear", () => {
    const years = defaultCarnacTimeline.epochs.map((e) => e.startYear);
    const sorted = [...years].sort((a, b) => a - b);
    expect(years).toEqual(sorted);
  });
});
