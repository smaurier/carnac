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
import { ProximityGreeting } from "../entities/ProximityGreeting";
import { Goat } from "../entities/Goat";
import { Dog } from "../entities/Dog";
import { Aurochs } from "../entities/Aurochs";
import { VannBasket } from "../entities/VannBasket";
import { ForestBackdrop } from "./ForestBackdrop";
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

const WIDE_TARGET: [number, number, number] = [0, 0, 0];
const WIDE_ZOOM = 28;
const CLIMAX_TARGET: [number, number, number] = [4, 1.5, 3];
const CLIMAX_ZOOM = 7;

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

      {showCampVillagers && (
        <>
          <Goat position={[-4.6, 0, 2.6]} rotation={-0.6} scale={1.8} idleSeed={1.2} />
          <Dog position={[2.2, 0, -0.4]} rotation={2.3} scale={1.6} idleSeed={0.7} />
          <VannBasket position={[3.6, 0, -3.1]} rotation={0.4} />
          {/* Troupeau d'aurochs sauvages, bien loin dans la lande */}
          <Aurochs position={[-58, 0, -42]} rotation={0.9} scale={1.2} />
          <Aurochs position={[-64, 0, -38]} rotation={0.5} scale={1.05} />
          <Aurochs position={[-52, 0, -48]} rotation={1.2} scale={1.15} />
          <Aurochs position={[-46, 0, -55]} rotation={0.3} scale={1.1} />
        </>
      )}

      <ForestBackdrop />

      {showCampVillagers && (
        <ProximityGreeting
          bindings={villagerVoiceBindings}
          playerTarget={target}
        />
      )}

      <Player target={target} />
    </>
  );
}
