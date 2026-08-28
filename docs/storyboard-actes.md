# Storyboard des 3 actes du MVP

Ce document détaille scène par scène le premier chapitre jouable de *Carnac* (Néolithique moyen armoricain, ~4500 av. J.-C.). Il complète `specs-mvp.md` en descendant au niveau des actions, positions, timings et triggers.

Repère : coordonnées **iso ortho** angle 45° / 30° tilt, unités = mètres de la scène r3f. `[x, y, z]` avec Y vertical, X droite, Z profondeur.

## Personnages et couleurs

| Personnage | Rôle | Silhouette | Peau | Cheveux | Marque distinctive |
|------------|------|------------|------|---------|---------------------|
| **Kel** (joueuse) | Jeune femme | droite, souple, cheveux mi-longs libres | `skin.b #6B4A38` | charcoal | traits d'ocre chaude sur pommettes |
| **Athro** (ancien) | Père spirituel | courbée, appuyée sur bâton | `skin.c #4E3728` | blancs mêlés | barbe blanche, tatouages abstraits |
| **Vann** (pair) | Pêcheur, ami | grand, droit, cheveux attachés | `skin.b #6B4A38` | ocre profonde | filet à la ceinture |
| **Nia** (enfant) | Jeune fille | petite, vive, en mouvement | `skin.a #8C6650` | tresses | yeux clairs (echo Cheddar Man) |
| **Étranger 1** | Porteur du signe | immobile, très droit | `skin.d #3A2820` | charbon | peintures corporelles rouges + blanches |
| **Étranger 2** | Accompagnant | silhouette lointaine | indéterminée | charbon | bâton long |

## Carte du campement (référence spatiale)

```
                 mer d'ardoise (fond Z+)
                       .........
                       .       .
    hutte 2 [+7, -6] . .       . . huttes couchees
                                     
       rochers granit [-4,-3] [3,-4] [-3,3]
                                     
                       foyer [0, 0]
                       chevre [-8, +2]
                                     
    lande cotiere : ajoncs, herbes hautes
    
                       CAMERA iso 45°/30°
                       zoom = 12 (wide)
```

Sentier vers la falaise : depuis campement `[0, 0]` vers Nord-Ouest `[-12, -6]`.
Clairière du geste : `[4, 0, 3]`, bordure mer.

## Acte 1 · Quotidien (~8 minutes)

**Objectif narratif** : installer la vie de la tribu, attacher le joueur à Kel et aux siens (surtout Athro).

### Scène 1.1 · Aube au campement (~90 s)

**Trigger** : entrée de l'acte depuis Title.
**Caméra** : wide, target `[0, 0, 0]`, zoom 12. Phase = `dawn` (ambient bleu froid, directional or rasant).

**Setup** :
- Kel : couchée sur peau au sol, position `[-1, 0.4, 1]`, quaternion inclinée
- Athro : accroupi près du foyer `[0.8, 0, -1.2]`, taille silex
- Vann : sortie hutte 1 `[6.8, 0, -5.6]`, s'étire
- Nia : dort dans la hutte 2 `[9, 0, -5.5]`
- Feu : brûle bas, particules cendres discrètes

**Action** :
- Kel s'assoit (anime `sit-up` 1.2 s). Timeline overlay apparaît fondu.
- Trigger interne : `flags.wake-up = true` (verrou `advance` non levé, informatif)

**Dialogue gestuel** : Athro lève lentement les yeux vers Kel, hoche la tête. Kel hoche en retour.

**Verbes disponibles** : Marcher (click-to-move), Regarder (observer).
**Non disponible** : Ramasser / Poser (aucun objet ciblable pour l'instant).

**Fin de scène** : après 40 s Kel peut se lever librement, ou trigger auto au bout de 90 s.

### Scène 1.2 · Athro taille son silex (~120 s)

**Trigger** : Kel arrive à moins de 1.5 unités d'Athro OU 60 s écoulées depuis 1.1.
**Caméra** : wide.

**Setup** :
- Athro fait un geste répété (tapotement silex sur galet) toutes les 3 s
- Halo léger d'attention discret autour de lui (particules ochre très faibles) quand Kel approche

**Action** :
- Kel peut s'asseoir près (verbe `S'asseoir` disponible dans un rayon de 2 unités autour d'Athro).
- Si assise > 8 s : Athro tourne le silex vers Kel, geste de démonstration lent. Vocalise courte (échantillon `athro-teach`).
- `flags.silex-learned = true` posé.

**Verbes** : Marcher, S'asseoir, Observer, Ramasser (un silex brut au sol à côté d'Athro apparaît une fois assise).

**Fin de scène** : Kel s'éloigne OU 120 s écoulées. Athro reprend son travail.

### Scène 1.3 · Vann revient de la mer (~90 s)

**Trigger** : temps écoulé depuis 1.2 > 60 s.
**Caméra** : wide, target dérive lentement vers `[3, 0, -3]` puis revient sur `[0, 0, 0]` (petit sway).

**Setup** :
- Vann apparaît depuis Nord-Est `[10, 0, 3]`, marche vers le foyer avec panier de coquillages
- Vann pose panier à côté du feu `[1, 0, 0.5]` (3-4 coquillages visibles au sol)

**Action** :
- Kel peut Ramasser un coquillage. Vocalise `vann-offer` légère si Kel ramasse.
- `flags.shell-picked = true` posé.
- Kel peut Poser le coquillage ailleurs.

**Verbes** : Marcher, Ramasser, Poser.

**Fin de scène** : Vann s'assoit dos au feu, immobile 20 s, puis se relève. 90 s écoulées.

### Scène 1.4 · Nia court après la chèvre (~90 s)

**Trigger** : temps écoulé > 240 s depuis début Acte 1.
**Caméra** : wide.

**Setup** :
- Nia sort de hutte 2, court en direction de la chèvre `[-8, 0, 2]`
- Chèvre s'éloigne au pas de Nia (fuite paresseuse, distance conservée à 2 unités)
- Rires stylisés (vocalise `nia-laugh` 3-4 fois)

**Action** :
- Kel peut suivre Nia (spectatrice) ou continuer sa journée.
- Si Kel s'approche à moins de 2 unités de Nia : Nia s'arrête, regarde Kel, sourire (vocalise `nia-greet`), puis reprend la course.

**Verbes** : Marcher, Observer.

**Fin de scène** : Nia rejoint Kel au foyer ou 90 s écoulées.

### Scène 1.5 · Crépuscule au feu (~90 s)

**Trigger** : temps total Acte 1 > 420 s.
**Caméra** : commence à interpoler vers phase `dusk` (2 s de fade), ambient ocre profonde.

**Setup** :
- Cycle jour/nuit préréglé passe de `noon` à `dusk`
- Kel doit être encouragée à s'asseoir près du feu (hint discret "trouver le feu" en HUD, disparaît si Kel > 2 unités du foyer)
- Athro, Vann, Nia se rassemblent progressivement autour du feu

**Action** :
- Kel s'assoit près du feu (verbe `S'asseoir` proposé au clic sur zone `[0, 0, 1.5]`)
- Une fois assise : fondu en noir 2 s, transition Acte 1 → Interlude 1.

**Verbes** : Marcher, S'asseoir.

**Fin de scène** : `dispatch("advance")` automatique.

### Notes techniques Acte 1

- Aucune action ne "bloque" la progression : le temps s'écoule, Kel peut errer.
- Chaque scène est **automatique** au timer, mais **plus riche** si Kel interagit.
- Compteur de "moments partagés avec Athro" à tracer via `flags.athro-moments` (bonus subtil pour renforcer l'attachement, exploité en Acte 2).

## Interlude 1

Écran bleu nuit. Phrase italique centrée : **"Un jour, comme les autres."**
Timeline réduite en haut, curseur immobile à -4500. Bouton `continuer`.

## Acte 2 · Rencontre et deuil (~10 minutes)

**Objectif narratif** : provoquer le choc émotionnel qui rendra le geste de l'Acte 3 nécessaire.

### Scène 2.1 · Matin, départ vers la falaise (~90 s)

**Trigger** : entrée Acte 2.
**Caméra** : wide, phase = `noon`.

**Setup** :
- Campement au réveil (setup identique 1.1 mais tribu déjà debout)
- Vann attend Kel près du sentier `[-8, 0, -3]`, panier de pêche
- Petit hint HUD : "Vann attend"

**Action** :
- Kel rejoint Vann. Une fois à moins de 2 unités, tous deux marchent en tandem vers le sentier `[-12, 0, -6]`.
- Caméra suit doucement (dolly interpolation vers `[-8, 0, -4]`).

**Verbes** : Marcher, Observer.

**Fin de scène** : trigger auto quand Kel + Vann atteignent `[-10, 0, -5]`.

### Scène 2.2 · Rencontre avec les étrangers (~120 s)

**Trigger** : Kel + Vann à `[-10, 0, -5]`.
**Caméra** : dolly vers `[-12, 1, -5]`, zoom 10 (léger resserrement).

**Setup** :
- Étranger 1 (immobile, très droit) est planté sur le sentier `[-13, 0, -7]`, face à un rocher isolé `[-14, 0.4, -8]`
- Étranger 2 (silhouette floue) est plus loin `[-16, 0, -9]`
- Vann s'arrête, main sur l'épaule de Kel (immobilise 4 s)

**Action** :
- Kel avance seule. Étranger 1 ne bouge pas, main gauche posée sur le rocher, yeux fermés (visible via head-look absent).
- Vocalise `stranger-hum` très basse, tenue longue.
- Après 20 s, Étranger 1 retire sa main du rocher, ouvre les yeux, regarde Kel une seconde, puis part vers Étranger 2 sans un mot.
- `flags.met-stranger = true`.

**Verbes** : Marcher, Observer (fortement encouragé).

**Fin de scène** : quand Étranger 1 + 2 sont hors champ (Z < -12 dans le brouillard), fondu court, retour Vann + Kel vers campement, transition scène 2.3.

**Note mise en scène** : le rocher isolé garde en mémoire l'événement. Il sera visible plus tard dans les Actes 3 (avec halo bleu perceptif). Ici, sans halo.

### Scène 2.3 · Athro allongé (~60 s)

**Trigger** : Kel + Vann de retour au campement.
**Caméra** : wide, target dérive vers `[1, 0, -1]` où Athro est allongé.

**Setup** :
- Athro est allongé sur peau, respiration difficile (mouvement subtil de la cage thoracique via useFrame)
- Nia à ses pieds, immobile
- Vann s'approche, s'accroupit
- Kel entre dans la scène

**Action** :
- Aucune interaction possible. Kel peut approcher (verbe Observer), s'asseoir près (verbe S'asseoir), mais pas guérir.
- Vocalise `athro-breath-slow` en boucle légère.
- Cycle jour/nuit interpole progressivement vers `dusk` puis `night` (60 s de fondu).

**Verbes** : Marcher, S'asseoir, Observer.

**Fin de scène** : trigger auto au coucher du soleil (~60 s).

### Scène 2.4 · Mort d'Athro (~90 s)

**Trigger** : phase `night` atteinte + Athro respire < 3 fois par 10 s.
**Caméra** : dolly vers `[1, 1, -1]`, zoom 8 (resserrement fort sur Athro).

**Setup** :
- Athro respire de plus en plus lentement (paramétrer via `breathIntervalMs` qui augmente).
- Après 20 s, dernier souffle, immobilité totale.
- Vocalise unique `tribe-sigh` (chœur féminin bref).

**Action** :
- Aucune action, contemplation seule.
- Après 30 s d'immobilité : Vann se lève, prend le corps d'Athro (anime `lift-body`), le porte à la fosse `[3, 0, -2]`.
- La tribu se rassemble, chacun pose une poignée de terre (anime `place-earth` en séquence).
- Kel peut faire de même (verbe `Poser` disponible sur zone de la fosse, poignée de terre virtuelle). `flags.athro-buried = true`.
- Le corps disparaît sous la terre. Silence 8 s.

**Verbes** : Marcher, S'asseoir, Poser (uniquement sur la fosse).

**Fin de scène** : trigger auto 10 s après la dernière poignée de terre.

### Scène 2.5 · Nuit, l'étoile de l'Est (~120 s)

**Trigger** : fin scène 2.4.
**Caméra** : recul vers wide, zoom 14, target `[0, 0, 0]`.

**Setup** :
- Kel est laissée seule au bord du feu qui meurt
- La tribu regagne les huttes (Vann, Nia disparaissent en Y+ progressivement, opacity fade sur 20 s)
- Ciel étoilé apparaît, une étoile plus brillante que les autres se lève à l'Est (`[8, 6, -12]`), pointLight + billboard sprite additif or

**Action** :
- Kel peut errer ou s'asseoir. Aucune obligation.
- Après 60 s, la caméra fait un léger dolly vers l'étoile (target dérive vers `[4, 3, -6]`).
- `flags.star-witnessed = true` posé à ce moment.
- Kel s'endort automatiquement (anime `lie-down` 3 s) au bout de 120 s OU quand elle s'assoit près du feu.

**Verbes** : Marcher, S'asseoir, Observer.

**Fin de scène** : `dispatch("advance")` automatique après endormissement.

### Notes techniques Acte 2

- Timings peuvent être raccourcis pour playtest, respecter les proportions.
- Aucun combat, aucun choix moral, aucun échec possible : Athro meurt, point.
- Le rocher visité par l'Étranger 1 est **mémorisé côté scène** pour être ré-utilisé Acte 3 (position `[-14, 0.4, -8]` conservée).

## Interlude 2

Écran bleu nuit. Pas de texte. L'étoile de l'Est visible au centre de l'écran, pulse lentement. Timeline réduite en haut, curseur toujours à -4500. Bouton `continuer`.

## Acte 3 · Le premier geste (~5 minutes)

**Objectif narratif** : amener le joueur à faire, de lui-même, sans quest marker, le geste fondateur.

### Scène 3.1 · Aube seule (~90 s)

**Trigger** : entrée Acte 3.
**Caméra** : dolly de nuit vers `dawn`, wide, target `[0, 0, 0]`.

**Setup** :
- Kel se réveille (anime `wake` 3 s)
- Campement vide (tribu encore dans les huttes, opacity = 0 pour Vann/Nia)
- Feu éteint, cendres froides

**Action** :
- Kel peut marcher librement. Aucune quête. Le HUD est silencieux (uniquement "clic pour deplacer").
- Si Kel marche près du rocher `[-14, 0.4, -8]` (celui de l'Étranger 1) : **halo bleu subtil visible sur mode Observer** (`getToonGradient` + emissive haloBlue). Sinon rien.

**Verbes** : Marcher, Observer.

**Fin de scène** : quand Kel s'éloigne du campement (X < -5 ou Z > 2) OU 90 s écoulées.

### Scène 3.2 · Le sentier et le galet (~60 s)

**Trigger** : Kel dépasse `[-5, 0, 0]`.
**Caméra** : wide, target suit Kel avec offset léger.

**Setup** :
- Sur le sentier vers la falaise, un galet dressé (petit menhir couché naturel, halo similaire au rocher précédent) est posé `[-8, 0.4, -4]`
- Halo visible **uniquement en mode Observer**, actif seulement depuis `flags.star-witnessed = true` (posé Acte 2)

**Action** :
- Kel peut passer sans rien remarquer. Le jeu ne force pas.
- Si elle Observe : halo bleu léger visible, mais aucune interaction possible sur ce galet.

**Verbes** : Marcher, Observer.

**Fin de scène** : trigger auto quand Kel avance vers `[-10, 0, -3]` ou plus loin.

### Scène 3.3 · La clairière et la pierre (~180 s)

**Trigger** : Kel atteint `[4, 0, 2]` (chemin naturel depuis le sentier).
**Caméra** : dolly progressif vers `CLIMAX_TARGET [4, 1.5, 3]`, zoom lerp vers `CLIMAX_ZOOM 7` (le lerp interne d'IsoCamera gère la transition ~1 s).

**Setup** :
- Clairière herbeuse au bord de la mer d'ardoise
- Une longue pierre plate au sol, à moitié enfouie `[4, 0, 3]` (le composant `StandingStone` existant, `placed=false`)
- L'étoile de l'Est vient de se lever au-dessus, visible dans le ciel
- Halo bleu perceptif actif sur la pierre (via `emissive` du `meshToonMaterial`)

**Action** :
- Kel se déplace librement. La pierre est au sol.
- Verbe **contextuel** proposé au clic sur la pierre : **`Poser debout`** (formulation nouvelle, jamais vue ailleurs dans le jeu).
- Ce verbe n'apparaît qu'ici, sur cet objet, à ce moment.
- Le joueur peut :
  - Cliquer la pierre → `onPlace()` déclenche `setFlag("stone-placed", true)` → StandingStone anime lever (1 s, lerp)
  - Ignorer et repartir (mais avance narrative bloquée par le guard `act3:advance requires stone-placed`)

**Verbes** : Marcher, Observer, **Poser debout** (unique à cette scène).

**Fin de scène (partielle)** : dès que Kel clique la pierre, transition vers scène 3.4.

### Scène 3.4 · Le rite naît (~60 s)

**Trigger** : `stone-placed = true`.
**Caméra** : reste sur `CLIMAX_TARGET`, zoom 7.

**Setup après pose** :
- Particules dorées (`StoneEmbers`) montent depuis la pierre, ~2.5 s
- Vann apparaît en marche depuis `COMPANION_RESTING [-5, 0, 4]` (RitualCompanion active) vers `COMPANION_APPROACH [3, 0, 3]`
- Vann marche ~4 s, arrive
- `onArrived()` → `setFlag("witness-arrived", true)`, spawn petite pierre (`scale=0.55`) à `[3, 0, 3]`
- TribeWitnesses (Nia + ancien) apparaissent en fade-in scale (0 → 1, ~0.5 s) autour de la clairière

**Action** :
- Kel est passive. Le rite se déploie autour d'elle.
- Vocalise unique `chorus-birth` (chœur féminin très bref, une seule note) au moment où Vann pose la 2e pierre.
- Silence 8 s après.
- HUD : hint "la tribu regarde en silence · N pour continuer" affiché quand `witness-arrived = true`.

**Verbes** : Marcher, Observer. Aucune action requise pour finir.

**Fin de scène** : quand joueur presse `N` (via `dispatch("advance")`, débloqué par guard).

## Épilogue

Voir `epilogue-timeline.ts` pour la séquence des 7 vignettes. La caméra r3f reste sur `CLIMAX_TARGET` en arrière-plan invisible (masquée par `EpilogueSequence` overlay z-index 95).

Chaque vignette pariétal se dessine en 1.6-3 s (stroke-dashoffset animé), reste affichée le reste de sa durée (3.4 à 4.8 s), puis transition vers la suivante. Le curseur de la frise en bas glisse depuis -4500 à 2026 au fil des entrées.

Bouton `passer` bas-droite disponible à tout moment pour skip vers `EndScreen`.

## Écran final

`EndScreen` sur fond `--color-deep-blue`. Phrase small-caps espacée grande centrée :
```
LES PIERRES SONT RESTÉES.
NOUS AUSSI.
```
5 silhouettes de menhirs sombres en bas d'écran. Bouton discret `revenir a la frise` qui `dispatch("restart")` → retour `title`.

## Timing global estimé

| Segment | Durée cible |
|---------|-------------|
| Title | libre, pas de timer |
| Acte 1 | ~8 min (~480 s) |
| Interlude 1 | 5 à 20 s (lecture) |
| Acte 2 | ~10 min (~600 s) |
| Interlude 2 | 5 à 20 s |
| Acte 3 | ~5 min (~300 s) |
| Épilogue | ~27 s (7 vignettes) |
| End | libre |

Total jeu : **20 à 30 min** end-to-end conforme à la portée MVP annoncée dans `specs-mvp.md`.

## Hors scope MVP

Décor animal secondaire (oiseaux qui passent, coquillages qui bougent sous les vagues), météo, effets météo, blessures, faim, soif, dialogues traduits, choix moraux, sauvegardes multiples, mode débutant / expert.

Toute proposition d'enrichissement doit passer par un patch au `roadmap.md` et non par un ajout tacite au MVP.
