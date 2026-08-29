export const outlineThickness = {
  xs: 0.035,
  sm: 0.04,
  md: 0.045,
  lg: 0.05,
  xl: 0.06,
} as const;

export type OutlineThickness = typeof outlineThickness[keyof typeof outlineThickness];
