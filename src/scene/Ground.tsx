import { useMemo, useRef } from "react";
import type { ThreeEvent } from "@react-three/fiber";
import { useFrame } from "@react-three/fiber";
import { Color, ShaderMaterial, DoubleSide } from "three";
import { palette } from "../palette";

interface GroundProps {
  onMoveTarget: (x: number, z: number) => void;
}

const GROUND_SIZE = 120;
const GROUND_SEGMENTS = 128;
const CAMP_FLAT_RADIUS = 8.0;
const CAMP_FLAT_FADE = 14.0;
const FAR_FLAT_START = 34.0;
const FAR_FLAT_END = 48.0;

const vertexShader = `
  varying vec2 vUv;
  varying vec3 vWorldPos;

  float hillHeight(vec2 p) {
    float h = 0.0;
    h += sin(p.x * 0.14 + 1.3) * cos(p.y * 0.13 - 0.7) * 0.8;
    h += sin(p.x * 0.07 + 2.9) * cos(p.y * 0.09 - 1.7) * 1.2;
    h += sin(p.x * 0.24 - 0.4) * cos(p.y * 0.21 + 2.1) * 0.4;
    return h;
  }

  void main() {
    vUv = uv;
    vec3 localPos = position;
    vec2 worldXZ = vec2(localPos.x, -localPos.y);
    float distFromCamp = length(worldXZ);
    // Bosses uniquement dans un anneau proche (bocage), plates ailleurs
    float campMask = smoothstep(${CAMP_FLAT_RADIUS.toFixed(1)}, ${CAMP_FLAT_FADE.toFixed(1)}, distFromCamp);
    float farMask = 1.0 - smoothstep(${FAR_FLAT_START.toFixed(1)}, ${FAR_FLAT_END.toFixed(1)}, distFromCamp);
    float bump = hillHeight(worldXZ) * campMask * farMask;
    localPos.z += bump;

    vec4 worldPos = modelMatrix * vec4(localPos, 1.0);
    vWorldPos = worldPos.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

const fragmentShader = `
  uniform vec3 trampledColor;
  uniform vec3 meadowColor;
  uniform vec3 forestFloor;
  uniform vec3 beachColor;
  uniform float mapSize;
  uniform float time;
  varying vec2 vUv;
  varying vec3 vWorldPos;

  void main() {
    float dist = length(vWorldPos.xz);
    float angle = atan(vWorldPos.z, vWorldPos.x);

    // 1. Zone piétinée campement (0 -> 4u)
    float trampled = 1.0 - smoothstep(3.5, 5.5, dist);

    // 2. Prairie centrale (0 -> 22u)
    float prairie = 1.0 - smoothstep(18.0, 26.0, dist);

    // 3. Forêt (Nord + Est)
    float forestAngleMask = smoothstep(-0.9, -0.4, angle) * smoothstep(2.5, 2.0, angle);
    float forestDist = smoothstep(24.0, 32.0, dist) * (1.0 - smoothstep(38.0, 48.0, dist));
    float forest = forestAngleMask * forestDist;

    // 4. Plage/dunes (Sud + Ouest)
    float beachAngleMask = 1.0 - forestAngleMask;
    float beachDist = smoothstep(22.0, 30.0, dist) * (1.0 - smoothstep(38.0, 48.0, dist));
    float beach = beachAngleMask * beachDist;

    // Variation naturelle mousse dans la prairie
    float mossNoise = sin(vWorldPos.x * 0.4) * sin(vWorldPos.z * 0.3);
    vec3 prairieMossy = mix(meadowColor, forestFloor, clamp(mossNoise * 0.3 + 0.3, 0.0, 0.4));

    // Composition finale
    vec3 base = prairieMossy;
    base = mix(base, forestFloor, forest);
    base = mix(base, beachColor, beach);
    base = mix(base, trampledColor, trampled);

    // Fade edge net a 42-48u pour couper avec la mer
    float edgeFade = 1.0 - smoothstep(42.0, 50.0, dist);

    gl_FragColor = vec4(base, edgeFade);
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
        trampledColor: { value: new Color(palette.flora.trampledEarth) },
        meadowColor: { value: new Color(palette.flora.grassMeadow) },
        forestFloor: { value: new Color(palette.flora.mossDamp) },
        beachColor: { value: new Color(palette.warm.ochreWarm) },
        mapSize: { value: GROUND_SIZE },
        time: { value: 0 },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      side: DoubleSide,
    });
  }, []);

  const materialRef = useRef(material);
  useFrame((state) => {
    materialRef.current.uniforms.time.value = state.clock.elapsedTime;
  });

  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, 0, 0]}
      onClick={handleClick}
      material={material}
    >
      <planeGeometry args={[GROUND_SIZE, GROUND_SIZE, GROUND_SEGMENTS, GROUND_SEGMENTS]} />
    </mesh>
  );
}
