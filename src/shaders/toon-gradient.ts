import { DataTexture, RedFormat, UnsignedByteType, NearestFilter } from "three";

export function createToonGradient(steps: number): DataTexture {
  const data = new Uint8Array(steps);
  for (let i = 0; i < steps; i += 1) {
    data[i] = Math.round(((i + 0.5) / steps) * 255);
  }
  const texture = new DataTexture(
    data,
    steps,
    1,
    RedFormat,
    UnsignedByteType,
  );
  texture.magFilter = NearestFilter;
  texture.minFilter = NearestFilter;
  texture.generateMipmaps = false;
  texture.needsUpdate = true;
  return texture;
}

let cachedGradient: DataTexture | null = null;
let cachedSteps = 0;

export function getToonGradient(steps: number = 3): DataTexture {
  if (cachedGradient && cachedSteps === steps) return cachedGradient;
  cachedGradient = createToonGradient(steps);
  cachedSteps = steps;
  return cachedGradient;
}
