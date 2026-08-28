import styles from "./EndScreen.module.css";

interface EndScreenProps {
  onRestart: () => void;
}

interface MenhirShape {
  readonly width: number;
  readonly height: number;
  readonly radiusTop: number;
}

const menhirs: readonly MenhirShape[] = [
  { width: 26, height: 58, radiusTop: 12 },
  { width: 30, height: 84, radiusTop: 13 },
  { width: 34, height: 104, radiusTop: 15 },
  { width: 29, height: 78, radiusTop: 12 },
  { width: 25, height: 52, radiusTop: 11 },
];

export function EndScreen({ onRestart }: EndScreenProps) {
  return (
    <div
      className={styles.screen}
      role="region"
      aria-label="Ecran final"
    >
      <p className={styles.text}>
        Les pierres sont restees.
        <br />
        Nous aussi.
      </p>

      <button
        type="button"
        className={styles.restart}
        onClick={onRestart}
      >
        revenir a la frise
      </button>

      <div className={styles.menhirs} aria-hidden="true">
        {menhirs.map((m, index) => (
          <div
            key={index}
            className={styles.menhir}
            style={{
              width: `${m.width}px`,
              height: `${m.height}px`,
              borderRadius: `${m.radiusTop}px ${m.radiusTop - 2}px 0 0`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
