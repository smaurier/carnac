import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Outlines } from "@react-three/drei";
import type { Group, Mesh } from "three";
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
const WALK_FREQ = 6;
const WALK_LEG_AMP = 0.5;
const WALK_ARM_AMP = 0.4;
const MOVE_THRESHOLD = 0.02;
const TURN_STIFFNESS = 6;

function shortestAngleDiff(from: number, to: number): number {
  let diff = to - from;
  while (diff > Math.PI) diff -= Math.PI * 2;
  while (diff < -Math.PI) diff += Math.PI * 2;
  return diff;
}

export function Player({ target, speed = 4 }: PlayerProps) {
  const groupRef = useRef<Group>(null);
  const leftLegRef = useRef<Mesh>(null);
  const rightLegRef = useRef<Mesh>(null);
  const leftArmRef = useRef<Mesh>(null);
  const rightArmRef = useRef<Mesh>(null);
  const walkPhaseRef = useRef(0);
  const gradient = getToonGradient(3);
  const bodyColor = palette.warm.ochreWarm;
  const skinColor = palette.skin.b;
  const hairColor = palette.neutrals.charcoal;
  const outline = (
    <Outlines thickness={outlineThickness.xs} color={palette.neutrals.charcoal} />
  );

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;
    tmp.set(target[0], group.position.y, target[1]);
    const distance = group.position.distanceTo(tmp);

    let moving = false;
    if (distance >= 0.05) {
      moving = true;
      const dx = target[0] - group.position.x;
      const dz = target[1] - group.position.z;
      const desiredYaw = Math.atan2(dx, dz);
      const yawDiff = shortestAngleDiff(group.rotation.y, desiredYaw);
      const turnAlpha = 1 - Math.exp(-TURN_STIFFNESS * delta);
      group.rotation.y += yawDiff * turnAlpha;

      tmp.sub(group.position);
      const step = Math.min(speed * delta, distance);
      tmp.normalize().multiplyScalar(step);
      group.position.add(tmp);
      if (step > MOVE_THRESHOLD) {
        walkPhaseRef.current += delta * WALK_FREQ;
      }
    }

    const swing = moving ? Math.sin(walkPhaseRef.current) : 0;
    const swingOpposite = moving ? Math.sin(walkPhaseRef.current + Math.PI) : 0;
    if (leftLegRef.current) leftLegRef.current.rotation.x = swing * WALK_LEG_AMP;
    if (rightLegRef.current) rightLegRef.current.rotation.x = swingOpposite * WALK_LEG_AMP;
    if (leftArmRef.current) leftArmRef.current.rotation.x = swingOpposite * WALK_ARM_AMP;
    if (rightArmRef.current) rightArmRef.current.rotation.x = swing * WALK_ARM_AMP;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <GroundShadow radius={0.5} opacity={0.45} />
      <mesh ref={leftLegRef} position={[-0.14, 0.32, 0]}>
        <cylinderGeometry args={[0.11, 0.13, 0.64, 8]} />
        <meshToonMaterial color={skinColor} gradientMap={gradient} />
        {outline}
      </mesh>
      <mesh ref={rightLegRef} position={[0.14, 0.32, 0]}>
        <cylinderGeometry args={[0.11, 0.13, 0.64, 8]} />
        <meshToonMaterial color={skinColor} gradientMap={gradient} />
        {outline}
      </mesh>
      <mesh position={[0, 0.95, 0]}>
        <cylinderGeometry args={[0.28, 0.34, 0.68, 10]} />
        <meshToonMaterial color={bodyColor} gradientMap={gradient} />
        <Outlines thickness={outlineThickness.sm} color={palette.neutrals.charcoal} />
      </mesh>
      <mesh position={[0, 0.66, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.32, 0.04, 6, 16]} />
        <meshToonMaterial color={palette.warm.ochreDeep} gradientMap={gradient} />
      </mesh>
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
      <mesh ref={leftArmRef} position={[-0.31, 0.9, 0]}>
        <cylinderGeometry args={[0.08, 0.09, 0.5, 8]} />
        <meshToonMaterial color={skinColor} gradientMap={gradient} />
        {outline}
      </mesh>
      <mesh ref={rightArmRef} position={[0.31, 0.9, 0]}>
        <cylinderGeometry args={[0.08, 0.09, 0.5, 8]} />
        <meshToonMaterial color={skinColor} gradientMap={gradient} />
        {outline}
      </mesh>
      <mesh position={[0, 1.34, 0]}>
        <cylinderGeometry args={[0.08, 0.09, 0.12, 8]} />
        <meshToonMaterial color={skinColor} gradientMap={gradient} />
      </mesh>
      <mesh position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.19, 14, 12]} />
        <meshToonMaterial color={skinColor} gradientMap={gradient} />
        <Outlines thickness={outlineThickness.xs} color={palette.neutrals.charcoal} />
      </mesh>
      <mesh position={[0, 1.62, 0]}>
        <sphereGeometry args={[0.22, 14, 10, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshToonMaterial color={hairColor} gradientMap={gradient} />
      </mesh>
    </group>
  );
}
