import { useThree, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { OrthographicCamera, MathUtils, Vector3 } from "three";

interface IsoCameraProps {
  target?: [number, number, number];
  zoom?: number;
  azimuthDeg?: number;
  elevationDeg?: number;
  distance?: number;
}

export function IsoCamera({
  target = [0, 0, 0],
  zoom = 60,
  azimuthDeg = 45,
  elevationDeg = 30,
  distance = 40,
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
      1000,
    );

    const az = MathUtils.degToRad(azimuthDeg);
    const el = MathUtils.degToRad(elevationDeg);
    cam.position.set(
      target[0] + distance * Math.cos(el) * Math.sin(az),
      target[1] + distance * Math.sin(el),
      target[2] + distance * Math.cos(el) * Math.cos(az),
    );
    cam.lookAt(new Vector3(...target));
    cam.zoom = 1;
    cam.updateProjectionMatrix();

    cameraRef.current = cam;
    set({ camera: cam });
  }, [size.width, size.height, zoom, azimuthDeg, elevationDeg, distance, target, set]);

  useFrame(() => {
    if (!cameraRef.current) return;
    const aspect = size.width / size.height;
    const cam = cameraRef.current;
    if (cam.left !== -aspect * zoom) {
      cam.left = -aspect * zoom;
      cam.right = aspect * zoom;
      cam.top = zoom;
      cam.bottom = -zoom;
      cam.updateProjectionMatrix();
    }
  });

  return null;
}
