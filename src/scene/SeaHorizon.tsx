import type { DayPhase } from "../palette";

interface SeaHorizonProps {
  phase: DayPhase;
}

/**
 * La mer d'ardoise est désormais intégrée directement au shader
 * Ground (zone lointaine dist>75u = couleur slateSea). Choix
 * motivé par un bug three r170 sur cylinderGeometry openEnded +
 * BackSide/DoubleSide qui ne rendait rien de manière stable.
 * Voir Ground.tsx pour l'implémentation.
 */
export function SeaHorizon(_props: SeaHorizonProps) {
  return null;
}
