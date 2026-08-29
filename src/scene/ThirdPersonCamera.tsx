import { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, Vector3 } from "three";
import type { Group } from "three";

interface ThirdPersonCameraProps {
  target: React.RefObject<Group | null>;
  distance?: number;
  height?: number;
  lookHeight?: number;
  fov?: number;
  followStiffness?: number;
  rotationStiffness?: number;
}

const tmpTarget = new Vector3();
const tmpDesired = new Vector3();
const tmpLook = new Vector3();
const tmpOffset = new Vector3();
const currentPos = new Vector3();
const currentLook = new Vector3();

export function ThirdPersonCamera({
  target,
  distance = 7,
  height = 3.2,
  lookHeight = 1.4,
  fov = 55,
  followStiffness = 6,
  rotationStiffness = 5,
}: ThirdPersonCameraProps) {
  const { size, set } = useThree();
  const cameraRef = useRef<PerspectiveCamera | null>(null);
  const currentYawRef = useRef(0);
  const initializedRef = useRef(false);

  useEffect(() => {
    const cam = new PerspectiveCamera(fov, size.width / size.height, 0.3, 400);
    cam.position.set(0, height, distance);
    cam.lookAt(0, lookHeight, 0);
    cameraRef.current = cam;
    set({ camera: cam });
  }, [size.width, size.height, fov, distance, height, lookHeight, set]);

  useFrame((_, delta) => {
    const cam = cameraRef.current;
    const player = target.current;
    if (!cam || !player) return;

    const desiredYaw = player.rotation.y;
    if (!initializedRef.current) {
      currentYawRef.current = desiredYaw;
      initializedRef.current = true;
    }
    let diff = desiredYaw - currentYawRef.current;
    while (diff > Math.PI) diff -= Math.PI * 2;
    while (diff < -Math.PI) diff += Math.PI * 2;
    const yawAlpha = 1 - Math.exp(-rotationStiffness * delta);
    currentYawRef.current += diff * yawAlpha;

    tmpTarget.copy(player.position);
    tmpTarget.y += lookHeight;

    const yaw = currentYawRef.current;
    tmpOffset.set(-Math.sin(yaw) * distance, height, -Math.cos(yaw) * distance);
    tmpDesired.copy(player.position).add(tmpOffset);

    const followAlpha = 1 - Math.exp(-followStiffness * delta);
    if (!currentPos.lengthSq()) currentPos.copy(tmpDesired);
    currentPos.lerp(tmpDesired, followAlpha);
    currentLook.lerp(tmpTarget, followAlpha);

    cam.position.copy(currentPos);
    tmpLook.copy(currentLook);
    cam.lookAt(tmpLook);

    const aspect = size.width / size.height;
    if (Math.abs(cam.aspect - aspect) > 1e-4) {
      cam.aspect = aspect;
      cam.updateProjectionMatrix();
    }
  });

  return null;
}
