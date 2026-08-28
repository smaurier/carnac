# Carnac

> Un jeu-poème pédagogique sur la naissance du rite mégalithique dans la Bretagne du Néolithique moyen (~4500 av. J.-C.). On y suit une tribu au moment où la première pierre est mise debout.

**Statut :** early. Concept posé, specs MVP en cours. Pas encore jouable.

## Objectif

Faire ressentir et comprendre, par le jeu et non par la lecture, l'un des grands mystères de l'humanité : pourquoi des humains sans écriture ni métal ont commencé à ériger des pierres. Poser la question à hauteur d'enfant, avec une exigence de rigueur historique.

Le jeu s'adresse notamment aux joueuses et joueurs qui n'ont jamais fait le lien émotionnel avec les humains d'il y a plusieurs milliers d'années. Il rappelle une évidence oubliée : ces humains, c'est nous.

## Cadre historique

Le jeu se déroule dans la **lande morbihannaise du Néolithique moyen armoricain**, environ 4500 av. J.-C., à l'époque des cultures Cerny et Chasséen. Les personnages sont des populations **anonymes, pré-celtes de 3000 ans**, sans écriture, sans métal. Les Celtes n'arriveront en Bretagne que bien plus tard, à l'Âge du Fer.

Choix historiques assumés, documentés dans `docs/notes-historiques.md` :
- Peuple néolithique moyen armoricain, pas Celte
- Culture matérielle conforme à l'archéologie (silex, os, bois, poterie, torchis)
- **Palette humaine mate à foncée**, cheveux foncés, éventail d'yeux. Choix scientifique fondé sur l'archéogénétique récente (Cheddar Man, Reich Lab, Mathieson 2015, Brace 2018)
- Langue inventée non traduite (style *Journey*, *Ico*), aucune ambition de reconstitution linguistique

Thèse retenue pour l'origine du geste mégalithique : **culte des ancêtres et marqueur territorial** (Colin Renfrew, 1976), avec touche cosmologique en second plan. Autres thèses académiques citées dans les notes historiques.

## Architecture

Le jeu est bâti en **A+** : un moment fondateur autonome (le MVP) enveloppé d'un cadre méta-temporel qui situe le joueur dans le temps profond.

```
Ecran-titre : Frise du temps profond, curseur sur -4500 av. J.-C.
     v
Acte 1 : Quotidien de la tribu (feu, chasse, cueillette)
     v  [interlude frise]
Acte 2 : Rencontre inter-tribu + deuil d'un membre aime
     v  [interlude frise]
Acte 3 : Climax. La joueuse pose la premiere pierre debout.
     v
Epilogue : Frise animee. Ellipse jusqu'a aujourd'hui.
           Les pierres restent. Les generations passent.
           Arrivee des Celtes, Romains, Moyen-Age, XXIe siecle.
           Ecran final : "Les pierres sont restees. Nous aussi."
```

Voir `docs/specs-mvp.md` pour le détail (à venir).

## Stack technique

- Vite + React + TypeScript
- Three.js via `@react-three/fiber` et `@react-three/drei`
- Caméra isométrique orthographique
- Prototype web desktop d'abord

Base d'expérience réutilisée du projet portfolio Nahual (r3f, pipeline GLB, animations, particules, textures).

## Structure du repo

```
carnac/
├── README.md                     ce fichier
├── docs/
│   ├── notes-historiques.md      cadre archéo, thèses, sources
│   ├── specs-mvp.md              specs du premier chapitre jouable (à venir)
│   └── roadmap.md                vision longue et extensions (à venir)
└── (src/ à venir)
```

## Roadmap

- Phase 1 : MVP, chapitre "Néolithique moyen" jouable (~20-30 min), frise + épilogue
- Phase 2 : polissage, playtests, itérations
- Phase 3 (optionnelle, long terme) : extensions, autres chapitres jouables posés sur la frise (Mésolithique, Bronze, arrivée des Celtes en Armorique, etc.)

## Licence

À définir.

## Ouvert aux corrections

Toute correction historique sourcée est bienvenue par issue GitHub.
