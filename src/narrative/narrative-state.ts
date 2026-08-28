export type NarrativeState =
  | "title"
  | "act1"
  | "interlude1"
  | "act2"
  | "interlude2"
  | "act3"
  | "epilogue"
  | "end";

export type NarrativeEvent = "start" | "advance" | "restart";

const transitionTable: Record<
  NarrativeState,
  Partial<Record<NarrativeEvent, NarrativeState>>
> = {
  title: { start: "act1" },
  act1: { advance: "interlude1" },
  interlude1: { advance: "act2" },
  act2: { advance: "interlude2" },
  interlude2: { advance: "act3" },
  act3: { advance: "epilogue" },
  epilogue: { advance: "end" },
  end: { restart: "title" },
};

export function initialNarrativeState(): NarrativeState {
  return "title";
}

export function transition(
  state: NarrativeState,
  event: NarrativeEvent,
): NarrativeState {
  return transitionTable[state][event] ?? state;
}

export function canTransition(
  state: NarrativeState,
  event: NarrativeEvent,
): boolean {
  return transitionTable[state][event] !== undefined;
}

export function availableEvents(
  state: NarrativeState,
): readonly NarrativeEvent[] {
  return Object.keys(transitionTable[state]) as NarrativeEvent[];
}
