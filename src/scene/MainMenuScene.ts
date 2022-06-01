import { FreeCamera, Vector3 } from "@babylonjs/core";
import { App } from "../app";
import { MainMenu } from "../ui/MainMenu";
import { BaseScene } from "./BaseScene";
import { SceneManager } from "./SceneManager";
import { SceneType } from "./SceneType";
import { WorldScene } from "./WorldScene";

export class MainMenuScene extends BaseScene {
  constructor(engine: any) {
    super(engine);
  }

  public async init(): Promise<void> {
    await super.init();
    const camera = new FreeCamera("camera", new Vector3(0, 5, -10), this);
    camera.attachControl(App.getCanvas(), true);

    // TODO Add getter ...
    MainMenu.createUi();
    MainMenu.getPlayButton().onclick = () => {
      SceneManager.load(WorldScene);
    }
  }

  public dispose(): void {
    super.dispose();
    MainMenu.dispose();
  }

  public get sceneType(): SceneType {
    return SceneType.UI;
  }
}
