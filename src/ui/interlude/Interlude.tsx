import styles from "./Interlude.module.css";

interface InterludeProps {
  text: string;
  onContinue: () => void;
}

export function Interlude({ text, onContinue }: InterludeProps) {
  return (
    <div
      className={styles.interlude}
      role="region"
      aria-label="Interlude"
      aria-live="polite"
    >
      <p className={styles.text}>{text}</p>
      <button
        type="button"
        className={styles.continueButton}
        onClick={onContinue}
      >
        continuer
      </button>
    </div>
  );
}
