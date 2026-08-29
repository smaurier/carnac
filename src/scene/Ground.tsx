import { useMemo, useRef } from "react";
import type { ThreeEvent } from "@react-three/fiber";
import { useFrame } from "@react-three/fiber";
import { Color, ShaderMaterial, DoubleSide } from "three";
import { RigidBody, CuboidCollider } from "@react-three/rapier";
import { palette } from "../palette";

interface GroundProps {
  onMoveTarget?: (x: number, z: number) => void;
}

const GROUND_SIZE = 180;
const GROUND_SEGMENTS = 160;

const vertexShader = `
  varying vec2 vUv;
  varying vec3 vWorldPos;

  float hillHeight(vec2 p) {
    float h = 0.0;
    h += abs(sin(p.x * 0.09 + 1.3) * cos(p.y * 0.08 - 0.7)) * 1.2;
    h += abs(sin(p.x * 0.05 + 2.9) * cos(p.y * 0.06 - 1.7)) * 1.6;
    h += abs(sin(p.x * 0.22 - 0.4) * cos(p.y * 0.19 + 2.1)) * 0.4;
    return h;
  }

  void main() {
    vUv = uv;
    vec3 localPos = position;
    vec2 worldXZ = vec2(localPos.x, -localPos.y);
    float distFromCamp = length(worldXZ);
    float campMask = smoothstep(8.0, 14.0, distFromCamp);
    float farMask = 1.0 - smoothstep(55.0, 72.0, distFromCamp);
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
  varying vec2 vUv;
  varying vec3 vWorldPos;

  void main() {
    float dist = length(vWorldPos.xz);
    float angle = atan(vWorldPos.z, vWorldPos.x);
    float trampled = (1.0 - smoothstep(3.5, 8.0, dist)) * 0.7;
    float prairie = 1.0 - smoothstep(30.0, 45.0, dist);
    float forestAngleMask = smoothstep(-0.9, -0.4, angle) * smoothstep(2.5, 2.0, angle);
    float forestDist = smoothstep(32.0, 45.0, dist) * (1.0 - smoothstep(60.0, 75.0, dist));
    float forest = forestAngleMask * forestDist;
    float beachAngleMask = 1.0 - forestAngleMask;
    float beachDist = smoothstep(28.0, 42.0, dist) * (1.0 - smoothstep(58.0, 75.0, dist));
    float beach = beachAngleMask * beachDist;
    float mossNoise = sin(vWorldPos.x * 0.4) * sin(vWorldPos.z * 0.3);
    vec3 prairieMossy = mix(meadowColor, forestFloor, clamp(mossNoise * 0.3 + 0.3, 0.0, 0.4));
    vec3 base = prairieMossy;
    base = mix(base, forestFloor, forest);
    base = mix(base, beachColor, beach);
    base = mix(base, trampledColor, trampled);
    float edgeFade = 1.0 - smoothstep(72.0, 85.0, dist);
    gl_FragColor = vec4(base, edgeFade);
  }
`;

export function Ground({ onMoveTarget }: GroundProps) {
  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    if (!onMoveTarget) return;
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
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      side: DoubleSide,
    });
  }, []);

  const materialRef = useRef(material);
  useFrame(() => {
    void materialRef.current;
  });

  return (
    <>
      {/* Rendu visuel : plane vallonne (shader) */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        onClick={handleClick}
        material={material}
      >
        <planeGeometry args={[GROUND_SIZE, GROUND_SIZE, GROUND_SEGMENTS, GROUND_SEGMENTS]} />
      </mesh>
      {/* Collider physique : cuboid plat fin (Kel marche a y=0) */}
      <RigidBody type="fixed" colliders={false} position={[0, -0.5, 0]}>
        <CuboidCollider args={[GROUND_SIZE / 2, 0.5, GROUND_SIZE / 2]} />
      </RigidBody>
    </>
  );
}
