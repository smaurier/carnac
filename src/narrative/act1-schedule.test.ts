import { describe, it, expect } from "vitest";
import { act1Schedule, act1TotalMs, beatAt } from "./act1-schedule";

describe("act1Schedule", () => {
  it("starts at dawn with hint", () => {
    expect(act1Schedule[0].atMs).toBe(0);
    expect(act1Schedule[0].phase).toBe("dawn");
    expect(act1Schedule[0].hint).toBeDefined();
  });

  it("moves through dawn -> noon -> dusk in order", () => {
    const phases = act1Schedule.map((b) => b.phase);
    const dawnIdx = phases.indexOf("dawn");
    const noonIdx = phases.indexOf("noon");
    const duskIdx = phases.indexOf("dusk");
    expect(dawnIdx).toBeLessThan(noonIdx);
    expect(noonIdx).toBeLessThan(duskIdx);
  });

  it("timings are strictly increasing", () => {
    for (let i = 1; i < act1Schedule.length; i += 1) {
      expect(act1Schedule[i].atMs).toBeGreaterThan(act1Schedule[i - 1].atMs);
    }
  });

  it("last beat is before act1TotalMs", () => {
    const last = act1Schedule[act1Schedule.length - 1];
    expect(last.atMs).toBeLessThan(act1TotalMs);
  });
});

describe("beatAt", () => {
  it("returns first beat at t=0", () => {
    expect(beatAt(act1Schedule, 0).atMs).toBe(0);
  });

  it("returns first beat before any subsequent beat", () => {
    expect(beatAt(act1Schedule, 500).atMs).toBe(0);
  });

  it("returns the matching beat exactly at its atMs", () => {
    expect(beatAt(act1Schedule, 12000).phase).toBe("noon");
  });

  it("returns the last beat when t exceeds all beats", () => {
    const last = act1Schedule[act1Schedule.length - 1];
    expect(beatAt(act1Schedule, 999999)).toBe(last);
  });
});
