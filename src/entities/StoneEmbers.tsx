import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { AdditiveBlending, type Points } from "three";
import { palette } from "../palette";

interface StoneEmbersProps {
  origin: [number, number, number];
  trigger: boolean;
  count?: number;
  durationSeconds?: number;
}

const DEFAULT_COUNT = 24;
const DEFAULT_DURATION = 2.5;
const SPREAD_XZ = 0.35;
const RISE_MIN = 1.2;
const RISE_MAX = 2.6;

interface EmberSpec {
  angle: number;
  radius: number;
  rise: number;
  wobble: number;
  phase: number;
}

function createEmbers(count: number): EmberSpec[] {
  const specs: EmberSpec[] = [];
  for (let i = 0; i < count; i += 1) {
    specs.push({
      angle: Math.random() * Math.PI * 2,
      radius: Math.random() * SPREAD_XZ,
      rise: RISE_MIN + Math.random() * (RISE_MAX - RISE_MIN),
      wobble: 0.15 + Math.random() * 0.25,
      phase: Math.random() * Math.PI * 2,
    });
  }
  return specs;
}

export function StoneEmbers({
  origin,
  trigger,
  count = DEFAULT_COUNT,
  durationSeconds = DEFAULT_DURATION,
}: StoneEmbersProps) {
  const pointsRef = useRef<Points>(null);
  const startTimeRef = useRef<number | null>(null);
  const [specs] = useState<EmberSpec[]>(() => createEmbers(count));

  useEffect(() => {
    if (trigger) startTimeRef.current = null;
  }, [trigger]);

  useFrame((state) => {
    const points = pointsRef.current;
    if (!points) return;
    if (!trigger) {
      points.visible = false;
      return;
    }
    if (startTimeRef.current === null) {
      startTimeRef.current = state.clock.elapsedTime;
    }
    const elapsed = state.clock.elapsedTime - startTimeRef.current;
    const t = elapsed / durationSeconds;
    if (t > 1) {
      points.visible = false;
      return;
    }
    points.visible = true;

    const positions = points.geometry.attributes.position;
    const array = positions.array as Float32Array;
    for (let i = 0; i < specs.length; i += 1) {
      const spec = specs[i];
      const life = t;
      const x = origin[0] + Math.cos(spec.angle) * spec.radius +
        Math.sin(life * 6 + spec.phase) * spec.wobble * life;
      const y = origin[1] + 0.4 + spec.rise * life;
      const z = origin[2] + Math.sin(spec.angle) * spec.radius +
        Math.cos(life * 6 + spec.phase) * spec.wobble * life;
      array[i * 3] = x;
      array[i * 3 + 1] = y;
      array[i * 3 + 2] = z;
    }
    positions.needsUpdate = true;

    const material = points.material as import("three").PointsMaterial;
    material.opacity = Math.max(0, 1 - t) * 0.9;
  });

  const initialPositions = new Float32Array(count * 3);

  return (
    <points ref={pointsRef} visible={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[initialPositions, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        color={palette.warm.duskGold}
        size={0.12}
        transparent
        opacity={0}
        depthWrite={false}
        blending={AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}
