import { useEffect } from "react";
import { Fog } from "three";
import { useThree } from "@react-three/fiber";
import { skyPresetFor } from "./sky-presets";
import type { DayPhase } from "../palette";

interface BretonFogProps {
  phase: DayPhase;
}

interface FogPreset {
  readonly near: number;
  readonly far: number;
}

const fogPresets: Record<DayPhase, FogPreset> = {
  dawn: { near: 90, far: 250 },
  noon: { near: 110, far: 280 },
  dusk: { near: 90, far: 240 },
  night: { near: 70, far: 200 },
};

export function BretonFog({ phase }: BretonFogProps) {
  const { scene } = useThree();
  const preset = fogPresets[phase];
  const skyPreset = skyPresetFor(phase);

  useEffect(() => {
    scene.fog = new Fog(skyPreset.horizonColor, preset.near, preset.far);
    return () => {
      scene.fog = null;
    };
  }, [scene, skyPreset.horizonColor, preset.near, preset.far]);

  return null;
}
