import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Outlines } from "@react-three/drei";
import type { Group } from "three";
import { Vector3 } from "three";
import { palette } from "../palette";
import { getToonGradient } from "../shaders/toon-gradient";
import { outlineThickness } from "../design/outlines";
import { GroundShadow } from "./GroundShadow";

interface PlayerProps {
  target: [number, number];
  speed?: number;
}

const tmp = new Vector3();

export function Player({ target, speed = 4 }: PlayerProps) {
  const groupRef = useRef<Group>(null);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;
    tmp.set(target[0], group.position.y, target[1]);
    const distance = group.position.distanceTo(tmp);
    if (distance < 0.05) return;
    tmp.sub(group.position);
    tmp.normalize().multiplyScalar(Math.min(speed * delta, distance));
    group.position.add(tmp);
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <GroundShadow radius={0.5} opacity={0.45} />
      <mesh position={[0, 0.9, 0]}>
        <capsuleGeometry args={[0.35, 1.0, 4, 12]} />
        <meshToonMaterial color={palette.skin.b} gradientMap={getToonGradient(3)} />
        <Outlines thickness={outlineThickness.sm} color={palette.neutrals.charcoal} />
      </mesh>
    </group>
  );
}
