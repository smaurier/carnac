import { forwardRef } from "react";
import type { Group } from "three";
import { palette } from "../palette";
import { getToonGradient } from "../shaders/toon-gradient";

type SkinTone = "a" | "b" | "c" | "d";

interface VillagerProps {
  position?: [number, number, number];
  skin?: SkinTone;
  bodyColor?: string;
  hairColor?: string;
  scale?: number;
}

export const Villager = forwardRef<Group, VillagerProps>(function Villager(
  {
    position = [0, 0, 0],
    skin = "b",
    bodyColor = palette.warm.ochreDeep,
    hairColor = palette.neutrals.charcoal,
    scale = 1,
  },
  ref,
) {
  const skinColor = palette.skin[skin];
  const gradient = getToonGradient(3);

  return (
    <group ref={ref} position={position} scale={scale}>
      <mesh position={[0, 0.9, 0]}>
        <capsuleGeometry args={[0.35, 1.0, 4, 12]} />
        <meshToonMaterial color={bodyColor} gradientMap={gradient} />
      </mesh>
      <mesh position={[0, 1.9, 0]}>
        <sphereGeometry args={[0.32, 16, 12]} />
        <meshToonMaterial color={skinColor} gradientMap={gradient} />
      </mesh>
      <mesh position={[0, 2.05, 0]}>
        <sphereGeometry args={[0.34, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshToonMaterial color={hairColor} gradientMap={gradient} />
      </mesh>
    </group>
  );
});
