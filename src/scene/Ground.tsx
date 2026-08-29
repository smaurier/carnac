import type { ThreeEvent } from "@react-three/fiber";
import { palette } from "../palette";
import { getToonGradient } from "../shaders/toon-gradient";

interface GroundProps {
  onMoveTarget: (x: number, z: number) => void;
}

export function Ground({ onMoveTarget }: GroundProps) {
  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    onMoveTarget(event.point.x, event.point.z);
  };

  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, 0, 0]}
      onClick={handleClick}
    >
      <planeGeometry args={[30, 30]} />
      <meshToonMaterial color={palette.warm.ochreWarm} gradientMap={getToonGradient(3)} />
    </mesh>
  );
}
