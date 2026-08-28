import { Timeline } from "../timeline/Timeline";
import { defaultCarnacTimeline } from "../timeline/timeline-model";
import styles from "./TitleScreen.module.css";

interface TitleScreenProps {
  onStart: () => void;
}

const GAME_START_YEAR = -4500;

export function TitleScreen({ onStart }: TitleScreenProps) {
  return (
    <div className={styles.screen}>
      <div className={styles.header}>
        <h1 className={styles.logo}>carnac</h1>
        <p className={styles.subtitle}>Bretagne · Néolithique moyen</p>
      </div>

      <div className={styles.timelineWrapper}>
        <Timeline
          timeline={defaultCarnacTimeline}
          cursorYear={GAME_START_YEAR}
        />
      </div>

      <div className={styles.footer}>
        <button
          type="button"
          className={styles.startButton}
          onClick={onStart}
        >
          commencer
        </button>
        <div className={styles.startUnderline} />
      </div>
    </div>
  );
}
