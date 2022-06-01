import {
  Color3,
  CubeTexture,
  FreeCamera,
  HemisphericLight,
  Mesh,
  StandardMaterial,
  Texture,
  Vector2,
  Vector3,
} from "@babylonjs/core";
import { BaseScene } from "./BaseScene";

import { GameUi } from "../ui/GameUi";
import { SeedSceneLoader } from "./SceneLoader";
import { SceneType } from "./SceneType";
import { SceneManager } from "./SceneManager";
import { MainMenuScene } from "./MainMenuScene";
import { AnchorPortalAttribute } from "./AnchorPoint";
import { WorldScene } from "./WorldScene";

export class DungeonScene extends BaseScene {
  private _file: string;

  constructor(engine: any, file: string = 'dungeon_asset.json') {
    console.log("DungeonScene: " + file);
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

    GameUi.createUi();
    GameUi.questEnabled(false);
    GameUi.getGameOverButton().onclick = () => {
      SceneManager.load(MainMenuScene);
    };

    await new SeedSceneLoader(this, this._file).task;
  }

  public get sceneType(): SceneType {
    return SceneType.Dungeon;
  }

  protected onPortalEnter(portal: AnchorPortalAttribute): void {
    if (portal.isDungeon) {
      SceneManager.loadWithArgs<DungeonScene>(DungeonScene, portal.file);
    } else {
      SceneManager.loadWithArgs<WorldScene>(WorldScene, portal.file);
    }
  }

  public dispose(): void {
    super.dispose();
    GameUi.dispose();
  }
}
