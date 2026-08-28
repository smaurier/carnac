export interface Epoch {
  readonly id: string;
  readonly label: string;
  readonly startYear: number;
}

export interface Timeline {
  readonly minYear: number;
  readonly maxYear: number;
  readonly epochs: readonly Epoch[];
}

function clampYear(year: number, timeline: Timeline): number {
  return Math.max(timeline.minYear, Math.min(timeline.maxYear, year));
}

export function yearToPosition(year: number, timeline: Timeline): number {
  const clamped = clampYear(year, timeline);
  const range = timeline.maxYear - timeline.minYear;
  return ((clamped - timeline.minYear) / range) * 100;
}

export function getEpochAtYear(year: number, timeline: Timeline): Epoch | null {
  if (timeline.epochs.length === 0) return null;
  const clamped = clampYear(year, timeline);
  let current: Epoch | null = null;
  for (const epoch of timeline.epochs) {
    if (epoch.startYear <= clamped) {
      current = epoch;
    } else {
      break;
    }
  }
  return current ?? timeline.epochs[0];
}

export const defaultCarnacTimeline: Timeline = {
  minYear: -40000,
  maxYear: 2026,
  epochs: [
    { id: "paleo", label: "Paléolithique final", startYear: -40000 },
    { id: "meso", label: "Mésolithique", startYear: -9500 },
    { id: "neo-early", label: "Néolithique ancien", startYear: -5500 },
    { id: "neo-mid", label: "Néolithique moyen", startYear: -4500 },
    { id: "bronze", label: "Âge du Bronze", startYear: -2200 },
    { id: "iron", label: "Âge du Fer", startYear: -800 },
    { id: "roman", label: "Antiquité romaine", startYear: -50 },
    { id: "medieval", label: "Moyen Âge", startYear: 500 },
    { id: "modern", label: "Époque moderne", startYear: 1500 },
    { id: "today", label: "Aujourd'hui", startYear: 2026 },
  ],
};
