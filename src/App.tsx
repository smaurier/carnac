import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Scene } from "./scene/Scene";
import type { DayPhase } from "./palette";

const phaseOrder: DayPhase[] = ["dawn", "noon", "dusk", "night"];

export function App() {
  const [phase, setPhase] = useState<DayPhase>("dusk");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() !== "t") return;
      setPhase((current) => {
        const next = (phaseOrder.indexOf(current) + 1) % phaseOrder.length;
        return phaseOrder[next];
      });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <Canvas dpr={[1, 2]} shadows={false}>
        <Scene phase={phase} />
      </Canvas>
      <div className="hud">
        Carnac · proto J1
        <small>clic pour deplacer Kel · touche T pour changer la phase du jour ({phase})</small>
      </div>
    </>
  );
}
