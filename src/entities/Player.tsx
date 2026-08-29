import { forwardRef } from "react";
import Ecctrl from "ecctrl";
import type { RapierRigidBody } from "@react-three/rapier";
import { KelBody } from "./KelBody";

interface PlayerProps {
  initialPosition?: [number, number, number];
}

/**
 * Player = Ecctrl mode PointToMove (click-to-move).
 * Camera iso externe (disableFollowCam=true, IsoCamera suit ref).
 * Le mouvement se fait via useGame().setMoveToPoint(vec3) depuis
 * Scene sur click Ground.
 */
export const Player = forwardRef<RapierRigidBody, PlayerProps>(function Player(
  { initialPosition = [0, 2, 0] },
  ref,
) {
  return (
    <Ecctrl
      ref={ref}
      position={initialPosition}
      capsuleHalfHeight={0.55}
      capsuleRadius={0.28}
      floatHeight={0.25}
      maxVelLimit={3.5}
      jumpVel={4.5}
      disableFollowCam
      mode="PointToMove"
    >
      <KelBody />
    </Ecctrl>
  );
});
