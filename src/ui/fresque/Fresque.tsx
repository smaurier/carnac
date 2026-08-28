import type { ReactNode } from "react";
import styles from "./Fresque.module.css";

export type FresqueVariant = "first-stone" | "encounter" | "death";

interface FresqueProps {
  title: string;
  variant: FresqueVariant;
  current: number;
  total: number;
}

const CHARCOAL = "#2A1E1A";
const OCHRE_DEEP = "#A65F35";
const EARTH_RED = "#8C3E28";
const BONE_WHITE = "#E8DFC8";

function FirstStoneDrawing() {
  return (
    <>
      <polyline
        points="60,300 130,296 200,302 290,297 380,303 470,298 510,301"
        fill="none"
        stroke={CHARCOAL}
        strokeWidth={3}
        strokeLinecap="round"
        opacity={0.75}
      />
      <polyline
        points="90,318 160,322 240,317 330,323 420,318 480,322"
        fill="none"
        stroke={EARTH_RED}
        strokeWidth={2.5}
        strokeLinecap="round"
        opacity={0.55}
      />
      <circle cx={280} cy={138} r={17} fill="none" stroke={CHARCOAL} strokeWidth={3.5} />
      <polyline
        points="280,156 279,205 281,252 278,298"
        fill="none"
        stroke={CHARCOAL}
        strokeWidth={4}
        strokeLinecap="round"
      />
      <polyline
        points="280,178 246,206 231,232"
        fill="none"
        stroke={CHARCOAL}
        strokeWidth={3.5}
        strokeLinecap="round"
      />
      <polyline
        points="280,178 315,200 336,190"
        fill="none"
        stroke={CHARCOAL}
        strokeWidth={3.5}
        strokeLinecap="round"
      />
      <polyline
        points="352,298 353,214 358,182 366,214 365,298"
        fill="none"
        stroke={OCHRE_DEEP}
        strokeWidth={4}
        strokeLinecap="round"
      />
      <line x1={364} y1={86} x2={364} y2={104} stroke={BONE_WHITE} strokeWidth={3} strokeLinecap="round" />
      <line x1={355} y1={95} x2={373} y2={95} stroke={BONE_WHITE} strokeWidth={3} strokeLinecap="round" />
      <line x1={358} y1={89} x2={370} y2={101} stroke={BONE_WHITE} strokeWidth={2} strokeLinecap="round" opacity={0.8} />
      <line x1={370} y1={89} x2={358} y2={101} stroke={BONE_WHITE} strokeWidth={2} strokeLinecap="round" opacity={0.8} />
    </>
  );
}

function EncounterDrawing() {
  return (
    <>
      <polyline
        points="60,310 140,305 220,312 300,307 380,313 460,308 510,311"
        fill="none"
        stroke={CHARCOAL}
        strokeWidth={3}
        strokeLinecap="round"
        opacity={0.7}
      />
      <circle cx={200} cy={150} r={16} fill="none" stroke={CHARCOAL} strokeWidth={3.5} />
      <polyline
        points="200,166 199,220 201,270 198,308"
        fill="none"
        stroke={CHARCOAL}
        strokeWidth={4}
        strokeLinecap="round"
      />
      <polyline
        points="200,188 232,208 258,198"
        fill="none"
        stroke={CHARCOAL}
        strokeWidth={3.5}
        strokeLinecap="round"
      />
      <circle cx={370} cy={150} r={16} fill="none" stroke={EARTH_RED} strokeWidth={3.5} />
      <polyline
        points="370,166 371,220 369,270 372,308"
        fill="none"
        stroke={EARTH_RED}
        strokeWidth={4}
        strokeLinecap="round"
      />
      <polyline
        points="370,188 338,208 312,198"
        fill="none"
        stroke={EARTH_RED}
        strokeWidth={3.5}
        strokeLinecap="round"
      />
      <line x1={258} y1={198} x2={312} y2={198} stroke={OCHRE_DEEP} strokeWidth={2} strokeDasharray="4 6" opacity={0.6} />
    </>
  );
}

function DeathDrawing() {
  return (
    <>
      <polyline
        points="60,310 140,308 220,312 300,309 380,313 460,310 510,312"
        fill="none"
        stroke={CHARCOAL}
        strokeWidth={3}
        strokeLinecap="round"
        opacity={0.7}
      />
      <circle cx={130} cy={230} r={14} fill="none" stroke={CHARCOAL} strokeWidth={3.5} opacity={0.85} />
      <polyline
        points="150,236 220,240 300,235 370,240 435,236"
        fill="none"
        stroke={CHARCOAL}
        strokeWidth={4}
        strokeLinecap="round"
      />
      <polyline
        points="80,268 130,262 200,264 300,258 400,262 480,266"
        fill="none"
        stroke={OCHRE_DEEP}
        strokeWidth={5}
        strokeLinecap="round"
        opacity={0.85}
      />
      <polyline
        points="70,286 160,282 260,286 360,281 460,286"
        fill="none"
        stroke={EARTH_RED}
        strokeWidth={4}
        strokeLinecap="round"
        opacity={0.55}
      />
      <line x1={140} y1={190} x2={140} y2={175} stroke={BONE_WHITE} strokeWidth={2.5} strokeLinecap="round" opacity={0.75} />
      <line x1={200} y1={185} x2={200} y2={170} stroke={BONE_WHITE} strokeWidth={2.5} strokeLinecap="round" opacity={0.75} />
      <line x1={340} y1={190} x2={340} y2={175} stroke={BONE_WHITE} strokeWidth={2.5} strokeLinecap="round" opacity={0.75} />
    </>
  );
}

function renderVariant(variant: FresqueVariant): ReactNode {
  switch (variant) {
    case "first-stone":
      return <FirstStoneDrawing />;
    case "encounter":
      return <EncounterDrawing />;
    case "death":
      return <DeathDrawing />;
  }
}

export function Fresque({ title, variant, current, total }: FresqueProps) {
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
          {renderVariant(variant)}
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
