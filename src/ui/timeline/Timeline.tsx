import type { Timeline as TimelineData, Epoch } from "./timeline-model";
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

const DESKTOP_HIDDEN_EPOCH_IDS: readonly string[] = [
  "bronze",
  "roman",
  "medieval",
  "modern",
];

const MOBILE_HIDDEN_EPOCH_IDS: readonly string[] = [
  ...DESKTOP_HIDDEN_EPOCH_IDS,
  "meso",
  "neo-early",
  "iron",
];

function isHiddenOnMobile(epoch: Epoch): boolean {
  return MOBILE_HIDDEN_EPOCH_IDS.includes(epoch.id);
}

function isHiddenOnDesktop(epoch: Epoch): boolean {
  return DESKTOP_HIDDEN_EPOCH_IDS.includes(epoch.id);
}

function labelAlignFor(position: number): "start" | "center" | "end" {
  if (position < 8) return "start";
  if (position > 95) return "end";
  return "center";
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
              data-hide-mobile={isHiddenOnMobile(epoch) ? "true" : "false"}
              data-hide-desktop={isHiddenOnDesktop(epoch) ? "true" : "false"}
              data-align={labelAlignFor(position)}
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
