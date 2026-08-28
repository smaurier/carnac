import { forwardRef } from "react";
import type { Group } from "three";
import { palette } from "../palette";

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

  return (
    <group ref={ref} position={position} scale={scale}>
      <mesh position={[0, 0.9, 0]}>
        <capsuleGeometry args={[0.35, 1.0, 4, 12]} />
        <meshStandardMaterial color={bodyColor} roughness={0.9} />
      </mesh>
      <mesh position={[0, 1.9, 0]}>
        <sphereGeometry args={[0.32, 16, 12]} />
        <meshStandardMaterial color={skinColor} roughness={0.9} />
      </mesh>
      <mesh position={[0, 2.05, 0]}>
        <sphereGeometry args={[0.34, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={hairColor} roughness={0.95} />
      </mesh>
    </group>
  );
});
