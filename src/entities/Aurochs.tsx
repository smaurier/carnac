import { Outlines } from "@react-three/drei";
import { palette } from "../palette";
import { getToonGradient } from "../shaders/toon-gradient";
import { outlineThickness } from "../design/outlines";
import { GroundShadow } from "./GroundShadow";

interface AurochsProps {
  position?: [number, number, number];
  rotation?: number;
  scale?: number;
}

/**
 * Aurochs (Bos primigenius) · grand bovide sauvage neolithique
 * europeen, eteint definitivement en 1627 en Pologne. Reconstitution
 * archeozoologique : plus grand qu'un boeuf moderne, cornes tres
 * longues courbees vers l'avant, pelage brun-fauce.
 * Ici represente en silhouette lointaine dans la lande.
 */
export function Aurochs({
  position = [0, 0, 0],
  rotation = 0,
  scale = 1,
}: AurochsProps) {
  const gradient = getToonGradient(3);
  const bodyColor = palette.warm.ochreDeep;
  const dark = palette.neutrals.charcoal;
  const belly = palette.warm.earthRed;
  const outline = (
    <Outlines thickness={outlineThickness.sm} color={palette.neutrals.charcoal} />
  );

  return (
    <group position={position} rotation={[0, rotation, 0]} scale={scale}>
      <GroundShadow radius={1.1} opacity={0.55} />
      {/* Corps massif horizontal */}
      <mesh position={[0, 1.0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <capsuleGeometry args={[0.45, 1.2, 4, 12]} />
        <meshToonMaterial color={bodyColor} gradientMap={gradient} />
        {outline}
      </mesh>
      {/* Ventre plus fonce (marque aurochs) */}
      <mesh position={[0, 0.78, 0]} rotation={[0, 0, Math.PI / 2]}>
        <capsuleGeometry args={[0.28, 1.0, 4, 10]} />
        <meshToonMaterial color={belly} gradientMap={gradient} />
      </mesh>
      {/* 4 pattes robustes */}
      <mesh position={[-0.6, 0.42, 0.25]}>
        <cylinderGeometry args={[0.1, 0.12, 0.8, 8]} />
        <meshToonMaterial color={dark} gradientMap={gradient} />
      </mesh>
      <mesh position={[0.6, 0.42, 0.25]}>
        <cylinderGeometry args={[0.1, 0.12, 0.8, 8]} />
        <meshToonMaterial color={dark} gradientMap={gradient} />
      </mesh>
      <mesh position={[-0.6, 0.42, -0.25]}>
        <cylinderGeometry args={[0.1, 0.12, 0.8, 8]} />
        <meshToonMaterial color={dark} gradientMap={gradient} />
      </mesh>
      <mesh position={[0.6, 0.42, -0.25]}>
        <cylinderGeometry args={[0.1, 0.12, 0.8, 8]} />
        <meshToonMaterial color={dark} gradientMap={gradient} />
      </mesh>
      {/* Bosse epaule (aurochs marque) */}
      <mesh position={[0.5, 1.32, 0]}>
        <sphereGeometry args={[0.3, 12, 10]} />
        <meshToonMaterial color={bodyColor} gradientMap={gradient} />
      </mesh>
      {/* Cou massif */}
      <mesh position={[0.9, 1.15, 0]} rotation={[0, 0, -Math.PI / 8]}>
        <cylinderGeometry args={[0.2, 0.3, 0.5, 10]} />
        <meshToonMaterial color={bodyColor} gradientMap={gradient} />
      </mesh>
      {/* Tete */}
      <mesh position={[1.15, 1.28, 0]}>
        <sphereGeometry args={[0.28, 14, 12]} />
        <meshToonMaterial color={bodyColor} gradientMap={gradient} />
        {outline}
      </mesh>
      {/* Museau */}
      <mesh position={[1.42, 1.15, 0]} rotation={[0, 0, -Math.PI / 12]}>
        <coneGeometry args={[0.14, 0.32, 8]} />
        <meshToonMaterial color={dark} gradientMap={gradient} />
      </mesh>
      {/* Cornes longues courbees vers avant (marque aurochs) */}
      <mesh position={[1.16, 1.5, -0.18]} rotation={[0, 0, -0.5]}>
        <coneGeometry args={[0.055, 0.65, 6]} />
        <meshToonMaterial color={palette.neutrals.boneWhite} gradientMap={gradient} />
      </mesh>
      <mesh position={[1.16, 1.5, 0.18]} rotation={[0, 0, -0.5]}>
        <coneGeometry args={[0.055, 0.65, 6]} />
        <meshToonMaterial color={palette.neutrals.boneWhite} gradientMap={gradient} />
      </mesh>
      {/* Queue */}
      <mesh position={[-0.85, 1.0, 0]} rotation={[0, 0, Math.PI / 4]}>
        <cylinderGeometry args={[0.03, 0.05, 0.45, 6]} />
        <meshToonMaterial color={bodyColor} gradientMap={gradient} />
      </mesh>
    </group>
  );
}
