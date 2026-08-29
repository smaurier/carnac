import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Outlines } from "@react-three/drei";
import { useGame } from "ecctrl";
import type { Mesh } from "three";
import { palette } from "../palette";
import { getToonGradient } from "../shaders/toon-gradient";
import { outlineThickness } from "../design/outlines";

/**
 * Meshes composant Kel + animation walk/idle basee sur
 * useGame().curAnimation d'Ecctrl.
 * Position pieds a y=0 dans le groupe local, decalage
 * -CAPSULE_OFFSET fait dans Player pour poser sur le sol.
 */
const WALK_FREQ = 7;
const WALK_LEG_AMP = 0.55;
const WALK_ARM_AMP = 0.45;

export function KelBody() {
  const leftLegRef = useRef<Mesh>(null);
  const rightLegRef = useRef<Mesh>(null);
  const leftArmRef = useRef<Mesh>(null);
  const rightArmRef = useRef<Mesh>(null);
  const walkPhaseRef = useRef(0);
  const curAnimation = useGame((s) => s.curAnimation);

  const gradient = getToonGradient(3);
  const bodyColor = palette.warm.ochreWarm;
  const skinColor = palette.skin.b;
  const hairColor = palette.neutrals.charcoal;
  const outline = (
    <Outlines thickness={outlineThickness.xs} color={palette.neutrals.charcoal} />
  );

  useFrame((_, delta) => {
    const moving = curAnimation === "walk" || curAnimation === "run";
    const speedMult = curAnimation === "run" ? 1.6 : 1;
    if (moving) walkPhaseRef.current += delta * WALK_FREQ * speedMult;
    const swing = moving ? Math.sin(walkPhaseRef.current) : 0;
    const swingOpp = moving ? Math.sin(walkPhaseRef.current + Math.PI) : 0;
    if (leftLegRef.current) leftLegRef.current.rotation.x = swing * WALK_LEG_AMP;
    if (rightLegRef.current) rightLegRef.current.rotation.x = swingOpp * WALK_LEG_AMP;
    if (leftArmRef.current) leftArmRef.current.rotation.x = swingOpp * WALK_ARM_AMP;
    if (rightArmRef.current) rightArmRef.current.rotation.x = swing * WALK_ARM_AMP;
  });

  return (
    <group>
      <mesh ref={leftLegRef} position={[-0.14, 0.32, 0]}>
        <cylinderGeometry args={[0.11, 0.13, 0.64, 8]} />
        <meshToonMaterial color={skinColor} gradientMap={gradient} />
        {outline}
      </mesh>
      <mesh ref={rightLegRef} position={[0.14, 0.32, 0]}>
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
      <mesh ref={leftArmRef} position={[-0.31, 0.9, 0]}>
        <cylinderGeometry args={[0.08, 0.09, 0.5, 8]} />
        <meshToonMaterial color={skinColor} gradientMap={gradient} />
        {outline}
      </mesh>
      <mesh ref={rightArmRef} position={[0.31, 0.9, 0]}>
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
