# CLAUDE.md · Guidelines pour les sessions Claude Code sur Carnac

Ce document est lu au démarrage de chaque session Claude Code dans ce repo. Il contient le contexte, les conventions et les garde-fous à respecter avant toute action.

## 1. Contexte du projet en 30 secondes

**Carnac** est un jeu-poème pédagogique web (React + Three.js via `@react-three/fiber`) sur la naissance du rite mégalithique dans la Bretagne du Néolithique moyen (~4500 av. J.-C.). MVP = un chapitre autonome de 20-30 minutes, dont le climax est le geste de la joueuse posant la première pierre debout après un deuil.

Le dépôt est **public** (`smaurier/carnac`). Le développeur solo est **Sylvain Maurier** (dev frontend senior en transition, ne maîtrise pas Blender).

## 2. Documents à lire dans l'ordre au premier abord

Toujours lire au moins ces 4 documents avant de coder ou de proposer un changement structurel :

1. `README.md` · vue d'ensemble, architecture A+, structure repo
2. `docs/specs-mvp.md` · portée MVP, 3 actes, jalons dev, définition "MVP livré"
3. `docs/direction-artistique.md` · charte graphique complète, palette hex, pipeline de production
4. `docs/notes-historiques.md` · cadre archéo, thèses retenues, choix historiques

Références secondaires :
- `docs/roadmap.md` · vision longue et extensions possibles
- `docs/moodboard.md` · références visuelles fiables
- `docs/mockups/README.md` + `docs/mockups/ui/README.md` · cibles visuelles validées

## 3. Garde-fous absolus (à ne jamais franchir)

**⛔ Ne pas confondre Néolithique et Celtes.** Les bâtisseurs de Carnac vivent 3000 à 4000 ans avant les Celtes. Toute mention de druides, torque, chaudron, ou "Gaulois" est une erreur historique majeure. En cas de doute, `docs/notes-historiques.md` fait autorité.

**⛔ Palette limitée stricte.** Aucune couleur en dehors de `src/palette.ts`. Un shader, un CSS ou un asset qui introduit une couleur hors charte doit être refusé ou corrigé. Palette référence : section 3 de `docs/direction-artistique.md`.

**⛔ Pas de tiret cadratin (`—`) dans les fichiers publics.** Le dev n'en veut nulle part dans le contenu user-facing. Utiliser `·` `,` `.` selon contexte. Vaut pour `README.md`, `docs/*.md`, tout ce qui serait affiché en jeu ou lu sur GitHub.

**⛔ Pas de dépendance Blender.** Le dev ne le maîtrise pas. Pipeline actuel : mockup 2D → génération IA (Hunyuan local) → assets packs gratuits (Kenney) → placeholder r3f primitives. Ne jamais proposer "ouvre Blender et fais ça". Détail : `docs/direction-artistique.md` section 13.

**⛔ Pas de PBR, pas de matériaux métalliques, pas de post-process lourd.** Cohérent avec le Néolithique et avec le style low-poly cel-shaded. Détail : `docs/direction-artistique.md` section 12.

**⛔ Priorité perso concurrente : certification RGAA (23/10/2026).** Carnac est un projet soir/weekend, respiration. Si une session Claude Code sur Carnac déborde et menace de manger du temps RGAA, l'expliciter au dev et proposer d'arrêter.

**⛔ Pas d'écriture ou de dialogue français in-game.** Choix acté : langue inventée non traduite, style *Journey*. Vocalises et intonations sans traduction. Pas de sous-titres, pas de bulles de dialogue.

## 4. Conventions de code

### Stack et versions

- Vite 6, React 18, TypeScript 5 strict
- `@react-three/fiber` v8 + `@react-three/drei` v9 + `three` r170
- Node LTS (Node 23 vérifié 28/08/2026)

### Style TypeScript

- `strict: true` obligatoire. `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch` activés.
- Pas de `any`. Utiliser `unknown` puis narrower si besoin.
- Imports relatifs pour le code du projet. Pas de barrel `index.ts` sauf nécessité.
- Interfaces plutôt que types pour les props de composants.

### Style React

- Composants fonctionnels uniquement, pas de classes.
- Hooks en tête, JSX en fin.
- Pas d'état global (Redux, Zustand) tant qu'une simple prop + useState suffit.
- Chaque composant est autonome et testable en isolation.

### Style r3f

- `Canvas` unique dans `App.tsx`. Aucune imbrication de Canvas.
- Composants r3f dans `src/scene/` et `src/entities/`. UI React DOM dans `src/ui/`.
- Palette et presets dans `src/palette.ts`, source de vérité unique.
- Utiliser `useFrame` avec parcimonie, mesurer si on ajoute plusieurs par scène.
- Éviter les allocations dans `useFrame` (réutiliser Vector3 déclarés hors du hook).

### Nommage

- Fichiers en `kebab-case` pour docs et assets, `PascalCase.tsx` pour composants React, `camelCase.ts` pour utilitaires.
- Variables et fonctions en `camelCase`, types et interfaces en `PascalCase`.
- Pas de préfixe `I` pour les interfaces.

### Commentaires

- Par défaut, aucun commentaire. Un nom bien choisi vaut mieux qu'un commentaire.
- Commentaire uniquement pour un pourquoi non évident (contrainte cachée, workaround, invariant subtil).
- Pas de commentaire qui décrit ce que fait le code (le code le dit déjà).
- Pas de `TODO` sans issue GitHub associée.

## 5. Méthode de travail avec le dev

### Poser des questions avant d'agir

Le dev préfère la clarification à l'action mal ciblée. Si l'intention n'est pas claire à 100%, poser 1-4 questions groupées, format `AskUserQuestion` avec options concrètes.

### Attendre validation avant d'écrire

Convention personnelle du dev : validation explicite avant toute écriture de fichier importante. Se contenter d'implémenter un plan une fois qu'il est validé.

### Format des réponses

Le dev utilise **CAVEMAN MODE** (voir sa session). Réponses en français dense, fragments OK, articles et fluff supprimés. Format `[thing] [action] [reason]. [next step].` Le code, les commits et les PR restent en français ou anglais normal, sans caveman.

### Commits

- Message clair, format `type: sujet court` (feat, fix, docs, refactor, chore, test).
- Description ligne skippée puis body multi-lignes si le pourquoi n'est pas évident.
- Pas de `Co-Authored-By` demandé pour ce repo, sauf si le dev le demande explicitement.
- Toujours pousser après commit sauf demande contraire.

### Actions à confirmer avant exécution

- Créer une branche non-main
- Supprimer un fichier tracké
- `git reset --hard`, `git push --force`
- Modifier `package.json` de façon non-additive (changement de version majeure d'une dépendance)
- Ajouter une dépendance non essentielle
- Modifier la charte graphique ou les specs MVP (impact scope)

## 6. Décisions déjà prises (ne pas rouvrir sans raison forte)

Ces décisions ont été tranchées dans des sessions précédentes. Ne pas les remettre en question sans que le dev ne les rouvre explicitement.

- **Architecture A+** : moment fondateur autonome + cadre méta-temporel (frise du temps profond + épilogue jusqu'à aujourd'hui). Pas de saga jouable multi-époques dans le MVP.
- **Thèse historique retenue** : culte des ancêtres + marqueur territorial (Colin Renfrew, 1976), touche cosmologique en second plan.
- **Climax MVP** : Kel pose la première pierre debout après le deuil d'Athro, sous une étoile levante, sans quest marker. Vann imite en posant une deuxième pierre.
- **Palette humaine** : peaux mates à foncées, cheveux foncés, éventail d'yeux (echo Cheddar Man et archéogénétique).
- **Langue** : inventée non traduite (style Journey / Ico).
- **Stack** : Vite + React 18 + TypeScript strict + r3f. Pas d'Angular, pas de Vue, pas de vanilla three.
- **Aucun Blender** dans le pipeline de production.

## 7. Rôle des mockups

- `docs/mockups/act1-camp-dusk.svg` · **cible visuelle 3D de référence** pour la scène du campement. Toute production 3D doit s'aligner sur cette composition.
- `docs/mockups/ui/carnac-ui-mockups.dc.html` · **cible visuelle UI** (5 écrans + 2 variantes titre) produite par Claude Design. Toute implémentation React d'un écran UI (Timeline, Interlude, Fresque, End, HUD) doit reproduire ce mockup en composant React fonctionnel.
- `docs/mockups/prompt-image-generation.md` · prompts pour générateurs d'images IA si besoin d'explorer d'autres directions.

## 8. Ce qui n'existe pas encore

État au 28/08/2026 :
- Aucun composant UI React implémenté (les mockups existent, les composants pas encore)
- Aucun shader custom (`cel_toon`, `halo_pulse`, `outline_soft` écrits dans specs, pas encore codés)
- Aucun asset 3D réel (uniquement primitives placeholder)
- Aucun test automatisé
- Aucun système de sauvegarde (choix acté : pas prévu au MVP)
- Aucune animation Mixamo intégrée
- Aucun système de son

## 9. Prochaines actions probables (fil rouge)

Sans engagement, dans un ordre plausible :

1. Coder le composant `Timeline` React (écran-titre, frise du temps profond)
2. Coder les composants UI restants (`Interlude`, `Fresque`, `End`)
3. Écrire les 3 shaders customs (`cel_toon`, `halo_pulse`, `outline_soft`)
4. Storyboard textuel détaillé des 3 actes
5. Génération des premiers assets 3D via Hunyuan (Kel, Athro, Vann, Nia)
6. Assemblage Acte 1 avec vrais assets
7. Playtest interne
8. Actes 2 et 3

## 10. Contact avec la mémoire globale du dev

Le dev utilise un système de mémoire persistante (Synapse) dans `C:\Users\sylva\.claude\projects\C--Users-sylva\memory\`. La mémoire de ce projet est `project_carnac.md`. Si tu apprends quelque chose de nouveau sur le projet, sur les préférences du dev, ou sur une décision structurelle, propose de mettre à jour cette mémoire.

Refs croisées utiles :
- `project_nahual_da.md` · portfolio r3f, source d'expérience Three.js
- `project_dia_de_los_muertos.md` · source du pipeline Hunyuan local
- `project_certif_rgaa.md` · priorité concurrente jusqu'au 23/10
- `feedback_pas_de_tiret_cadratin.md` · règle publique universelle
- `feedback_attendre_validation.md` · convention personnelle du dev

## 11. Fin de session

À chaque fin de session non triviale :

1. Vérifier `git status` propre
2. Push si commits locaux
3. Proposer une mise à jour de `project_carnac.md` en mémoire globale si des décisions structurelles ont été prises
4. Mentionner les prochaines actions probables si session interrompue au milieu d'un chantier

## 12. Interdit

- Copier du code Givexpert / Eudonet dans ce repo (règle globale du dev)
- Utiliser OneDrive pour les fichiers du projet (règle globale : "Bureau" = `C:\Users\sylva\Desktop`)
- Publier des assets ou textes qui ne sont pas libres de droit
- Prétendre qu'un rendu fonctionne sans l'avoir testé (le dev fait la vérification lui-même, ne pas se substituer)
