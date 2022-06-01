import {
  Color4,
  FlyCamera,
  FreeCamera,
  HemisphericLight,
  Mesh,
  ParticleHelper,
  ParticleSystem,
  PhysicsImpostor,
  Texture,
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

export class TestParticleScene extends BaseScene {
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

    const camera = new FlyCamera("camera", new Vector3(0, 8, 8), this);
    camera.setTarget(new Vector3(0, 0, 0));

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

    setTimeout(() => {
      //const particleSystem = new ParticleSystem("particles", 256, this);
      const particleSystem = ParticleHelper.CreateDefault(new Vector3(0, 3, 0), 256, this, true);
      // particleSystem.particleTexture = new Texture("./img/particles/fireball.png", this);
      // 
      particleSystem.color1 = Color4.FromHexString("#fC7B09");
      particleSystem.color2 = Color4.FromHexString("#FC4E03");
      particleSystem.colorDead = new Color4(0, 0, 0, 1.0);

      particleSystem.minLifeTime = 0.5;
      particleSystem.maxLifeTime = 0.8;
      particleSystem.emitRate = 4;
      particleSystem.minSize = 0.4;
      particleSystem.maxSize = 0.6;
      particleSystem.createBoxEmitter(Vector3.Forward(), Vector3.Forward(), Vector3.Zero(), Vector3.Zero());
      particleSystem.start();
    }, 1000);

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
    return SceneType.World;
  }
}
