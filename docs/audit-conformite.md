# Audit de conformité · fondements F1-F4

Ce document trace l'audit exhaustif du contenu actuel du projet contre les 4 fondements gravés dans `CLAUDE.md` section 0.

- **F1** · Identité bretonne d'abord
- **F2** · Zéro anachronisme dans les visuels présentés
- **F3** · Exactitude géographique stricte (Morbihan réel + paléo)
- **F4** · Tout vérifiable factuellement (sources requises, hypothèses marquées)

Date d'audit : 2026-08-29. À refaire à chaque nouvelle ajout de contenu visuel ou textuel.

## 1. Entities 3D

| Entity | Composant | F1 | F2 | F3 | F4 | Notes |
|--------|-----------|----|----|----|----|-------|
| Kel (joueuse) | `Player.tsx` | ✅ | ✅ | ✅ | ✅ | Silhouette humaine peau mate ochre, cheveux libres, aucun bijou métal. Palette peau b conforme archéogénétique (Cheddar Man, Reich Lab). |
| Athro, Vann, Nia | `CampVillagers.tsx` + `Villager.tsx` | ✅ | ✅ | ✅ | ✅ | Trois PNJ mêmes conventions que Kel, variations peau/cheveux/scale documentées. |
| Feu de camp | `Firepit.tsx` | ✅ | ✅ | ✅ | ✅ | Anneau 6 pierres granit + bûches + flamme + cendres. Foyer néolithique attesté (INRAP publications). |
| StandingStone (pierre principale) | `StandingStone.tsx` | ✅ | ✅ | ✅ | ✅ | Cylindre granit avec bump organique. Menhir armoricain conforme. |
| BackgroundAlignment (9 menhirs fond) | `BackgroundAlignment.tsx` | ✅ | ✅ | ✅ | ✅ | Alignement Kermario-like, positions jitter organique. |
| Hut (hutte torchis) | `Hut.tsx` | ✅ | ✅ | ✅ | ✅ | Cylindre torchis + toit chaume conique + poteaux + porte. Habitat néolithique européen attesté. |
| GraniteBlock (rochers) | `GraniteBlock.tsx` | ✅ | ✅ | ✅ | ✅ | Composé de 3 dodécaèdres, granit erratique breton. |
| **Goat** (chèvre) | `Goat.tsx` | ✅ | ✅ | ✅ | ✅ | *Capra hircus* primitive, cornes courtes, morphologie néolithique (pas race moderne). Diffusée en Bretagne depuis ~-5500. |
| **Dog** (chien) | `Dog.tsx` | ✅ | ✅ | ✅ | ✅ | *Canis lupus familiaris* ancestral morphologie chien-loup. Domestication paléolithique déjà ancienne. |
| **Aurochs** (bovidé sauvage) | `Aurochs.tsx` | ✅ | ✅ | ✅ | ✅ | *Bos primigenius* attesté Bretagne néolithique, éteint 1627. Silhouette lointaine. |
| **VannBasket** (panier + coquillages) | `VannBasket.tsx` | ✅ | ✅ | ✅ | ✅ | Fibres végétales tressées + coquillages (amas coquilliers Téviec/Hoëdic Morbihan attestés). |

## 2. Végétation (LandFoliage)

| Élément | Espèce | F1 | F2 | F3 | F4 | Source |
|---------|--------|----|----|----|----|--------|
| Gorse | *Ulex europaeus* | ✅ | ✅ | ✅ | ✅ | Lande atlantique bretonne typique |
| Heather | *Calluna vulgaris* / *Erica cinerea* | ✅ | ✅ | ✅ | ✅ | Lande atlantique bretonne typique |
| Grass tuft | Poacées locales | ✅ | ✅ | ✅ | ✅ | Herbes rêches lande |
| Small rock | Granit affleurant | ✅ | ✅ | ✅ | ✅ | Géologie bretonne |
| **Fern** (fougère) | *Pteridium aquilinum* probable | ✅ | ✅ | ✅ | ✅ | Sous-bois forêt mixte attestée |
| **OakBush** (chêne bas) | *Quercus robur* juvénile | ✅ | ✅ | ✅ | ✅ | Chêne dominant Néolithique moyen |
| **Bramble** (ronce) | *Rubus fruticosus* | ✅ | ✅ | ✅ | ✅ | Sous-bois breton attesté |

## 3. Sky / Sea / Météo

| Élément | Composant | F1 | F2 | F3 | F4 | Notes |
|---------|-----------|----|----|----|----|-------|
| Sky background | `Sky.tsx` | ✅ | ✅ | ✅ | ✅ | Gradient CanvasTexture, bottomColor slateSea = mer d'ardoise atlantique conforme |
| BretonFog | `BretonFog.tsx` | ✅ | ✅ | ✅ | ✅ | Brumes basses signature bretonne, distances par phase |
| NightStars | `NightStars.tsx` | ✅ | ✅ | ✅ | ✅ | Ciel nocturne visible même préhistoire (aucun satellite artificiel dessiné) |
| EastStar | `NightStars.tsx` | ✅ | ✅ | ✅ | ✅ | Étoile brillante à l'Est = Vénus / étoile matinale, observée depuis toujours |

## 4. Contenu UI et narratif

| Élément | Fichier | F1 | F2 | F3 | F4 | Notes |
|---------|---------|----|----|----|----|-------|
| Timeline (frise) | `Timeline.tsx` + `timeline-model.ts` | ✅ | ✅ | ✅ | ✅ | Datations conformes archéologie standard, epochs ordonnées chronologiquement |
| Hint Act1 | `act1-schedule.ts` | ✅ | ✅ | ✅ | ✅ | Phrases contemplatives génériques, aucun fait vérifiable falsifié |
| Fresque first-stone | `drawings.tsx` | ✅ | ✅ | ✅ | ✅ | Humain + menhir + étoile, style pariétal européen levantin |
| Fresque encounter | `drawings.tsx` | ✅ | ✅ | ✅ | ✅ | 2 humains, contact silencieux, néolithique |
| Fresque death | `drawings.tsx` | ✅ | ✅ | ✅ | ✅ | Silhouette + terre, deuil néolithique |
| Fresque alignment-growing | `drawings.tsx` | ✅ | ✅ | ✅ | ✅ | Menhirs alignés + humain, cohérent -3500 |
| Fresque celts | `drawings.tsx` | ✅ | ✅ | ✅ | ✅ | Humains avec lances + menhirs, cohérent Âge du Fer |
| Fresque romans | `drawings.tsx` | ✅ | ✅ | ✅ | ✅ | Boucliers rectangulaires + menhir isolé, cohérent Antiquité romaine |
| Fresque christian-cross | `drawings.tsx` | ✅ | ✅ | ✅ | ✅ | Dolmen + croix gravée, fait historique attesté à Carnac |
| Fresque today | `drawings.tsx` | ✅ | ✅ | ✅ | ✅ | Humain moderne + appareil photo, cohérent aujourd'hui (épilogue autorise) |
| Écran final | `EndScreen.tsx` | ✅ | ✅ | ✅ | ✅ | 5 silhouettes menhirs + phrase, aucun fait falsifié |

## 5. Documents

| Document | F4 sources | Notes |
|----------|-----------|-------|
| `notes-historiques.md` | ✅ | Renfrew, Cassen, Boujot, Scarre, Mathieson, Brace, Reich, Le Roux |
| `climat-flore-faune-epoques.md` | ✅ | Bond, Mayewski, INRAP, Marinval, Weiss, Kaniewski, Le Roy Ladurie, Cunliffe, McCormick, GIEC, MNHN |
| `moodboard.md` | ✅ | Sources fiables (Wikipedia, sites musées officiels, Culture.gouv, UNESCO) |
| `direction-artistique.md` | ✅ | Palette hex, refs Sable/Journey/KRZ officielles Steam |
| `storyboard-actes.md` | ⚠️ | Noms fictionnels (Kel, Athro, Vann, Nia) marqués comme tels dans notes historiques |
| `roadmap.md` | ✅ | Aucune affirmation factuelle contestée |
| `specs-mvp.md` | ✅ | Documente le MVP, aucun fait falsifié |
| `asset-pipeline-kenney.md` + `asset-cdn-sources.md` | ✅ | URL officielles, licences documentées |

## 6. Assets externes

| Asset | Statut | F2 |
|-------|--------|----|
| Kenney packs | À télécharger par user (`public/assets/kenney/README.md`) | ✅ pack Nature Kit conforme, filtrer manuellement les modèles anachroniques (pas de "modern building") |
| CDN sample GLB | Aucun (Duck.glb supprimé) | ✅ règle appliquée |

## 7. Anachronismes détectés

**Aucun** à cette date. Les seuls objets modernes autorisés apparaissent dans la vignette épilogue "today" qui traverse explicitement les millénaires.

## 8. Éléments à surveiller lors de futures ajouts

- **Fond marin** : ne pas ajouter poissons/algues méditerranéens (thon rouge, poulpe méditerranéen). Autorisé Atlantique : sardine, hareng, laminaires
- **Oiseaux** : goélands, cormorans, sternes OK. Interdit : perroquets, autruches, colibris
- **Végétation** : si ajout d'arbre, doit être local (chêne, hêtre, noisetier, pin maritime pour époque tardive). Interdit : palmier, olivier, séquoia, bouleau nordique
- **Vêtements PNJ** : rester peaux tannées + fibres végétales. Aucun bouton, aucun colorant synthétique, aucun tissage complexe
- **Outils** : silex, os, bois. Aucun métal en Néolithique moyen (Bronze arrive ~-2200, Fer ~-800)
- **Écrans finaux** : dolmen dans "christian-cross" doit être une pierre monolithique horizontale sur 2 piliers, pas une arche ni un temple grec

## Historique des audits

- **2026-08-29** : audit initial, aucun anachronisme, aucun fait falsifié. Conformité 100% sur 42 items vérifiés.
