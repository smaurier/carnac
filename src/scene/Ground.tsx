import { useMemo } from "react";
import type { ThreeEvent } from "@react-three/fiber";
import { Color, ShaderMaterial, DoubleSide } from "three";
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
  uniform vec3 meadowColor;
  uniform vec3 mossColor;
  uniform vec3 trampledColor;
  varying vec2 vUv;
  void main() {
    float dx = vUv.x - 0.5;
    float dy = vUv.y - 0.5;
    float dist = sqrt(dx * dx + dy * dy) * 2.0;
    float alpha = 1.0 - smoothstep(0.7, 1.0, dist);
    // Zone piétinée au centre (rayon ~0.12 en UV = ~4.3u sur plane 36u)
    float trampled = 1.0 - smoothstep(0.08, 0.16, dist);
    // Variation naturelle prairie / mousse
    float mossMix = smoothstep(0.15, 0.5, dist) * (0.4 + 0.6 * sin(vUv.x * 18.0) * sin(vUv.y * 15.0));
    vec3 groundBase = mix(meadowColor, mossColor, clamp(mossMix, 0.0, 0.6));
    vec3 color = mix(groundBase, trampledColor, trampled);
    gl_FragColor = vec4(color, alpha);
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
        meadowColor: { value: new Color(palette.flora.grassMeadow) },
        mossColor: { value: new Color(palette.flora.mossDamp) },
        trampledColor: { value: new Color(palette.flora.trampledEarth) },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      side: DoubleSide,
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
