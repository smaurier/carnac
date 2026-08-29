import { Outlines } from "@react-three/drei";
import { palette } from "../palette";
import { getToonGradient } from "../shaders/toon-gradient";
import { outlineThickness } from "../design/outlines";

/**
 * Meshes composant Kel sans logique de mouvement.
 * Utilise a l'interieur d'un Ecctrl qui gere physique + camera.
 * Origine locale = centre inferieur du corps (les pieds a y=0).
 */
export function KelBody() {
  const gradient = getToonGradient(3);
  const bodyColor = palette.warm.ochreWarm;
  const skinColor = palette.skin.b;
  const hairColor = palette.neutrals.charcoal;
  const outline = (
    <Outlines thickness={outlineThickness.xs} color={palette.neutrals.charcoal} />
  );

  return (
    <group>
      <mesh position={[-0.14, 0.32, 0]}>
        <cylinderGeometry args={[0.11, 0.13, 0.64, 8]} />
        <meshToonMaterial color={skinColor} gradientMap={gradient} />
        {outline}
      </mesh>
      <mesh position={[0.14, 0.32, 0]}>
        <cylinderGeometry args={[0.11, 0.13, 0.64, 8]} />
        <meshToonMaterial color={skinColor} gradientMap={gradient} />
        {outline}
      </mesh>
      <mesh position={[0, 0.95, 0]}>
        <cylinderGeometry args={[0.28, 0.34, 0.68, 10]} />
        <meshToonMaterial color={bodyColor} gradientMap={gradient} />
        <Outlines thickness={outlineThickness.sm} color={palette.neutrals.charcoal} />
      </mesh>
      <mesh position={[0, 0.66, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.32, 0.04, 6, 16]} />
        <meshToonMaterial color={palette.warm.ochreDeep} gradientMap={gradient} />
      </mesh>
      <mesh position={[-0.29, 1.18, 0]}>
        <sphereGeometry args={[0.11, 10, 8]} />
        <meshToonMaterial color={bodyColor} gradientMap={gradient} />
        {outline}
      </mesh>
      <mesh position={[0.29, 1.18, 0]}>
        <sphereGeometry args={[0.11, 10, 8]} />
        <meshToonMaterial color={bodyColor} gradientMap={gradient} />
        {outline}
      </mesh>
      <mesh position={[-0.31, 0.9, 0]}>
        <cylinderGeometry args={[0.08, 0.09, 0.5, 8]} />
        <meshToonMaterial color={skinColor} gradientMap={gradient} />
        {outline}
      </mesh>
      <mesh position={[0.31, 0.9, 0]}>
        <cylinderGeometry args={[0.08, 0.09, 0.5, 8]} />
        <meshToonMaterial color={skinColor} gradientMap={gradient} />
        {outline}
      </mesh>
      <mesh position={[0, 1.34, 0]}>
        <cylinderGeometry args={[0.08, 0.09, 0.12, 8]} />
        <meshToonMaterial color={skinColor} gradientMap={gradient} />
      </mesh>
      <mesh position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.19, 14, 12]} />
        <meshToonMaterial color={skinColor} gradientMap={gradient} />
        <Outlines thickness={outlineThickness.xs} color={palette.neutrals.charcoal} />
      </mesh>
      <mesh position={[0, 1.62, 0]}>
        <sphereGeometry args={[0.22, 14, 10, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshToonMaterial color={hairColor} gradientMap={gradient} />
      </mesh>
    </group>
  );
}
