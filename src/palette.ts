export const palette = {
  neutrals: {
    granitLight: "#B5B0A8",
    granitMid: "#7C7873",
    granitDark: "#4A4844",
    charcoal: "#2A1E1A",
    boneWhite: "#E8DFC8",
  },
  warm: {
    ochreWarm: "#C89060",
    ochreDeep: "#A65F35",
    earthRed: "#8C3E28",
    duskGold: "#E8A952",
    fire: "#F0783C",
  },
  cool: {
    slateSea: "#3D4A55",
    nightBlue: "#1B2432",
    deepBlue: "#0E1520",
    haloBlue: "#6D8FA8",
  },
  skin: {
    a: "#8C6650",
    b: "#6B4A38",
    c: "#4E3728",
    d: "#3A2820",
  },
} as const;

export type DayPhase = "dawn" | "noon" | "dusk" | "night";

export interface LightPreset {
  ambientColor: string;
  ambientIntensity: number;
  directionalColor: string;
  directionalIntensity: number;
  directionalPosition: [number, number, number];
  backgroundColor: string;
}

export const dayNightPresets: Record<DayPhase, LightPreset> = {
  dawn: {
    ambientColor: palette.cool.haloBlue,
    ambientIntensity: 0.55,
    directionalColor: palette.warm.duskGold,
    directionalIntensity: 0.9,
    directionalPosition: [-8, 4, 6],
    backgroundColor: "#3a4658",
  },
  noon: {
    ambientColor: palette.neutrals.boneWhite,
    ambientIntensity: 0.7,
    directionalColor: palette.neutrals.boneWhite,
    directionalIntensity: 1.0,
    directionalPosition: [4, 12, 4],
    backgroundColor: "#8ca2b2",
  },
  dusk: {
    ambientColor: palette.warm.duskGold,
    ambientIntensity: 0.6,
    directionalColor: palette.warm.earthRed,
    directionalIntensity: 0.95,
    directionalPosition: [10, 3, -4],
    backgroundColor: "#c07547",
  },
  night: {
    ambientColor: palette.cool.nightBlue,
    ambientIntensity: 0.35,
    directionalColor: palette.cool.haloBlue,
    directionalIntensity: 0.5,
    directionalPosition: [-4, 8, -4],
    backgroundColor: palette.cool.deepBlue,
  },
};
