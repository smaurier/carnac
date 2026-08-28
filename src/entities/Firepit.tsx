import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { PointLight } from "three";
import { palette } from "../palette";
import { getToonGradient } from "../shaders/toon-gradient";

interface FirepitProps {
  position?: [number, number, number];
}

export function Firepit({ position = [0, 0, 0] }: FirepitProps) {
  const lightRef = useRef<PointLight>(null);

  useFrame((state) => {
    const light = lightRef.current;
    if (!light) return;
    const t = state.clock.elapsedTime;
    light.intensity = 2.2 + Math.sin(t * 6) * 0.15 + Math.sin(t * 13.7) * 0.08;
  });

  return (
    <group position={position}>
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.7, 0.9, 0.3, 12]} />
        <meshToonMaterial color={palette.neutrals.granitDark} gradientMap={getToonGradient(3)} />
      </mesh>
      <mesh position={[0, 0.5, 0]}>
        <coneGeometry args={[0.35, 0.7, 8]} />
        <meshToonMaterial
          color={palette.warm.fire}
          emissive={palette.warm.fire}
          emissiveIntensity={0.6}
          gradientMap={getToonGradient(2)}
        />
      </mesh>
      <pointLight
        ref={lightRef}
        color={palette.warm.fire}
        intensity={2.2}
        distance={12}
        decay={2}
        position={[0, 1.0, 0]}
      />
    </group>
  );
}
