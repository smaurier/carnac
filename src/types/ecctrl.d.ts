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

  export interface GameState {
    moveToPoint: { x: number; y: number; z: number } | null;
    setMoveToPoint: (point: { x: number; y: number; z: number }) => void;
    curAnimation: string | null;
    animationSet: unknown;
    initializeAnimationSet: (set: unknown) => void;
    reset: () => void;
    idle: () => void;
    walk: () => void;
    run: () => void;
    jump: () => void;
    jumpIdle: () => void;
    jumpLand: () => void;
    fall: () => void;
    action1: () => void;
    action2: () => void;
    action3: () => void;
    action4: () => void;
  }
  export function useGame<T>(selector: (s: GameState) => T): T;
}
