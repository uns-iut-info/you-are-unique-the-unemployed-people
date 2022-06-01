import { Color3, CubeTexture, FreeCamera, HemisphericLight, Mesh, StandardMaterial, Texture, Vector2, Vector3 } from "@babylonjs/core";
import { App } from "../app";
import { TerrainBuilder } from "../terrain/TerrainBuilder";
import { BaseScene } from "./BaseScene";

import * as MATERIAL from 'babylonjs-materials';
import { Water } from "../terrain/Water";
import { SceneType } from "./SceneType";

export class TestMapScene extends BaseScene {
  constructor(engine: any) {
    super(engine, {
      useClonedMeshMap: true,
      useGeometryUniqueIdsMap: true,
      useMaterialMeshMap: true,
    });
  }

  public async init(): Promise<void> {
    await super.init();

    const camera = new FreeCamera("camera", new Vector3(0, 150, 0), this);
    camera.attachControl(App.getCanvas(), true);
    camera.speed = 20;
    camera.rotation = new Vector3(90, 0, 0);

    const light = new HemisphericLight("light", new Vector3(0, 1, 0), this);

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

    let terrainBuilder = new TerrainBuilder(this);
    await terrainBuilder.createTerrain(true);
  }

  public get sceneType(): SceneType {
    return SceneType.World;
  }
}
