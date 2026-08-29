import { useEffect, useMemo } from "react";
import { CanvasTexture, LinearFilter } from "three";
import { useThree } from "@react-three/fiber";
import { skyPresetFor } from "./sky-presets";
import type { DayPhase } from "../palette";

interface SkyProps {
  phase: DayPhase;
}

function createGradientTexture(
  topColor: string,
  horizonColor: string,
  bottomColor: string,
  exponent: number,
): CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 2;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("2d context unavailable");
  const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  const horizonStop = 0.55;
  grad.addColorStop(0, topColor);
  const mid = Math.pow(0.5, exponent);
  grad.addColorStop(Math.max(0.01, horizonStop - mid * 0.35), topColor);
  grad.addColorStop(horizonStop, horizonColor);
  grad.addColorStop(Math.min(0.99, horizonStop + 0.05), horizonColor);
  grad.addColorStop(1, bottomColor);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const texture = new CanvasTexture(canvas);
  texture.minFilter = LinearFilter;
  texture.magFilter = LinearFilter;
  texture.needsUpdate = true;
  return texture;
}

export function Sky({ phase }: SkyProps) {
  const { scene } = useThree();
  const preset = skyPresetFor(phase);

  const texture = useMemo(
    () =>
      createGradientTexture(
        preset.topColor,
        preset.horizonColor,
        preset.bottomColor,
        preset.exponent,
      ),
    [preset.topColor, preset.horizonColor, preset.bottomColor, preset.exponent],
  );

  useEffect(() => {
    scene.background = texture;
    return () => {
      scene.background = null;
    };
  }, [scene, texture]);

  useEffect(() => {
    return () => {
      texture.dispose();
    };
  }, [texture]);

  return null;
}
