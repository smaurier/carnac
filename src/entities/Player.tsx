import Ecctrl from "ecctrl";
import { KelBody } from "./KelBody";

interface PlayerProps {
  initialPosition?: [number, number, number];
}

/**
 * Player = Ecctrl (physique + character controller + follow cam)
 * enveloppant les meshes visuels de Kel (KelBody).
 * Gere : deplacement WASD, saut espace, run shift, camera 3e
 * personne, collisions rigid bodies, gravite.
 */
export function Player({ initialPosition = [0, 2, 5] }: PlayerProps) {
  return (
    <Ecctrl
      position={initialPosition}
      capsuleHalfHeight={0.55}
      capsuleRadius={0.28}
      floatHeight={0.25}
      maxVelLimit={3.5}
      jumpVel={4.5}
      camInitDis={-4.5}
      camMinDis={-2}
      camMaxDis={-8}
    >
      <KelBody />
    </Ecctrl>
  );
}
