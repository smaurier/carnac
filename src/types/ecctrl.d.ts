declare module "ecctrl" {
  import type { ReactNode, ComponentType } from "react";
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
  const Ecctrl: ComponentType<EcctrlProps>;
  export default Ecctrl;
  export const EcctrlAnimation: ComponentType<{ children?: ReactNode; animationSet?: unknown; characterURL?: string }>;
}
