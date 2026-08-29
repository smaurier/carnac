import { Outlines } from "@react-three/drei";
import { palette } from "../palette";
import { getToonGradient } from "../shaders/toon-gradient";
import { outlineThickness } from "../design/outlines";
import { GroundShadow } from "./GroundShadow";

interface HutProps {
  position?: [number, number, number];
  rotation?: number;
  scale?: number;
}

export function Hut({
  position = [0, 0, 0],
  rotation = 0,
  scale = 1,
}: HutProps) {
  const gradient = getToonGradient(3);
  const wallColor = palette.warm.ochreDeep;
  const roofColor = palette.neutrals.granitDark;
  const doorColor = palette.neutrals.charcoal;

  return (
    <group position={position} rotation={[0, rotation, 0]} scale={scale}>
      <GroundShadow radius={1.6} opacity={0.5} />

      {/* Base cylindrique torchis */}
      <mesh position={[0, 0.75, 0]}>
        <cylinderGeometry args={[1.35, 1.5, 1.5, 12]} />
        <meshToonMaterial color={wallColor} gradientMap={gradient} />
        <Outlines thickness={outlineThickness.md} color={palette.neutrals.charcoal} />
      </mesh>

      {/* Poteaux verticaux visibles (structure) */}
      {[0, 1, 2, 3, 4].map((i) => {
        const angle = (i / 5) * Math.PI * 2;
        const x = Math.cos(angle) * 1.42;
        const z = Math.sin(angle) * 1.42;
        return (
          <mesh key={i} position={[x, 0.75, z]}>
            <cylinderGeometry args={[0.05, 0.05, 1.55, 6]} />
            <meshToonMaterial color={palette.neutrals.charcoal} gradientMap={gradient} />
          </mesh>
        );
      })}

      {/* Toit chaume conique */}
      <mesh position={[0, 2.1, 0]}>
        <coneGeometry args={[1.75, 1.3, 12]} />
        <meshToonMaterial color={roofColor} gradientMap={gradient} />
        <Outlines thickness={outlineThickness.md} color={palette.neutrals.charcoal} />
      </mesh>

      {/* Épi de toit (couronne torsadée) */}
      <mesh position={[0, 2.85, 0]}>
        <coneGeometry args={[0.14, 0.32, 8]} />
        <meshToonMaterial color={palette.warm.ochreDeep} gradientMap={gradient} />
      </mesh>

      {/* Entrée (arche sombre) */}
      <mesh position={[0, 0.55, 1.45]}>
        <boxGeometry args={[0.55, 1.05, 0.15]} />
        <meshToonMaterial color={doorColor} gradientMap={gradient} />
      </mesh>

      {/* Linteau au-dessus de la porte */}
      <mesh position={[0, 1.15, 1.5]}>
        <boxGeometry args={[0.7, 0.14, 0.14]} />
        <meshToonMaterial color={palette.neutrals.granitDark} gradientMap={gradient} />
      </mesh>
    </group>
  );
}
