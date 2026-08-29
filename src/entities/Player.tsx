import { forwardRef } from "react";
import Ecctrl from "ecctrl";
import type { RapierRigidBody } from "@react-three/rapier";
import { KelBody } from "./KelBody";

interface PlayerProps {
  initialPosition?: [number, number, number];
}

const CAPSULE_HALF_HEIGHT = 0.55;
const CAPSULE_RADIUS = 0.28;
const FLOAT_HEIGHT = 0.25;
// Offset pour poser les pieds de KelBody (local y=0) au sol : la
// capsule Ecctrl flotte a (halfHeight + radius + floatHeight) au
// dessus du sol. On descend le model d'autant.
const BODY_Y_OFFSET = -(CAPSULE_HALF_HEIGHT + CAPSULE_RADIUS + FLOAT_HEIGHT);

export const Player = forwardRef<RapierRigidBody, PlayerProps>(function Player(
  { initialPosition = [0, 2, 0] },
  ref,
) {
  return (
    <Ecctrl
      ref={ref}
      position={initialPosition}
      capsuleHalfHeight={CAPSULE_HALF_HEIGHT}
      capsuleRadius={CAPSULE_RADIUS}
      floatHeight={FLOAT_HEIGHT}
      maxVelLimit={3.5}
      jumpVel={4.5}
      disableFollowCam
      mode="PointToMove"
    >
      <group position={[0, BODY_Y_OFFSET, 0]}>
        <KelBody />
      </group>
    </Ecctrl>
  );
});
