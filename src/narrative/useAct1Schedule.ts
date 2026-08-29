import { useEffect, useRef, useState } from "react";
import type { DayPhase } from "../palette";
import { act1Schedule, act1TotalMs, beatAt } from "./act1-schedule";

interface UseAct1ScheduleOptions {
  readonly active: boolean;
  readonly onPhaseChange: (phase: DayPhase) => void;
  readonly onComplete: () => void;
}

interface UseAct1ScheduleResult {
  readonly hint: string | undefined;
  readonly elapsedMs: number;
}

const TICK_MS = 250;

export function useAct1Schedule({
  active,
  onPhaseChange,
  onComplete,
}: UseAct1ScheduleOptions): UseAct1ScheduleResult {
  const [elapsedMs, setElapsedMs] = useState(0);
  const [hint, setHint] = useState<string | undefined>(
    act1Schedule[0].hint,
  );
  const lastPhaseRef = useRef<DayPhase | null>(null);
  const startRef = useRef<number | null>(null);
  const completedRef = useRef(false);

  useEffect(() => {
    if (!active) {
      startRef.current = null;
      completedRef.current = false;
      setElapsedMs(0);
      return;
    }
    startRef.current = performance.now();
    completedRef.current = false;
    const interval = window.setInterval(() => {
      const start = startRef.current;
      if (start === null) return;
      const now = performance.now();
      const ms = now - start;
      setElapsedMs(ms);
      const beat = beatAt(act1Schedule, ms);
      if (beat.phase !== lastPhaseRef.current) {
        lastPhaseRef.current = beat.phase;
        onPhaseChange(beat.phase);
      }
      setHint(beat.hint);
      if (ms >= act1TotalMs && !completedRef.current) {
        completedRef.current = true;
        onComplete();
      }
    }, TICK_MS);
    return () => window.clearInterval(interval);
  }, [active, onPhaseChange, onComplete]);

  return { hint, elapsedMs };
}
