import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Scene } from "./scene/Scene";
import { Timeline } from "./ui/timeline/Timeline";
import { defaultCarnacTimeline } from "./ui/timeline/timeline-model";
import { TitleScreen } from "./ui/title/TitleScreen";
import { useNarrativeState } from "./narrative/useNarrativeState";
import type { DayPhase } from "./palette";

const phaseOrder: DayPhase[] = ["dawn", "noon", "dusk", "night"];
const GAME_START_YEAR = -4500;

export function App() {
  const { state, dispatch } = useNarrativeState();
  const [phase, setPhase] = useState<DayPhase>("dusk");
  const [showTimeline, setShowTimeline] = useState(true);

  const isInGame = state !== "title" && state !== "end";
  const isInterlude = state === "interlude1" || state === "interlude2";

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

      {isInterlude && (
        <div className="interlude-overlay">
          <div className="interlude-text">
            {state === "interlude1"
              ? "Un jour, comme les autres."
              : "L'etoile, encore."}
          </div>
          <div className="interlude-hint">appuyez sur N pour continuer</div>
        </div>
      )}

      {state === "title" && (
        <TitleScreen onStart={() => dispatch("start")} />
      )}

      {state === "end" && (
        <div className="end-overlay">
          <div className="end-text">
            Les pierres sont restees.<br />Nous aussi.
          </div>
          <button
            type="button"
            className="end-restart"
            onClick={() => dispatch("restart")}
          >
            revenir a la frise
          </button>
        </div>
      )}
    </>
  );
}
