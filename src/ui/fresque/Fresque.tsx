import styles from "./Fresque.module.css";
import { drawings, type FresqueVariant } from "./drawings";

export type { FresqueVariant };

interface FresqueProps {
  title: string;
  variant: FresqueVariant;
  current: number;
  total: number;
}

export function Fresque({ title, variant, current, total }: FresqueProps) {
  const Drawing = drawings[variant];
  return (
    <div
      className={styles.fresque}
      role="region"
      aria-label="Fresque parietale"
    >
      <div className={styles.canvas}>
        <svg
          viewBox="0 0 560 380"
          className={styles.svg}
          role="img"
          aria-label={title}
          data-variant={variant}
        >
          <Drawing />
        </svg>
      </div>

      <div className={styles.caption}>
        <p className={styles.title}>{title}</p>
        <p className={styles.counter}>
          Fresque · {current} / {total}
        </p>
      </div>
    </div>
  );
}
