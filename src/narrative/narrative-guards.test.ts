import { describe, it, expect } from "vitest";
import { canPass, type Flags } from "./narrative-guards";

const empty: Flags = {};

describe("canPass", () => {
  it("allows an event that has no guard configured", () => {
    expect(canPass("title", "start", empty)).toBe(true);
    expect(canPass("act1", "advance", empty)).toBe(true);
    expect(canPass("interlude1", "advance", empty)).toBe(true);
  });

  it("blocks act3->advance when 'stone-placed' flag is missing", () => {
    expect(canPass("act3", "advance", empty)).toBe(false);
  });

  it("blocks act3->advance when 'stone-placed' is explicitly false", () => {
    expect(canPass("act3", "advance", { "stone-placed": false })).toBe(false);
  });

  it("allows act3->advance when 'stone-placed' is true", () => {
    expect(canPass("act3", "advance", { "stone-placed": true })).toBe(true);
  });

  it("ignores unrelated flags", () => {
    expect(canPass("act3", "advance", { other: true })).toBe(false);
    expect(canPass("act1", "advance", { other: true, "stone-placed": true })).toBe(true);
  });
});
