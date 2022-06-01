import {
  HemisphericLight,
  Mesh,
  PhysicsImpostor,
  Vector3,
} from "@babylonjs/core";
import { PlayerCamera } from "../core/camera/PlayerCamera";
import { Character } from "../core/Character";
import { NavMeshComponent } from "../core/components/NavMeshComponent";
import { DungeonComponent } from "../core/components/test/DungeonComponent";
import { GameObject } from "../core/GameObject";
import { DataTables } from "../data/DataTables";
import { BaseScene } from "./BaseScene";
import { SceneType } from "./SceneType";

export class TestDungeonScene extends BaseScene {
  constructor(engine: any) {
    super(engine);
  }

  public async init(): Promise<void> {
    await super.init();

    const ground = Mesh.CreateGround("ground", 50, 50, 2, this);
    ground.physicsImpostor = new PhysicsImpostor(
      ground,
      PhysicsImpostor.PlaneImpostor,
      {
        mass: 0,
      }
    );
    ground.metadata = { role: "decoration" };
    ground.checkCollisions = true;

    const player = new Character(
      "player",
      this,
      DataTables.CHARACTERS["player"],
      true,
      2
    );
    player.position.set(10, 10, 0);

    const camera = new PlayerCamera("camera", player, this);
    camera.attachPointerLock();

    const light = new HemisphericLight("light", new Vector3(1, 1, 0), this);
    light.intensity = 0.5;

    await this.enableNavigationPlugin();

    const monster = new Character(
      "monster_1",
      this,
      DataTables.CHARACTERS["flower_queen"],
      false
    );
    monster.position.set(4, 0, 4);

    /*let script = new GameObject("script", this);
    script.addComponent(NavMeshComponent);
    script.addComponent(DungeonComponent);*/

    // Monster are created in the DungeonComponent

    // The blue material on the plane is the navmesh space

    // Shriley can shoot the flower monster but the collider is a little bit tricky

    //https://playground.babylonjs.com/#TN7KNN#281

    // console.log(GameObject.findGameObjectByName(this, "Player"));
    // console.log(GameObject.findAllGameObjects(this));
    // console.log(GameObject.findGameObjectByType(this, "Character"));
  }

  public get sceneType(): SceneType {
    return SceneType.Dungeon;
  }
}
