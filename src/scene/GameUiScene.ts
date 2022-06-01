import { FreeCamera, Vector3 } from "@babylonjs/core";
import { App } from "../app";
import { GameUi } from "../ui/GameUi";
import { MainMenu } from "../ui/MainMenu";
import { BaseScene } from "./BaseScene";
import { SceneType } from "./SceneType";

export class GameUiScene extends BaseScene {
  constructor(engine: any) {
    super(engine);
  }

  public async init(): Promise<void> {
    await super.init();
    const camera = new FreeCamera("camera", new Vector3(0, 5, -10), this);
    camera.attachControl(App.getCanvas(), true);

    // TODO Add getter ...
    GameUi.createUi();
  }

  public get sceneType(): SceneType {
    return SceneType.UI;
  }
}
