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

  return (
    <group ref={ref} position={position} scale={scale}>
      <GroundShadow radius={0.55} opacity={0.4} />
      <group ref={innerRef}>
        <mesh position={[0, 0.9, 0]}>
          <capsuleGeometry args={[0.35, 1.0, 4, 12]} />
          <meshToonMaterial color={bodyColor} gradientMap={gradient} />
          <Outlines thickness={outlineThickness.sm} color={palette.neutrals.charcoal} />
        </mesh>
        <mesh position={[0, 1.9, 0]}>
          <sphereGeometry args={[0.32, 16, 12]} />
          <meshToonMaterial color={skinColor} gradientMap={gradient} />
          <Outlines thickness={outlineThickness.xs} color={palette.neutrals.charcoal} />
        </mesh>
        <mesh position={[0, 2.05, 0]}>
          <sphereGeometry args={[0.34, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshToonMaterial color={hairColor} gradientMap={gradient} />
        </mesh>
      </group>
    </group>
  );
});
