import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Color, ShaderMaterial, DoubleSide } from "three";
import { palette } from "../palette";
import type { DayPhase } from "../palette";

interface SeaHorizonProps {
  phase: DayPhase;
}

interface SeaPreset {
  readonly deep: string;
  readonly shallow: string;
  readonly foam: string;
}

const seaPresets: Record<DayPhase, SeaPreset> = {
  dawn: {
    deep: palette.cool.slateSea,
    shallow: palette.cool.haloBlue,
    foam: palette.warm.duskGold,
  },
  noon: {
    deep: palette.cool.slateSea,
    shallow: palette.cool.haloBlue,
    foam: palette.neutrals.granitLight,
  },
  dusk: {
    deep: palette.cool.slateSea,
    shallow: palette.cool.haloBlue,
    foam: palette.warm.fire,
  },
  night: {
    deep: palette.cool.deepBlue,
    shallow: palette.cool.nightBlue,
    foam: palette.cool.haloBlue,
  },
};

const SEA_SIZE = 900;

const vertexShader = `
  varying vec3 vWorldPos;
  void main() {
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPos = worldPos.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

const fragmentShader = `
  uniform vec3 deepColor;
  uniform vec3 shallowColor;
  uniform vec3 foamColor;
  uniform float time;
  varying vec3 vWorldPos;

  void main() {
    float wave = sin(vWorldPos.x * 0.28 + time * 0.5)
               * cos(vWorldPos.z * 0.22 - time * 0.35);
    float wave2 = sin(vWorldPos.x * 0.55 - time * 0.7)
                * cos(vWorldPos.z * 0.4 + time * 0.5);
    float foamMask = smoothstep(0.6, 0.95, wave) * 0.35
                   + smoothstep(0.7, 0.98, wave2) * 0.18;

    vec3 base = mix(deepColor, shallowColor, 0.25);
    vec3 col = mix(base, foamColor, foamMask);

    gl_FragColor = vec4(col, 1.0);
  }
`;

export function SeaHorizon({ phase }: SeaHorizonProps) {
  const meshRef = useRef<import("three").Mesh>(null);
  const preset = seaPresets[phase];

  const material = useMemo(() => {
    return new ShaderMaterial({
      uniforms: {
        deepColor: { value: new Color(preset.deep) },
        shallowColor: { value: new Color(preset.shallow) },
        foamColor: { value: new Color(preset.foam) },
        time: { value: 0 },
      },
      vertexShader,
      fragmentShader,
      transparent: false,
      depthWrite: true,
      fog: false,
      side: DoubleSide,
    });
  }, [preset.deep, preset.shallow, preset.foam]);

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
