import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MathUtils, type Group } from "three";
import { Villager } from "./Villager";
import { palette } from "../palette";

interface WitnessConfig {
  readonly position: [number, number, number];
  readonly skin: "a" | "b" | "c" | "d";
  readonly bodyColor: string;
  readonly hairColor: string;
  readonly scale: number;
}

interface TribeWitnessesProps {
  active: boolean;
  witnesses?: readonly WitnessConfig[];
}

const FADE_STIFFNESS = 2.2;

const defaultWitnesses: readonly WitnessConfig[] = [
  {
    position: [4.9, 0, 2.1],
    skin: "a",
    bodyColor: palette.warm.ochreWarm,
    hairColor: palette.warm.ochreDeep,
    scale: 0.7,
  },
  {
    position: [3.3, 0, 4.4],
    skin: "c",
    bodyColor: palette.warm.ochreDeep,
    hairColor: palette.neutrals.boneWhite,
    scale: 1,
  },
];

function Witness({
  active,
  config,
}: {
  active: boolean;
  config: WitnessConfig;
}) {
  const groupRef = useRef<Group>(null);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;
    const alpha = 1 - Math.exp(-FADE_STIFFNESS * delta);
    const target = active ? config.scale : 0;
    const next = MathUtils.lerp(group.scale.x, target, alpha);
    group.scale.setScalar(next);
  });

  return (
    <group ref={groupRef} position={config.position} scale={0}>
      <Villager
        skin={config.skin}
        bodyColor={config.bodyColor}
        hairColor={config.hairColor}
      />
    </group>
  );
}

export function TribeWitnesses({
  active,
  witnesses = defaultWitnesses,
}: TribeWitnessesProps) {
  return (
    <>
      {witnesses.map((config, index) => (
        <Witness key={index} active={active} config={config} />
      ))}
    </>
  );
}
