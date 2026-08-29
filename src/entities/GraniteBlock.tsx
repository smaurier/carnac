import { Outlines } from "@react-three/drei";
import { palette } from "../palette";
import { getToonGradient } from "../shaders/toon-gradient";
import { outlineThickness } from "../design/outlines";
import { GroundShadow } from "./GroundShadow";

interface GraniteBlockProps {
  position?: [number, number, number];
  seed?: number;
  scale?: number;
}

function pseudo(seed: number, offset: number): number {
  const s = Math.sin((seed + offset) * 12.9898) * 43758.5453;
  return s - Math.floor(s);
}

export function GraniteBlock({
  position = [0, 0, 0],
  seed = 1,
  scale = 1,
}: GraniteBlockProps) {
  const gradient = getToonGradient(3);
  const color = palette.neutrals.granitMid;
  const outline = (
    <Outlines thickness={outlineThickness.md} color={palette.neutrals.charcoal} />
  );

  const bumps = [
    {
      pos: [0, 0.5 * scale, 0] as [number, number, number],
      size: 0.85 * scale,
      rot: pseudo(seed, 0) * Math.PI * 2,
      tilt: (pseudo(seed, 1) - 0.5) * 0.4,
    },
    {
      pos: [
        (pseudo(seed, 2) - 0.5) * 0.7 * scale,
        (0.35 + pseudo(seed, 3) * 0.2) * scale,
        (pseudo(seed, 4) - 0.5) * 0.7 * scale,
      ] as [number, number, number],
      size: (0.55 + pseudo(seed, 5) * 0.2) * scale,
      rot: pseudo(seed, 6) * Math.PI * 2,
      tilt: (pseudo(seed, 7) - 0.5) * 0.6,
    },
    {
      pos: [
        (pseudo(seed, 8) - 0.5) * 0.6 * scale,
        (0.2 + pseudo(seed, 9) * 0.3) * scale,
        (pseudo(seed, 10) - 0.5) * 0.6 * scale,
      ] as [number, number, number],
      size: (0.4 + pseudo(seed, 11) * 0.2) * scale,
      rot: pseudo(seed, 12) * Math.PI * 2,
      tilt: (pseudo(seed, 13) - 0.5) * 0.5,
    },
  ];

  return (
    <group position={position}>
      <GroundShadow radius={0.9 * scale} opacity={0.5} />
      {bumps.map((bump, i) => (
        <mesh
          key={i}
          position={bump.pos}
          rotation={[bump.tilt, bump.rot, bump.tilt * 0.5]}
        >
          <dodecahedronGeometry args={[bump.size, 0]} />
          <meshToonMaterial color={color} gradientMap={gradient} />
          {outline}
        </mesh>
      ))}
    </group>
  );
}
