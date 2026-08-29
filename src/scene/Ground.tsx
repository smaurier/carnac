import { useMemo } from "react";
import type { ThreeEvent } from "@react-three/fiber";
import { Color, ShaderMaterial, DoubleSide } from "three";
import { palette } from "../palette";

interface GroundProps {
  onMoveTarget: (x: number, z: number) => void;
}

const GROUND_SIZE = 200;

const vertexShader = `
  varying vec2 vUv;
  varying vec3 vWorldPos;
  void main() {
    vUv = uv;
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPos = worldPos.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

/**
 * Ground multi-zones :
 * · Campement (rayon ~4u autour origin) : trampledEarth ochre
 * · Prairie centrale (rayon ~20u) : grassMeadow vert
 * · Forêt (rayon 20-60u, Nord/Est) : mossDamp vert sombre
 * · Plage (rayon 30-50u, Sud/Ouest) : ochreWarm sable clair
 * · Bord fade doux
 */
const fragmentShader = `
  uniform vec3 trampledColor;
  uniform vec3 meadowColor;
  uniform vec3 forestFloor;
  uniform vec3 beachColor;
  uniform float mapSize;
  varying vec2 vUv;
  varying vec3 vWorldPos;

  void main() {
    // Distance depuis origin en unites monde
    float dist = length(vWorldPos.xz);

    // Angle pour zones directionnelles
    float angle = atan(vWorldPos.z, vWorldPos.x);

    // 1. Zone piétinée campement (0 -> 4u)
    float trampled = 1.0 - smoothstep(3.5, 5.5, dist);

    // 2. Prairie centrale (0 -> 22u)
    float prairie = 1.0 - smoothstep(18.0, 26.0, dist);

    // 3. Forêt (Nord + Est, plus loin qu'avant, dist 35-90)
    float forestAngleMask = smoothstep(-0.9, -0.4, angle) * smoothstep(2.5, 2.0, angle);
    float forestDist = smoothstep(32.0, 45.0, dist) * (1.0 - smoothstep(80.0, 95.0, dist));
    float forest = forestAngleMask * forestDist;

    // 4. Plage/dunes (Sud + Ouest, dist 30-70)
    float beachAngleMask = 1.0 - forestAngleMask;
    float beachDist = smoothstep(28.0, 40.0, dist) * (1.0 - smoothstep(65.0, 85.0, dist));
    float beach = beachAngleMask * beachDist;

    // Variation naturelle mousse dans la prairie
    float mossNoise = sin(vWorldPos.x * 0.4) * sin(vWorldPos.z * 0.3);
    vec3 prairieMossy = mix(meadowColor, forestFloor, clamp(mossNoise * 0.3 + 0.3, 0.0, 0.4));

    // Composition finale
    vec3 base = prairieMossy;
    base = mix(base, forestFloor, forest);
    base = mix(base, beachColor, beach);
    base = mix(base, trampledColor, trampled);

    // Fade edge global (distance / mapSize/2)
    float edgeFade = 1.0 - smoothstep(mapSize * 0.35, mapSize * 0.48, dist);

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
      <planeGeometry args={[GROUND_SIZE, GROUND_SIZE, 1, 1]} />
    </mesh>
  );
}
