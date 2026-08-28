import type { NarrativeEvent, NarrativeState } from "./narrative-state";

export type Flags = Readonly<Record<string, boolean>>;

type GuardKey = `${NarrativeState}:${NarrativeEvent}`;
type GuardFn = (flags: Flags) => boolean;

const guards: Partial<Record<GuardKey, GuardFn>> = {
  "act3:advance": (flags) => flags["stone-placed"] === true,
};

export function canPass(
  state: NarrativeState,
  event: NarrativeEvent,
  flags: Flags,
): boolean {
  const guard = guards[`${state}:${event}`];
  return guard ? guard(flags) : true;
}
