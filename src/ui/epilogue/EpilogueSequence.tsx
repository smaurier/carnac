import { useEffect, useState } from "react";
import { Fresque } from "../fresque/Fresque";
import { Timeline } from "../timeline/Timeline";
import { defaultCarnacTimeline } from "../timeline/timeline-model";
import {
  defaultEpilogueSequence,
  entryAt,
  type EpilogueEntry,
} from "./epilogue-timeline";
import styles from "./EpilogueSequence.module.css";

interface EpilogueSequenceProps {
  sequence?: readonly EpilogueEntry[];
  onComplete: () => void;
}

export function EpilogueSequence({
  sequence = defaultEpilogueSequence,
  onComplete,
}: EpilogueSequenceProps) {
  const [index, setIndex] = useState(0);
  const current = entryAt(sequence, index);

  useEffect(() => {
    if (!current) {
      onComplete();
      return;
    }
    const timer = window.setTimeout(() => {
      setIndex((i) => i + 1);
    }, current.durationMs);
    return () => window.clearTimeout(timer);
  }, [current, onComplete]);

  if (!current) return null;

  return (
    <div className={styles.epilogue}>
      <div className={styles.stage}>
        <div className={styles.fresqueSlot} key={current.id}>
          <Fresque
            title={current.title}
            variant={current.variant}
            current={index + 1}
            total={sequence.length}
          />
        </div>
      </div>

      <div className={styles.frieze}>
        <Timeline timeline={defaultCarnacTimeline} cursorYear={current.year} />
      </div>

      <button
        type="button"
        className={styles.skip}
        onClick={onComplete}
      >
        passer
      </button>
    </div>
  );
}
