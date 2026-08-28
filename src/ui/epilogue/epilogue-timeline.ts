import type { FresqueVariant } from "../fresque/Fresque";

export interface EpilogueEntry {
  readonly id: string;
  readonly year: number;
  readonly title: string;
  readonly variant: FresqueVariant;
  readonly durationMs: number;
}

export const defaultEpilogueSequence: readonly EpilogueEntry[] = [
  {
    id: "first-stone",
    year: -4500,
    title: "La premiere pierre",
    variant: "first-stone",
    durationMs: 4200,
  },
  {
    id: "alignment-forms",
    year: -3500,
    title: "L'alignement s'etend, pierre apres pierre",
    variant: "encounter",
    durationMs: 3600,
  },
  {
    id: "bronze-age",
    year: -1800,
    title: "L'age du bronze passe. Les pierres restent.",
    variant: "death",
    durationMs: 3600,
  },
  {
    id: "celts-arrive",
    year: -400,
    title: "Les Celtes trouvent les pierres deja debout",
    variant: "encounter",
    durationMs: 4000,
  },
  {
    id: "romans",
    year: 100,
    title: "Rome passe. Les pierres restent.",
    variant: "encounter",
    durationMs: 3400,
  },
  {
    id: "christian-cross",
    year: 900,
    title: "Une croix est gravee sur un dolmen",
    variant: "death",
    durationMs: 3600,
  },
  {
    id: "today",
    year: 2026,
    title: "Aujourd'hui, nous les regardons encore",
    variant: "first-stone",
    durationMs: 4800,
  },
];

export function totalDurationMs(
  sequence: readonly EpilogueEntry[],
): number {
  return sequence.reduce((sum, entry) => sum + entry.durationMs, 0);
}

export function entryAt(
  sequence: readonly EpilogueEntry[],
  index: number,
): EpilogueEntry | null {
  if (index < 0 || index >= sequence.length) return null;
  return sequence[index];
}
