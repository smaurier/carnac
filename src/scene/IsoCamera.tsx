import { useThree, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { OrthographicCamera, MathUtils, Vector3 } from "three";

interface IsoCameraProps {
  target?: [number, number, number];
  zoom?: number;
  azimuthDeg?: number;
  elevationDeg?: number;
  distance?: number;
  lerpStiffness?: number;
}

const currentTarget = new Vector3();
const desiredTarget = new Vector3();
const desiredPosition = new Vector3();

export function IsoCamera({
  target = [0, 0, 0],
  zoom = 12,
  azimuthDeg = 45,
  elevationDeg = 30,
  distance = 40,
  lerpStiffness = 2,
}: IsoCameraProps) {
  const { size, set } = useThree();
  const cameraRef = useRef<OrthographicCamera | null>(null);
  const currentZoomRef = useRef(zoom);

  useEffect(() => {
    const aspect = size.width / size.height;
    const cam = new OrthographicCamera(
      -aspect * zoom,
      aspect * zoom,
      zoom,
      -zoom,
      0.1,
      1000,
    );
    currentTarget.set(...target);
    currentZoomRef.current = zoom;

    const az = MathUtils.degToRad(azimuthDeg);
    const el = MathUtils.degToRad(elevationDeg);
    cam.position.set(
      target[0] + distance * Math.cos(el) * Math.sin(az),
      target[1] + distance * Math.sin(el),
      target[2] + distance * Math.cos(el) * Math.cos(az),
    );
    cam.lookAt(currentTarget);
    cam.updateProjectionMatrix();

    cameraRef.current = cam;
    set({ camera: cam });
  }, [size.width, size.height, azimuthDeg, elevationDeg, distance, target, zoom, set]);

  useFrame((_, delta) => {
    const cam = cameraRef.current;
    if (!cam) return;
    const aspect = size.width / size.height;
    const alpha = 1 - Math.exp(-lerpStiffness * delta);

    desiredTarget.set(...target);
    currentTarget.lerp(desiredTarget, alpha);

    const nextZoom = MathUtils.lerp(currentZoomRef.current, zoom, alpha);
    currentZoomRef.current = nextZoom;

    const az = MathUtils.degToRad(azimuthDeg);
    const el = MathUtils.degToRad(elevationDeg);
    desiredPosition.set(
      currentTarget.x + distance * Math.cos(el) * Math.sin(az),
      currentTarget.y + distance * Math.sin(el),
      currentTarget.z + distance * Math.cos(el) * Math.cos(az),
    );
    cam.position.copy(desiredPosition);
    cam.lookAt(currentTarget);

    cam.left = -aspect * nextZoom;
    cam.right = aspect * nextZoom;
    cam.top = nextZoom;
    cam.bottom = -nextZoom;
    cam.updateProjectionMatrix();
  });

  return null;
}
