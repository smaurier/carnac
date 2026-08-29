import { Outlines } from "@react-three/drei";
import { palette } from "../palette";
import { getToonGradient } from "../shaders/toon-gradient";
import { outlineThickness } from "../design/outlines";
import { GroundShadow } from "./GroundShadow";

interface VannBasketProps {
  position?: [number, number, number];
  rotation?: number;
}

/**
 * Panier tresse en fibres vegetales avec coquillages a cote,
 * marqueur d'activite de peche (Vann rentre de la mer, storyboard
 * scene 1.3). Fibres vegetales tressees = technique attestee au
 * Neolithique, coquillages = amas coquilliers documentes en Bretagne
 * (Teviec, Hoedic, Golfe du Morbihan).
 */
export function VannBasket({
  position = [0, 0, 0],
  rotation = 0,
}: VannBasketProps) {
  const gradient = getToonGradient(3);
  const wickerColor = palette.warm.ochreDeep;
  const shellColor = palette.neutrals.boneWhite;
  const outline = (
    <Outlines thickness={outlineThickness.xs} color={palette.neutrals.charcoal} />
  );

  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <GroundShadow radius={0.45} opacity={0.4} />

      {/* Panier tresse (cylindre bas) */}
      <mesh position={[0, 0.22, 0]}>
        <cylinderGeometry args={[0.28, 0.32, 0.44, 12]} />
        <meshToonMaterial color={wickerColor} gradientMap={gradient} />
        {outline}
      </mesh>
      {/* Bordure du panier */}
      <mesh position={[0, 0.45, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.28, 0.03, 6, 20]} />
        <meshToonMaterial color={palette.warm.ochreWarm} gradientMap={gradient} />
      </mesh>

      {/* Coquillages disperses au sol autour */}
      <mesh position={[0.4, 0.05, 0.15]} rotation={[Math.PI / 3, 0.5, 0]}>
        <sphereGeometry args={[0.08, 12, 8]} />
        <meshToonMaterial color={shellColor} gradientMap={gradient} />
      </mesh>
      <mesh position={[-0.35, 0.05, 0.25]} rotation={[Math.PI / 2.5, -0.3, 0]}>
        <sphereGeometry args={[0.07, 12, 8]} />
        <meshToonMaterial color={palette.neutrals.granitLight} gradientMap={gradient} />
      </mesh>
      <mesh position={[0.25, 0.05, -0.35]} rotation={[Math.PI / 2.8, 0.9, 0]}>
        <sphereGeometry args={[0.09, 12, 8]} />
        <meshToonMaterial color={shellColor} gradientMap={gradient} />
      </mesh>
      <mesh position={[-0.15, 0.35, -0.05]} rotation={[Math.PI / 2, 0, 0]}>
        <sphereGeometry args={[0.06, 12, 8]} />
        <meshToonMaterial color={palette.warm.ochreWarm} gradientMap={gradient} />
      </mesh>
      <mesh position={[0.05, 0.35, 0.12]} rotation={[Math.PI / 2, 0.5, 0]}>
        <sphereGeometry args={[0.07, 12, 8]} />
        <meshToonMaterial color={shellColor} gradientMap={gradient} />
      </mesh>
    </group>
  );
}
