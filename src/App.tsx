import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Scene } from "./scene/Scene";
import { Timeline } from "./ui/timeline/Timeline";
import { defaultCarnacTimeline } from "./ui/timeline/timeline-model";
import { TitleScreen } from "./ui/title/TitleScreen";
import type { DayPhase } from "./palette";

type Screen = "title" | "game";

const phaseOrder: DayPhase[] = ["dawn", "noon", "dusk", "night"];
const GAME_START_YEAR = -4500;

export function App() {
  const [screen, setScreen] = useState<Screen>("title");
  const [phase, setPhase] = useState<DayPhase>("dusk");
  const [showTimeline, setShowTimeline] = useState(true);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (screen !== "game") return;
      if (key === "t") {
        setPhase((current) => {
          const next = (phaseOrder.indexOf(current) + 1) % phaseOrder.length;
          return phaseOrder[next];
        });
      }
      if (key === "f") {
        setShowTimeline((current) => !current);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [screen]);

  return (
    <>
      <Canvas dpr={[1, 2]} shadows={false}>
        <Scene phase={phase} />
      </Canvas>

      {screen === "game" && showTimeline && (
        <div className="timeline-overlay">
          <Timeline
            timeline={defaultCarnacTimeline}
            cursorYear={GAME_START_YEAR}
          />
        </div>
      )}

      {screen === "game" && (
        <div className="hud">
          Carnac · proto J1
          <small>
            clic pour deplacer Kel · T pour changer la phase ({phase}) · F pour masquer la frise
          </small>
        </div>
      )}

      {screen === "title" && (
        <TitleScreen onStart={() => setScreen("game")} />
      )}
    </>
  );
}
