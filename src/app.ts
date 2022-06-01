import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import { Database, Engine } from "@babylonjs/core";
import { BaseScene } from "./scene/BaseScene";
import { TestPlayerScene } from "./scene/TestPlayerScene";
import { TestMonsterScene } from "./scene/TestMonsterScene";
import { TestMapScene } from "./scene/TestMapScene";
import { TestDungeonScene } from "./scene/TestDungeonScene";
import { MainMenuScene } from "./scene/MainMenuScene";
import { NavMeshService } from "./navmesh/NavMeshService";
import { TestParticleScene } from "./scene/TestParticleScene";
import { TestComponentScene } from "./scene/TestComponentScene";
import { WorldScene } from "./scene/WorldScene";
import { GameUiScene } from "./scene/GameUiScene";
import { SceneManager } from "./scene/SceneManager";
import { GameUi } from "./ui/GameUi";
import { DungeonScene } from "./scene/DungeonScene";

export class App {
  private static scene: BaseScene;
  private static canvas: HTMLCanvasElement;
  private static engine: Engine;

  public static getScene(): BaseScene {
    return this.scene;
  }

  public static setScene(scene: BaseScene) {
    App.scene = scene;
  }

  public static getCanvas(): HTMLCanvasElement {
    return this.canvas;
  }

  public static getEngine(): Engine {
    return this.engine;
  }

  constructor() {
    // Database.IDBStorageEnabled = true;
    App.canvas = this.createCanvas();
    App.engine = new Engine(App.canvas, true);

    //App.scene = new MainMenuScene(new Engine(App.canvas, true));
    //App.scene = new TestPlayerScene(new Engine(App.canvas, true));
    // App.scene = new TestMapScene(new Engine(App.canvas, true));
    //App.scene = new TestDungeonScene(new Engine(App.canvas, true));
    //App.scene = new TestMonsterScene(new Engine(App.canvas, true));
    // App.scene = new TestParticleScene(new Engine(App.canvas, true));
    // App.scene = new GameUiScene(new Engine(App.canvas, true));
    // App.scene = new DungeonScene(new Engine(App.canvas, true));
  }

  public async init() {
    //@ts-ignore
    await Ammo();
    //@ts-ignore
    await Recast();

    await SceneManager.load(MainMenuScene);

    // await SceneManager.load(TestDungeonScene);

    /*setTimeout(() => {
      SceneManager.load(WorldScene);
    }, 5000);*/
  }

  private createCanvas(): HTMLCanvasElement {
    var canvas = document.createElement("canvas");
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.id = "gameCanvas";
    document.body.appendChild(canvas);
    return canvas;
  }
}
const app = new App();
app.init();
