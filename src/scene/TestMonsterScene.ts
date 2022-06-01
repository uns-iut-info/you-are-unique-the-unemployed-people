import {
  ArcRotateCamera,
  FlyCamera,
  FollowCamera,
  HemisphericLight,
  MeshBuilder,
  PhysicsImpostor,
  Vector3,
} from "@babylonjs/core";
import { PlayerCamera } from "../core/camera/PlayerCamera";
import { Character } from "../core/Character";
import { DataTables } from "../data/DataTables";
import { BaseScene } from "./BaseScene";
import { SceneType } from "./SceneType";

export class TestMonsterScene extends BaseScene {
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
      50
    );
    const terrain = MeshBuilder.CreateGround(
      "terrain",
      {
        width: 10,
        height: 10,
      },
      this
    );
    terrain.checkCollisions = true;
    terrain.physicsImpostor = new PhysicsImpostor(
      terrain,
      PhysicsImpostor.BoxImpostor,
      {
        mass: 0,
        friction: 2,
        restitution: 0.1,
      },
      this
    );
    terrain.position.set(0, -2, 0);

    const camera = new FlyCamera("camera", new Vector3(0, 7, -10), this);
    camera.setTarget(new Vector3(0, -5, 0));

    const light = new HemisphericLight("light", new Vector3(0, 1, 0), this);
  }

  public get sceneType(): SceneType {
    return SceneType.World;
  }
}
