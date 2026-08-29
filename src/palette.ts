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
  flora: {
    heather: "#8C5B8C",
    heatherPale: "#B87BB8",
    grass: "#8C9260",
    grassDry: "#B5A868",
    gorse: "#F0C868",
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
  rimColor: string;
  rimIntensity: number;
  rimPosition: [number, number, number];
  backgroundColor: string;
}

export const dayNightPresets: Record<DayPhase, LightPreset> = {
  dawn: {
    ambientColor: palette.cool.haloBlue,
    ambientIntensity: 0.45,
    directionalColor: palette.warm.duskGold,
    directionalIntensity: 1.1,
    directionalPosition: [-14, 2.5, 6],
    rimColor: palette.cool.haloBlue,
    rimIntensity: 0.4,
    rimPosition: [12, 4, -8],
    backgroundColor: "#3a4658",
  },
  noon: {
    ambientColor: palette.neutrals.boneWhite,
    ambientIntensity: 0.65,
    directionalColor: palette.neutrals.boneWhite,
    directionalIntensity: 1.05,
    directionalPosition: [4, 12, 4],
    rimColor: palette.cool.haloBlue,
    rimIntensity: 0.25,
    rimPosition: [-8, 6, -10],
    backgroundColor: "#8ca2b2",
  },
  dusk: {
    ambientColor: palette.warm.duskGold,
    ambientIntensity: 0.4,
    directionalColor: palette.warm.fire,
    directionalIntensity: 1.35,
    directionalPosition: [14, 1.8, -4],
    rimColor: palette.warm.duskGold,
    rimIntensity: 0.55,
    rimPosition: [-12, 4, 6],
    backgroundColor: "#c07547",
  },
  night: {
    ambientColor: palette.cool.nightBlue,
    ambientIntensity: 0.3,
    directionalColor: palette.cool.haloBlue,
    directionalIntensity: 0.65,
    directionalPosition: [-6, 4, -8],
    rimColor: palette.cool.haloBlue,
    rimIntensity: 0.35,
    rimPosition: [8, 3, 6],
    backgroundColor: palette.cool.deepBlue,
  },
};
