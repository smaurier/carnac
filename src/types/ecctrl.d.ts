declare module "ecctrl" {
  import type { ReactNode, ForwardRefExoticComponent, RefAttributes } from "react";
  import type { RapierRigidBody } from "@react-three/rapier";
  export interface EcctrlProps {
    children?: ReactNode;
    position?: [number, number, number] | number[];
    capsuleHalfHeight?: number;
    capsuleRadius?: number;
    floatHeight?: number;
    maxVelLimit?: number;
    jumpVel?: number;
    camInitDis?: number;
    camMinDis?: number;
    camMaxDis?: number;
    mode?: "CameraBasedMovement" | "FixedCamera" | "PointToMove" | null;
    disableControl?: boolean;
    disableFollowCam?: boolean;
    debug?: boolean;
    [key: string]: unknown;
  }
  const Ecctrl: ForwardRefExoticComponent<EcctrlProps & RefAttributes<RapierRigidBody>>;
  export default Ecctrl;
  export const EcctrlAnimation: ForwardRefExoticComponent<{ children?: ReactNode; animationSet?: unknown; characterURL?: string }>;
}
