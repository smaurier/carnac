import { useRef, useState } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { MathUtils, type Group, type PointLight } from "three";
import { palette } from "../palette";

interface StandingStoneProps {
  position: [number, number, number];
  placed: boolean;
  onPlace: () => void;
}

const STONE_RADIUS = 0.4;
const STONE_HEIGHT = 2.5;
const Y_LYING = STONE_RADIUS;
const Y_STANDING = STONE_HEIGHT / 2;
const TILT_LYING = Math.PI / 2;
const TILT_STANDING = 0;
const LERP_STIFFNESS = 3.5;

export function StandingStone({
  position,
  placed,
  onPlace,
}: StandingStoneProps) {
  const groupRef = useRef<Group>(null);
  const haloRef = useRef<PointLight>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;
    const alpha = 1 - Math.exp(-LERP_STIFFNESS * delta);

    const targetY = placed ? Y_STANDING : Y_LYING;
    const targetTilt = placed ? TILT_STANDING : TILT_LYING;

    group.position.y = MathUtils.lerp(group.position.y, targetY, alpha);
    group.rotation.x = MathUtils.lerp(group.rotation.x, targetTilt, alpha);

    const halo = haloRef.current;
    if (halo) {
      const t = state.clock.elapsedTime;
      const base = placed ? 0.9 : hovered ? 0.55 : 0.25;
      halo.intensity = base + Math.sin(t * 1.8) * 0.08;
    }
  });

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    if (placed) return;
    onPlace();
  };

  const handlePointerOver = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    if (placed) return;
    setHovered(true);
    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    setHovered(false);
    document.body.style.cursor = "";
  };

  return (
    <group
      ref={groupRef}
      position={[position[0], Y_LYING, position[2]]}
      rotation={[TILT_LYING, 0, 0]}
    >
      <mesh
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <cylinderGeometry
          args={[STONE_RADIUS, STONE_RADIUS * 1.1, STONE_HEIGHT, 12]}
        />
        <meshStandardMaterial
          color={palette.neutrals.granitMid}
          emissive={palette.cool.haloBlue}
          emissiveIntensity={hovered && !placed ? 0.12 : 0}
          roughness={1}
        />
      </mesh>
      <pointLight
        ref={haloRef}
        color={palette.cool.haloBlue}
        distance={6}
        decay={2}
        intensity={0.25}
        position={[0, STONE_HEIGHT / 2, 0]}
      />
    </group>
  );
}
