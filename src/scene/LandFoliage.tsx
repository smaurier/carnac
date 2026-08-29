import { useMemo } from "react";
import { palette } from "../palette";
import { getToonGradient } from "../shaders/toon-gradient";
import { GroundShadow } from "../entities/GroundShadow";

type FoliageKind = "gorse" | "heather" | "grass" | "rock" | "fern" | "oakBush" | "bramble";

interface FoliageInstance {
  readonly kind: FoliageKind;
  readonly position: [number, number, number];
  readonly rotation: number;
  readonly scale: number;
}

function seededRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 0xffffffff;
  };
}

function createFoliage(seed: number, count: number, innerRadius: number, outerRadius: number): readonly FoliageInstance[] {
  const rand = seededRandom(seed);
  const instances: FoliageInstance[] = [];
  const kinds: FoliageKind[] = [
    "gorse",
    "gorse",
    "heather",
    "heather",
    "grass",
    "grass",
    "fern",
    "oakBush",
    "bramble",
    "rock",
  ];
  for (let i = 0; i < count; i += 1) {
    const angle = rand() * Math.PI * 2;
    const radius = innerRadius + rand() * (outerRadius - innerRadius);
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const kind = kinds[Math.floor(rand() * kinds.length)];
    const scale = 0.6 + rand() * 0.7;
    instances.push({
      kind,
      position: [x, 0, z],
      rotation: rand() * Math.PI * 2,
      scale,
    });
  }
  return instances;
}

interface GorseProps {
  scale: number;
}
function Gorse({ scale }: GorseProps) {
  return (
    <group>
      <GroundShadow radius={0.22 * scale} opacity={0.35} />
      <mesh position={[0, 0.15 * scale, 0]} scale={scale}>
        <coneGeometry args={[0.22, 0.4, 5]} />
        <meshToonMaterial color={palette.warm.ochreDeep} gradientMap={getToonGradient(3)} />
      </mesh>
      <mesh position={[0, 0.35 * scale, 0]} scale={scale}>
        <sphereGeometry args={[0.16, 6, 5]} />
        <meshToonMaterial color={palette.flora.gorse} gradientMap={getToonGradient(3)} />
      </mesh>
    </group>
  );
}

function Heather({ scale }: { scale: number }) {
  return (
    <group>
      <GroundShadow radius={0.22 * scale} opacity={0.3} />
      <mesh position={[0, 0.1 * scale, 0]} scale={scale}>
        <dodecahedronGeometry args={[0.18, 0]} />
        <meshToonMaterial color={palette.flora.heather} gradientMap={getToonGradient(3)} />
      </mesh>
    </group>
  );
}

function GrassTuft({ scale }: { scale: number }) {
  return (
    <group>
      <GroundShadow radius={0.14 * scale} opacity={0.25} />
      <mesh position={[0, 0.12 * scale, 0]} scale={scale}>
        <coneGeometry args={[0.1, 0.28, 4]} />
        <meshToonMaterial color={palette.flora.grassDry} gradientMap={getToonGradient(3)} />
      </mesh>
    </group>
  );
}

function SmallRock({ scale }: { scale: number }) {
  return (
    <group>
      <GroundShadow radius={0.26 * scale} opacity={0.4} />
      <mesh position={[0, 0.14 * scale, 0]} scale={scale}>
        <dodecahedronGeometry args={[0.22, 0]} />
        <meshToonMaterial color={palette.neutrals.granitMid} gradientMap={getToonGradient(3)} />
      </mesh>
    </group>
  );
}

function Fern({ scale }: { scale: number }) {
  return (
    <group>
      <GroundShadow radius={0.28 * scale} opacity={0.3} />
      <mesh position={[0, 0.25 * scale, 0]} scale={scale} rotation={[0.35, 0, 0]}>
        <coneGeometry args={[0.24, 0.55, 4]} />
        <meshToonMaterial color={palette.flora.grass} gradientMap={getToonGradient(3)} />
      </mesh>
      <mesh position={[0.08 * scale, 0.22 * scale, 0.08 * scale]} scale={scale * 0.7} rotation={[0.35, 0.9, 0]}>
        <coneGeometry args={[0.2, 0.48, 4]} />
        <meshToonMaterial color={palette.flora.grass} gradientMap={getToonGradient(3)} />
      </mesh>
      <mesh position={[-0.09 * scale, 0.22 * scale, -0.06 * scale]} scale={scale * 0.65} rotation={[0.35, -0.7, 0]}>
        <coneGeometry args={[0.2, 0.45, 4]} />
        <meshToonMaterial color={palette.flora.grassDry} gradientMap={getToonGradient(3)} />
      </mesh>
    </group>
  );
}

function OakBush({ scale }: { scale: number }) {
  return (
    <group>
      <GroundShadow radius={0.42 * scale} opacity={0.45} />
      <mesh position={[0, 0.28 * scale, 0]} scale={scale}>
        <cylinderGeometry args={[0.05, 0.08, 0.42, 6]} />
        <meshToonMaterial color={palette.warm.ochreDeep} gradientMap={getToonGradient(3)} />
      </mesh>
      <mesh position={[0, 0.55 * scale, 0]} scale={scale}>
        <dodecahedronGeometry args={[0.36, 0]} />
        <meshToonMaterial color={palette.flora.grass} gradientMap={getToonGradient(3)} />
      </mesh>
      <mesh position={[0.18 * scale, 0.48 * scale, 0.1 * scale]} scale={scale * 0.6}>
        <dodecahedronGeometry args={[0.24, 0]} />
        <meshToonMaterial color={palette.flora.grass} gradientMap={getToonGradient(3)} />
      </mesh>
    </group>
  );
}

function Bramble({ scale }: { scale: number }) {
  return (
    <group>
      <GroundShadow radius={0.35 * scale} opacity={0.35} />
      <mesh position={[0, 0.18 * scale, 0]} scale={scale}>
        <sphereGeometry args={[0.28, 10, 8]} />
        <meshToonMaterial color={palette.flora.grassDry} gradientMap={getToonGradient(3)} />
      </mesh>
      <mesh position={[0.12 * scale, 0.22 * scale, -0.05 * scale]} scale={scale * 0.7}>
        <sphereGeometry args={[0.2, 8, 8]} />
        <meshToonMaterial color={palette.flora.heather} gradientMap={getToonGradient(3)} />
      </mesh>
    </group>
  );
}

interface LandFoliageProps {
  seed?: number;
  count?: number;
}

export function LandFoliage({ seed = 4500, count = 60 }: LandFoliageProps) {
  const instances = useMemo(
    () => createFoliage(seed, count, 5, 14),
    [seed, count],
  );
  return (
    <>
      {instances.map((inst, i) => (
        <group
          key={i}
          position={inst.position}
          rotation={[0, inst.rotation, 0]}
        >
          {inst.kind === "gorse" && <Gorse scale={inst.scale} />}
          {inst.kind === "heather" && <Heather scale={inst.scale} />}
          {inst.kind === "grass" && <GrassTuft scale={inst.scale} />}
          {inst.kind === "rock" && <SmallRock scale={inst.scale} />}
          {inst.kind === "fern" && <Fern scale={inst.scale} />}
          {inst.kind === "oakBush" && <OakBush scale={inst.scale} />}
          {inst.kind === "bramble" && <Bramble scale={inst.scale} />}
        </group>
      ))}
    </>
  );
}
