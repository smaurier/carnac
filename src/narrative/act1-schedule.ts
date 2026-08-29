import type { DayPhase } from "../palette";

export interface Act1Beat {
  readonly atMs: number;
  readonly phase: DayPhase;
  readonly hint?: string;
}

export const act1Schedule: readonly Act1Beat[] = [
  { atMs: 0, phase: "dawn", hint: "l'aube se leve sur la lande" },
  { atMs: 6000, phase: "dawn", hint: "athro taille un silex pres du feu" },
  { atMs: 12000, phase: "noon", hint: "le soleil monte, la tribu s'active" },
  { atMs: 22000, phase: "noon", hint: "vann rentre de la mer" },
  { atMs: 30000, phase: "dusk", hint: "le crepuscule tombe sur les pierres" },
  { atMs: 40000, phase: "dusk", hint: "kel s'assied pres du feu" },
] as const;

export const act1TotalMs = 48000;

export function beatAt(schedule: readonly Act1Beat[], ms: number): Act1Beat {
  let current = schedule[0];
  for (const beat of schedule) {
    if (beat.atMs <= ms) current = beat;
    else break;
  }
  return current;
}
