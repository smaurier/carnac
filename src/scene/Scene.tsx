import { useState } from "react";
import { IsoCamera } from "./IsoCamera";
import { DayNightCycle } from "./DayNightCycle";
import { Sky } from "./Sky";
import { NightStars } from "./NightStars";
import { BretonFog } from "./BretonFog";
import { LandFoliage } from "./LandFoliage";
import { BackgroundAlignment } from "./BackgroundAlignment";
import { Ground } from "./Ground";
import { Player } from "../entities/Player";
import { Firepit } from "../entities/Firepit";
import { StandingStone } from "../entities/StandingStone";
import { RitualCompanion } from "../entities/RitualCompanion";
import { TribeWitnesses } from "../entities/TribeWitnesses";
import { StoneEmbers } from "../entities/StoneEmbers";
import { CampVillagers } from "../entities/CampVillagers";
import { Hut } from "../entities/Hut";
import { GraniteBlock } from "../entities/GraniteBlock";
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
        elevationDeg={18}
        distance={40}
      />
      <Sky phase={phase} />
      <NightStars phase={phase} />
      <BretonFog phase={phase} />
      <DayNightCycle phase={phase} />

      <Ground onMoveTarget={(x, z) => setTarget([x, z])} />
      <LandFoliage />
      <BackgroundAlignment />

      <Firepit position={[0, 0, 0]} />

      <GraniteBlock position={[-4, 0, -3]} seed={11} scale={0.9} />
      <GraniteBlock position={[3, 0, -4]} seed={23} scale={1.1} />
      <GraniteBlock position={[-3, 0, 3]} seed={37} scale={0.8} />

      <Hut position={[6, 0, -6]} rotation={-Math.PI / 6} scale={0.95} />

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
