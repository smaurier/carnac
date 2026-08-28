# Roadmap

Ce document capture la vision au delà du MVP. Il n'est engageant à rien. Il sert à ne pas perdre les idées émergées pendant la conception, et à orienter les choix techniques du MVP (extensibilité).

## Vision longue

*Carnac* est conçu comme une **œuvre extensible sur la ligne du temps profond**. Le MVP livre un chapitre autonome (Néolithique moyen, la première pierre). D'autres chapitres peuvent venir se poser sur la même frise du temps, chacun jouable indépendamment, chacun apportant sa propre poésie et sa propre thèse historique.

## Extensions envisagées

Toutes optionnelles. Aucune ne conditionne le MVP.

### Chapitres jouables additionnels

Chaque chapitre suit la même structure (3 actes courts + interludes frise), mais dans une autre époque, avec sa propre matière historique et son propre climax.

- **Mésolithique · Téviec** (~7000 av. J.-C.) : chasseurs-cueilleurs littoraux du Morbihan, culture attestée par des fouilles réelles. Focus quotidien : coquillages, sépultures collectives, harpon. Climax possible : une sépulture qui se transforme en lieu de mémoire.
- **Âge du Bronze** (~2000 av. J.-C.) : arrivée du métal, tumulus armoricains, réutilisation des mégalithes par les nouvelles générations. Climax possible : une communauté qui ajoute une chambre à un dolmen existant.
- **Arrivée des Celtes** (~600 av. J.-C.) : rencontre entre populations autochtones tardives et migrants celtiques. Pacifique ou violente, hybridation culturelle. Point d'interrogation historique réel. Climax possible : un rite pratiqué à deux, mots inconnus.
- **Antiquité tardive** : christianisation des mégalithes (croix chrétiennes gravées sur dolmens, fait attesté). Climax possible : une main qui grave la première croix.
- **Époque moderne** : premiers archéologues qui interprètent les alignements, XIXe siècle. Climax possible : la découverte que le monument est bien plus ancien qu'on ne le pensait.
- **Aujourd'hui** : chapitre méta, court, ludique, qui inverse les rôles (le joueur est touriste, drone, archéologue). Climax possible : une nuit passée seul dans les alignements.

## Idées d'outillage à extraire du projet

Certaines briques développées pour Carnac ont un intérêt hors du jeu et pourraient être open-sourcées séparément.

- **Pipeline Hunyuan local pour la génération 3D game-ready.** Le workflow local (prompts → GLB → import r3f) monté initialement pour Dia de los Muertos est déjà réutilisé sur Carnac. À documenter et à publier sur GitHub comme repo autonome (nom provisoire : `hunyuan-game-pipeline` ou similaire). Bénéfices : contribution communauté, potentiel de visibilité, capitalisation d'un asset dev réutilisable sur tous les futurs jeux perso.
- **Frise du temps profond réutilisable.** Composant r3f + React qui affiche une frise chronologique interactive du Paléolithique à aujourd'hui, avec curseur, événements, ellipses animées. Potentiellement réutilisable pour d'autres projets pédagogiques historiques (Heritage, History Card, saga Nayeli).
- **Shaders cel-shading + halo perceptif.** Trois shaders GLSL customs (`cel_toon`, `halo_pulse`, `outline_soft`) exportables en package npm.

## Idées de forme et diffusion

- **Version musée** : installation locale dans un centre archéologique (Musée de Préhistoire de Carnac, Locmariaquer). Playthrough court sur écran tactile.
- **Version scolaire** : version épurée pédagogique pour cycle 3 ou collège, avec livret enseignant. Alignement programme (Histoire, cycle 3, "Et avant la France").
- **Version longue** : agrégation des chapitres additionnels en un jeu complet payant sur itch.io ou Steam, longtemps après le MVP.
- **Vidéo courte** : letsplay commenté de 30 minutes par le dev, publié sur YouTube, sert de bande annonce et de médiation.

## Ce qui reste ouvert

- Portage mobile (iOS, Android) : envisageable mais pas prioritaire, r3f fonctionne mobile mais performances iso à valider.
- Version narrative texte-only (extension chapitre roman) reliée à la saga Nayeli : synergie possible avec le projet littéraire du dev.
- Traductions (anglais, breton, espagnol) : possible si intérêt communauté, low-effort si pas de texte in-game (choix acté MVP).

## Ce qui n'est pas à la roadmap

Explicitement, pour ne pas rouvrir le débat :

- Multijoueur
- Combat, mort du joueur, mécaniques de survie tendue
- Free-to-play, microtransactions
- Version VR
- Reboots / refontes complètes du chapitre MVP
