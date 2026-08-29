# Pipeline assets · Kenney.nl

Documentation du pipeline de production pour intégrer des modèles 3D Kenney (CC0, gratuits, low-poly) dans le projet Carnac.

## Pourquoi Kenney

- **Licence CC0** (domaine public, aucune restriction, pas d'attribution obligatoire)
- **Style low-poly** cohérent avec la charte cel-shading du projet
- **Format GLB / GLTF** standard, chargeable via `useGLTF` de `@react-three/drei`
- **Zéro coût**
- Packs thématiques bien organisés

## Packs à télécharger (priorité)

### 1. Nature Kit (essentiel)

- URL : https://kenney.nl/assets/nature-kit
- Contient : arbres, buissons, rochers, herbes, fleurs, souches, champignons, ~150 objets low-poly
- Utile pour : LandFoliage (remplace ajoncs / bruyère / herbes / rochers placeholders)

### 2. Toon Characters 1 (essentiel)

- URL : https://kenney.nl/assets/toon-characters-1
- Contient : personnages humains stylisés avec animations basiques
- Utile pour : Villager (remplace capsule Kel / Athro / Vann / Nia)
- Attention : personnages "modernes" par défaut. Prévoir retexture peaux/vêtements.

### 3. Prototype Set 1 (optionnel, fallbacks)

- URL : https://kenney.nl/assets/prototype-set-1
- Contient : primitives colorées pour tests
- Utile pour : placeholders si asset manquant

### 4. Modular Buildings (optionnel, pour hut)

- URL : https://kenney.nl/assets/modular-buildings
- Contient : bâtiments modulables
- Utile pour : Hut torchis (peut-être adapter cône)

## Procédure de téléchargement (manuel, une fois)

1. Aller sur https://kenney.nl
2. Créer un compte gratuit (facultatif mais permet de suivre ce qui est téléchargé)
3. Pour chaque pack ci-dessus :
   - Cliquer sur le pack
   - Cliquer sur "Download" (bouton bleu)
   - Confirmer le type de licence (CC0 accepté automatiquement)
   - Le zip descend dans `~/Downloads`
4. Dézipper chaque pack
5. Copier les fichiers `.glb` (ou `.gltf`) dans le dossier `public/assets/kenney/<pack-name>/` du projet Carnac

## Structure attendue dans le repo

```
public/
└── assets/
    └── kenney/
        ├── README.md · pointe vers ce doc
        ├── nature-kit/
        │   ├── rock-large-A.glb
        │   ├── rock-small.glb
        │   ├── grass.glb
        │   ├── tree-pine.glb
        │   └── ...
        ├── toon-characters/
        │   ├── male.glb
        │   ├── female.glb
        │   └── ...
        └── prototype/
            └── ...
```

**Convention** : renommer les fichiers en `kebab-case` court, en supprimant les préfixes/suffixes inutiles ajoutés par Kenney.

## Utilisation dans le code

### Hook simple

```tsx
import { useGLTF } from "@react-three/drei";

function Rock() {
  const { scene } = useGLTF("/assets/kenney/nature-kit/rock-large-A.glb");
  return <primitive object={scene.clone()} />;
}
```

### Wrapper safe avec fallback

Voir `src/lib/useKenneyAsset.ts` (à créer) qui expose une API tolérante aux assets manquants (return null si fichier absent, permet le développement même sans les zips téléchargés).

### Chargement optimisé

`useGLTF` de drei cache automatiquement les modèles. Un même modèle chargé N fois est en réalité fetch une seule fois. Le `.clone()` est nécessaire si on affiche plusieurs instances qui doivent être indépendantes (animation, position).

Preload possible via `useGLTF.preload(url)` au niveau App pour éviter les popups pendant la scène.

## Charte visuelle appliquée aux assets Kenney

Les modèles Kenney sont livrés avec leurs matériaux/textures d'origine. Pour rester dans la charte Carnac (cel-shading, palette bretonne stricte, aucun PBR) :

- **Ne pas garder les MeshStandardMaterial d'origine** : les remplacer par `meshToonMaterial` + `gradientMap={getToonGradient(3)}` en traversant le graph
- **Recolorer selon palette** : appliquer `palette.warm.ochreDeep` / `palette.neutrals.granitMid` / etc. selon le rôle
- **Ajouter Outlines drei** pour cohérence cel-shading avec les entities existantes

Helper prévu : `applyToonSubstitution(scene, colorOverride)` qui traverse tous les meshes d'une scène chargée et remplace materials.

## Ordre de migration (recommandé, incrémental)

1. **Rochers** (`LandFoliage` + `Scene` rocks) : facile, 1 mesh par rocher, low-poly Kenney directement adaptable
2. **Végétation** (ajoncs, herbes) : ~5-6 modèles Nature Kit + retexture palette flora
3. **Menhirs** (`StandingStone` + `BackgroundAlignment`) : Kenney n'a pas de "menhir" direct, mais des rochers verticaux peuvent servir avec adaptation
4. **Hutte** (cône ochre actuel) : Modular Buildings ou Nature Kit stump/log si simple
5. **Personnages** (`Player`, `Villager`) : plus complexe, animations à gérer, retexture peaux mates
6. **Feu** : garder shader actuel, Kenney n'a pas de feu 3D

## Attention à l'attribution

CC0 = domaine public = aucune obligation légale d'attribuer. **Mais** par respect pour l'auteur (Kenney Vleugels) :

- Mentionner Kenney dans `README.md` section Remerciements
- Éventuellement lien dans `docs/asset-pipeline-kenney.md` (ce fichier)
- Aucune obligation contractuelle

## Alternatives si Kenney insuffisant

- **Poly.pizza** (ex-Google Poly) : https://poly.pizza · low-poly CC0/CC-BY, catalogue immense
- **Sketchfab** filtre CC0 : https://sketchfab.com · qualité variable, licences à vérifier
- **Quaternius** : https://quaternius.com · packs low-poly gratuits, style proche Kenney
- **Génération IA locale (Hunyuan)** : pipeline documenté dans direction-artistique.md section 13, permet créations sur mesure sans copyright

## Prochaine étape

Une fois les packs téléchargés et placés dans `public/assets/kenney/` :

1. Créer `src/lib/useKenneyAsset.ts` (hook wrapper avec fallback)
2. Créer `src/lib/toon-substitution.ts` (helper materiaux)
3. Migrer 1 entity (rochers) et valider le rendu Playwright
4. Migrer progressivement les autres entities
5. Retirer les primitives placeholder au fur et à mesure
