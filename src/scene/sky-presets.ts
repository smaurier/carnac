import type { DayPhase } from "../palette";
import { palette } from "../palette";

export interface SkyPreset {
  readonly topColor: string;
  readonly horizonColor: string;
  readonly bottomColor: string;
  readonly exponent: number;
}

const presets: Record<DayPhase, SkyPreset> = {
  dawn: {
    topColor: palette.cool.nightBlue,
    horizonColor: palette.warm.duskGold,
    bottomColor: palette.cool.slateSea,
    exponent: 0.7,
  },
  noon: {
    topColor: palette.cool.haloBlue,
    horizonColor: palette.neutrals.boneWhite,
    bottomColor: palette.cool.slateSea,
    exponent: 0.85,
  },
  dusk: {
    topColor: palette.cool.deepBlue,
    horizonColor: palette.warm.fire,
    bottomColor: palette.cool.slateSea,
    exponent: 0.6,
  },
  night: {
    topColor: palette.cool.deepBlue,
    horizonColor: palette.cool.nightBlue,
    bottomColor: palette.cool.nightBlue,
    exponent: 1,
  },
};

export function skyPresetFor(phase: DayPhase): SkyPreset {
  return presets[phase];
}
