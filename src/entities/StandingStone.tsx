import { useRef, useState } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { Outlines } from "@react-three/drei";
import { MathUtils, type Group, type PointLight } from "three";
import { palette } from "../palette";
import { getToonGradient } from "../shaders/toon-gradient";
import { outlineThickness } from "../design/outlines";
import { GroundShadow } from "./GroundShadow";

interface StandingStoneProps {
  position: [number, number, number];
  placed: boolean;
  onPlace: () => void;
  scale?: number;
  interactive?: boolean;
  seed?: number;
}

function pseudoRand(seed: number, offset: number): number {
  const x = Math.sin((seed + offset) * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

const BASE_RADIUS = 0.4;
const BASE_HEIGHT = 2.5;
const TILT_LYING = Math.PI / 2;
const TILT_STANDING = 0;
const LERP_STIFFNESS = 3.5;

export function StandingStone({
  position,
  placed,
  onPlace,
  scale = 1,
  interactive = true,
  seed = 7,
}: StandingStoneProps) {
  const groupRef = useRef<Group>(null);
  const haloRef = useRef<PointLight>(null);
  const [hovered, setHovered] = useState(false);

  const radius = BASE_RADIUS * scale;
  const height = BASE_HEIGHT * scale;
  const yLying = radius;
  const yStanding = height / 2;

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;
    const alpha = 1 - Math.exp(-LERP_STIFFNESS * delta);

    const targetY = placed ? yStanding : yLying;
    const targetTilt = placed ? TILT_STANDING : TILT_LYING;

    group.position.y = MathUtils.lerp(group.position.y, targetY, alpha);
    group.rotation.x = MathUtils.lerp(group.rotation.x, targetTilt, alpha);

    const halo = haloRef.current;
    if (halo) {
      const t = state.clock.elapsedTime;
      const base = placed ? 0.9 : hovered ? 0.55 : 0.25;
      halo.intensity = (base + Math.sin(t * 1.8) * 0.08) * scale;
    }
  });

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    if (!interactive) return;
    event.stopPropagation();
    if (placed) return;
    onPlace();
  };

  const handlePointerOver = (event: ThreeEvent<PointerEvent>) => {
    if (!interactive) return;
    event.stopPropagation();
    if (placed) return;
    setHovered(true);
    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = (event: ThreeEvent<PointerEvent>) => {
    if (!interactive) return;
    event.stopPropagation();
    setHovered(false);
    document.body.style.cursor = "";
  };

  return (
    <>
      <group position={[position[0], 0, position[2]]}>
        <GroundShadow radius={radius * 1.8} opacity={0.5} />
      </group>
      <group
        ref={groupRef}
        position={[position[0], yLying, position[2]]}
        rotation={[TILT_LYING, 0, 0]}
      >
        <mesh
          onClick={handleClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        >
          <cylinderGeometry
            args={[radius * (0.78 + pseudoRand(seed, 0) * 0.22), radius * 1.15, height, 7]}
          />
          <meshToonMaterial
            color={palette.neutrals.granitMid}
            emissive={palette.cool.haloBlue}
            emissiveIntensity={hovered && !placed ? 0.12 : 0}
            gradientMap={getToonGradient(3)}
          />
          <Outlines
            thickness={outlineThickness.lg * scale}
            color={palette.neutrals.charcoal}
          />
        </mesh>
        <mesh
          position={[
            (pseudoRand(seed, 1) - 0.5) * radius * 0.6,
            height * (pseudoRand(seed, 2) - 0.3),
            (pseudoRand(seed, 3) - 0.5) * radius * 0.4,
          ]}
          rotation={[
            (pseudoRand(seed, 4) - 0.5) * 0.5,
            pseudoRand(seed, 5) * Math.PI * 2,
            (pseudoRand(seed, 6) - 0.5) * 0.5,
          ]}
        >
          <dodecahedronGeometry args={[radius * 0.42, 0]} />
          <meshToonMaterial color={palette.neutrals.granitDark} gradientMap={getToonGradient(3)} />
          <Outlines
            thickness={outlineThickness.md * scale}
            color={palette.neutrals.charcoal}
          />
        </mesh>
        <pointLight
          ref={haloRef}
          color={palette.cool.haloBlue}
          distance={6 * scale}
          decay={2}
          intensity={0.25}
          position={[0, height / 2, 0]}
        />
      </group>
    </>
  );
}
