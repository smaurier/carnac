import { palette } from "../palette";

interface GroundShadowProps {
  radius?: number;
  opacity?: number;
  y?: number;
}

export function GroundShadow({
  radius = 0.55,
  opacity = 0.45,
  y = 0.02,
}: GroundShadowProps) {
  return (
    <mesh
      position={[0, y, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      renderOrder={1}
    >
      <circleGeometry args={[radius, 24]} />
      <meshBasicMaterial
        color={palette.neutrals.charcoal}
        transparent
        opacity={opacity}
        depthWrite={false}
      />
    </mesh>
  );
}
