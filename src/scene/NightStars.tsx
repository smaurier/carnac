import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { AdditiveBlending, type Points } from "three";
import type { DayPhase } from "../palette";
import { palette } from "../palette";

interface NightStarsProps {
  phase: DayPhase;
  count?: number;
}

const STAR_COUNT_DEFAULT = 140;
const DOME_RADIUS = 32;

function seededRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 0xffffffff;
  };
}

function createStarField(count: number): Float32Array {
  const rand = seededRandom(1789);
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i += 1) {
    const azimuth = rand() * Math.PI * 2;
    const elevation = rand() * (Math.PI / 2 - 0.05) + 0.05;
    const x = DOME_RADIUS * Math.cos(elevation) * Math.sin(azimuth);
    const y = DOME_RADIUS * Math.sin(elevation);
    const z = DOME_RADIUS * Math.cos(elevation) * Math.cos(azimuth);
    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
  }
  return positions;
}

const STAR_PHASES: readonly DayPhase[] = ["night", "dawn"];

export function NightStars({ phase, count = STAR_COUNT_DEFAULT }: NightStarsProps) {
  const pointsRef = useRef<Points>(null);
  const positions = useMemo(() => createStarField(count), [count]);
  const visible = STAR_PHASES.includes(phase);
  const opacity = phase === "night" ? 0.85 : 0.35;

  useFrame((state) => {
    const points = pointsRef.current;
    if (!points) return;
    points.visible = visible;
    const material = points.material as import("three").PointsMaterial;
    const twinkle = 0.85 + Math.sin(state.clock.elapsedTime * 0.6) * 0.1;
    material.opacity = opacity * twinkle;
  });

  return (
    <>
      <points ref={pointsRef} frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
            count={count}
          />
        </bufferGeometry>
        <pointsMaterial
          color={palette.neutrals.boneWhite}
          size={1.2}
          transparent
          opacity={0}
          depthWrite={false}
          blending={AdditiveBlending}
          sizeAttenuation
          fog={false}
        />
      </points>

      {visible && <EastStar phase={phase} />}
    </>
  );
}

function EastStar({ phase }: { phase: DayPhase }) {
  const lightRef = useRef<import("three").PointLight>(null);
  useFrame((state) => {
    const light = lightRef.current;
    if (!light) return;
    const base = phase === "night" ? 0.9 : 0.45;
    light.intensity = base + Math.sin(state.clock.elapsedTime * 1.4) * 0.08;
  });

  return (
    <group position={[12, 10, -18]}>
      <mesh>
        <sphereGeometry args={[0.9, 12, 12]} />
        <meshBasicMaterial color={palette.warm.duskGold} fog={false} />
      </mesh>
      <pointLight
        ref={lightRef}
        color={palette.warm.duskGold}
        intensity={1.4}
        distance={30}
        decay={2}
      />
    </group>
  );
}
