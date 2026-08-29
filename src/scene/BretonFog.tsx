import { useEffect } from "react";
import { Fog } from "three";
import { useThree } from "@react-three/fiber";
import { palette } from "../palette";
import type { DayPhase } from "../palette";

interface BretonFogProps {
  phase: DayPhase;
}

interface FogPreset {
  readonly color: string;
  readonly near: number;
  readonly far: number;
}

const fogPresets: Record<DayPhase, FogPreset> = {
  dawn: {
    color: palette.cool.slateSea,
    near: 42,
    far: 75,
  },
  noon: {
    color: palette.neutrals.granitLight,
    near: 45,
    far: 90,
  },
  dusk: {
    color: palette.cool.slateSea,
    near: 42,
    far: 70,
  },
  night: {
    color: palette.cool.nightBlue,
    near: 40,
    far: 62,
  },
};

export function BretonFog({ phase }: BretonFogProps) {
  const { scene } = useThree();
  const preset = fogPresets[phase];

  useEffect(() => {
    scene.fog = new Fog(preset.color, preset.near, preset.far);
    return () => {
      scene.fog = null;
    };
  }, [scene, preset.color, preset.near, preset.far]);

  return null;
}
