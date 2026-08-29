# Sources CDN pour assets 3D CC0

Alternatives complémentaires à Kenney (voir `asset-pipeline-kenney.md` pour Kenney lui-même). Ces sources listent des URL réellement téléchargeables via `curl` ou `useGLTF` direct, sans authentification, sous licence CC0 ou CC-BY.

## 1. Khronos glTF Sample Models (test technique)

- Repo : https://github.com/KhronosGroup/glTF-Sample-Models
- Contenu : ~100 modèles GLTF/GLB de référence pour tester WebGL/Three.js (Duck, DamagedHelmet, Avocado, BoomBox, etc.)
- Licence : variées, la plupart CC0 ou CC-BY, vérifier LICENSE.md par modèle
- URL directes raw :
  - `https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF-Binary/Duck.glb`
  - `https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoomBox/glTF-Binary/BoomBox.glb`
- **Utilité pour Carnac** : très limitée (objets modernes), sert surtout à tester le pipeline `useGLTF`.

## 2. Poly.pizza

- Site : https://poly.pizza
- Contenu : catalogue de modèles low-poly CC0/CC-BY, souvent créés par Quaternius, Kenney et autres artistes libres
- Recherche par tag : "stone", "tree", "grass", "hut", "human"
- Pattern URL : chaque modèle a une page `poly.pizza/m/<id>` avec bouton download GLB
- Note : le download passe par un fetch API, l'URL directe n'est pas facile à copier sans inspecter le réseau
- **Utilité pour Carnac** : bonne ; nécessite téléchargement manuel puis placement dans `public/assets/`

## 3. Quaternius (GitHub direct)

- Site : https://quaternius.com
- GitHub packs : parfois disponibles sur github.com/Quaternius/gltf-collection ou similaire
- Style : très proche de Kenney, ultra low-poly
- **Utilité pour Carnac** : excellente si un pack "Nature" ou "Village" est trouvé

## 4. KayKit (Kay Lousberg)

- Site : https://kaylousberg.itch.io/
- Contenu : packs itch.io CC0, style low-poly game
- Packs pertinents : "Prototype Bits" (rocks, boxes), "Medieval Builder" (murs, huttes)
- **Utilité pour Carnac** : moyenne, plus orienté médiéval

## 5. Sketchfab (filtre CC0)

- Site : https://sketchfab.com
- Filtre : Downloadable, License = CC0
- Immense catalogue, qualité variable
- Note : download nécessite compte gratuit
- **Utilité pour Carnac** : bonne pour cas spécifiques (menhir réel scanné en photogrammétrie par exemple)

## 6. OpenGameArt

- Site : https://opengameart.org
- Filtre : 3D Art, License = CC0/CC-BY
- Historique, moins beau mais varié
- **Utilité pour Carnac** : moyenne, à fouiller

## 7. Assets libres via `useGLTF` distant

```tsx
import { useGLTF } from "@react-three/drei";

function TestRemoteModel() {
  const { scene } = useGLTF(
    "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF-Binary/Duck.glb",
  );
  return <primitive object={scene.clone()} />;
}
```

Nécessite : (a) URL HTTPS accessible ; (b) header CORS compatible sur le serveur cible. GitHub raw + Sketchfab downloads CDN sont généralement OK.

## Recommandation pour Carnac

Ordre de priorité pour trouver des assets bretons/néolithiques :

1. **Kenney Nature Kit** (téléchargement local, voir `asset-pipeline-kenney.md`) : rochers, herbes, arbres
2. **Poly.pizza** avec queries "standing stone", "menhir", "megalith", "prehistoric hut" : cas spécifiques
3. **Sketchfab CC0** avec queries "cairn", "dolmen", "menhir" : peut donner accès à des scans photogrammétrie de vrais mégalithes
4. **Génération IA locale (Hunyuan)** : voir `direction-artistique.md` section 13 pour créer des assets uniques et bretons (menhir spécifique, hutte torchis morbihannaise, ajonc en fleur)

## Statut actuel du projet

Aucun asset externe téléchargé encore. Le projet fonctionne uniquement sur des primitives r3f enrichies (Villager 12 meshes, Hut composée, GraniteBlock organique, StandingStone avec variations). L'ajout de vrais modèles se fera par migration incrémentale documentée dans `asset-pipeline-kenney.md`.
