import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3, type Group } from "three";
import { Villager } from "./Villager";
import { StandingStone } from "./StandingStone";
import { palette } from "../palette";

interface RitualCompanionProps {
  active: boolean;
  restingPosition: [number, number, number];
  approachPosition: [number, number, number];
  secondStonePosition: [number, number, number];
  onArrived?: () => void;
}

const APPROACH_SPEED = 1.2;
const ARRIVAL_EPSILON = 0.15;
const tmp = new Vector3();

export function RitualCompanion({
  active,
  restingPosition,
  approachPosition,
  secondStonePosition,
  onArrived,
}: RitualCompanionProps) {
  const groupRef = useRef<Group>(null);
  const [arrived, setArrived] = useState(false);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;
    if (!active || arrived) return;

    tmp.set(approachPosition[0], approachPosition[1], approachPosition[2]);
    const distance = group.position.distanceTo(tmp);

    if (distance < ARRIVAL_EPSILON) {
      setArrived(true);
      onArrived?.();
      return;
    }

    tmp.sub(group.position).normalize().multiplyScalar(
      Math.min(APPROACH_SPEED * delta, distance),
    );
    group.position.add(tmp);
  });

  return (
    <>
      <group ref={groupRef} position={restingPosition}>
        <Villager
          skin="b"
          bodyColor={palette.warm.ochreDeep}
          hairColor={palette.warm.ochreDeep}
        />
      </group>

      {arrived && (
        <StandingStone
          position={secondStonePosition}
          placed
          scale={0.55}
          onPlace={() => {}}
          interactive={false}
        />
      )}
    </>
  );
}
