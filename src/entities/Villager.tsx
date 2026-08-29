import { forwardRef, useRef, useMemo } from "react";
import { Outlines } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { palette } from "../palette";
import { getToonGradient } from "../shaders/toon-gradient";
import { outlineThickness } from "../design/outlines";
import { GroundShadow } from "./GroundShadow";

type SkinTone = "a" | "b" | "c" | "d";

interface VillagerProps {
  position?: [number, number, number];
  skin?: SkinTone;
  bodyColor?: string;
  hairColor?: string;
  scale?: number;
  idleSeed?: number;
}

const SWAY_AMPLITUDE_Y = 0.03;
const SWAY_AMPLITUDE_ROT = 0.02;
const SWAY_SPEED = 1.1;

export const Villager = forwardRef<Group, VillagerProps>(function Villager(
  {
    position = [0, 0, 0],
    skin = "b",
    bodyColor = palette.warm.ochreDeep,
    hairColor = palette.neutrals.charcoal,
    scale = 1,
    idleSeed,
  },
  ref,
) {
  const skinColor = palette.skin[skin];
  const gradient = getToonGradient(3);
  const innerRef = useRef<Group>(null);
  const seed = useMemo(
    () => (idleSeed !== undefined ? idleSeed : Math.random() * Math.PI * 2),
    [idleSeed],
  );

  useFrame((state) => {
    const inner = innerRef.current;
    if (!inner) return;
    const t = state.clock.elapsedTime;
    inner.position.y = Math.sin(t * SWAY_SPEED + seed) * SWAY_AMPLITUDE_Y;
    inner.rotation.z = Math.sin(t * SWAY_SPEED * 0.6 + seed) * SWAY_AMPLITUDE_ROT;
  });

  const outline = <Outlines thickness={outlineThickness.xs} color={palette.neutrals.charcoal} />;

  return (
    <group ref={ref} position={position} scale={scale}>
      <GroundShadow radius={0.55} opacity={0.4} />
      <group ref={innerRef}>
        {/* Jambes */}
        <mesh position={[-0.14, 0.32, 0]}>
          <cylinderGeometry args={[0.11, 0.13, 0.64, 8]} />
          <meshToonMaterial color={skinColor} gradientMap={gradient} />
          {outline}
        </mesh>
        <mesh position={[0.14, 0.32, 0]}>
          <cylinderGeometry args={[0.11, 0.13, 0.64, 8]} />
          <meshToonMaterial color={skinColor} gradientMap={gradient} />
          {outline}
        </mesh>

        {/* Torse conique (large aux hanches, resserré aux épaules) */}
        <mesh position={[0, 0.95, 0]}>
          <cylinderGeometry args={[0.28, 0.34, 0.68, 10]} />
          <meshToonMaterial color={bodyColor} gradientMap={gradient} />
          <Outlines thickness={outlineThickness.sm} color={palette.neutrals.charcoal} />
        </mesh>

        {/* Ceinture torsadée */}
        <mesh position={[0, 0.66, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.32, 0.04, 6, 16]} />
          <meshToonMaterial color={palette.warm.ochreWarm} gradientMap={gradient} />
        </mesh>

        {/* Épaules (sphères) */}
        <mesh position={[-0.29, 1.18, 0]}>
          <sphereGeometry args={[0.11, 10, 8]} />
          <meshToonMaterial color={bodyColor} gradientMap={gradient} />
          {outline}
        </mesh>
        <mesh position={[0.29, 1.18, 0]}>
          <sphereGeometry args={[0.11, 10, 8]} />
          <meshToonMaterial color={bodyColor} gradientMap={gradient} />
          {outline}
        </mesh>

        {/* Bras */}
        <mesh position={[-0.31, 0.9, 0]}>
          <cylinderGeometry args={[0.08, 0.09, 0.5, 8]} />
          <meshToonMaterial color={skinColor} gradientMap={gradient} />
          {outline}
        </mesh>
        <mesh position={[0.31, 0.9, 0]}>
          <cylinderGeometry args={[0.08, 0.09, 0.5, 8]} />
          <meshToonMaterial color={skinColor} gradientMap={gradient} />
          {outline}
        </mesh>

        {/* Cou */}
        <mesh position={[0, 1.34, 0]}>
          <cylinderGeometry args={[0.08, 0.09, 0.12, 8]} />
          <meshToonMaterial color={skinColor} gradientMap={gradient} />
        </mesh>

        {/* Tête */}
        <mesh position={[0, 1.5, 0]}>
          <sphereGeometry args={[0.19, 14, 12]} />
          <meshToonMaterial color={skinColor} gradientMap={gradient} />
          <Outlines thickness={outlineThickness.xs} color={palette.neutrals.charcoal} />
        </mesh>

        {/* Cheveux (calotte) */}
        <mesh position={[0, 1.55, 0]}>
          <sphereGeometry args={[0.21, 14, 10, 0, Math.PI * 2, 0, Math.PI / 2.4]} />
          <meshToonMaterial color={hairColor} gradientMap={gradient} />
        </mesh>
      </group>
    </group>
  );
});
