import { useMemo, useRef } from "react";
import type { ThreeEvent } from "@react-three/fiber";
import { useFrame } from "@react-three/fiber";
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
  uniform vec3 seaColor;
  uniform vec3 seaFoam;
  uniform float mapSize;
  uniform float time;
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

    // 3. Forêt (Nord + Est, dist 32-58, plus etroite pour laisser place mer)
    float forestAngleMask = smoothstep(-0.9, -0.4, angle) * smoothstep(2.5, 2.0, angle);
    float forestDist = smoothstep(32.0, 42.0, dist) * (1.0 - smoothstep(52.0, 62.0, dist));
    float forest = forestAngleMask * forestDist;

    // 4. Plage/dunes (Sud + Ouest, dist 28-55, bordure sable avant la mer)
    float beachAngleMask = 1.0 - forestAngleMask;
    float beachDist = smoothstep(28.0, 38.0, dist) * (1.0 - smoothstep(48.0, 60.0, dist));
    float beach = beachAngleMask * beachDist;

    // 5. Mer d'ardoise lointaine (au-dela de plage/foret, dist > 55)
    float sea = smoothstep(55.0, 72.0, dist);
    // Petites vagues sinusoidales sur la mer
    float wave = sin(vWorldPos.x * 0.35 + time * 0.5)
               * cos(vWorldPos.z * 0.28 - time * 0.35);
    vec3 seaWithFoam = mix(seaColor, seaFoam, smoothstep(0.6, 0.95, wave) * 0.28);

    // Variation naturelle mousse dans la prairie
    float mossNoise = sin(vWorldPos.x * 0.4) * sin(vWorldPos.z * 0.3);
    vec3 prairieMossy = mix(meadowColor, forestFloor, clamp(mossNoise * 0.3 + 0.3, 0.0, 0.4));

    // Composition finale
    vec3 base = prairieMossy;
    base = mix(base, forestFloor, forest);
    base = mix(base, beachColor, beach);
    base = mix(base, seaWithFoam, sea);
    base = mix(base, trampledColor, trampled);

    // Fade edge tres doux tout au bord (juste pour eviter arete dure)
    float edgeFade = 1.0 - smoothstep(mapSize * 0.44, mapSize * 0.49, dist);

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
        seaColor: { value: new Color(palette.cool.slateSea) },
        seaFoam: { value: new Color(palette.cool.haloBlue) },
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
      <planeGeometry args={[GROUND_SIZE, GROUND_SIZE, 1, 1]} />
    </mesh>
  );
}
