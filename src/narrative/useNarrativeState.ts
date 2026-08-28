import { useCallback, useState } from "react";
import {
  initialNarrativeState,
  transition,
  type NarrativeEvent,
  type NarrativeState,
} from "./narrative-state";

interface UseNarrativeStateOptions {
  readonly initial?: NarrativeState;
}

interface UseNarrativeStateResult {
  readonly state: NarrativeState;
  readonly dispatch: (event: NarrativeEvent) => void;
}

export function useNarrativeState(
  options: UseNarrativeStateOptions = {},
): UseNarrativeStateResult {
  const [state, setState] = useState<NarrativeState>(
    options.initial ?? initialNarrativeState(),
  );

  const dispatch = useCallback((event: NarrativeEvent) => {
    setState((current) => transition(current, event));
  }, []);

  return { state, dispatch };
}
