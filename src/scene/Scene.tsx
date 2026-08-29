import { useRef, useState } from "react";
import type { Group } from "three";
import { ThirdPersonCamera } from "./ThirdPersonCamera";
import { DayNightCycle } from "./DayNightCycle";
import { Sky } from "./Sky";
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
import { ProximityGreeting } from "../entities/ProximityGreeting";
import { Goat } from "../entities/Goat";
import { Dog } from "../entities/Dog";
import { Aurochs } from "../entities/Aurochs";
import { VannBasket } from "../entities/VannBasket";
import { ForestBackdrop } from "./ForestBackdrop";
import { SeaHorizon } from "./SeaHorizon";
import type { VoiceId } from "../audio/vocalizations";
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

const villagerVoiceBindings: readonly {
  readonly voice: VoiceId;
  readonly position: [number, number, number];
}[] = [
  { voice: "athro", position: [1.2, 0, -1.4] },
  { voice: "vann", position: [4.5, 0, -3.8] },
  { voice: "nia", position: [-3.5, 0, 1.8] },
];

export function Scene({
  phase,
  showStandingStone,
  standingStonePlaced,
  onPlaceStone,
  onWitnessArrived,
  showCampVillagers,
}: SceneProps) {
  const [target, setTarget] = useState<[number, number]>([0, 4]);
  const playerRef = useRef<Group>(null);
  const cameraDistance = standingStonePlaced ? 5 : 7;
  const cameraHeight = standingStonePlaced ? 2.4 : 3.2;

  return (
    <>
      <ThirdPersonCamera
        target={playerRef}
        distance={cameraDistance}
        height={cameraHeight}
        lookHeight={1.4}
        fov={55}
      />
      <Sky phase={phase} />
      <DayNightCycle phase={phase} />

      <Ground onMoveTarget={(x, z) => setTarget([x, z])} />
      <SeaHorizon phase={phase} />
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

      {showCampVillagers && (
        <>
          <Goat position={[-4.6, 0, 2.6]} rotation={-0.6} scale={1.8} idleSeed={1.2} />
          <Dog position={[2.2, 0, -0.4]} rotation={2.3} scale={1.6} idleSeed={0.7} />
          <VannBasket position={[3.6, 0, -3.1]} rotation={0.4} />
          {/* Troupeau d'aurochs sauvages, loin dans la lande mais dans le terrain */}
          <Aurochs position={[-28, 0, -22]} rotation={0.9} scale={1.15} />
          <Aurochs position={[-32, 0, -18]} rotation={0.5} scale={1.0} />
          <Aurochs position={[-24, 0, -26]} rotation={1.2} scale={1.1} />
          <Aurochs position={[-19, 0, -30]} rotation={0.3} scale={1.05} />
        </>
      )}

      <ForestBackdrop />

      {showCampVillagers && (
        <ProximityGreeting
          bindings={villagerVoiceBindings}
          playerTarget={target}
        />
      )}

      <Player ref={playerRef} target={target} />
    </>
  );
}
