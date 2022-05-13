# Sword tournament

![Sword tournament logo](readme/logo.png)

## Description
  Sword tournament est notre jeu pour le concours **Games On Web 2022**. Nous avons décidé d'utiliser Unity comme editeur et babylonjs qui lui est imposé. Unity Babylon TypeScript. Une démonstration est disponible [ici](https://games.notworking.ovh/).
  /!\ Nous ne codons pas en C#, nous codons bien en TypeScript. Le Babylonjs Exporter convertit notre code TypeScript en C# pour qu'Unity soit utilisable normalement. La conversion C# vers Babylonjs n'est pas possible !

## Setup
 - Unity 2020.3.27f1 LTS
 - Node.js v14.17.6
 - Babylonjs Unity Exporter
 
## Unity Package
 - [UniVRM](https://github.com/vrm-c/UniVRM/releases) (VRM-X.XX.X_XXXX.unitypackage)
 - [UnityExporter](https://github.com/BabylonJS/UnityExporter/tree/master/Redist/2021) (Babylon Editor Toolkit.unitypackage & Babylon Starter Content.unitypackage)

## Jouer
 Pour prendre avantage de la technologie WebGPU, utiliser un navigateur compatible. Cette fonctionnalité n'est pas forcement presente de base et demande d'etre activé.
 [Google Canary](https://www.google.com/intl/fr/chrome/canary/) supporte la technologie WebGPU, il n'est pas activé de base.
 - Télécharger [Google Canary](https://www.google.com/intl/fr/chrome/canary/)
 - Allez dans les [flags](chrome://flags/) (chrome://flags/)
 - Activé ```enable-unsafe-webgpu```


## Todo
- [x] Il nous faut un personnage qui se déplace avec des animations
  - [x] Animation des joueurs selon l'état (courir, marcher ...)
  - [x] Le joueur peut se déplacer avec les touches
  - [x] Le personnage a sa propre camera controllable

- [ ] Il nous faut un 'grand' monde chargé de facon opti
  - [x] Le spawn d'objet dynamique
  - [ ] Gestion des spawns
  - [ ] Distance d'affichage
  - [ ] Dungeons (Aléatoire ?)

- [ ] Il nous faut des graphismes (Shader toon ?)
  - [ ] Creation des graphismes
  - [ ] Charger des graphismes
  - [ ] Appliquer les graphismes

- [ ] Il nous faut des UI
  - [x] Creer des UI
  - [x] Charger des UI
  - [ ] Ajouter action (-> code)

- [ ] Il nous faut un multijoueur
  - [ ] Se connecter au serveur
  - [ ] Synchronisation des elements
  - [ ] Gestion des IA

- [ ] Il nous faut des mobs
  - [ ] L'IA peut se deplacer
  - [ ] Elle a une semi intelligence
  - [ ] Animation du mob

- [ ] Il nous faut des effets
  - [ ] Creer des effets de magie ou autre
  - [ ] Charger les effets
  - [ ] Lien entre animation du perso avec des effets

Nathan RIHET, Mike CHIAPPE, Sébastien AGLAE - 2022 - L3 MIAGE
