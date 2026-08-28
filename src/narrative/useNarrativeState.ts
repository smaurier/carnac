import { useCallback, useState } from "react";
import {
  initialNarrativeState,
  transition,
  type NarrativeEvent,
  type NarrativeState,
} from "./narrative-state";
import { canPass, type Flags } from "./narrative-guards";

interface UseNarrativeStateOptions {
  readonly initial?: NarrativeState;
  readonly initialFlags?: Flags;
}

interface UseNarrativeStateResult {
  readonly state: NarrativeState;
  readonly flags: Flags;
  readonly dispatch: (event: NarrativeEvent) => void;
  readonly setFlag: (name: string, value: boolean) => void;
}

export function useNarrativeState(
  options: UseNarrativeStateOptions = {},
): UseNarrativeStateResult {
  const [state, setState] = useState<NarrativeState>(
    options.initial ?? initialNarrativeState(),
  );
  const [flags, setFlags] = useState<Flags>(options.initialFlags ?? {});

  const dispatch = useCallback(
    (event: NarrativeEvent) => {
      setState((current) => {
        if (!canPass(current, event, flags)) return current;
        return transition(current, event);
      });
    },
    [flags],
  );

  const setFlag = useCallback((name: string, value: boolean) => {
    setFlags((current) => ({ ...current, [name]: value }));
  }, []);

  return { state, flags, dispatch, setFlag };
}
