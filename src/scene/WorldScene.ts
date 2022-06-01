import { Color3, CubeTexture, FreeCamera, HemisphericLight, Mesh, StandardMaterial, Texture, Vector2, Vector3 } from "@babylonjs/core";
import { App } from "../app";
import { TerrainBuilder } from "../terrain/TerrainBuilder";
import { BaseScene } from "./BaseScene";

import { Water } from "../terrain/Water";
import { Character } from "../core/Character";
import { DataTables } from "../data/DataTables";
import { PlayerCamera } from "../core/camera/PlayerCamera";
import { SeedSceneLoader } from "./SceneLoader";
import { GameUi } from "../ui/GameUi";
import { SceneManager } from "./SceneManager";
import { MainMenuScene } from "./MainMenuScene";
import { SceneType } from "./SceneType";
import { AnchorPortalAttribute } from "./AnchorPoint";
import { DungeonScene } from "./DungeonScene";

export class WorldScene extends BaseScene {
    private _file: string;

    constructor(engine: any, file: string = 'terrain_asset.json') {
        super(engine, {
            useClonedMeshMap: true,
            useGeometryUniqueIdsMap: true,
            useMaterialMeshMap: true,
        });
        this._file = './data/' + file;
    }

    public async init(): Promise<void> {
        await super.init();

        const light = new HemisphericLight("light", new Vector3(0, 1, 0), this);

        light.intensity = 1;

        const skybox = Mesh.CreateBox("skyBox", 5000.0, this);
        const skyboxMaterial = new StandardMaterial("skyBox", this);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.reflectionTexture = new CubeTexture("https://assets.babylonjs.com/textures/TropicalSunnyDay", this);
        skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
        skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
        skyboxMaterial.specularColor = new Color3(0, 0, 0);
        skyboxMaterial.disableLighting = true;
        skybox.material = skyboxMaterial;

        // Water
        const water = new Water(this, skybox, 1024, 1024);

        /*let terrainBuilder = new TerrainBuilder(this);
        await terrainBuilder.createTerrain(true);*/

        GameUi.createUi();
        GameUi.questEnabled(false);
        GameUi.getGameOverButton().onclick = () => {
            SceneManager.load(MainMenuScene);
        };

        await new SeedSceneLoader(this, this._file).task;
    }

    public dispose(): void {
        GameUi.dispose();
    }

    public get sceneType(): SceneType {
        return SceneType.World;
    }

    protected onPortalEnter(portal: AnchorPortalAttribute): void {
        if (portal.isDungeon) {
            SceneManager.loadWithArgs<DungeonScene>(DungeonScene, portal.file);
        } else {
            SceneManager.loadWithArgs<WorldScene>(WorldScene, portal.file);
        }
    }
}