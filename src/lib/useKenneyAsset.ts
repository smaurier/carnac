import { useGLTF } from "@react-three/drei";
import type { Group } from "three";
import { useMemo } from "react";

export interface KenneyAsset {
  readonly scene: Group;
  readonly cloned: Group;
}

/**
 * Wrapper autour de useGLTF pour les assets Kenney du projet.
 * Retourne le scene original + un clone pret a etre place.
 *
 * Le clone est necessaire pour afficher plusieurs instances
 * independantes du meme modele (positions/rotations differentes).
 *
 * Si l'asset n'existe pas encore (ex : pack Kenney pas telecharge),
 * useGLTF lance un Suspense. L'appelant doit se placer dans un
 * <Suspense fallback={...}>.
 */
export function useKenneyAsset(path: string): KenneyAsset {
  const gltf = useGLTF(path);
  const cloned = useMemo(() => gltf.scene.clone(true), [gltf.scene]);
  return { scene: gltf.scene, cloned };
}

/**
 * Preload d'un asset Kenney a appeler au demarrage de l'app
 * pour eviter le popup Suspense pendant la scene.
 */
export function preloadKenneyAsset(path: string): void {
  useGLTF.preload(path);
}
