import { useMemo } from "react";
import { StandingStone } from "../entities/StandingStone";

interface BackgroundAlignmentProps {
  rowCount?: number;
  spacing?: number;
  baseZ?: number;
  offsetX?: number;
}

interface AlignmentInstance {
  readonly position: [number, number, number];
  readonly scale: number;
}

function pseudoRand(seed: number): number {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

function buildAlignment(
  rowCount: number,
  spacing: number,
  baseZ: number,
  offsetX: number,
): readonly AlignmentInstance[] {
  const instances: AlignmentInstance[] = [];
  for (let i = 0; i < rowCount; i += 1) {
    const jitterX = (pseudoRand(i + 1) - 0.5) * spacing * 0.35;
    const jitterZ = (pseudoRand(i + 42) - 0.5) * 2.4;
    const x = offsetX + (i - (rowCount - 1) / 2) * spacing + jitterX;
    const z = baseZ + jitterZ;
    const scaleJitter = pseudoRand(i + 99);
    const scale = 0.7 + scaleJitter * 0.55;
    instances.push({ position: [x, 0, z], scale });
  }
  return instances;
}

export function BackgroundAlignment({
  rowCount = 9,
  spacing = 3.2,
  baseZ = -18,
  offsetX = 0,
}: BackgroundAlignmentProps) {
  const instances = useMemo(
    () => buildAlignment(rowCount, spacing, baseZ, offsetX),
    [rowCount, spacing, baseZ, offsetX],
  );

  const noop = () => {};

  return (
    <>
      {instances.map((inst, i) => (
        <StandingStone
          key={i}
          position={inst.position}
          placed
          scale={inst.scale}
          interactive={false}
          onPlace={noop}
        />
      ))}
    </>
  );
}
