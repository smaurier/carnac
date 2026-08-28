import { useMemo } from "react";
import { Color } from "three";
import { useThree } from "@react-three/fiber";
import { dayNightPresets, type DayPhase } from "../palette";

interface DayNightCycleProps {
  phase: DayPhase;
}

export function DayNightCycle({ phase }: DayNightCycleProps) {
  const preset = dayNightPresets[phase];
  const { scene } = useThree();

  useMemo(() => {
    scene.background = new Color(preset.backgroundColor);
  }, [scene, preset.backgroundColor]);

  return (
    <>
      <ambientLight
        color={preset.ambientColor}
        intensity={preset.ambientIntensity}
      />
      <directionalLight
        color={preset.directionalColor}
        intensity={preset.directionalIntensity}
        position={preset.directionalPosition}
      />
    </>
  );
}
