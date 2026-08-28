# Specs MVP · Chapitre "Néolithique moyen"

Ce document décrit le premier chapitre jouable de *Carnac*, autonome et fermé, qui constitue le MVP. Il est écrit pour être exécutable en 2 à 4 mois de travail soir/weekend.

Toute décision de scope présente ici doit résister à la question : "est-ce nécessaire pour que ce chapitre existe comme œuvre autonome ?" Si non, elle est repoussée en phase 2 ou en roadmap.

## 1. Vision de ce chapitre

Le joueur incarne **Kel**, jeune femme d'une tribu de la lande morbihannaise, ~4500 av. J.-C. En trois actes (~20 à 30 minutes de jeu), il vit avec elle la genèse d'un geste inédit : la mise debout d'une pierre en mémoire d'un proche, préfigurant les futurs alignements de Carnac.

Le chapitre est enveloppé d'un cadre méta-temporel (frise du temps profond) et se clôt sur un épilogue en frise animée qui traverse les millénaires jusqu'à aujourd'hui.

## 2. Portée

| Élément | Valeur MVP |
|---------|------------|
| Durée session | 20 à 30 minutes end-to-end |
| Rejouabilité MVP | Non prévue. Rejouer = revivre exactement la même chose. Rejouabilité travaillée en phase 2. |
| Sauvegarde | Non. Session en une traite. |
| Nombre de biomes | 1 : lande côtière morbihannaise (mer d'ardoise, granit affleurant, ajoncs, feu de bois) |
| Cycle in-game | 3 jours = 3 actes narratifs |
| Personnages jouables | 1 (Kel) |
| PNJ tribu de Kel | 3 (une figure d'ancien, une figure de pair, une figure d'enfant) |
| PNJ tribu rencontrée | 2 (un porteur du signe, un accompagnant) |
| Langue | Inventée, non traduite. ~15 à 20 vocalises distinctes pour toute la tribu. |
| Interface | Aucun menu en jeu. Aucun inventaire. Aucun HUD hors interludes frise. |
| Sortie | Écran final "La première pierre" + 3 dessins pariétaux collectés + retour à la frise |

## 3. Verbes du joueur

Un très petit nombre de verbes, tenus dans toute la partie. Chaque verbe est un vocabulaire à part entière, pas une action utilitaire.

1. **Marcher** (déplacement souris ou WASD)
2. **Ramasser** (silex, bois, coquillage, herbe, pierre) · contextuel
3. **Poser** (déposer un objet ramassé) · contextuel
4. **S'asseoir** (près du feu, sur un rocher, dans l'herbe) · contextuel, déclenche pauses contemplatives
5. **Regarder / observer** (bouton dédié, ralentit le temps, permet de voir les halos)
6. **Imiter** (quand un PNJ fait un geste rituel, permet de reproduire)

Absent volontairement : combat, mort du joueur, HP, faim, soif, craft, inventaire, quêtes.

## 4. Structure narrative détaillée

### Écran-titre

Frise du temps profond en fond, palette ocre-granit. Curseur lumineux posé sur "-4500 av. J.-C. / Néolithique moyen". Le joueur voit sur la frise ce qui vient avant (Paléolithique, Mésolithique) et après (jusqu'à aujourd'hui). Un simple "Commencer" démarre le chapitre.

### Acte 1 · Quotidien (~8 min)

**Objectif narratif :** installer la vie de la tribu et attacher le joueur à Kel et aux siens.

- Lever du jour au campement. Kel se réveille. Feu qui fume.
- L'ancien (Athro) taille un silex près du foyer.
- L'enfant (Nia) court après une chèvre.
- Le pair (Vann) revient de la mer avec des coquillages.
- Kel peut librement explorer le campement, ramasser, poser, s'asseoir. Chaque interaction déclenche une micro-scène (Athro montre son geste de taille, Nia rit, Vann propose un coquillage).
- Trigger de fin d'acte : Kel s'assoit près du feu au crépuscule. Fondu.

**Ce que le joueur apprend implicitement :**
- Le quotidien est simple, dense, sensoriel
- Les personnages ne parlent pas français mais communiquent parfaitement
- Le lieu est habité, cartographié mentalement

### Interlude frise 1

Écran de frise. Curseur toujours posé sur -4500. Court texte discret : "Un jour, comme les autres." Retour au jeu.

### Acte 2 · Rencontre et deuil (~10 min)

**Objectif narratif :** provoquer le choc émotionnel qui rendra le geste de l'Acte 3 nécessaire.

- Matin du jour 2. Kel part vers la falaise avec Vann pour pêcher.
- Sur le chemin, ils croisent deux étrangers. Habits différents, teintes de peintures corporelles différentes. Tribu voisine.
- L'un des étrangers, silencieux, fixe un rocher isolé au bord du sentier. Il pose sa main dessus, ferme les yeux. Ne dit rien. Repart.
- Kel et Vann reviennent au campement. Athro, l'ancien, est allongé, respiration difficile. La tribu se rassemble.
- Athro meurt au coucher du soleil. Enterrement au sol, geste de la tribu : chacun pose une poignée de terre. Le corps disparaît.
- Kel s'assoit à distance, seule. La nuit tombe. Une étoile se lève à l'est.
- Trigger de fin d'acte : Kel s'endort au sol.

**Ce que le joueur ressent :**
- Attachement à Athro construit dans l'Acte 1, cassé net
- Silence de la disparition sous la terre
- Impression que le paysage n'a pas gardé trace d'Athro
- Le geste inconnu de l'étranger revient en mémoire

### Interlude frise 2

Écran de frise. Curseur toujours posé sur -4500. Aucun texte cette fois. Simplement l'étoile de l'Est qui pulse sur la frise. Retour au jeu.

### Acte 3 · Le premier geste (~5 min)

**Objectif narratif :** amener le joueur à faire, de lui-même, sans quest marker, le geste fondateur.

- Kel se réveille. Aube. Elle marche seule, sans direction claire.
- Elle passe près du rocher que l'étranger avait fixé la veille. Le "regarder / observer" déclenche un léger halo qu'elle seule perçoit maintenant.
- Elle continue. Sur le sentier, un galet dressé attire l'œil (même halo).
- Elle arrive dans une clairière herbeuse au bord de la mer d'ardoise. Une longue pierre plate au sol, à moitié enfouie. L'étoile de l'Est vient de se lever au-dessus.
- Le verbe "Ramasser" propose la pierre. Puis, une fois la pierre en main, le verbe change : **"Poser debout"**.
- Le joueur pose. Fondu au blanc.
- La tribu est là, autour, silencieuse. Vann s'approche, ramasse une deuxième pierre plus petite, la pose à côté. Nia touche la pierre du bout des doigts. Silence long.
- Fresque pariétal apparaît sur un mur d'abri : silhouette debout au bord de la mer, étoile au-dessus. Titre carte : **"La première pierre."**

**Note de mise en scène :** le "Poser debout" ne doit apparaître qu'une seule fois, ici. Ailleurs dans le jeu, "Poser" pose au sol. La singularité mécanique de ce geste porte tout le poids narratif.

### Épilogue · La frise animée (~3 min)

Ellipse. Retour à la frise du temps profond, curseur qui commence à avancer.

- **+100 ans** : une deuxième pierre est ajoutée à côté de la première. Un dessin pariétal la représente.
- **+500 ans** : un alignement se forme. Petit time-lapse silencieux, pierre après pierre.
- **+2000 ans** : Âge du Bronze. Tumulus autour. La pierre originelle est encore là.
- **+3000 ans** : arrivée des Celtes. Ils trouvent l'alignement debout. Ils y ajoutent leurs propres rites, sans le comprendre non plus.
- **+3500 ans** : Romains. Vue depuis un poste militaire, l'alignement au loin.
- **+5000 ans** : Moyen Âge. Une croix chrétienne est gravée sur un dolmen (fait historique attesté à Carnac).
- **+6500 ans (aujourd'hui)** : touristes, drones, archéologues. La pierre originelle est toujours là.

Écran final : **"Les pierres sont restées. Nous aussi."** Fondu.

## 5. Assets minimaux MVP

### Personnages (5 modèles humains + 1 chèvre + 1 chien)

- Kel (joueuse)
- Athro (ancien, meurt en Acte 2)
- Vann (pair)
- Nia (enfant)
- Étranger (Acte 2)
- Étranger accompagnant (Acte 2, silhouette lointaine possible)
- Chèvre domestique
- Chien de tribu (silhouette)

**Contrainte pipeline :** un seul rig humain de base, variations par textures et accessoires. Palette peaux mates à foncées documentée dans les notes historiques.

### Environnement (1 biome, 3 zones)

- Campement de la tribu
- Sentier vers la falaise et le rocher-halo
- Clairière herbeuse au bord de la mer d'ardoise (lieu du geste)

Éléments récurrents : feu, huttes de torchis, ajoncs, herbes hautes, pierres granitiques éparses, mer en fond, ciel dégradé.

### Interface

- Frise du temps profond (écran-titre + 2 interludes + épilogue animé)
- Fresque pariétale (mur d'abri, 3 dessins débloqués)
- Écran final

### Audio

- Musique : drone minéral en fond, corne lointaine ponctuelle, chœur féminin discret au climax
- Vocalises PNJ : ~15 à 20 échantillons humains courts
- SFX : feu, mer, vent, coquillages, pas sur herbe/pierre, silex qu'on taille, corps posé au sol

## 6. Contraintes techniques

### Rendu

- Caméra orthographique isométrique, angle fixe (à définir en prototype)
- Palette limitée (ocre, granit, ardoise, feu) définie par shader ou grading
- Silhouettes hautement lisibles (contour subtil possible)
- Éclairage cycle jour / crépuscule / nuit géré par light rig préréglé, pas de dynamique complexe

### Interactions

- Click-to-move (ou WASD) sur navmesh simple
- Interactions contextuelles à proximité (touche unique)
- Aucun inventaire persistant (l'objet en main est visible en 3D sur le perso)

### Halos et perception

- Système de flag mémoire : après l'Acte 2 (l'étoile), certains objets (rocher-halo, galet-halo, pierre finale) reçoivent un shader subtil d'aura visible uniquement en mode "Observer"
- Avant ce moment : shader désactivé même si Observer est utilisé

### PNJ

- Machines à états simples (idle, walk to point, play animation, react to player). Aucune IA d'exploration.
- Séquences scriptées par acte

## 7. Ce qui est explicitement OUT du MVP

À défendre bec et ongles pour tenir le scope :

- Combat, mort du joueur, HP, blessure
- Faim, soif, endurance, températures
- Inventaire, craft, arbre de technologies
- Météo dynamique, saisons
- Multi-tribu au delà des deux
- Construction complète d'un mégalithe (le rite naît, la construction vient dans un futur chapitre)
- Sauvegardes multiples
- Menus complexes, dialogues écrits en français
- Personnalisation du personnage
- Multijoueur
- Portage mobile

## 8. Risques identifiés et mitigations

| Risque | Impact | Mitigation |
|--------|--------|------------|
| Isométrique + r3f + picking : non testé encore | Blocage technique en début de projet | Prototype caméra + click-to-move dès semaine 1 |
| Vocabulaire visuel "sans écriture" coûteux | Illisibilité des intentions | Séance dédiée moodboard et charte visuelle avant tout code d'écran |
| Onirisme / cinématique = piège de temps | Dérive de scope | Épilogue frise animée en montage statique + animations légères, pas de cinématiques 3D pré-rendues |
| PNJ "qui imite" mal timé casse le climax | Perte du moment | Trigger scripté à la seconde près, playtests dédiés |
| Deuil d'Athro pas assez incarné | Climax ne fonctionne pas | Acte 1 densifié en micro-scènes avec Athro, minimum 3 interactions significatives |
| Charte historique attaquée en ligne | Bad buzz | `notes-historiques.md` cité en pied de page dans le jeu et sur la page GitHub |
| Peu de temps disponible (contexte perso) | MVP jamais fini | Découpage en jalons dev très courts, cf. section 9 |

## 9. Jalons de développement

Chaque jalon = ~2 à 4 semaines soir/weekend. À réévaluer après chacun.

- **J1 · Prototype technique** : caméra ortho iso, click-to-move sur terrain vide, un cube qui bouge. Deliverable : le pipeline r3f fonctionne pour ce projet.
- **J2 · Kel dans le décor** : 1 modèle humain animé (Kel), 1 zone (campement), lumière, feu, mer en fond. Deliverable : marcher dans une scène qui donne l'ambiance.
- **J3 · Tribu et interactions** : PNJ Athro, Vann, Nia. Verbes contextuels. Vocalises. Deliverable : Acte 1 jouable.
- **J4 · Rencontre et deuil** : PNJ étrangers, cinématique enterrement, cycle jour/nuit. Deliverable : Acte 2 jouable.
- **J5 · Climax** : rocher-halo, système Observer, séquence de pose de la première pierre, réaction de la tribu, fresque pariétale. Deliverable : Acte 3 jouable, chapitre bouclable end-to-end.
- **J6 · Frise et épilogue** : écran-titre, interludes, épilogue animé, écran final. Deliverable : MVP end-to-end intégré.
- **J7 · Polish et playtest** : audio final, grading couleur, corrections de bugs et pacing, 2 à 3 playtests externes. Deliverable : MVP présentable.

Un jalon qui déborde de plus de 50% doit déclencher une revue de scope, pas un "on continue".

## 10. Définition de "MVP livré"

Le MVP est considéré comme livré quand :

1. Un joueur qui n'a jamais vu le jeu peut le lancer, faire les 3 actes, voir l'épilogue et sortir, sans aide extérieure.
2. La durée réelle observée sur 3 playtesteurs différents tombe entre 15 et 40 minutes.
3. Le "Poser debout" de l'Acte 3 est effectué **sans marker explicite** par au moins 2 playtesteurs sur 3.
4. Au moins un playtesteur exprime avoir ressenti quelque chose au climax ou à l'épilogue.
5. `docs/notes-historiques.md` est cité en pied de page dans le jeu et sur la page GitHub, et n'a reçu aucune correction sourcée majeure.

Rien de plus, rien de moins. Tout ajout à cette liste est reporté en phase 2.
