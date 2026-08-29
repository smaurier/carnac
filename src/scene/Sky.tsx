import { useMemo, useRef, useEffect } from "react";
import { BackSide, Color, ShaderMaterial } from "three";
import { skyPresetFor } from "./sky-presets";
import type { DayPhase } from "../palette";

interface SkyProps {
  phase: DayPhase;
}

const vertexShader = `
  varying vec3 vWorldPosition;
  void main() {
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPos.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

const fragmentShader = `
  uniform vec3 topColor;
  uniform vec3 horizonColor;
  uniform vec3 bottomColor;
  uniform float exponent;
  varying vec3 vWorldPosition;

  void main() {
    float h = normalize(vWorldPosition).y;
    if (h >= 0.0) {
      float t = pow(h, exponent);
      gl_FragColor = vec4(mix(horizonColor, topColor, t), 1.0);
    } else {
      float t = pow(-h, exponent);
      gl_FragColor = vec4(mix(horizonColor, bottomColor, t), 1.0);
    }
  }
`;

export function Sky({ phase }: SkyProps) {
  const materialRef = useRef<ShaderMaterial>(null);
  const preset = skyPresetFor(phase);

  const uniforms = useMemo(
    () => ({
      topColor: { value: new Color(preset.topColor) },
      horizonColor: { value: new Color(preset.horizonColor) },
      bottomColor: { value: new Color(preset.bottomColor) },
      exponent: { value: preset.exponent },
    }),
    [],
  );

  useEffect(() => {
    if (!materialRef.current) return;
    const u = materialRef.current.uniforms;
    (u.topColor.value as Color).set(preset.topColor);
    (u.horizonColor.value as Color).set(preset.horizonColor);
    (u.bottomColor.value as Color).set(preset.bottomColor);
    u.exponent.value = preset.exponent;
  }, [preset.topColor, preset.horizonColor, preset.bottomColor, preset.exponent]);

  return (
    <mesh scale={[200, 200, 200]} frustumCulled={false} renderOrder={-1}>
      <sphereGeometry args={[1, 32, 15]} />
      <shaderMaterial
        ref={materialRef}
        side={BackSide}
        depthWrite={false}
        depthTest={false}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
}
