import type { Timeline as TimelineData } from "./timeline-model";
import { yearToPosition, getEpochAtYear } from "./timeline-model";
import styles from "./Timeline.module.css";

interface TimelineProps {
  timeline: TimelineData;
  cursorYear: number;
}

function formatYear(year: number): string {
  if (year < 0) return `−${Math.abs(year)}`;
  return `${year}`;
}

export function Timeline({ timeline, cursorYear }: TimelineProps) {
  const cursorPosition = yearToPosition(cursorYear, timeline);
  const activeEpoch = getEpochAtYear(cursorYear, timeline);

  return (
    <div
      className={styles.timeline}
      role="region"
      aria-label="Frise du temps profond"
    >
      <div className={styles.line} />
      {timeline.epochs.map((epoch) => {
        const position = yearToPosition(epoch.startYear, timeline);
        const isActive = activeEpoch?.id === epoch.id;
        return (
          <div
            key={epoch.id}
            className={styles.epoch}
            style={{ left: `${position}%` }}
          >
            <div className={styles.tick} />
            <div
              className={styles.epochLabel}
              data-active={isActive ? "true" : "false"}
            >
              {epoch.label}
            </div>
          </div>
        );
      })}
      <div
        className={styles.cursor}
        style={{ left: `${cursorPosition}%` }}
        data-testid="timeline-cursor"
      >
        <div className={styles.cursorHalo} />
        <div className={styles.cursorDiamond} />
        {activeEpoch && (
          <div className={styles.cursorYear}>
            <span className={styles.cursorYearNumber}>
              {formatYear(cursorYear)}
            </span>
            <span className={styles.cursorYearLabel}>{activeEpoch.label}</span>
          </div>
        )}
      </div>
    </div>
  );
}
