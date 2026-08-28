import { useState } from "react";
import { IsoCamera } from "./IsoCamera";
import { DayNightCycle } from "./DayNightCycle";
import { Ground } from "./Ground";
import { Player } from "../entities/Player";
import { Firepit } from "../entities/Firepit";
import { StandingStone } from "../entities/StandingStone";
import { RitualCompanion } from "../entities/RitualCompanion";
import { palette } from "../palette";
import type { DayPhase } from "../palette";

interface SceneProps {
  phase: DayPhase;
  showStandingStone: boolean;
  standingStonePlaced: boolean;
  onPlaceStone: () => void;
  onWitnessArrived: () => void;
}

const STONE_POSITION: [number, number, number] = [4, 0, 3];
const COMPANION_RESTING: [number, number, number] = [-5, 0, 4];
const COMPANION_APPROACH: [number, number, number] = [3, 0, 3];
const SECOND_STONE_POSITION: [number, number, number] = [3, 0, 3];

export function Scene({
  phase,
  showStandingStone,
  standingStonePlaced,
  onPlaceStone,
  onWitnessArrived,
}: SceneProps) {
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

      {showStandingStone && (
        <>
          <StandingStone
            position={STONE_POSITION}
            placed={standingStonePlaced}
            onPlace={onPlaceStone}
          />
          <RitualCompanion
            active={standingStonePlaced}
            restingPosition={COMPANION_RESTING}
            approachPosition={COMPANION_APPROACH}
            secondStonePosition={SECOND_STONE_POSITION}
            onArrived={onWitnessArrived}
          />
        </>
      )}

      <Player target={target} />
    </>
  );
}
