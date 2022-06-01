import { AbstractMesh, MeshBuilder, Vector3 } from "@babylonjs/core";
import { ICharacterData } from "../data/ICharacterData";
import { AnimationComponent } from "./components/AnimationComponent";
import { EnemyCharacterComponent } from "./components/character/EnemyCharacterComponent";
import { MovementComponent } from "./components/character/movement/MovementComponent";
import { PlayerCharacterComponent } from "./components/character/PlayerCharacterComponent";
import { CombatComponent } from "./components/CombatComponent";
import { HitpointComponent, Team } from "./components/HitpointComponent";
import { InputComponent } from "./components/InputComponent";
import { MeshComponent } from "./components/MeshComponent";
import { RigidbodyComponent } from "./components/RigidbodyComponent";
import { GameObject } from "./GameObject";

export class Character extends GameObject {
  private _cameraTarget: AbstractMesh;

  constructor(
    name: string,
    scene: any,
    data: ICharacterData,
    ownedByPlayer: boolean,
    cameraOffset?: number
  ) {
    super(name, scene);

    if (ownedByPlayer) {
      if (cameraOffset === undefined) {
        cameraOffset = 4;
      }

      this.initCamera(cameraOffset);
    }

    this.addComponent(RigidbodyComponent).setProperties(data.rigidbody);
    this.addComponent(MeshComponent).setProperties(data.mesh);
    this.addComponent(AnimationComponent);
    this.addComponent(HitpointComponent).setProperties(data.hp, ownedByPlayer ? Team.Player : Team.Enemy);
    this.addComponent(CombatComponent).setProperties(data.combat);

    if (ownedByPlayer) {
      this.addComponent(InputComponent);
      this.addComponent(PlayerCharacterComponent).setProperties(data);
    } else {
      this.addComponent(EnemyCharacterComponent).setProperties(data);
      this.addComponent(MovementComponent);
    }
  }

  public get ownedByPlayer(): boolean {
    return this.hasComponent(InputComponent);
  }

  private initCamera(cameraOffset: number) {
    this._cameraTarget = MeshBuilder.CreateBox(
      "cameraTarget",
      { width: 0.1, height: 0.1, depth: 0.1 },
      this._scene
    );
    this._cameraTarget.parent = this;
    this._cameraTarget.position = new Vector3(0, cameraOffset, 0);
    this._cameraTarget.isVisible = false;
  }

  public getCameraTarget(): AbstractMesh {
    return this._cameraTarget;
  }
}
