import type { ReactNode } from "react";

const CHARCOAL = "#2A1E1A";
const OCHRE_DEEP = "#A65F35";
const EARTH_RED = "#8C3E28";
const BONE_WHITE = "#E8DFC8";

export type FresqueVariant =
  | "first-stone"
  | "encounter"
  | "death"
  | "alignment-growing"
  | "celts"
  | "romans"
  | "christian-cross"
  | "today";

function GroundLine() {
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
    </>
  );
}

function Star({ cx, cy }: { cx: number; cy: number }) {
  return (
    <>
      <line x1={cx} y1={cy - 9} x2={cx} y2={cy + 9} stroke={BONE_WHITE} strokeWidth={3} strokeLinecap="round" />
      <line x1={cx - 9} y1={cy} x2={cx + 9} y2={cy} stroke={BONE_WHITE} strokeWidth={3} strokeLinecap="round" />
      <line x1={cx - 6} y1={cy - 6} x2={cx + 6} y2={cy + 6} stroke={BONE_WHITE} strokeWidth={2} strokeLinecap="round" opacity={0.8} />
      <line x1={cx + 6} y1={cy - 6} x2={cx - 6} y2={cy + 6} stroke={BONE_WHITE} strokeWidth={2} strokeLinecap="round" opacity={0.8} />
    </>
  );
}

function Human({ cx, floorY, color = CHARCOAL, scale = 1 }: { cx: number; floorY: number; color?: string; scale?: number }) {
  const headR = 14 * scale;
  const headCy = floorY - 158 * scale;
  const bodyBottom = floorY - 4;
  return (
    <>
      <circle cx={cx} cy={headCy} r={headR} fill="none" stroke={color} strokeWidth={3.5} />
      <polyline
        points={`${cx},${headCy + headR} ${cx - 1},${headCy + 68 * scale} ${cx + 1},${bodyBottom}`}
        fill="none"
        stroke={color}
        strokeWidth={4}
        strokeLinecap="round"
      />
      <polyline
        points={`${cx},${headCy + 40 * scale} ${cx - 34 * scale},${headCy + 68 * scale} ${cx - 49 * scale},${headCy + 94 * scale}`}
        fill="none"
        stroke={color}
        strokeWidth={3.5}
        strokeLinecap="round"
      />
      <polyline
        points={`${cx},${headCy + 40 * scale} ${cx + 35 * scale},${headCy + 62 * scale} ${cx + 56 * scale},${headCy + 52 * scale}`}
        fill="none"
        stroke={color}
        strokeWidth={3.5}
        strokeLinecap="round"
      />
    </>
  );
}

function Menhir({ cx, floorY, height = 116, color = OCHRE_DEEP }: { cx: number; floorY: number; height?: number; color?: string }) {
  return (
    <polyline
      points={`${cx - 6},${floorY - 2} ${cx - 7},${floorY - height / 2} ${cx - 3},${floorY - height} ${cx + 5},${floorY - height / 2} ${cx + 6},${floorY - 2}`}
      fill="none"
      stroke={color}
      strokeWidth={4}
      strokeLinecap="round"
    />
  );
}

export function FirstStoneDrawing(): ReactNode {
  return (
    <>
      <GroundLine />
      <Human cx={280} floorY={298} />
      <Menhir cx={358} floorY={298} height={116} color={OCHRE_DEEP} />
      <Star cx={364} cy={95} />
    </>
  );
}

export function EncounterDrawing(): ReactNode {
  return (
    <>
      <GroundLine />
      <Human cx={200} floorY={308} color={CHARCOAL} />
      <Human cx={370} floorY={308} color={EARTH_RED} />
      <line x1={244} y1={200} x2={326} y2={200} stroke={OCHRE_DEEP} strokeWidth={2} strokeDasharray="4 6" opacity={0.6} />
    </>
  );
}

export function DeathDrawing(): ReactNode {
  return (
    <>
      <GroundLine />
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
      <line x1={140} y1={190} x2={140} y2={175} stroke={BONE_WHITE} strokeWidth={2.5} strokeLinecap="round" opacity={0.75} />
      <line x1={200} y1={185} x2={200} y2={170} stroke={BONE_WHITE} strokeWidth={2.5} strokeLinecap="round" opacity={0.75} />
      <line x1={340} y1={190} x2={340} y2={175} stroke={BONE_WHITE} strokeWidth={2.5} strokeLinecap="round" opacity={0.75} />
    </>
  );
}

export function AlignmentGrowingDrawing(): ReactNode {
  return (
    <>
      <GroundLine />
      <Menhir cx={130} floorY={298} height={100} color={OCHRE_DEEP} />
      <Menhir cx={210} floorY={298} height={92} color={OCHRE_DEEP} />
      <Menhir cx={290} floorY={298} height={110} color={OCHRE_DEEP} />
      <Menhir cx={370} floorY={298} height={84} color={OCHRE_DEEP} />
      <Menhir cx={450} floorY={298} height={72} color={OCHRE_DEEP} />
      <Human cx={490} floorY={298} scale={0.6} color={CHARCOAL} />
    </>
  );
}

export function CeltsDrawing(): ReactNode {
  return (
    <>
      <GroundLine />
      <Menhir cx={140} floorY={298} height={120} color={OCHRE_DEEP} />
      <Human cx={230} floorY={298} color={EARTH_RED} />
      <line x1={252} y1={200} x2={268} y2={130} stroke={CHARCOAL} strokeWidth={4} strokeLinecap="round" />
      <polyline points="264,128 268,120 274,124" fill="none" stroke={CHARCOAL} strokeWidth={3} strokeLinecap="round" />
      <Human cx={320} floorY={298} color={EARTH_RED} scale={0.9} />
      <line x1={343} y1={205} x2={355} y2={148} stroke={CHARCOAL} strokeWidth={4} strokeLinecap="round" />
      <polyline points="352,146 355,138 361,141" fill="none" stroke={CHARCOAL} strokeWidth={3} strokeLinecap="round" />
      <Menhir cx={430} floorY={298} height={104} color={OCHRE_DEEP} />
    </>
  );
}

export function RomansDrawing(): ReactNode {
  return (
    <>
      <GroundLine />
      <Menhir cx={450} floorY={298} height={120} color={OCHRE_DEEP} />
      <rect x={80} y={230} width={16} height={68} fill="none" stroke={CHARCOAL} strokeWidth={3} />
      <rect x={112} y={230} width={16} height={68} fill="none" stroke={CHARCOAL} strokeWidth={3} />
      <rect x={144} y={230} width={16} height={68} fill="none" stroke={CHARCOAL} strokeWidth={3} />
      <rect x={176} y={230} width={16} height={68} fill="none" stroke={CHARCOAL} strokeWidth={3} />
      <line x1={80} y1={218} x2={192} y2={218} stroke={CHARCOAL} strokeWidth={3} strokeLinecap="round" />
      <line x1={80} y1={218} x2={88} y2={205} stroke={CHARCOAL} strokeWidth={2.5} strokeLinecap="round" />
      <line x1={112} y1={218} x2={120} y2={205} stroke={CHARCOAL} strokeWidth={2.5} strokeLinecap="round" />
      <line x1={144} y1={218} x2={152} y2={205} stroke={CHARCOAL} strokeWidth={2.5} strokeLinecap="round" />
      <line x1={176} y1={218} x2={184} y2={205} stroke={CHARCOAL} strokeWidth={2.5} strokeLinecap="round" />
      <polyline points="240,298 250,238 260,238 268,298" fill="none" stroke={EARTH_RED} strokeWidth={3.5} strokeLinecap="round" opacity={0.8} />
    </>
  );
}

export function ChristianCrossDrawing(): ReactNode {
  return (
    <>
      <GroundLine />
      <polyline
        points="180,298 178,190 178,178"
        fill="none"
        stroke={OCHRE_DEEP}
        strokeWidth={7}
        strokeLinecap="round"
      />
      <polyline
        points="380,298 382,190 382,178"
        fill="none"
        stroke={OCHRE_DEEP}
        strokeWidth={7}
        strokeLinecap="round"
      />
      <polyline
        points="160,178 400,168 410,175"
        fill="none"
        stroke={OCHRE_DEEP}
        strokeWidth={7}
        strokeLinecap="round"
      />
      <line x1={280} y1={188} x2={280} y2={158} stroke={CHARCOAL} strokeWidth={4} strokeLinecap="round" />
      <line x1={266} y1={172} x2={294} y2={172} stroke={CHARCOAL} strokeWidth={4} strokeLinecap="round" />
    </>
  );
}

export function TodayDrawing(): ReactNode {
  return (
    <>
      <GroundLine />
      <Menhir cx={200} floorY={298} height={130} color={OCHRE_DEEP} />
      <Human cx={370} floorY={298} color={CHARCOAL} />
      <rect
        x={356}
        y={175}
        width={28}
        height={38}
        fill="none"
        stroke={CHARCOAL}
        strokeWidth={3}
      />
      <circle cx={370} cy={188} r={4} fill={CHARCOAL} />
      <polyline
        points="384,180 400,168 414,170"
        fill="none"
        stroke={BONE_WHITE}
        strokeWidth={2}
        strokeLinecap="round"
        opacity={0.6}
      />
    </>
  );
}

export const drawings: Record<FresqueVariant, () => ReactNode> = {
  "first-stone": FirstStoneDrawing,
  encounter: EncounterDrawing,
  death: DeathDrawing,
  "alignment-growing": AlignmentGrowingDrawing,
  celts: CeltsDrawing,
  romans: RomansDrawing,
  "christian-cross": ChristianCrossDrawing,
  today: TodayDrawing,
};
