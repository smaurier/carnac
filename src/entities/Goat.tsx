import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Outlines } from "@react-three/drei";
import type { Group } from "three";
import { palette } from "../palette";
import { getToonGradient } from "../shaders/toon-gradient";
import { outlineThickness } from "../design/outlines";
import { GroundShadow } from "./GroundShadow";

interface GoatProps {
  position?: [number, number, number];
  rotation?: number;
  scale?: number;
  idleSeed?: number;
}

const SWAY_SPEED = 1.6;
const SWAY_AMP = 0.02;

export function Goat({
  position = [0, 0, 0],
  rotation = 0,
  scale = 1,
  idleSeed,
}: GoatProps) {
  const groupRef = useRef<Group>(null);
  const gradient = getToonGradient(3);
  const bodyColor = palette.neutrals.granitLight;
  const belly = palette.neutrals.boneWhite;
  const hornColor = palette.neutrals.charcoal;
  const seed = useMemo(
    () => (idleSeed !== undefined ? idleSeed : Math.random() * Math.PI * 2),
    [idleSeed],
  );
  const outline = (
    <Outlines thickness={outlineThickness.xs} color={palette.neutrals.charcoal} />
  );

  useFrame((state) => {
    const g = groupRef.current;
    if (!g) return;
    g.position.y = Math.sin(state.clock.elapsedTime * SWAY_SPEED + seed) * SWAY_AMP;
  });

  return (
    <group position={position} rotation={[0, rotation, 0]} scale={scale}>
      <GroundShadow radius={0.35} opacity={0.4} />
      <group ref={groupRef}>
        {/* Corps horizontal */}
        <mesh position={[0, 0.32, 0]} rotation={[0, 0, Math.PI / 2]}>
          <capsuleGeometry args={[0.13, 0.35, 4, 10]} />
          <meshToonMaterial color={bodyColor} gradientMap={gradient} />
          {outline}
        </mesh>
        {/* Ventre plus clair */}
        <mesh position={[0, 0.24, 0]} rotation={[0, 0, Math.PI / 2]}>
          <capsuleGeometry args={[0.09, 0.28, 4, 8]} />
          <meshToonMaterial color={belly} gradientMap={gradient} />
        </mesh>
        {/* Pattes (courtes primitives) */}
        <mesh position={[-0.18, 0.13, 0.09]}>
          <cylinderGeometry args={[0.03, 0.035, 0.26, 6]} />
          <meshToonMaterial color={hornColor} gradientMap={gradient} />
        </mesh>
        <mesh position={[0.18, 0.13, 0.09]}>
          <cylinderGeometry args={[0.03, 0.035, 0.26, 6]} />
          <meshToonMaterial color={hornColor} gradientMap={gradient} />
        </mesh>
        <mesh position={[-0.18, 0.13, -0.09]}>
          <cylinderGeometry args={[0.03, 0.035, 0.26, 6]} />
          <meshToonMaterial color={hornColor} gradientMap={gradient} />
        </mesh>
        <mesh position={[0.18, 0.13, -0.09]}>
          <cylinderGeometry args={[0.03, 0.035, 0.26, 6]} />
          <meshToonMaterial color={hornColor} gradientMap={gradient} />
        </mesh>
        {/* Cou incliné + tête */}
        <mesh position={[0.28, 0.42, 0]} rotation={[0, 0, -Math.PI / 5]}>
          <cylinderGeometry args={[0.055, 0.075, 0.18, 8]} />
          <meshToonMaterial color={bodyColor} gradientMap={gradient} />
        </mesh>
        <mesh position={[0.4, 0.5, 0]}>
          <sphereGeometry args={[0.11, 12, 10]} />
          <meshToonMaterial color={bodyColor} gradientMap={gradient} />
          {outline}
        </mesh>
        {/* Cornes courtes primitives (Capra hircus néolithique) */}
        <mesh position={[0.42, 0.62, -0.055]} rotation={[0, 0, -Math.PI / 4]}>
          <coneGeometry args={[0.024, 0.14, 6]} />
          <meshToonMaterial color={hornColor} gradientMap={gradient} />
        </mesh>
        <mesh position={[0.42, 0.62, 0.055]} rotation={[0, 0, -Math.PI / 4]}>
          <coneGeometry args={[0.024, 0.14, 6]} />
          <meshToonMaterial color={hornColor} gradientMap={gradient} />
        </mesh>
        {/* Queue courte */}
        <mesh position={[-0.28, 0.42, 0]} rotation={[0, 0, Math.PI / 3]}>
          <coneGeometry args={[0.03, 0.1, 6]} />
          <meshToonMaterial color={bodyColor} gradientMap={gradient} />
        </mesh>
      </group>
    </group>
  );
}
