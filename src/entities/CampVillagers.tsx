import { Villager } from "./Villager";
import { palette } from "../palette";

interface CampVillagersProps {
  visible: boolean;
}

interface VillagerConfig {
  readonly id: string;
  readonly position: [number, number, number];
  readonly skin: "a" | "b" | "c" | "d";
  readonly bodyColor: string;
  readonly hairColor: string;
  readonly scale: number;
}

const campVillagers: readonly VillagerConfig[] = [
  {
    id: "athro",
    position: [1.2, 0, -1.4],
    skin: "c",
    bodyColor: palette.warm.ochreDeep,
    hairColor: palette.neutrals.boneWhite,
    scale: 1,
  },
  {
    id: "vann",
    position: [4.5, 0, -3.8],
    skin: "b",
    bodyColor: palette.warm.ochreDeep,
    hairColor: palette.warm.ochreDeep,
    scale: 1.05,
  },
  {
    id: "nia",
    position: [-3.5, 0, 1.8],
    skin: "a",
    bodyColor: palette.warm.ochreWarm,
    hairColor: palette.warm.ochreDeep,
    scale: 0.72,
  },
];

export function CampVillagers({ visible }: CampVillagersProps) {
  if (!visible) return null;
  return (
    <>
      {campVillagers.map((v) => (
        <Villager
          key={v.id}
          position={v.position}
          skin={v.skin}
          bodyColor={v.bodyColor}
          hairColor={v.hairColor}
          scale={v.scale}
        />
      ))}
    </>
  );
}
