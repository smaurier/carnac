import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Scene } from "./scene/Scene";
import { Timeline } from "./ui/timeline/Timeline";
import { defaultCarnacTimeline } from "./ui/timeline/timeline-model";
import { TitleScreen } from "./ui/title/TitleScreen";
import { Interlude } from "./ui/interlude/Interlude";
import { EndScreen } from "./ui/end/EndScreen";
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

export function App() {
  const { state, dispatch } = useNarrativeState();
  const [phase, setPhase] = useState<DayPhase>("dusk");
  const [showTimeline, setShowTimeline] = useState(true);

  const isInGame = state === "act1" || state === "act2" || state === "act3" || state === "epilogue";
  const interludeText = interludeTexts[state];

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
        <Scene phase={phase} />
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

      {state === "title" && (
        <TitleScreen onStart={() => dispatch("start")} />
      )}

      {interludeText && (
        <Interlude
          text={interludeText}
          onContinue={() => dispatch("advance")}
        />
      )}

      {state === "end" && (
        <EndScreen onRestart={() => dispatch("restart")} />
      )}
    </>
  );
}
