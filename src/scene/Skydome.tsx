import { useMemo } from "react";
import { Color, ShaderMaterial, BackSide } from "three";
import { skyPresetFor } from "./sky-presets";
import type { DayPhase } from "../palette";

interface SkydomeProps {
  phase: DayPhase;
}

const RADIUS = 350;
const SEGMENTS_W = 48;
const SEGMENTS_H = 24;

const vertexShader = `
  varying vec3 vWorldPos;
  void main() {
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPos = worldPos.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

const fragmentShader = `
  uniform vec3 topColor;
  uniform vec3 horizonColor;
  uniform float radius;
  varying vec3 vWorldPos;

  void main() {
    // Fraction verticale : 0 au niveau sol (y=0), 1 tout en haut du dome
    float v = clamp(vWorldPos.y / radius, 0.0, 1.0);
    // Bande horizon nette entre v=0 et v=0.08, puis degrade vers topColor
    float horizonMix = smoothstep(0.0, 0.08, v);
    vec3 col = mix(horizonColor, topColor, smoothstep(0.05, 0.9, v));
    gl_FragColor = vec4(col, 1.0);
  }
`;

export function Skydome({ phase }: SkydomeProps) {
  const preset = skyPresetFor(phase);

  const material = useMemo(() => {
    return new ShaderMaterial({
      uniforms: {
        topColor: { value: new Color(preset.topColor) },
        horizonColor: { value: new Color(preset.horizonColor) },
        radius: { value: RADIUS },
      },
      vertexShader,
      fragmentShader,
      side: BackSide,
      depthWrite: false,
      fog: false,
    });
  }, [preset.topColor, preset.horizonColor]);

  return (
    <mesh material={material} renderOrder={-100}>
      <sphereGeometry args={[RADIUS, SEGMENTS_W, SEGMENTS_H, 0, Math.PI * 2, 0, Math.PI / 2]} />
    </mesh>
  );
}
