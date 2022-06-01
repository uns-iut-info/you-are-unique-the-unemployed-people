import {
  HemisphericLight,
  Mesh,
  PhysicsImpostor,
  Vector3,
} from "@babylonjs/core";
import { PlayerCamera } from "../core/camera/PlayerCamera";
import { Character } from "../core/Character";
import { DataTables } from "../data/DataTables";
import { TerrainBuilder } from "../terrain/TerrainBuilder";
import { BaseScene } from "./BaseScene";
import { SceneType } from "./SceneType";

export class TestPlayerScene extends BaseScene {
  constructor(engine: any) {
    super(engine);
  }

  public async init(): Promise<void> {
    await super.init();

    const player = new Character(
      "player",
      this,
      DataTables.CHARACTERS["player"],
      true,
      2
    );
    player.position.set(10, 100, 0);

    /*const terrain = MeshBuilder.CreateGround("terrain", {
            width: 10,
            height: 10,
        }, this);
        terrain.checkCollisions = true;
        terrain.physicsImpostor = new PhysicsImpostor(
            terrain,
            PhysicsImpostor.PlaneImpostor,
            {
                mass: 0,
                friction: 1,
                restitution: 0.1,
            },
            this,
        );
        terrain.position.set(0, -2, 0);*/

    const camera = new PlayerCamera("camera", player, this);
    camera.attachPointerLock();

    const light = new HemisphericLight("light", new Vector3(0, 1, 0), this);
    let b = Mesh.CreateBox("s", 8, this);
    b.physicsImpostor = new PhysicsImpostor(
      b,
      PhysicsImpostor.BoxImpostor,
      { mass: 1, friction: 0, restitution: 1.0 },
      this
    );
    b.position = new Vector3(0, 50, 0);
    let terrainBuilder = new TerrainBuilder(this);
    await terrainBuilder.createTerrain(false);
  }

  public get sceneType(): SceneType {
    return SceneType.World;
  }
}
