import { useMemo } from "react";
import { Outlines } from "@react-three/drei";
import { palette } from "../palette";
import { getToonGradient } from "../shaders/toon-gradient";
import { outlineThickness } from "../design/outlines";

interface TreeInstance {
  readonly position: [number, number, number];
  readonly height: number;
  readonly crownRadius: number;
  readonly crownColor: string;
  readonly rotation: number;
}

function seededRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 0xffffffff;
  };
}

/**
 * Forêt en arrière-plan (Nord et Est du campement).
 * Arbres low-poly stylisés · chêne + noisetier + orme (essences
 * néolithique moyen atteste en Bretagne, docs/climat-flore-faune-
 * epoques.md).
 * Densité progressive : plus dense au coeur, plus sparse en bordure.
 */
function generateTrees(count: number, seed: number): TreeInstance[] {
  const rand = seededRandom(seed);
  const trees: TreeInstance[] = [];
  const canopyColors = [
    palette.flora.mossDamp,
    palette.flora.grassMeadow,
    palette.flora.grass,
  ];
  for (let i = 0; i < count; i += 1) {
    const angle = -0.9 + rand() * 3.4;
    const dist = 40 + rand() * 45;
    const x = Math.cos(angle) * dist;
    const z = Math.sin(angle) * dist;
    const height = 3.5 + rand() * 3.5;
    const crownRadius = 1.4 + rand() * 1.4;
    trees.push({
      position: [x, 0, z],
      height,
      crownRadius,
      crownColor: canopyColors[Math.floor(rand() * canopyColors.length)],
      rotation: rand() * Math.PI * 2,
    });
  }
  return trees;
}

interface ForestBackdropProps {
  count?: number;
  seed?: number;
}

export function ForestBackdrop({
  count = 40,
  seed = 4321,
}: ForestBackdropProps) {
  const trees = useMemo(() => generateTrees(count, seed), [count, seed]);
  const gradient = getToonGradient(3);

  return (
    <>
      {trees.map((tree, i) => (
        <group key={i} position={tree.position} rotation={[0, tree.rotation, 0]}>
          {/* Ombre au sol */}
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, 0.02, 0]}
          >
            <circleGeometry args={[tree.crownRadius * 0.8, 16]} />
            <meshBasicMaterial
              color={palette.neutrals.charcoal}
              transparent
              opacity={0.4}
              depthWrite={false}
            />
          </mesh>
          {/* Tronc */}
          <mesh position={[0, tree.height / 2, 0]}>
            <cylinderGeometry
              args={[0.18, 0.28, tree.height, 6]}
            />
            <meshToonMaterial
              color={palette.warm.ochreDeep}
              gradientMap={gradient}
            />
            <Outlines
              thickness={outlineThickness.sm}
              color={palette.neutrals.charcoal}
            />
          </mesh>
          {/* Feuillage (grande sphère + 2 petites) */}
          <mesh position={[0, tree.height + tree.crownRadius * 0.4, 0]}>
            <sphereGeometry args={[tree.crownRadius, 8, 6]} />
            <meshToonMaterial
              color={tree.crownColor}
              gradientMap={gradient}
            />
            <Outlines
              thickness={outlineThickness.md}
              color={palette.neutrals.charcoal}
            />
          </mesh>
          <mesh
            position={[
              tree.crownRadius * 0.5,
              tree.height + tree.crownRadius * 0.7,
              0,
            ]}
          >
            <sphereGeometry args={[tree.crownRadius * 0.7, 6, 5]} />
            <meshToonMaterial
              color={tree.crownColor}
              gradientMap={gradient}
            />
          </mesh>
          <mesh
            position={[
              -tree.crownRadius * 0.4,
              tree.height + tree.crownRadius * 0.6,
              tree.crownRadius * 0.3,
            ]}
          >
            <sphereGeometry args={[tree.crownRadius * 0.6, 6, 5]} />
            <meshToonMaterial
              color={tree.crownColor}
              gradientMap={gradient}
            />
          </mesh>
        </group>
      ))}
    </>
  );
}
