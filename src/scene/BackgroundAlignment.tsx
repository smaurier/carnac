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

function buildAlignment(
  rowCount: number,
  spacing: number,
  baseZ: number,
  offsetX: number,
): readonly AlignmentInstance[] {
  const instances: AlignmentInstance[] = [];
  for (let i = 0; i < rowCount; i += 1) {
    const x = offsetX + (i - (rowCount - 1) / 2) * spacing;
    const jitter = ((i * 137) % 7) / 7;
    const scale = 0.75 + jitter * 0.45;
    instances.push({ position: [x, 0, baseZ], scale });
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
