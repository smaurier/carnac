import { Mesh, MeshToonMaterial, type Object3D, type Texture } from "three";

interface ToonSubstitutionOptions {
  readonly color: string;
  readonly gradientMap: Texture;
  readonly emissive?: string;
  readonly emissiveIntensity?: number;
}

/**
 * Traverse un graph three.js (typiquement issu d'un .glb Kenney) et
 * remplace le materiau de chaque Mesh par un MeshToonMaterial
 * homogene avec la charte cel-shading du projet.
 *
 * Effet de bord : modifie les meshes en place. Appeler sur une copie
 * (via useKenneyAsset .cloned) si on veut plusieurs traitements
 * differents du meme modele.
 */
export function applyToonSubstitution(
  root: Object3D,
  options: ToonSubstitutionOptions,
): void {
  root.traverse((child) => {
    if (!(child instanceof Mesh)) return;
    const material = new MeshToonMaterial({
      color: options.color,
      gradientMap: options.gradientMap,
    });
    if (options.emissive) {
      material.emissive.set(options.emissive);
      material.emissiveIntensity = options.emissiveIntensity ?? 0.1;
    }
    child.material = material;
  });
}
