import { describe, it, expect } from "vitest";
import { createToonGradient, getToonGradient } from "./toon-gradient";

describe("createToonGradient", () => {
  it("creates a texture with `steps` pixels of data", () => {
    const texture = createToonGradient(3);
    expect(texture.image.width).toBe(3);
    expect(texture.image.height).toBe(1);
  });

  it("produces monotonically increasing values", () => {
    const texture = createToonGradient(4);
    const data = texture.image.data as Uint8Array;
    for (let i = 1; i < data.length; i += 1) {
      expect(data[i]).toBeGreaterThan(data[i - 1]);
    }
  });

  it("covers the full 0-255 brightness range (approximately)", () => {
    const texture = createToonGradient(5);
    const data = texture.image.data as Uint8Array;
    expect(data[0]).toBeLessThan(80);
    expect(data[data.length - 1]).toBeGreaterThan(180);
  });

  it("supports the extreme case of 2 steps (dark / light)", () => {
    const texture = createToonGradient(2);
    const data = texture.image.data as Uint8Array;
    expect(data.length).toBe(2);
    expect(data[0]).toBeLessThan(data[1]);
  });
});

describe("getToonGradient", () => {
  it("returns the same instance for repeated calls with same steps", () => {
    const a = getToonGradient(3);
    const b = getToonGradient(3);
    expect(a).toBe(b);
  });

  it("creates a fresh instance when steps count changes", () => {
    const a = getToonGradient(3);
    const b = getToonGradient(5);
    expect(a).not.toBe(b);
    expect(b.image.width).toBe(5);
  });
});
