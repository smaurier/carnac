import { dayNightPresets, type DayPhase } from "../palette";

interface DayNightCycleProps {
  phase: DayPhase;
}

export function DayNightCycle({ phase }: DayNightCycleProps) {
  const preset = dayNightPresets[phase];

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
