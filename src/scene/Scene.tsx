import { useState } from "react";
import { Outlines } from "@react-three/drei";
import { IsoCamera } from "./IsoCamera";
import { DayNightCycle } from "./DayNightCycle";
import { Ground } from "./Ground";
import { Player } from "../entities/Player";
import { Firepit } from "../entities/Firepit";
import { StandingStone } from "../entities/StandingStone";
import { RitualCompanion } from "../entities/RitualCompanion";
import { TribeWitnesses } from "../entities/TribeWitnesses";
import { StoneEmbers } from "../entities/StoneEmbers";
import { CampVillagers } from "../entities/CampVillagers";
import { palette } from "../palette";
import { getToonGradient } from "../shaders/toon-gradient";
import { outlineThickness } from "../design/outlines";
import type { DayPhase } from "../palette";

interface SceneProps {
  phase: DayPhase;
  showStandingStone: boolean;
  standingStonePlaced: boolean;
  onPlaceStone: () => void;
  onWitnessArrived: () => void;
  showCampVillagers: boolean;
}

const STONE_POSITION: [number, number, number] = [4, 0, 3];
const COMPANION_RESTING: [number, number, number] = [-5, 0, 4];
const COMPANION_APPROACH: [number, number, number] = [3, 0, 3];
const SECOND_STONE_POSITION: [number, number, number] = [3, 0, 3];

const WIDE_TARGET: [number, number, number] = [0, 0, 0];
const WIDE_ZOOM = 12;
const CLIMAX_TARGET: [number, number, number] = [4, 1.5, 3];
const CLIMAX_ZOOM = 7;

export function Scene({
  phase,
  showStandingStone,
  standingStonePlaced,
  onPlaceStone,
  onWitnessArrived,
  showCampVillagers,
}: SceneProps) {
  const [target, setTarget] = useState<[number, number]>([0, 4]);
  const cameraTarget = standingStonePlaced ? CLIMAX_TARGET : WIDE_TARGET;
  const cameraZoom = standingStonePlaced ? CLIMAX_ZOOM : WIDE_ZOOM;

  return (
    <>
      <IsoCamera
        target={cameraTarget}
        zoom={cameraZoom}
        azimuthDeg={45}
        elevationDeg={30}
        distance={40}
      />
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
          <meshToonMaterial color={palette.neutrals.granitMid} gradientMap={getToonGradient(3)} />
          <Outlines thickness={outlineThickness.md} color={palette.neutrals.charcoal} />
        </mesh>
      ))}

      <mesh position={[6, 1.5, -6]}>
        <coneGeometry args={[1.8, 3, 6]} />
        <meshToonMaterial color={palette.warm.ochreDeep} gradientMap={getToonGradient(3)} />
        <Outlines thickness={outlineThickness.xl} color={palette.neutrals.charcoal} />
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
          <TribeWitnesses active={standingStonePlaced} />
          <StoneEmbers
            origin={[STONE_POSITION[0], STONE_POSITION[1], STONE_POSITION[2]]}
            trigger={standingStonePlaced}
          />
        </>
      )}

      <CampVillagers visible={showCampVillagers} />

      <Player target={target} />
    </>
  );
}
