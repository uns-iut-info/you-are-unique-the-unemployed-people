import {
  AbstractMesh,
  AnimationGroup,
  MeshBuilder,
  Scalar,
  SceneLoader,
  Skeleton,
  Vector3,
} from "@babylonjs/core";
import { ICharacterData } from "../../../data/ICharacterData";
import { AnimationComponent } from "../AnimationComponent";
import { CombatComponent } from "../CombatComponent";
import { Component } from "../Component";
import { HitpointComponent } from "../HitpointComponent";
import { MeshComponent } from "../MeshComponent";
import { RigidbodyComponent } from "../RigidbodyComponent";

export class BaseCharacterComponent extends Component {
  protected _data: ICharacterData;

  protected _animationComponent: AnimationComponent;
  protected _meshComponent: MeshComponent;
  protected _rigidbodyComponent: RigidbodyComponent;
  protected _combatComponent: CombatComponent;
  protected _hitpointComponent: HitpointComponent;
  protected _skeleton: Skeleton;

  public onInit(): void {
    this._animationComponent = this.parent.getComponent(AnimationComponent);
    this._meshComponent = this.parent.getComponent(MeshComponent);
    this._rigidbodyComponent = this.parent.getComponent(RigidbodyComponent);
    this._combatComponent = this.parent.getComponent(CombatComponent);
    this._hitpointComponent = this.parent.getComponent(HitpointComponent);

    if (this._data) {
      this.setProperties(this._data);
    }
  }

  public onPhysicsUpdated(): void {
    if (this.isMoving()) {
      this.calculateDirection();
    }
  }

  public onFrameUpdate(): void {
    this.updateAnimation();
  }

  public isJumping(): boolean {
    return Math.abs(this._rigidbodyComponent.velocity.y) >= 3;
  }

  public isMoving(): boolean {
    return (
      Math.abs(this._rigidbodyComponent.velocity.x) >= 1 ||
      Math.abs(this._rigidbodyComponent.velocity.z) >= 1
    );
  }

  public isGrounded(): boolean {
    return !this.isJumping();
  }

  public calculateDirection(direction?: Vector3): void {
    if (direction === undefined)
      direction = this._rigidbodyComponent.velocity.normalize();

    this.parent.rotation = new Vector3(
      0,
      Math.atan2(direction.x, direction.z) - Math.PI,
      0
    );
  }

  public updateAnimation(): void {
    const currentAnimation = this._animationComponent.currentAnimation;

    if (currentAnimation === null ||
      currentAnimation === this._data.idleAnimation ||
      currentAnimation === this._data.walkAnimation ||
      currentAnimation === this._data.jumpAnimation) {
      
      if (!this._hitpointComponent.alive) {
        this._animationComponent.play(this._data.dieAnimation);
        this._rigidbodyComponent.enabled = false;
        this.enabled = false;

        const interval = setInterval(() => {
          this._meshComponent.mesh.scaling = Vector3.Lerp(this._meshComponent.mesh.scaling, new Vector3(0, 0, 0), 0.016 * 0.5);
        }, 16);

        setTimeout(() => {
          this.parent.disposeOnNextFrame();
          clearInterval(interval);
        }, 30000);

        return;
      }

      if (this.isMoving()) {
        this._animationComponent.play(
          this.isJumping()
            ? this._data.jumpAnimation
            : this._data.walkAnimation,
          true
        );
      } else if (this.isJumping()) {
        this._animationComponent.play(
          this._data.jumpAnimation,
          true
        );
      } else {
        this._animationComponent.play(
          this._data.idleAnimation,
          true
        );
      }
    }
  }

  public setProperties(data: ICharacterData): void {
    this._data = data;
  }

  public move(input: Vector3) {
    const rigidbodyComponent = this._rigidbodyComponent;

    if (input.lengthSquared() > 0) {
      const newVelocity = rigidbodyComponent.velocity.clone();
      const deltaTime = this.engine.getDeltaTime() / 1000;

      newVelocity.x = Scalar.Lerp(
        newVelocity.x,
        input.x * this._data.speed,
        4 * deltaTime
      );
      newVelocity.z = Scalar.Lerp(
        newVelocity.z,
        input.z * this._data.speed,
        4 * deltaTime
      );

      rigidbodyComponent.velocity = newVelocity;
    } else {
      rigidbodyComponent.velocity = Vector3.Lerp(rigidbodyComponent.velocity, new Vector3(0, rigidbodyComponent.velocity.y, 0), 20 * this.engine.getDeltaTime() / 1000);
    }
  }
}
