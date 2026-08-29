import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { AdditiveBlending, type Points, type PointLight } from "three";
import { palette } from "../palette";
import { getToonGradient } from "../shaders/toon-gradient";

interface FirepitProps {
  position?: [number, number, number];
}

const EMBER_COUNT = 18;
const EMBER_MAX_HEIGHT = 2.6;
const EMBER_LIFE = 2.4;

interface EmberSpec {
  angle: number;
  radius: number;
  rise: number;
  phase: number;
}

function createEmbers(count: number): EmberSpec[] {
  const specs: EmberSpec[] = [];
  for (let i = 0; i < count; i += 1) {
    specs.push({
      angle: Math.random() * Math.PI * 2,
      radius: Math.random() * 0.18,
      rise: 0.9 + Math.random() * 1.4,
      phase: Math.random() * EMBER_LIFE,
    });
  }
  return specs;
}

export function Firepit({ position = [0, 0, 0] }: FirepitProps) {
  const lightRef = useRef<PointLight>(null);
  const emberRef = useRef<Points>(null);
  const specs = useMemo(() => createEmbers(EMBER_COUNT), []);
  const initialPositions = useMemo(() => new Float32Array(EMBER_COUNT * 3), []);

  useFrame((state) => {
    const light = lightRef.current;
    if (light) {
      const t = state.clock.elapsedTime;
      light.intensity = 2.4 + Math.sin(t * 6) * 0.2 + Math.sin(t * 13.7) * 0.1;
    }

    const embers = emberRef.current;
    if (!embers) return;
    const positions = embers.geometry.attributes.position;
    const array = positions.array as Float32Array;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < specs.length; i += 1) {
      const spec = specs[i];
      const life = ((t + spec.phase) % EMBER_LIFE) / EMBER_LIFE;
      const wobble = Math.sin(life * Math.PI * 4 + spec.phase) * 0.12;
      const x = position[0] + Math.cos(spec.angle) * spec.radius + wobble * life;
      const y = position[1] + 0.4 + life * EMBER_MAX_HEIGHT * spec.rise;
      const z = position[2] + Math.sin(spec.angle) * spec.radius + wobble * life * 0.6;
      array[i * 3] = x;
      array[i * 3 + 1] = y;
      array[i * 3 + 2] = z;
    }
    positions.needsUpdate = true;
    const material = embers.material as import("three").PointsMaterial;
    material.opacity = 0.75;
  });

  return (
    <group position={position}>
      {/* Foyer (cercle de pierres) */}
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.7, 0.9, 0.3, 12]} />
        <meshToonMaterial color={palette.neutrals.granitDark} gradientMap={getToonGradient(3)} />
      </mesh>
      {/* Anneau de pierres visibles */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i / 6) * Math.PI * 2;
        const x = Math.cos(angle) * 0.72;
        const z = Math.sin(angle) * 0.72;
        return (
          <mesh key={i} position={[x, 0.28, z]}>
            <dodecahedronGeometry args={[0.15, 0]} />
            <meshToonMaterial color={palette.neutrals.granitMid} gradientMap={getToonGradient(3)} />
          </mesh>
        );
      })}
      {/* Buches croisees */}
      <mesh position={[0, 0.4, 0]} rotation={[0, 0, Math.PI / 6]}>
        <cylinderGeometry args={[0.05, 0.05, 0.9, 6]} />
        <meshToonMaterial color={palette.warm.ochreDeep} gradientMap={getToonGradient(3)} />
      </mesh>
      <mesh position={[0, 0.4, 0]} rotation={[0, 0, -Math.PI / 5]}>
        <cylinderGeometry args={[0.05, 0.05, 0.9, 6]} />
        <meshToonMaterial color={palette.warm.ochreDeep} gradientMap={getToonGradient(3)} />
      </mesh>
      {/* Flamme */}
      <mesh position={[0, 0.75, 0]}>
        <coneGeometry args={[0.35, 0.7, 8]} />
        <meshToonMaterial
          color={palette.warm.fire}
          emissive={palette.warm.fire}
          emissiveIntensity={0.6}
          gradientMap={getToonGradient(2)}
        />
      </mesh>
      {/* Flamme sup */}
      <mesh position={[0, 1.05, 0]}>
        <coneGeometry args={[0.2, 0.5, 6]} />
        <meshToonMaterial
          color={palette.warm.duskGold}
          emissive={palette.warm.duskGold}
          emissiveIntensity={0.5}
          gradientMap={getToonGradient(2)}
        />
      </mesh>
      {/* Cendres qui montent en continu */}
      <points ref={emberRef} frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[initialPositions, 3]}
            count={EMBER_COUNT}
          />
        </bufferGeometry>
        <pointsMaterial
          color={palette.warm.duskGold}
          size={0.07}
          transparent
          opacity={0}
          depthWrite={false}
          blending={AdditiveBlending}
          sizeAttenuation
          fog={false}
        />
      </points>
      <pointLight
        ref={lightRef}
        color={palette.warm.fire}
        intensity={2.4}
        distance={14}
        decay={2}
        position={[0, 1.2, 0]}
      />
    </group>
  );
}
