import { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { OrthographicCamera, MathUtils, Vector3 } from "three";
import type { RapierRigidBody } from "@react-three/rapier";

interface IsoCameraProps {
  target: React.RefObject<RapierRigidBody | null>;
  zoom?: number;
  azimuthDeg?: number;
  elevationDeg?: number;
  distance?: number;
  lerpStiffness?: number;
}

const tmpTarget = new Vector3();
const tmpDesired = new Vector3();
const currentTarget = new Vector3();

export function IsoCamera({
  target,
  zoom = 10,
  azimuthDeg = 45,
  elevationDeg = 35,
  distance = 40,
  lerpStiffness = 6,
}: IsoCameraProps) {
  const { size, set } = useThree();
  const cameraRef = useRef<OrthographicCamera | null>(null);

  useEffect(() => {
    const aspect = size.width / size.height;
    const cam = new OrthographicCamera(
      -aspect * zoom,
      aspect * zoom,
      zoom,
      -zoom,
      0.1,
      500,
    );
    const az = MathUtils.degToRad(azimuthDeg);
    const el = MathUtils.degToRad(elevationDeg);
    cam.position.set(
      distance * Math.cos(el) * Math.sin(az),
      distance * Math.sin(el),
      distance * Math.cos(el) * Math.cos(az),
    );
    cam.lookAt(0, 0, 0);
    cameraRef.current = cam;
    set({ camera: cam });
  }, [size.width, size.height, azimuthDeg, elevationDeg, distance, zoom, set]);

  useFrame((_, delta) => {
    const cam = cameraRef.current;
    const rb = target.current;
    if (!cam || !rb) return;
    const pos = rb.translation();
    tmpTarget.set(pos.x, pos.y, pos.z);

    const alpha = 1 - Math.exp(-lerpStiffness * delta);
    currentTarget.lerp(tmpTarget, alpha);

    const az = MathUtils.degToRad(azimuthDeg);
    const el = MathUtils.degToRad(elevationDeg);
    tmpDesired.set(
      currentTarget.x + distance * Math.cos(el) * Math.sin(az),
      currentTarget.y + distance * Math.sin(el),
      currentTarget.z + distance * Math.cos(el) * Math.cos(az),
    );
    cam.position.copy(tmpDesired);
    cam.lookAt(currentTarget);

    const aspect = size.width / size.height;
    cam.left = -aspect * zoom;
    cam.right = aspect * zoom;
    cam.top = zoom;
    cam.bottom = -zoom;
    cam.updateProjectionMatrix();
  });

  return null;
}
