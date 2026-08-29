import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Color, ShaderMaterial, DoubleSide } from "three";
import { palette } from "../palette";
import type { DayPhase } from "../palette";

interface SeaHorizonProps {
  phase: DayPhase;
}

const seaColors: Record<DayPhase, string> = {
  dawn: palette.cool.slateSea,
  noon: palette.cool.slateSea,
  dusk: palette.cool.slateSea,
  night: palette.cool.deepBlue,
};

const SEA_SIZE = 1200;

const vertexShader = `
  varying vec3 vWorldPos;
  void main() {
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPos = worldPos.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

const fragmentShader = `
  uniform vec3 seaColor;
  uniform float time;
  varying vec3 vWorldPos;

  void main() {
    // Vagues subtiles longues, pas de mousse decorative
    float wave = sin(vWorldPos.x * 0.09 + time * 0.25)
               * cos(vWorldPos.z * 0.07 - time * 0.18);
    float shade = 1.0 + wave * 0.06;
    vec3 col = seaColor * shade;
    gl_FragColor = vec4(col, 1.0);
  }
`;

export function SeaHorizon({ phase }: SeaHorizonProps) {
  const meshRef = useRef<import("three").Mesh>(null);
  const color = seaColors[phase];

  const material = useMemo(() => {
    return new ShaderMaterial({
      uniforms: {
        seaColor: { value: new Color(color) },
        time: { value: 0 },
      },
      vertexShader,
      fragmentShader,
      transparent: false,
      depthWrite: true,
      fog: false,
      side: DoubleSide,
    });
  }, [color]);

  useFrame((state) => {
    material.uniforms.time.value = state.clock.elapsedTime;
  });

  return (
    <mesh
      ref={meshRef}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -0.15, 0]}
      material={material}
    >
      <planeGeometry args={[SEA_SIZE, SEA_SIZE, 1, 1]} />
    </mesh>
  );
}
