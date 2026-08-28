# Direction artistique

Ce document définit le rendu graphique de *Carnac*. Il sert de référence unique pour toute décision visuelle (modélisation, textures, shaders, éclairage, UI). Il est écrit pour être opérationnel : chaque section produit une contrainte concrète pour la production.

Toute décision graphique qui contredit ce document doit soit modifier ce document (par accord explicite), soit être écartée.

## 1. Référents et positionnement

Trois références nourrissent le rendu de Carnac, chacune pour une raison précise. Elles ne sont pas en concurrence, chacune apporte une strate distincte.

| Référent | Ce qu'on prend | Ce qu'on ne prend pas |
|----------|----------------|----------------------|
| **Sable** (Shedworks, 2021) | Cel-shading doux, ligne claire, lisibilité iso, silhouettes stylisées, poésie du vide | Le côté BD "Moebius" trop graphique, l'immensité désertique |
| **Journey** (thatgamecompany, 2012) | Palette monochrome chaude par acte, particules discrètes, dramaturgie de la lumière, sentiment épique intime | La caméra dynamique, le sable-fluide, l'animation vestimentaire complexe |
| **Kentucky Route Zero** (Cardboard Computer, 2013-2020) | Minimalisme théâtral (peu d'éléments à l'écran, chaque objet compte), ombres franches, magie douce sans effets | Le vector art pur, la 2D, l'absence totale de textures |

**Signature propre à Carnac** (aucun des trois ne fait ça) : **peintures pariétales animées façon Néolithique européen** (Lascaux, Chauvet, Rouffignac) pour la frise du temps profond, les interludes et les fresques débloquées. Trait tremblé, ocre-charbon-blanc, animation image par image 10-15 frames.

## 2. Style visuel global

- **Rendu 3D low-poly stylisé** avec cel-shading doux
- Personnages : 300 à 800 triangles chacun
- Décor : props simples, réutilisation forte
- Textures peintes à la main, teintes plates, résolution modeste (256px à 512px)
- Une seule ombre franche par élément (pas de gradient), teinte plus foncée de la surface
- Contour subtil : léger outline sombre uniquement sur personnages et props interactifs (Fresnel inversé, 1-2 px)
- Aucun PBR, aucun métal, aucun spéculaire (cohérent avec le Néolithique et avec le style)

## 3. Palette

Palette limitée, définie en amont, appliquée par grading final si besoin. Aucune couleur hors charte ne doit apparaître à l'écran.

### Neutres minéraux

| Nom | Hex | Usage |
|-----|-----|-------|
| Granit clair | `#B5B0A8` | Pierres, sol pierreux, ciel diurne pâle |
| Granit moyen | `#7C7873` | Ombres pierres, structures |
| Granit foncé | `#4A4844` | Ombres franches, contours |
| Charbon | `#2A1E1A` | Ombres extrêmes, trait des fresques |
| Blanc os | `#E8DFC8` | Lumière lune, pigment blanc fresques |

### Chauds terreux (Actes 1 et 2, feu, ocre)

| Nom | Hex | Usage |
|-----|-----|-------|
| Ocre chaude | `#C89060` | Terre foulée, peaux dominantes, torchis |
| Ocre profonde | `#A65F35` | Bois, cuirs, pigment fresques |
| Rouge terre | `#8C3E28` | Peintures corporelles étrangers, sang, pigment fresques |
| Or crépuscule | `#E8A952` | Lumière soir Acte 2, halo étoile |
| Feu | `#F0783C` | Flammes, particules |

### Froids marins (nuit, mer, épilogue)

| Nom | Hex | Usage |
|-----|-----|-------|
| Ardoise mer | `#3D4A55` | Mer, ciel gris |
| Bleu nuit | `#1B2432` | Ciel nuit, ombres nocturnes |
| Bleu profond | `#0E1520` | Fond épilogue temps profond |
| Bleu halo | `#6D8FA8` | Halo perceptif (Acte 3), léger, presque blanc |

### Contraintes de palette par acte

Chaque acte a une palette dominante qui infuse via un post-process léger.

- **Acte 1** : neutres granit + chauds ocre. Lumière neutre chaude.
- **Acte 2** : neutres granit + chauds crépuscule (déclin vers or et rouge). Vire au froid en fin d'acte (nuit tombante).
- **Acte 3** : neutres granit + bleu aube + or de l'étoile levante + apparition timide du bleu halo.
- **Épilogue frise** : chauds terreux au début (Néolithique), vire progressivement vers froids marins minéraux (temps qui passe), finit sur une palette contemporaine désaturée.

## 4. Composition et lisibilité

- Caméra orthographique isométrique, angle **30° d'inclinaison latérale, 45° d'azimut** (à valider en prototype). Fixe. Aucun zoom.
- **Règle des trois plans lisibles** : premier plan (perso + interactif proche), plan moyen (décor jouable), arrière-plan (mer, ciel, silhouettes lointaines).
- **Minimalisme théâtral** : moins de 20 éléments significatifs à l'écran à tout moment. Un rocher = compte. Une touffe d'herbe = compte. Pas de fioritures d'ambiance.
- **Silhouettes lisibles à 20m in-game** : Kel, Vann, Athro, Nia doivent être reconnaissables à distance par leur silhouette seule (courbure, taille, port).
- **Une seule information par écran** : si le joueur doit remarquer un objet, aucun autre objet ne doit chercher son attention. Composition dirigée.

## 5. Éclairage

- Une seule lumière directionnelle par moment de la journée + une ambiante teintée
- **4 moments préréglés** (pas de dynamique continue) :
  - Aube : ambiante froide bleutée, directionnelle rasante orangée
  - Midi : ambiante neutre, directionnelle verticale douce
  - Crépuscule : ambiante or profond, directionnelle rasante rouge
  - Nuit : ambiante bleu nuit, directionnelle lunaire faible
- **Feu** : point light chaude (`#F0783C`), portée courte (~5m), flicker discret
- **Étoile de l'Est (Acte 2 fin et Acte 3)** : point light minuscule dorée dans le ciel + halo shader dédié
- **Halo perceptif (Acte 3)** : shader dédié sur mesh, activé par flag mémoire post-Acte 2, visible uniquement en mode "Observer". Léger Fresnel bleu halo `#6D8FA8`, faible intensité, pulsation lente.

## 6. Personnages

### Rig et modèles

- **Un seul rig humain de base** pour Kel, Athro, Vann, Nia, Étrangers. Variations par :
  - Proportions (échelle os : Nia enfant = 0.7x, Athro courbé = colonne fléchie, Kel neutre)
  - Textures (peau, cheveux, peintures corporelles, vêtements)
  - Props (bâton pour Athro, filet pour Vann)

### Palette humaine

Choix documenté dans `notes-historiques.md`.

- **Peaux** : mates à foncées, éventail de 4 teintes fournies
  - Peau A `#8C6650` (mate chaude)
  - Peau B `#6B4A38` (foncée chaude)
  - Peau C `#4E3728` (foncée profonde)
  - Peau D `#3A2820` (très foncée)
- **Cheveux** : foncés (charbon `#2A1E1A` à ocre profonde `#5C3E28`). Aucun cheveu blond ou roux dans ce chapitre.
- **Yeux** : bruns majoritaires, 1 personnage aux yeux clairs (Nia, en écho à Cheddar Man et à l'archéogénétique).

### Vêtements et accessoires

- Peaux tannées (ocre chaude, ocre profonde), fibres végétales tressées (granit clair passé à l'ocre)
- Pas de tissage complexe, pas de couleurs saturées, pas de bijou métallique
- Peintures corporelles :
  - Tribu de Kel : traits d'ocre chaude `#C89060` sur pommettes et bras
  - Tribu étrangère : traits de rouge terre `#8C3E28` et blanc os `#E8DFC8` sur torse

### Casting visuel identifié

| Personnage | Silhouette | Peau | Cheveux | Marque distinctive |
|------------|-----------|------|---------|---------------------|
| Kel (joueuse) | Droite, souple, cheveux mi-longs libres | B `#6B4A38` | Charbon | Traits d'ocre chaude sur pommettes |
| Athro (ancien) | Courbée, appuyée sur bâton | C `#4E3728` | Blancs mêlés | Barbe blanche, tatouages abstraits sur bras |
| Vann (pair) | Grand, droit, cheveux attachés | B `#6B4A38` | Ocre profonde | Filet de pêche à la ceinture |
| Nia (enfant) | Petit, vif, en mouvement | A `#8C6650` | Bruns tressés | Yeux clairs `#6D8FA8` |
| Étranger 1 | Immobile, très droit, silencieux | D `#3A2820` | Charbon | Peintures corporelles rouges et blanches |
| Étranger 2 | Silhouette lointaine, accompagnant | (indéterminée) | Charbon | Bâton long |

## 7. Décor

- **Sol** : granit affleurant + terre battue + touffes d'herbe stylisées (billboards low-poly)
- **Végétation** : ajoncs (billboards jaunes ocre), herbes hautes, quelques pins bord de mer (low-poly)
- **Mer** : plan large en fond, shader tuilé simple, quelques reflets or au crépuscule
- **Ciel** : dégradé vertical, quelques étoiles la nuit (billboards + shader scintillement lent), l'étoile de l'Est proéminente en Acte 2 fin et Acte 3
- **Feu de camp** : shader animé simple (2-3 sprites croisés + billboard), sans simulation
- **Huttes de torchis** : formes coniques low-poly, textures peintes, ombre au sol simple
- **Pierres et rochers** : 6 à 8 variations réutilisées partout, palette granit
- **La pierre du climax** : modèle unique, silhouette plate au sol Acte 3 début, dressée Acte 3 fin. Halo shader dédié.

## 8. Particules et effets

Discrets, jamais spectaculaires.

- Fumée de feu : particules gris granit foncé, lente ascension
- Écume mer : petits triangles blanc os, apparition et disparition en boucle
- Cendres feu : rares points orange qui montent
- Halo étoile : sprite additif or, pulse lent
- Halo perceptif rochers : shader sur mesh (voir Éclairage)
- Aucun feu d'artifice, aucun rayon lumineux dramatique, aucune particule de "magie"

## 9. Peintures pariétales (signature du jeu)

Style pariétal européen paléolithique-néolithique. Références visuelles : Lascaux, Chauvet, Rouffignac, art rupestre du Levant espagnol.

- **Trait tremblé**, épaisseur 2 à 4 px in-game, à la main
- **Palette** : charbon `#2A1E1A`, ocre chaude `#C89060`, rouge terre `#8C3E28`, blanc os `#E8DFC8`. Aucune autre couleur.
- **Support visuel** : texture de paroi calcaire ou granit clair, imperfections marquées
- **Animation image par image**, 10 à 15 frames par dessin, boucle lente
- **Dessins prévus MVP** :
  - Fresque de fin Acte 3 : silhouette debout au bord de la mer, étoile au-dessus
  - Épilogue frise : 6 à 10 vignettes qui apparaissent l'une après l'autre (deuxième pierre, alignement en formation, dolmen, Celte devant l'alignement, croix chrétienne gravée, drone contemporain)
- **Séquence d'apparition** : trait qui se dessine progressivement à l'écran, comme si tracé en direct

## 10. Interface utilisateur

Zéro UI in-game hors dialogue optionnel du bouton "Observer" (icône œil discrète, coin bas droit, apparition contextuelle).

Éléments UI restants, tous en frise ou écran spécial :

- **Écran-titre** : frise du temps profond horizontale, curseur lumineux, bouton "Commencer" (typo serif sobre)
- **Interludes** : frise réduite en haut d'écran, curseur qui se rappelle, courtes lignes de texte discrètes
- **Écran final** : phrase unique centrée, fondu

### Typographie

- **Titres et frise** : `EB Garamond` (open-source) ou `Cormorant Garamond`. Sobre, historique, lisible, sans être froid.
- **Aucun texte in-game**. Aucune bulle de dialogue. Aucun sous-titre.
- **Titres de carte** (rares : "La première pierre", "Les pierres sont restées. Nous aussi.") : petites capitales espacées, discrètes, apparition en fondu.

## 11. Audio (rappel pour cohérence AV)

Le rendu graphique et le rendu audio doivent être pensés ensemble. Rappel des choix (détaillés ailleurs) :

- Musique : drone minéral basse fréquence en fond, corne lointaine ponctuelle, chœur féminin discret au climax
- Vocalises PNJ : 15 à 20 échantillons humains courts, ni chantés ni parlés, entre les deux
- SFX : feu, mer, vent, coquillages, pas sur herbe et pierre, silex qu'on taille, corps posé au sol

## 12. Ce qui est explicitement OUT

- PBR, matériaux métalliques, spéculaires
- Post-process lourd (bloom fort, motion blur, DOF cinématique)
- Ombres dynamiques temps réel calculées finement
- Simulation physique (fluides, tissus, cheveux)
- Rayons volumétriques, god rays
- Effets de "magie" visuels codifiés jeu vidéo (halos multicolores, particules pulsantes stylisées)
- Feux d'artifice, explosions, effets dramatiques
- Interface complexe (menus imbriqués, tooltips, mini-carte)
- Filtres nostalgiques (grain de film, vignette forte, aberration chromatique)

## 13. Pipeline de production

- **Modélisation** : Blender. Export GLTF/GLB. Un rig humain unique versionné.
- **Textures** : peintes à la main dans Krita ou Procreate. Résolution 256px à 512px. Format PNG.
- **Animation personnages** : Mixamo pour la base (idle, walk, s'asseoir), retouche Blender pour les gestes spécifiques (imiter, poser la pierre, mourir)
- **Peintures pariétales** : Procreate ou Krita, export en sprite sheets 10-15 frames
- **Shaders** : GLSL customs pour cel-shading, halo, outline. Trois shaders principaux : `cel_toon`, `halo_pulse`, `outline_soft`.
- **Audio** : SFX libres de droit (freesound.org, Zapsplat), vocalises enregistrées maison ou tirées de bibliothèques libres, musique composée soit à la main soit par générateur libre validé.

## 14. Validation du rendu

Le rendu MVP est considéré cohérent avec cette charte quand :

1. Un screenshot pris au hasard dans les 3 actes contient uniquement des couleurs de la palette section 3.
2. Les 6 personnages du casting sont différenciables à silhouette seule, sans texture.
3. Les peintures pariétales sont indiscernables (au premier coup d'œil) d'un vrai relevé de peinture néolithique européenne, sauf en s'approchant.
4. Aucun élément UI n'apparaît en jeu hors bouton "Observer" et écrans de frise.
5. L'ambiance globale est plus proche de *Sable* + *Journey* que de n'importe quel jeu de survie préhistorique existant.

## 15. Prochaine étape recommandée

Une fois cette charte validée, produire **un mockup statique** (Blender ou Figma, 2 à 4 heures) d'une seule scène (le campement au crépuscule vu en iso), qui applique intégralement les règles ci-dessus. Ce mockup devient la **cible visuelle** que doit atteindre le prototype technique J1.

Ne pas commencer J1 (prototype r3f) avant d'avoir ce mockup validé.
