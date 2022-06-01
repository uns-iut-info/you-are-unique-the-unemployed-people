import {
    AbstractMesh,
    AssetsManager,
    ColorCurves,
    HardwareScalingOptimization,
    ImageProcessingPostProcess,
    MergeMeshesOptimization,
    Mesh,
    MeshBuilder,
    Octree,
    PhysicsImpostor,
    Quaternion,
    RenderTargetsOptimization,
    SceneLoader,
    SceneOptimization,
    SceneOptimizer,
    SceneOptimizerOptions,
    SimplificationType,
    StandardMaterial,
    Texture,
    TextureOptimization,
    Vector3,
} from "@babylonjs/core";
import { PlayerCamera } from "../core/camera/PlayerCamera";
import { Character } from "../core/Character";
import { MovementComponent } from "../core/components/character/movement/MovementComponent";
import { HitpointComponent } from "../core/components/HitpointComponent";
import { DataTables } from "../data/DataTables";
import { SoundType } from "../data/ISoundData";
import { BaseScene } from "./BaseScene";
import { GameUi } from "../ui/GameUi";
import { FileUtils } from "../utils/FileUtils";
import { AnchorPortalAttribute } from "./AnchorPoint";

export class SeedSceneLoader {
    private _scene: BaseScene;
    private _assetManager: AssetsManager;
    private _file: string;
    private _task: Promise<void>;

    private _originalObjects: { [key: string]: IOriginalObject } = {};

    constructor(scene: BaseScene, file: string) {
        this._scene = scene;
        this._assetManager = scene.assetManager;
        this._file = file;
        this._task = this.load();
    }

    public get task(): Promise<void> {
        return this._task;
    }

    public async load(): Promise<void> {
        this._assetManager.autoHideLoadingUI = false;
        this._assetManager.onProgress = (remainingCount, totalCount, task) => {
            this._scene.getEngine().loadingUIText =
                "Loading scene... " +
                Math.floor(((totalCount - remainingCount) / totalCount) * 100) +
                "%";
        };
        this._scene.getEngine().displayLoadingUI();

        const sceneData: ISceneData = await FileUtils.loadFile(this._file);
        const terrainData: ISceneTerrainData = sceneData.terrain;
        let terrainNavigationTask;

        if (terrainData) {
            this._loadTerrain(terrainData);
            await this._assetManager.loadAsync();
            terrainNavigationTask = this._scene.enableNavigationPlugin();
        }

        for (const objectName of new Set(
            sceneData.objData.map((data) => data.name)
        )) {
            this._loadObject(objectName);
        }

        await this._assetManager.loadAsync();

        for (const objectData of sceneData.objData) {
            this._instantiateObject(
                objectData,
                sceneData.details.includes(objectData.name)
            );
        }

        for (const anchorData of sceneData.anchors) {
            this._loadAnchor(anchorData);
        }

        if (terrainNavigationTask) {
            await terrainNavigationTask;
        } else {
            await this._scene.enableNavigationPlugin();
        }

        if (sceneData.monsters !== undefined)
            for (const monsterData of sceneData.monsters) {
                this._loadMonsters(monsterData);
            }

        if (sceneData.musics !== undefined)
            for (const musicData of sceneData.musics) {
                this._addMusic(musicData);
            }

        this._createPlayer();

        this._scene.getEngine().hideLoadingUI();
    }

    private _loadTerrain(data: ISceneTerrainData): void {
        const terrainTask = this._assetManager.addMeshTask(
            "terrain",
            "",
            "./obj/terrain/",
            data.obj
        );

        terrainTask.onSuccess = (task) => {
            const terrain = task.loadedMeshes[0];

            terrain.position = new Vector3(256, 0, -256);
            terrain.metadata = { role: "decoration" };
            terrain.physicsImpostor = new PhysicsImpostor(
                terrain,
                PhysicsImpostor.MeshImpostor,
                { mass: 0, restitution: 0 },
                this._scene
            );

            const material = new StandardMaterial("GroundMat", this._scene);
            material.diffuseTexture = new Texture(
                "./img/" + data.color_map,
                this._scene
            );
            terrain.material = material;

            this._optimizeTerrain(terrain);
        };

        terrainTask.onError = (task, message, exception) => {
            console.error("Failed to load terrain", message, exception);
        };
    }

    private _loadObject(name: string) {
        const objectTask = this._assetManager.addMeshTask(
            "object_" + name,
            "",
            "./obj/terrain/",
            name
        );

        objectTask.onSuccess = (task) => {
            const root = task.loadedMeshes[0];
            const child = root.getChildren()[0] as AbstractMesh;

            root.name = name + "_group";

            this._originalObjects[name] = {
                root: root,
                child: child,
                references: 0,
                clones: [],
            };
        };

        objectTask.onError = (task, message, exception) => {
            console.error("Failed to load object", message, exception);
        };
    }

    private _instantiateObject(data: ISceneObjectData, isDetail: boolean): void {
        const object = this._originalObjects[data.name];

        if (!object) {
            console.error("Object not found", data.name);
            return;
        }

        let root = object.child;

        if (object.references !== 0) {
            root = root.clone(data.name + "_clone", root.parent);
            // root.parent = object.root;
            object.clones.push(root as Mesh);
        }

        object.references++;

        root.name = data.name + "_" + object.references;
        root.metadata = { role: "decoration" };
        root.scaling = new Vector3(data.scale.x, data.scale.y, data.scale.z);
        root.position = new Vector3(
            data.position.x,
            data.position.y,
            data.position.z
        );
        root.rotationQuaternion = new Quaternion(
            data.rotation.x,
            data.rotation.y,
            data.rotation.z,
            data.rotation.w
        );

        if (data.colliders) {
            for (const collider of data.colliders) {
                this._loadCollider(collider, root);
            }
        }

        this._optimizeMesh(root, isDetail);
    }

    private _optimizeMesh(instance, isDetail: boolean) {
        let optimize = (m) => {
            m.isPickable = false;
            m.freezeWorldMatrix();
            m.addLODLevel(isDetail ? 45 : 175, null);
        };
        if (instance instanceof Mesh) optimize(instance);
        for (const m of instance.getChildMeshes(false)) {
            optimize(m);
        }
    }

    private _loadMonsters(data: ISceneMonsterData) {
        const characterData = DataTables.CHARACTERS[data.name];
        const character = new Character(
            data.name,
            this._scene,
            characterData,
            false
        );
        character.position = new Vector3(
            data.position.x,
            data.position.y,
            data.position.z
        );
        character.getComponent(MovementComponent).enablePatrol(data.patrol_radius);
        character.metadata = { export: data.export };

        const hitpointComponent = character.getComponent(HitpointComponent);

        hitpointComponent.onDamageTaken = (damage) => {
            GameUi.enemyInfoEnabled(true);
            GameUi.setEnemyName(characterData.displayName);
            GameUi.setEnemySubName("");
            GameUi.setEnemyHealth(
                hitpointComponent.hitpoints,
                hitpointComponent.maxHitpoints
            );
        };
        hitpointComponent.onDeath = () => {
            GameUi.enemyInfoEnabled(false);
        };
    }

    private _createPlayer() {
        const playerSpawnAnchor = this._scene.getAnchorByName("player_spawn_point");

        const character = new Character(
            "player",
            this._scene,
            DataTables.CHARACTERS["player"],
            true,
            1
        );
        const camera = new PlayerCamera("camera", character, this._scene);

        character.position = playerSpawnAnchor.position.clone();
        character.rotation = playerSpawnAnchor.rotation.clone();

        camera.rotation = playerSpawnAnchor.rotation.clone();
        camera.attachPointerLock();

        const hitpointComponent = character.getComponent(HitpointComponent);

        hitpointComponent.onDamageTaken = (damage) => {
            GameUi.setPlayerHealth(
                hitpointComponent.hitpoints,
                hitpointComponent.maxHitpoints
            );
        };
        hitpointComponent.onDeath = () => {
            GameUi.gameOverEnabled(true);
        };

        GameUi.setPlayerLevel(1);
        GameUi.setPlayerHealth(
            hitpointComponent.hitpoints,
            hitpointComponent.maxHitpoints
        );
        GameUi.enemyInfoEnabled(false);

        const postProcess = new ImageProcessingPostProcess(
            "processing",
            1.0,
            camera
        );
        const curve = new ColorCurves();

        curve.globalSaturation = 15;
        curve.globalDensity = 15;

        postProcess.colorCurvesEnabled = true;
        postProcess.colorCurves = curve;
    }

    private _addMusic(sound: ISceneMusicData) {
        const name = sound.name;
        const volume = sound.volume;
        let type: SoundType;

        switch (sound.type) {
            case "ambient":
                type = SoundType.Ambient;
                break;
        }

        this._scene.soundManager.addSound({
            name: name,
            volume: volume,
            type: type,
        });
    }

    private _loadAnchor(data: ISceneAnchorData) {
        const portalAttribute = data.portal
            ? new AnchorPortalAttribute(data.portal.dungeon, data.portal.scene, data.portal.input_radius)
            : null;

        this._scene.addAnchor(
            data.name,
            new Vector3(data.position.x, data.position.y, data.position.z),
            new Vector3(data.rotation.x, data.rotation.y, data.rotation.z),
            portalAttribute
        );
    }

    private _loadCollider(data: ISceneColliderData, parent: AbstractMesh) {
        const mesh = MeshBuilder.CreateBox("collider", {
            width: data.size.x,
            height: data.size.y,
            depth: data.size.z,
        });
        mesh.position = new Vector3(
            data.position.x,
            data.position.y,
            data.position.z
        );
        mesh.physicsImpostor = new PhysicsImpostor(
            mesh,
            PhysicsImpostor.BoxImpostor,
            { mass: 0, restitution: 0 },
            this._scene
        );

        mesh.metadata = { role: "collider" };
        mesh.checkCollisions = true;
        mesh.isPickable = true;
        mesh.isVisible = false;

        mesh.parent = parent;
    }

    private _optimizeTerrain(terrain) {
        terrain.material.freeze();
        terrain.freezeWorldMatrix();
    }
}

interface ISceneData {
    objData: ISceneObjectData[];
    details: string[];
    terrain: ISceneTerrainData;
    anchors: ISceneAnchorData[];
    monsters: ISceneMonsterData[];
    musics: ISceneMusicData[];
}

interface ISceneObjectData {
    name: string;
    position: IVector3;
    rotation: IQuaternion;
    scale: IVector3;
    colliders: ISceneColliderData[];
}

interface ISceneTerrainData {
    obj: string;
    color_map: string;
    height_map: string;
}

interface ISceneAnchorData {
    name: string;
    position: IVector3;
    rotation: IVector3;
    portal?: ISceneAnchorPortalData;
}

interface ISceneAnchorPortalData {
    dungeon: boolean;
    scene: string;
    input_radius: number;
}

interface ISceneMonsterData {
    name: string;
    export: string;
    position: IVector3;
    patrol_radius: number;
}

interface IVector3 {
    x: number;
    y: number;
    z: number;
}

interface IQuaternion {
    x: number;
    y: number;
    z: number;
    w: number;
}

interface IOriginalObject {
    root: AbstractMesh;
    child: AbstractMesh;
    references: number;
    clones: Mesh[];
}

interface ISceneMusicData {
    name: string;
    type: string;
    volume: number;
}

interface ISceneColliderData {
    position: IVector3;
    size: IVector3;
}
