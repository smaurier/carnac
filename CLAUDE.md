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

### Discipline générale · **PRIORITÉ MAXIMALE**

Le dev pratique **TDD, Craftmanship, SOLID, KISS, DRY, Clean Code, design patterns respectés**. Ces principes ne sont pas négociables sur les modules à logique claire. Ils s'assouplissent sur le code purement exploratoire visuel (voir "Périmètre TDD" ci-dessous), jamais ailleurs.

### TDD (Test-Driven Development)

Cycle strict Red → Green → Refactor :

1. **Red** : écrire un test qui échoue AVANT d'écrire le code. Le voir échouer (message d'erreur clair).
2. **Green** : écrire le code MINIMAL qui fait passer le test. Rien de plus.
3. **Refactor** : améliorer la structure sans casser les tests. Tous les tests restent verts.

Règle stricte : **ne jamais** écrire du code de production sans avoir un test rouge qui le demande. Aucune exception silencieuse. Si un test est "évident", l'écrire quand même : c'est l'exercice qui structure la pensée.

Expliquer **le pourquoi** de chaque étape (pas juste "j'ajoute ce test"). Le TDD est aussi un outil d'apprentissage et de communication du raisonnement.

#### Périmètre TDD dans ce projet

- ✅ **TDD obligatoire** : logique métier pure (état des actes, transitions narratives, timeline, système de flags mémoire, click-to-move, machines à états PNJ, palette et presets, utilitaires purs).
- ⚠️ **TDD adapté** : composants React (tests de rendu + interaction avec Vitest + @testing-library/react, sans surtester le DOM).
- ⚠️ **TDD léger** : composants r3f (test des props et de la logique interne, pas du rendu 3D lui-même).
- ❌ **TDD non applicable** : shaders GLSL, tuning visuel, animation ressenti, réglages de particules et lumière. Ces zones sont exploratoires par nature. Validation par playtest visuel.

Tests avec **Vitest** (Vite-native, rapide). À installer en devDep : `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`. À configurer dans `vite.config.ts`.

### Design system + design tokens · **PRIORITÉ MAXIMALE**

Le projet a un **vrai design system**, pas des styles éparpillés. Toute décision visuelle (couleur, espace, typo, radius, transition, shader) passe par un **token centralisé**, jamais en dur dans un composant.

#### Design tokens (source de vérité unique)

Emplacement actuel :

- **Palette (couleurs)** : `src/palette.ts`. Chaque hex y est nommé sémantiquement (`neutrals.granitDark`, `warm.duskGold`, `cool.haloBlue`, `skin.b`). **Jamais** de hex littéral dans un composant, JSX ou CSS.
- **Presets d'éclairage** : `src/palette.ts` `dayNightPresets` (dawn / noon / dusk / night). Nouveau preset = nouvel entry, aucune modif de composant.
- **Cel-shading** : `src/shaders/toon-gradient.ts` (`getToonGradient(steps)`), singleton par count. Tout mesh à cel-shading passe par ce helper.

Tokens à consolider au fur et à mesure (à créer quand un même chiffre magique apparaît deux fois) :

- **Espacements** : à extraire dans un futur `src/design/spacing.ts` (échelle 4/8/16/24/32/48/64px).
- **Typographie** : familles + tailles + letter-spacing dans un futur `src/design/typography.ts`. Actuellement dispersé dans les `.module.css` (EB Garamond partout, mais tailles répétées).
- **Rayons** : radii utilisés (menhirs EndScreen, boutons) à centraliser si multipliés.
- **Transitions** : durées et easings (`200ms ease`, `600ms ease`) à centraliser en durations tokens.
- **Épaisseurs de contour** (Outlines) : `0.04`, `0.045`, `0.05`, `0.06` répartis, à standardiser en `outline.xs / sm / md / lg` dans un futur `src/design/outlines.ts`.

**Règle DRY appliquée** : au deuxième usage d'une même valeur littérale à travers deux fichiers, la valeur devient un token nommé.

#### Design system (composants réutilisables)

Chaque composant UI est **une brique du design system**, pas un one-off :

- **Composants "primitifs"** : `Timeline`, `Villager`, `StandingStone` (paramétrable par scale et interactivité), `Fresque` (paramétrable par variant et counter).
- **Composants "screens"** : `TitleScreen`, `Interlude`, `Fresque`, `EndScreen`, `EpilogueSequence`. Chacun assemblable, non-couplé à App.tsx.
- **Composants "sequences"** : `EpilogueSequence` (Fresque + Timeline + timers). Pattern à réutiliser pour futures compositions temporelles.
- **Convention props** : chaque composant expose ses variantes via props typées, jamais via un `if` interne ni un flag booléen enterré.
- **Chaque composant UI vit dans son dossier** (`src/ui/<name>/`) avec son `.tsx`, `.module.css`, `.test.tsx` colocalisés. Aucun style global partagé sauf le reset dans `src/styles.css`.

#### Extension du design system

Quand un nouveau besoin visuel apparaît :

1. Vérifier si un token existe déjà (`palette`, `getToonGradient`, `dayNightPresets`). Si oui, l'utiliser.
2. Si pas de token, vérifier si un composant existant suffit avec de nouvelles props.
3. Si pas de composant, en créer un nouveau dans son dossier `src/ui/<name>/` ou `src/entities/<name>/`, exposer des props claires.
4. **Documenter** dans le composant les tokens utilisés (Palette section, gradient steps, layout tokens).
5. Si le besoin se répète, extraire en token.

#### Interdit

- Hex, tailles, espacements, durées en dur dans les composants.
- Composants qui hardcodent une variation visuelle au lieu de la prendre en prop.
- Styles inline dans le JSX sauf pour valeurs dynamiques calculées (positions calculées à partir du modèle, échelles animées, etc.). Tout le statique passe en CSS module.
- Duplication d'une palette locale à un composant. Toujours importer depuis `src/palette.ts`.

### SOLID

- **S** · Single Responsibility : chaque module, classe, fonction fait une seule chose et la fait bien.
- **O** · Open/Closed : ouvert à l'extension, fermé à la modification. Ajouter du nouveau sans casser l'existant.
- **L** · Liskov Substitution : un sous-type doit pouvoir remplacer son parent sans casser le contrat.
- **I** · Interface Segregation : interfaces petites et ciblées, pas d'interfaces monolithiques que personne n'implémente entièrement.
- **D** · Dependency Inversion : dépendre d'abstractions, pas de concrétions. Injecter les dépendances plutôt que les instancier.

En pratique React/r3f : props explicites, hooks composables, pas de contexte global qui sait tout, pas d'instances singleton cachées.

### KISS (Keep It Simple, Stupid)

- La solution la plus simple qui résout le problème gagne.
- Pas d'abstraction prématurée. Trois lignes similaires valent mieux qu'un helper mal ciblé.
- Pas de configuration si une constante suffit. Pas de plugin si dix lignes suffisent.
- Si tu doutes entre deux approches, choisis la plus lisible pour un dev qui découvre le code.

### DRY (Don't Repeat Yourself)

- Une information de vérité vit à un seul endroit. Palette dans `src/palette.ts`. Presets dans `src/palette.ts`. Constantes de gameplay dans un module dédié.
- Ne pas dupliquer un algorithme non trivial : extraire en fonction pure testée.
- Attention piège : **DRY vaut pour la connaissance, pas pour le code qui se ressemble**. Deux fonctions qui ont la même forme mais évoluent indépendamment doivent rester séparées. Ne pas coupler ce qui ne partage pas de raison de changer.

### Clean Code

- **Noms parlants** : variables et fonctions se lisent comme du langage naturel. `handleClick` OK, `hc` non. `computeStarPosition` OK, `getData` non.
- **Fonctions courtes** : idéalement moins de 20 lignes. Si plus, extraire.
- **Un seul niveau d'abstraction par fonction** : ne pas mélanger boucle + calcul + logging dans une même fonction.
- **Aucun effet de bord caché** : une fonction pure quand possible. Effets isolés dans les hooks et les handlers.
- **Immutabilité par défaut** : `const` partout, éviter la mutation, préférer les copies (spread, map, filter).
- **Early return** plutôt qu'imbrication profonde de `if`.
- **Pas de nombre magique** : `const MAX_HEAD_TURN = 0.4` plutôt que `0.4` dans le code.

### Design patterns

Utiliser quand ils clarifient, pas par principe. Patterns pertinents pour ce projet :

- **Strategy** : phases jour/nuit (déjà appliqué dans `src/palette.ts` avec `dayNightPresets`).
- **State machine** : progression narrative des actes, états des PNJ.
- **Observer** : réactions aux triggers narratifs (déjà natif via React state + effects).
- **Factory** : création des PNJ avec variations par prompt/preset.
- **Composite** : composition de scènes r3f.

Ne pas forcer un pattern qui n'apporte rien. Un `switch` sur enum vaut mieux qu'un Strategy avec 3 classes vides.

### Stack et versions

- Vite 6, React 18, TypeScript 5 strict
- `@react-three/fiber` v8 + `@react-three/drei` v9 + `three` r170
- Vitest + `@testing-library/react` + `jsdom` pour les tests (à installer)
- Node LTS (Node 23 vérifié 28/08/2026)

### Style TypeScript

- `strict: true` obligatoire. `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch` activés.
- Pas de `any`. Utiliser `unknown` puis narrower si besoin.
- Imports relatifs pour le code du projet. Pas de barrel `index.ts` sauf nécessité.
- Interfaces plutôt que types pour les props de composants.
- Types nommés et exportés quand ils sont partagés entre plusieurs modules.

### Style React

- Composants fonctionnels uniquement, pas de classes.
- Hooks en tête, JSX en fin.
- Pas d'état global (Redux, Zustand) tant qu'une simple prop + useState suffit.
- Chaque composant est autonome et testable en isolation (React Testing Library).
- Extraire les hooks personnalisés dès qu'une logique est utilisée à deux endroits ou qu'elle mérite un test unitaire.

### Style r3f

- `Canvas` unique dans `App.tsx`. Aucune imbrication de Canvas.
- Composants r3f dans `src/scene/` et `src/entities/`. UI React DOM dans `src/ui/`.
- Palette et presets dans `src/palette.ts`, source de vérité unique.
- Utiliser `useFrame` avec parcimonie, mesurer si on ajoute plusieurs par scène.
- Éviter les allocations dans `useFrame` (réutiliser Vector3 déclarés hors du hook).
- Séparer clairement la logique testable (déplacement, état) du rendu (materials, lights) pour permettre le TDD sur la partie logique.

### Nommage

- Fichiers en `kebab-case` pour docs et assets, `PascalCase.tsx` pour composants React, `camelCase.ts` pour utilitaires.
- Variables et fonctions en `camelCase`, types et interfaces en `PascalCase`.
- Pas de préfixe `I` pour les interfaces.
- Tests : `foo.test.ts` ou `foo.test.tsx` à côté du fichier testé.

### Commentaires

- Par défaut, aucun commentaire. Un nom bien choisi vaut mieux qu'un commentaire.
- Commentaire uniquement pour un pourquoi non évident (contrainte cachée, workaround, invariant subtil).
- Pas de commentaire qui décrit ce que fait le code (le code le dit déjà).
- Pas de `TODO` sans issue GitHub associée.

### Refactor continu

Après chaque cycle Red-Green-Refactor, prendre 30 secondes pour se demander : ce code est-il propre ? Peut-il être plus lisible ? Y a-t-il une duplication naissante ? Le refactor est une étape à part entière, pas une phase future hypothétique.

### Revue de code (auto ou par le dev)

Avant chaque commit non trivial, se poser :
1. Tous les tests passent-ils localement ?
2. Le typecheck passe-t-il ?
3. Y a-t-il des `console.log`, des `TODO` orphelins, des imports morts ?
4. Un dev qui découvre ce diff comprend-il le pourquoi ?
5. Est-ce que je respecte SOLID / KISS / DRY / Clean Code ?

### Vérification visuelle Playwright · **RÈGLE STRICTE**

Tout changement qui touche à un composant visuel (UI, CSS, r3f, styles.css, tokens.css, .module.css, drawings SVG, mockups, layout) déclenche un cycle de vérification Playwright **avant commit**.

Cycle imposé :

1. Vérifier que le dev server tourne (`npm run dev`, port 5173/74/75 auto).
2. `browser_resize` desktop **1440×900** puis `browser_take_screenshot` sur chaque écran affecté.
3. `browser_resize` mobile **375×812** puis `browser_take_screenshot` sur les mêmes écrans.
4. Inspecter chaque screenshot : chevauchement de texte, débordement, tronqué, contraste, hiérarchie visuelle, HUD collision, boutons cliquables.
5. Si problème détecté, corriger + retour à l'étape 2.
6. Une fois desktop + mobile propres sur toutes les vues affectées, commiter.

**Écrans clés à vérifier systématiquement** :
- Title (écran-titre + timeline)
- Interlude (bleu nuit + phrase)
- Act 1/2/3 (scène 3D + HUD + timeline + hint contextuel)
- Fresque (dessin pariétal + caption)
- Épilogue (fresque en séquence + curseur qui glisse)
- End (phrase small caps + menhirs silhouettes)

**Pourquoi cette règle** : un audit a révélé 7 bugs de layout que typecheck et tests unitaires n'attrapaient pas (chevauchements de labels, débordements mobile, `act-hint` empiétant timeline). Le dev ne veut plus voir ces régressions.

**Ce que Playwright vérifie** : le **rendu réel** dans un navigateur, à un viewport donné, avec le vrai CSS appliqué. Complète les tests React/Vitest qui restent au niveau logique/DOM sans layout réel.

**Ce que Playwright ne vérifie pas** : le ressenti (animations, timing, feeling), l'audio, les cas d'interaction longs. Ceux-là restent au playtest manuel du dev.

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
