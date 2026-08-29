import { useEffect } from "react";
import { Color } from "three";
import { useThree } from "@react-three/fiber";
import { palette } from "../palette";
import type { DayPhase } from "../palette";

interface SkyProps {
  phase: DayPhase;
}

const bgColors: Record<DayPhase, string> = {
  dawn: palette.cool.slateSea,
  noon: palette.cool.slateSea,
  dusk: palette.cool.slateSea,
  night: palette.cool.deepBlue,
};

export function Sky({ phase }: SkyProps) {
  const { scene } = useThree();
  useEffect(() => {
    const previous = scene.background;
    scene.background = new Color(bgColors[phase]);
    return () => {
      scene.background = previous;
    };
  }, [scene, phase]);
  return null;
}
