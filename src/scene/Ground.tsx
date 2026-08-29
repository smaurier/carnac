import { useMemo } from "react";
import type { ThreeEvent } from "@react-three/fiber";
import { Color, ShaderMaterial } from "three";
import { palette } from "../palette";

interface GroundProps {
  onMoveTarget: (x: number, z: number) => void;
}

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform vec3 groundColor;
  varying vec2 vUv;
  void main() {
    float dx = vUv.x - 0.5;
    float dy = vUv.y - 0.5;
    float dist = sqrt(dx * dx + dy * dy) * 2.0;
    float alpha = 1.0 - smoothstep(0.7, 1.0, dist);
    gl_FragColor = vec4(groundColor, alpha);
  }
`;

export function Ground({ onMoveTarget }: GroundProps) {
  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    onMoveTarget(event.point.x, event.point.z);
  };

  const material = useMemo(() => {
    return new ShaderMaterial({
      uniforms: {
        groundColor: { value: new Color(palette.warm.ochreWarm) },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
    });
  }, []);

  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, 0, 0]}
      onClick={handleClick}
      material={material}
    >
      <planeGeometry args={[36, 36, 1, 1]} />
    </mesh>
  );
}
