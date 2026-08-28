# Mockups

Mockups statiques 2D qui servent de **cible visuelle** pour le rendu du jeu. Chaque mockup applique intégralement la charte (`docs/direction-artistique.md`) et le moodboard (`docs/moodboard.md`).

## Fichiers

- `act1-camp-dusk.svg` · scène Acte 1, campement au crépuscule (première cible visuelle, référence pour toutes les productions ultérieures 3D)
- `prompt-image-generation.md` · prompts textuels prêts à coller dans un générateur d'images IA (Nano Banana, Midjourney, DALL-E) pour produire des variantes peintes plus riches des scènes 3D
- `ui/` · mockups des **écrans UI** du jeu (écran-titre, interlude, fresque, écran final, HUD Observer), produits par Claude Design le 28/08/2026 à partir de la charte du repo. Voir `ui/github.md` pour le mapping écran → docs source.

## Le mockup SVG · usage

Le SVG est intentionnellement simple : silhouettes plates, palette section 3 stricte, composition iso ortho. Il vaut pour **cadrage et validation composition**, pas pour rendu final.

- **Ouvrir dans un navigateur** : double-clic sur le fichier, ou glisser dans Chrome/Firefox
- **Ouvrir dans Krita** : import direct, converti en raster (tu peux repeindre par-dessus)
- **Ouvrir dans Inkscape** : édition vectorielle native (si tu veux ajuster silhouettes ou palette)
- **Ouvrir dans Figma** : import SVG, chaque groupe devient éditable

## Ce qui est validé par ce mockup

- **Composition iso ortho** : ciel dégradé haut, mer d'ardoise en bande, sol en dominance basse
- **Placement des personnages** : Kel assise avant-gauche du feu, Athro debout arrière-gauche, Vann accroupi avant-droite, Nia en course à gauche
- **Palette stricte** : chaque couleur vient de `src/palette.ts` et de la section 3 de la charte
- **Étoile de l'Est** subtile en bas-droite du ciel, préfigure son rôle Acte 2 et 3
- **Silhouettes différenciables** : Kel (cheveux longs + traits ocre), Athro (courbé, bâton, cheveux blancs), Vann (grand, cheveux attachés, filet), Nia (petit, tresses, yeux clairs)
- **Halo de feu** au sol qui rassemble la composition

## Ce qui n'est PAS validé par ce mockup

- **Rendu texturé** : le SVG est en aplats, pas de peinture. Le prompt IA sert à explorer un rendu plus riche.
- **Animation, particules** : à valider en proto r3f
- **Cel-shading contour** : à valider dans les shaders
- **Peintures pariétales** : à mockuper séparément

## Cycle de validation

1. Ouvrir le SVG dans le navigateur en plein écran
2. Ouvrir en parallèle 1 screenshot Sable + 1 screenshot Journey
3. Question honnête : "mon mockup ressemble plus à Sable/Journey ou plus à un jeu de survie préhistorique lambda ?"
4. Si non aligné : itérer sur le SVG (ou piloter Claude design / autre générateur avec le prompt joint)
5. Si aligné : ce mockup devient la référence visuelle du projet, tout le reste est jugé contre lui

## Prochains mockups à produire (dans cet ordre)

1. `act2-encounter.svg` · rencontre inter-tribu sur le sentier vers la falaise
2. `act2-death.svg` · enterrement d'Athro au coucher du soleil
3. `act3-first-stone.svg` · Kel pose la première pierre debout, étoile levante, clairière
4. `timeline-frieze.svg` · frise du temps profond, écran-titre
5. `epilogue-strip.svg` · série de vignettes pariétales de l'épilogue

Chaque mockup applique la même charte et progresse la palette selon l'acte (voir section 3 de `direction-artistique.md`).
