import { useState } from "react";
import { IsoCamera } from "./IsoCamera";
import { DayNightCycle } from "./DayNightCycle";
import { Ground } from "./Ground";
import { Player } from "../entities/Player";
import { Firepit } from "../entities/Firepit";
import { palette } from "../palette";
import type { DayPhase } from "../palette";

interface SceneProps {
  phase: DayPhase;
}

export function Scene({ phase }: SceneProps) {
  const [target, setTarget] = useState<[number, number]>([0, 4]);

  return (
    <>
      <IsoCamera target={[0, 0, 0]} zoom={12} azimuthDeg={45} elevationDeg={30} distance={40} />
      <DayNightCycle phase={phase} />

      <Ground onMoveTarget={(x, z) => setTarget([x, z])} />

      <Firepit position={[0, 0, 0]} />

      {[
        [-4, -3],
        [3, -4],
        [-3, 3],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.4, z]}>
          <dodecahedronGeometry args={[0.6, 0]} />
          <meshStandardMaterial color={palette.neutrals.granitMid} roughness={1} />
        </mesh>
      ))}

      <mesh position={[6, 1.5, -6]}>
        <coneGeometry args={[1.8, 3, 6]} />
        <meshStandardMaterial color={palette.warm.ochreDeep} roughness={1} />
      </mesh>

      <Player target={target} />
    </>
  );
}
