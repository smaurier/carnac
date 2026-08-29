import { forwardRef } from "react";
import Ecctrl from "ecctrl";
import type { RapierRigidBody } from "@react-three/rapier";
import { KelBody } from "./KelBody";

interface PlayerProps {
  initialPosition?: [number, number, number];
}

/**
 * Player = Ecctrl (physique + controle) + KelBody (meshes).
 * Follow cam Ecctrl desactive : la camera iso est geree
 * separement par IsoCamera qui suit ce ref (RigidBody).
 */
export const Player = forwardRef<RapierRigidBody, PlayerProps>(function Player(
  { initialPosition = [0, 2, 5] },
  ref,
) {
  return (
    <Ecctrl
      ref={ref}
      position={initialPosition}
      capsuleHalfHeight={0.55}
      capsuleRadius={0.28}
      floatHeight={0.25}
      maxVelLimit={4}
      jumpVel={4.5}
      disableFollowCam
    >
      <KelBody />
    </Ecctrl>
  );
});
