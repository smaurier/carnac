import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Outlines } from "@react-three/drei";
import type { Group } from "three";
import { palette } from "../palette";
import { getToonGradient } from "../shaders/toon-gradient";
import { outlineThickness } from "../design/outlines";
import { GroundShadow } from "./GroundShadow";

interface DogProps {
  position?: [number, number, number];
  rotation?: number;
  scale?: number;
  idleSeed?: number;
}

const SWAY_SPEED = 1.9;
const SWAY_AMP = 0.015;

/**
 * Chien primitif domestique · morphologie type "chien loup"
 * courant au Néolithique européen (proche du Canis lupus familiaris
 * ancestral, avant les races modernes).
 */
export function Dog({
  position = [0, 0, 0],
  rotation = 0,
  scale = 1,
  idleSeed,
}: DogProps) {
  const groupRef = useRef<Group>(null);
  const tailRef = useRef<Group>(null);
  const gradient = getToonGradient(3);
  const bodyColor = palette.warm.ochreDeep;
  const belly = palette.warm.ochreWarm;
  const dark = palette.neutrals.charcoal;
  const seed = useMemo(
    () => (idleSeed !== undefined ? idleSeed : Math.random() * Math.PI * 2),
    [idleSeed],
  );
  const outline = (
    <Outlines thickness={outlineThickness.xs} color={palette.neutrals.charcoal} />
  );

  useFrame((state) => {
    const g = groupRef.current;
    const tail = tailRef.current;
    const t = state.clock.elapsedTime;
    if (g) g.position.y = Math.sin(t * SWAY_SPEED + seed) * SWAY_AMP;
    if (tail) tail.rotation.y = Math.sin(t * 3.5) * 0.35;
  });

  return (
    <group position={position} rotation={[0, rotation, 0]} scale={scale}>
      <GroundShadow radius={0.32} opacity={0.4} />
      <group ref={groupRef}>
        {/* Corps horizontal */}
        <mesh position={[0, 0.28, 0]} rotation={[0, 0, Math.PI / 2]}>
          <capsuleGeometry args={[0.11, 0.32, 4, 10]} />
          <meshToonMaterial color={bodyColor} gradientMap={gradient} />
          {outline}
        </mesh>
        {/* Ventre plus clair */}
        <mesh position={[0, 0.21, 0]} rotation={[0, 0, Math.PI / 2]}>
          <capsuleGeometry args={[0.07, 0.24, 4, 8]} />
          <meshToonMaterial color={belly} gradientMap={gradient} />
        </mesh>
        {/* 4 pattes fines */}
        <mesh position={[-0.16, 0.11, 0.07]}>
          <cylinderGeometry args={[0.025, 0.03, 0.22, 6]} />
          <meshToonMaterial color={dark} gradientMap={gradient} />
        </mesh>
        <mesh position={[0.16, 0.11, 0.07]}>
          <cylinderGeometry args={[0.025, 0.03, 0.22, 6]} />
          <meshToonMaterial color={dark} gradientMap={gradient} />
        </mesh>
        <mesh position={[-0.16, 0.11, -0.07]}>
          <cylinderGeometry args={[0.025, 0.03, 0.22, 6]} />
          <meshToonMaterial color={dark} gradientMap={gradient} />
        </mesh>
        <mesh position={[0.16, 0.11, -0.07]}>
          <cylinderGeometry args={[0.025, 0.03, 0.22, 6]} />
          <meshToonMaterial color={dark} gradientMap={gradient} />
        </mesh>
        {/* Cou incliné + tête */}
        <mesh position={[0.24, 0.36, 0]} rotation={[0, 0, -Math.PI / 6]}>
          <cylinderGeometry args={[0.05, 0.065, 0.16, 8]} />
          <meshToonMaterial color={bodyColor} gradientMap={gradient} />
        </mesh>
        <mesh position={[0.34, 0.42, 0]}>
          <sphereGeometry args={[0.095, 12, 10]} />
          <meshToonMaterial color={bodyColor} gradientMap={gradient} />
          {outline}
        </mesh>
        {/* Museau allongé */}
        <mesh position={[0.44, 0.395, 0]}>
          <coneGeometry args={[0.055, 0.13, 8]} />
          <meshToonMaterial color={bodyColor} gradientMap={gradient} />
        </mesh>
        {/* Oreilles dressées (loup) */}
        <mesh position={[0.31, 0.52, -0.05]} rotation={[0, 0, -Math.PI / 5]}>
          <coneGeometry args={[0.03, 0.09, 5]} />
          <meshToonMaterial color={dark} gradientMap={gradient} />
        </mesh>
        <mesh position={[0.31, 0.52, 0.05]} rotation={[0, 0, -Math.PI / 5]}>
          <coneGeometry args={[0.03, 0.09, 5]} />
          <meshToonMaterial color={dark} gradientMap={gradient} />
        </mesh>
        {/* Queue qui remue */}
        <group ref={tailRef} position={[-0.22, 0.36, 0]}>
          <mesh position={[-0.06, 0.05, 0]} rotation={[0, 0, Math.PI / 3]}>
            <coneGeometry args={[0.03, 0.18, 6]} />
            <meshToonMaterial color={bodyColor} gradientMap={gradient} />
          </mesh>
        </group>
      </group>
    </group>
  );
}
