import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Mesh } from "three";
import { Vector3 } from "three";
import { palette } from "../palette";

interface PlayerProps {
  target: [number, number];
  speed?: number;
}

const tmp = new Vector3();

export function Player({ target, speed = 4 }: PlayerProps) {
  const ref = useRef<Mesh>(null);

  useFrame((_, delta) => {
    const mesh = ref.current;
    if (!mesh) return;
    tmp.set(target[0], mesh.position.y, target[1]);
    const distance = mesh.position.distanceTo(tmp);
    if (distance < 0.05) return;
    tmp.sub(mesh.position);
    tmp.normalize().multiplyScalar(Math.min(speed * delta, distance));
    mesh.position.add(tmp);
  });

  return (
    <mesh ref={ref} position={[0, 0.9, 0]} castShadow={false}>
      <capsuleGeometry args={[0.35, 1.0, 4, 12]} />
      <meshStandardMaterial color={palette.skin.b} roughness={0.9} />
    </mesh>
  );
}
