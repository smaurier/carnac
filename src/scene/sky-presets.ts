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
    bottomColor: palette.neutrals.granitDark,
    exponent: 0.7,
  },
  noon: {
    topColor: palette.cool.haloBlue,
    horizonColor: palette.neutrals.boneWhite,
    bottomColor: palette.neutrals.granitLight,
    exponent: 0.85,
  },
  dusk: {
    topColor: palette.warm.ochreDeep,
    horizonColor: palette.warm.fire,
    bottomColor: palette.neutrals.charcoal,
    exponent: 0.6,
  },
  night: {
    topColor: palette.cool.deepBlue,
    horizonColor: palette.cool.nightBlue,
    bottomColor: palette.cool.deepBlue,
    exponent: 1,
  },
};

export function skyPresetFor(phase: DayPhase): SkyPreset {
  return presets[phase];
}
