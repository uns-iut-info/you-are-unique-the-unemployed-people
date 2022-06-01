import { Color3, Color4, Texture, Vector3 } from "@babylonjs/core";
import { SceneType } from "../scene/SceneType";
import { ICharacterData } from "./ICharacterData";
import { ImageEffectData, SoundEffectData } from "./IEffectData";
import { TransitionMissionData, GoToAnchorPointMissionData, IMissionData, KillMonsterMissionData, TextMissionData } from "./IMissionData";
import { IProjectileData } from "./IProjectileData";

export class DataTables {
    public static readonly PROJECTILES: { [key: string]: IProjectileData } = {
        "fireball": {
            speed: 10,
            destructDelay: 1000,
            hitOnPath: true,

            particleTexture: new Texture("img/particles/fireball.png")
        },
        "flowerball": {
            speed: 12,
            destructDelay: 1000,
            hitOnPath: true,

            particleTexture: new Texture("img/particles/flower.png")
        },
    };

    public static readonly CHARACTERS: { [key: string]: ICharacterData } = {
        "player": {
            displayName: "Player",

            speed: 9,
            jumpSpeed: 10,

            hp: 100,

            idleAnimation: {
                name: "idle",
                loop: true,
                speed: 1,
                rollbackAtEnd: true,
            },
            jumpAnimation: {
                name: "jump",
                loop: false,
                speed: 1,
                rollbackAtEnd: false,
            },
            walkAnimation: {
                name: "run",
                loop: true,
                speed: 1.25,
                rollbackAtEnd: true,
            },
            dieAnimation: {
                name: "die",
                loop: false,
                speed: 1,
                rollbackAtEnd: false,
            },

            combat: {
                attackRadius: 8, // range of attack
                alertRadius: 8, // range of alert

                damage: 10,
                damageRadius: 1, // projectile radius

                criticalChance: 50,
                criticalDamagePercentage: 25,

                projectile: this.PROJECTILES["fireball"],
                projectileSpawnRandomStartOffset: new Vector3(0, 1.25, 0),
                projectileSpawnRandomEndOffset: new Vector3(0, 1.25, 0),
                projectileInitDelay: 150,

                attackCooldown: 1000, // délais entre chaque attaque (ms)
                attackCooldownVariance: 0, // variance du délais entre chaque attaque (ms)
                attackFreezeCooldown: 0, // freeze du personnage après une attaque (ms)

                hitLoadingTime: 400, // temps de chargement des coups (ms)
                hitBurstCount: 1, // nombre de coups par attaque
                hitBurstDelay: 0, // délais entre chaque coup dans une attaque (ms)

                attackEffects: [
                    new SoundEffectData('effects/fireball.wav', 0.2)
                ],

                // animation à lancer lors d'une attaque
                attackAnimation: {
                        name: "spell_0",
                        loop: false,
                        speed: 2,
                        rollbackAtEnd: true,
                },
                
                // animations à lancer lors d'un coup (une animation par coup, erreur si hitBurstCount >= hitAnimations.length)
                hitAnimations: [ ],
            },
            mesh: {
                model: "shriley.glb",
                size: new Vector3(1, 1, 1),
                offset: new Vector3(0, 0, 0),
            },
            rigidbody: {
                height: 1.8,
                radius: 0.4,
                freezeRotation: true,
                mass: 12,
                friction: 1,
                restitution: 0,
            }
        },

        "flower_queen": {
            displayName: "Flower Queen",

            speed: 5,
            jumpSpeed: 10,

            hp: 100,

            idleAnimation: {
                name: "idle",
                loop: true,
                speed: 1,
                rollbackAtEnd: true,
            },
            jumpAnimation: {
                name: "jump",
                loop: false,
                speed: 1,
                rollbackAtEnd: false,
            },
            walkAnimation: {
                name: "move",
                loop: true,
                speed: 1,
                rollbackAtEnd: true,
            },
            dieAnimation: {
                name: "die",
                loop: false,
                speed: 1,
                rollbackAtEnd: false,
            },

            combat: {
                attackRadius: 7, // range of attack
                alertRadius: 20, // range of alert

                damage: 4,
                damageRadius: 0.5, // projectile radius

                criticalChance: 25,
                criticalDamagePercentage: 30,

                projectile: this.PROJECTILES["flowerball"],
                projectileTrackTarget: true,
                projectileSpawnRandomStartOffset: new Vector3(-3, 5, -3),
                projectileSpawnRandomEndOffset: new Vector3(3, 5, 3),
                projectileInitDelay: 1000,

                attackCooldown: 5000,
                attackCooldownVariance: 400,
                attackFreezeCooldown: 1000,

                hitLoadingTime: 2000,
                hitBurstCount: 10,
                hitBurstDelay: 100,

                attackEffects: [
                    new ImageEffectData(
                        new Vector3(0, 5.5, 0),
                        new Vector3(Math.PI / 2, 0, 0),
                        './img/effects/fireball_multicast_effect.png',
                        8, // width
                        8, // height
                        new Color3(0, 0, 0), // start color
                        new Color3(1, 1, 1), // target color
                        new Color3(0, 0, 0), // end color
                        1000, // start - target duration
                        3000, // total duration before end transition
                        3500, // total duration after end transition
                        false),
                    new SoundEffectData('effects/fireball.wav', 0.4)
                ],

                attackAnimation: {
                    name: "aoe",
                    loop: false,
                    speed: 1,
                    rollbackAtEnd: true,
                },

                hitAnimations: [],
            },
            mesh: {
                model: "flower_dryad.glb",
                size: new Vector3(0.15, 0.15, 0.15),
                offset: new Vector3(0, 1, 0),
            },
            rigidbody: {
                height: 4,
                radius: 0.6,
                freezeRotation: true,
                mass: 15,
                friction: 1,
                restitution: 0,
            }
        },

        "turnipa": {
            displayName: "Flower Slime",

            speed: 2.5,
            jumpSpeed: 10,

            hp: 25,

            idleAnimation: {
                name: "idle",
                loop: true,
                speed: 1,
                rollbackAtEnd: true,
            },
            jumpAnimation: {
                name: "jump",
                loop: false,
                speed: 1,
                rollbackAtEnd: false,
            },
            walkAnimation: {
                name: "move",
                loop: true,
                speed: 1,
                rollbackAtEnd: true,
            },
            dieAnimation: {
                name: "die",
                loop: false,
                speed: 1,
                rollbackAtEnd: false,
            },

            combat: {
                attackRadius: 2, // range of attack
                alertRadius: 10, // range of alert

                damage: 2,
                damageRadius: 1, // projectile radius

                criticalChance: 0,
                criticalDamagePercentage: 0,

                projectile: this.PROJECTILES["flowerball"],
                projectileTrackTarget: true,
                projectileSpawnRandomStartOffset: new Vector3(0, 0.5, 0.5),
                projectileSpawnRandomEndOffset: new Vector3(0, 0.5, 0.5),
                projectileInitDelay: 0,

                attackCooldown: 2000,
                attackCooldownVariance: 500,
                attackFreezeCooldown: 250,

                hitLoadingTime: 500,
                hitBurstCount: 1,
                hitBurstDelay: 0,

                attackEffects: [],

                attackAnimation: {
                    name: "attack",
                    loop: false,
                    speed: 1,
                    rollbackAtEnd: true,
                },

                hitAnimations: [],
            },
            mesh: {
                model: "turnipa.glb",
                size: new Vector3(1, 1, 1),
                offset: new Vector3(0, 0.05, 0),
            },
            rigidbody: {
                height: 2,
                radius: 0.7,
                freezeRotation: true,
                mass: 10,
                friction: 1,
                restitution: 0,
            }
        },

        "tree": {
            displayName: "Devil Tree",

            speed: 1.0,
            jumpSpeed: 10,

            hp: 15,

            idleAnimation: {
                name: "idle",
                loop: true,
                speed: 1,
                rollbackAtEnd: true,
            },
            jumpAnimation: {
                name: "jump",
                loop: false,
                speed: 1,
                rollbackAtEnd: false,
            },
            walkAnimation: {
                name: "move",
                loop: true,
                speed: 1,
                rollbackAtEnd: true,
            },
            dieAnimation: {
                name: "die",
                loop: false,
                speed: 1,
                rollbackAtEnd: false,
            },

            combat: {
                attackRadius: 3, // range of attack
                alertRadius: 8, // range of alert

                damage: 7,
                damageRadius: 1, // projectile radius

                criticalChance: 30,
                criticalDamagePercentage: 50,

                projectile: this.PROJECTILES["flowerball"],
                projectileTrackTarget: true,
                projectileSpawnRandomStartOffset: new Vector3(0, 0.5, 0.5),
                projectileSpawnRandomEndOffset: new Vector3(0, 0.5, 0.5),
                projectileInitDelay: 0,

                attackCooldown: 2000,
                attackCooldownVariance: 500,
                attackFreezeCooldown: 250,

                hitLoadingTime: 500,
                hitBurstCount: 1,
                hitBurstDelay: 0,

                attackEffects: [],

                attackAnimation: {
                    name: "attack",
                    loop: false,
                    speed: 1,
                    rollbackAtEnd: true,
                },

                hitAnimations: [],
            },
            mesh: {
                model: "devil_tree.glb",
                size: new Vector3(1, 1, 1),
                offset: new Vector3(0, 0.05, 0),
            },
            rigidbody: {
                height: 2.5,
                radius: 0.7,
                freezeRotation: true,
                mass: 10,
                friction: 1,
                restitution: 0,
            }
        }
    };

    public static readonly MISSIONS: { [key: string]: IMissionData } = {
        /*"start": new TextMissionData('Bienvenue dans le monde de Mononoke !', 2500, 'start_2'),
        "start_2": new TextMissionData('Vous pouvez vous déplacer via les touches zqsd.', 2500, 'start_3'),
        "start_3": new TextMissionData('Vous pouvez attaquer avec la touche A.', 2500, 'start_5'),

        "start_5": new TextMissionData('Il semble que quelqu\'un vous attend près de la maison.', 3000, 'start_6'),
        "start_6": new TextMissionData('Aller lui parler en essayant de pas vous faire attaquer par les monstres', 3000, 'start_7'),
        "start_7": new GoToAnchorPointData('npc_1_point', 'Aller parler à la personne.', 'start_8'),
        'start_8': new TextMissionData('Oh non, elle s\'est transformée en monstre ! Vite, suivez là !', 3000, 'start_9'),*/

        "start": new TextMissionData(SceneType.World, '<Vous>: Où suis-je ?', 5000, 'start_2'),
        "start_2": new TextMissionData(SceneType.World, '<Vous>: (Il semble que je me suis échouée sur une ile)', 2500, 'start_3'),
        "start_3": new TextMissionData(SceneType.World, '<Vous>: (Je devrais peut-être essayer de trouver quelqu\'un)', 2500, 'start_4'),

        "start_4": new GoToAnchorPointMissionData(SceneType.World, 'mission_point_1', 'Essayer de trouver quelqu\'un. (ZQSD pour le déplacement)', 'start_5'),
        "start_5": new TextMissionData(SceneType.World, '<Vous>: (Oh, j\'appercois du mouvement vers la-bas)', 2500, 'start_6'),
        
        "start_6": new GoToAnchorPointMissionData(SceneType.World, 'mission_point_2', 'Essayer de trouver quelqu\'un.', 'start_7'),

        "start_7": new TextMissionData(SceneType.World, '<Vous>: Oh non, un Monstre !', 1500, 'start_8'),
        "start_8": new TextMissionData(SceneType.World, 'Essayer de l\'attaquer avec la touche \'A\'', 4000, 'start_9'),

        "start_9": new KillMonsterMissionData(SceneType.World, 'mission_monster', 'Tuer l\'arbre (touche \'A\')', 'start_10'),

        "start_10": new TextMissionData(SceneType.World, '<Vous>: (Ouf, je l\'ai échappé belle)', 2000, 'start_11'),

        "start_11": new TextMissionData(SceneType.World, '<Vous>: (Ce village semble avoir été envahi par les monstres...)', 2000, 'start_12'),
        "start_12": new TextMissionData(SceneType.World, '<Vous>: (Je vois un portail au loin, peut-être que les villageois se sont abrités à l\'intérieur.)', 4000, 'start_13'),

        "start_13": new GoToAnchorPointMissionData(SceneType.World, 'portal_enter_point', 'Aller au portail.', 'start_14'),

        "start_14": new TransitionMissionData(SceneType.Dungeon, 'Entrer dans le portail. (touche \'E\')', 'start_15'),
    }
}

