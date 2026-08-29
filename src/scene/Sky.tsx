import type { DayPhase } from "../palette";

interface SkyProps {
  phase: DayPhase;
}

/**
 * Le ciel n'est plus rendu en scene.background (image 2D
 * plaquee = melange visuel avec la scene 3D). Un vrai Skydome
 * hemisphere 3D est utilise a la place (voir Skydome.tsx). Ce
 * composant est conserve en no-op pour compat.
 */
export function Sky(_props: SkyProps) {
  return null;
}
