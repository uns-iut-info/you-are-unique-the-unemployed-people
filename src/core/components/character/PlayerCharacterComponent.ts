import { Scalar, Vector3 } from "@babylonjs/core";
import { Globals } from "../../../scene/Globals";
import { InputComponent } from "../InputComponent";
import { BaseCharacterComponent } from "./BaseCharacterComponent";

export class PlayerCharacterComponent extends BaseCharacterComponent {
  private static readonly KEY_FORWARD = "z";
  private static readonly KEY_BACKWARD = "s";
  private static readonly KEY_LEFT = "q";
  private static readonly KEY_RIGHT = "d";

  private static readonly KEY_CAST_SPELL = "a";

  private _inputComponent: InputComponent;

  public onInit(): void {
    this._inputComponent = this.parent.getComponent(InputComponent);
    super.onInit();
  }

  public onPhysicsUpdate(): void {
    this.checkMoveInput();
    super.onPhysicsUpdate();
  }

  public onFrameUpdate(): void {
    super.onFrameUpdate();
    this.checkCombatInput();

    console.log(this.parent.position.toString());
  }

  private rotateInputToCameraDirection(vector: Vector3): Vector3 {
    return this.scene.activeCamera.getDirection(vector);
  }

  public getBone(name: string) {
    for (const bone of this._skeleton.bones) {
      if (bone.name === name) {
        return bone;
      }
    }

    return null;
  }

  private checkMoveInput(): void {
    if (this._combatComponent.isAttacking() || !this._hitpointComponent.alive) return;

    const inputComponent = this._inputComponent;

    const keyboardInput = new Vector3(
      (inputComponent.keyDown(PlayerCharacterComponent.KEY_RIGHT) ? 1 : 0) -
      (inputComponent.keyDown(PlayerCharacterComponent.KEY_LEFT) ? 1 : 0),
      0,
      (inputComponent.keyDown(PlayerCharacterComponent.KEY_FORWARD) ? 1 : 0) -
      (inputComponent.keyDown(PlayerCharacterComponent.KEY_BACKWARD) ? 1 : 0)
    );

    if (keyboardInput.lengthSquared() > 0) {
      const cameraForwardInput = this.rotateInputToCameraDirection(keyboardInput);
      const input = new Vector3(
        cameraForwardInput.x,
        0,
        cameraForwardInput.z
      ).normalize();

      this.move(input);
    } else {
      this.move(Vector3.Zero());
    }
  }

  private checkCombatInput(): void {
    if (this.isJumping() || !this._hitpointComponent.alive) {
      return;
    }

    const inputComponent = this._inputComponent;
    const combatComponent = this._combatComponent;

    if (inputComponent.keyDown(PlayerCharacterComponent.KEY_CAST_SPELL) && combatComponent.canAttack()) {
      const target = combatComponent.findClosestEnemy(Globals.CAST_TARGET_SELECTION_DISTANCE);

      if (target) {
        console.log("Casting spell on " + target.name);
        const direction = target.center.subtract(this.parent.center).normalize();
        combatComponent.attack(direction);
        this.calculateDirection(direction);
      } else {
        const direction = this.rotateInputToCameraDirection(Vector3.Forward());
        direction.y = 0;
        direction.normalize();
        combatComponent.attack(direction);
        this.calculateDirection(direction);
      }

      this._rigidbodyComponent.velocity = Vector3.Zero();
    }
  }
}
