import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Scene } from "./scene/Scene";
import { Timeline } from "./ui/timeline/Timeline";
import { defaultCarnacTimeline } from "./ui/timeline/timeline-model";
import { TitleScreen } from "./ui/title/TitleScreen";
import { Interlude } from "./ui/interlude/Interlude";
import { EndScreen } from "./ui/end/EndScreen";
import { Fresque, type FresqueVariant } from "./ui/fresque/Fresque";
import { useNarrativeState } from "./narrative/useNarrativeState";
import type { NarrativeState } from "./narrative/narrative-state";
import type { DayPhase } from "./palette";

const phaseOrder: DayPhase[] = ["dawn", "noon", "dusk", "night"];
const GAME_START_YEAR = -4500;

const interludeTexts: Record<NarrativeState, string | undefined> = {
  title: undefined,
  act1: undefined,
  interlude1: "Un jour, comme les autres.",
  act2: undefined,
  interlude2: "L'etoile, encore.",
  act3: undefined,
  epilogue: undefined,
  end: undefined,
};

interface FresqueEntry {
  readonly title: string;
  readonly variant: FresqueVariant;
  readonly current: number;
  readonly total: number;
}

const fresqueByState: Partial<Record<NarrativeState, FresqueEntry>> = {
  epilogue: {
    title: "La premiere pierre",
    variant: "first-stone",
    current: 1,
    total: 1,
  },
};

export function App() {
  const { state, flags, dispatch, setFlag } = useNarrativeState();
  const [phase, setPhase] = useState<DayPhase>("dusk");
  const [showTimeline, setShowTimeline] = useState(true);

  const isInGame = state === "act1" || state === "act2" || state === "act3";
  const interludeText = interludeTexts[state];
  const fresque = fresqueByState[state];
  const stonePlaced = flags["stone-placed"] === true;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (!isInGame) return;
      if (key === "t") {
        setPhase((current) => {
          const next = (phaseOrder.indexOf(current) + 1) % phaseOrder.length;
          return phaseOrder[next];
        });
      }
      if (key === "f") {
        setShowTimeline((current) => !current);
      }
      if (key === "n") {
        dispatch("advance");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isInGame, dispatch]);

  return (
    <>
      <Canvas dpr={[1, 2]} shadows={false}>
        <Scene
          phase={phase}
          showStandingStone={state === "act3"}
          standingStonePlaced={stonePlaced}
          onPlaceStone={() => setFlag("stone-placed", true)}
          onWitnessArrived={() => setFlag("witness-arrived", true)}
        />
      </Canvas>

      {isInGame && showTimeline && (
        <div className="timeline-overlay">
          <Timeline
            timeline={defaultCarnacTimeline}
            cursorYear={GAME_START_YEAR}
          />
        </div>
      )}

      {isInGame && (
        <div className="hud">
          Carnac · {state}
          <small>
            clic pour deplacer Kel · T phase ({phase}) · F frise · N acte suivant
          </small>
        </div>
      )}

      {state === "act3" && !stonePlaced && (
        <div className="act-hint">
          clic sur la pierre pour la poser debout
        </div>
      )}

      {state === "act3" && stonePlaced && !flags["witness-arrived"] && (
        <div className="act-hint">
          Vann approche...
        </div>
      )}

      {state === "act3" && flags["witness-arrived"] && (
        <div className="act-hint">
          la tribu regarde en silence · N pour continuer
        </div>
      )}

      {state === "title" && (
        <TitleScreen onStart={() => dispatch("start")} />
      )}

      {interludeText && (
        <Interlude
          text={interludeText}
          onContinue={() => dispatch("advance")}
        />
      )}

      {fresque && (
        <>
          <Fresque
            title={fresque.title}
            variant={fresque.variant}
            current={fresque.current}
            total={fresque.total}
          />
          <button
            type="button"
            className="fresque-continue"
            onClick={() => dispatch("advance")}
          >
            continuer
          </button>
        </>
      )}

      {state === "end" && (
        <EndScreen onRestart={() => dispatch("restart")} />
      )}
    </>
  );
}
