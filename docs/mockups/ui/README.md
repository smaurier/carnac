# Mockups UI (Claude Design)

Mockups des écrans UI du jeu produits par Claude Design le 28/08/2026 à partir de `docs/direction-artistique.md`, `docs/specs-mvp.md` et `src/palette.ts`.

## Fichiers

- `carnac-ui-mockups.dc.html` · bundle Claude Design contenant les 5 écrans + 2 variantes titre, self-contained (styles inline, SVG inline). Utilise `support.js` pour le rendu.
- `support.js` · runtime Claude Design (requis à côté du HTML pour le rendu)
- `.thumbnail` · vignette générée par Claude Design (binaire)
- `github.md` · mapping écran → docs source du repo

## Écrans produits

| ID | Écran | Fond | Détails |
|----|-------|------|---------|
| **1a** | Écran-titre principal | Charbon `#2A1E1A` | Frise du temps profond + logo "CARNAC" + sous-titre "Bretagne · Néolithique moyen" + curseur diamant or `-4500` + bouton "commencer" |
| **1b** | Interlude d'acte | Nuit bleu `#1B2432` | Frise réduite en haut + phrase italique centrée "Un jour, comme les autres." |
| **1c** | Fresque pariétale | Charbon + granit clair | Dessin trait tremblé (silhouette humaine + menhir + mer + étoile) sur pierre `#B5B0A8`, titre "la première pierre" + compteur "Fresque · 1 / 3" |
| **1d** | Écran final | Bleu profond `#0E1520` | Phrase "Les pierres sont restées. Nous aussi." + 5 silhouettes de menhirs en bas |
| **1e** | HUD Observer in-game | Scène crépuscule en aplats | Rocher-halo au centre + verbe "regarder" contextuel + icône œil "observer" bas-droit |
| **1f** | Variante titre nuit | Bleu profond `#0E1520` | Écran-titre en palette froide (temps profond) |
| **1g** | Variante titre paroi claire | Blanc os `#E8DFC8` | Écran-titre en palette pariétale (pigments ocre + charbon) |

## Ouvrir les mockups

- **Navigateur** : double-clic sur `carnac-ui-mockups.dc.html`. Le fichier utilise `support.js` (doit rester à côté).
- **En ligne (recommandé)** : ouvrir la version rendue sur le canvas Claude Design d'origine.
- **Screenshots** : à extraire au besoin en ouvrant chaque écran plein cadre depuis le navigateur.

## Validation vs charte

- ✅ Palette : exclusivement des hex de `src/palette.ts` (charbon, granit, ocres, ardoise, night blue, or crépuscule, bone white, halo blue)
- ✅ Typographie : EB Garamond partout, aucun sans-serif
- ✅ Zéro chrome moderne : aucun drop shadow, aucun bouton material, aucune bordure arrondie hors intention (menhirs silhouettes)
- ✅ Petites capitales espacées pour titres et libellés
- ✅ Silence visuel : composition théâtrale, aucun élément décoratif superflu
- ✅ Traitement fresque : trait tremblé, palette charbon + ocre + rouge terre + blanc os
- ✅ Compte 5 écrans demandés + 2 variantes bonus

## Écarts à discuter

- **1c fresque** : le SVG de la silhouette humaine reste assez schématique. Un vrai relevé pariétal devra être plus proche du Levant espagnol (voir `docs/moodboard.md` section 3).
- **1e HUD Observer** : la scène de fond est en aplats CSS, pas en 3D iso r3f. C'est cohérent pour un mockup, mais le vrai HUD sera overlay sur le rendu r3f.
- **Frise 1a** : positions temporelles indicatives (Paléo 6%, Méso 25%, Bronze 58%, etc.). À caler précisément sur une vraie échelle temporelle en implémentation.

## Prochains mockups UI à demander à Claude Design

Voir dernière ligne de `carnac-ui-mockups.dc.html` (section "Try next") :
- Interlude 1b sans texte, étoile de l'Est qui pulse
- Curseur de la frise 1a animé (transition dawn → today)
- Version épilogue de la frise avec 7 vignettes pariétales
