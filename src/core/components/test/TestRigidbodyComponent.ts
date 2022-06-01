import {
  AnimationGroup,
  Mesh,
  SceneLoader,
  TransformNode,
  Vector3,
} from "@babylonjs/core";
import { Component } from "../Component";
import { MeshComponent } from "../MeshComponent";
import { RigidbodyComponent } from "../RigidbodyComponent";

export class TestRigidbodyComponent extends Component {
  private _meshComponent: MeshComponent;
  private _playerMesh: TransformNode;
  private _rigidbodyComponent: RigidbodyComponent;

  public onInit(): void {
    this._meshComponent = this.parent.getComponent(MeshComponent);
    this._rigidbodyComponent = this.parent.getComponent(RigidbodyComponent);

    if (!this._meshComponent) {
      throw new Error("MeshComponent is required for TestRigidbodyComponent");
    }

    if (!this._rigidbodyComponent) {
      throw new Error(
        "RigidbodyComponent is required for TestRigidbodyComponent"
      );
    }

    this.enabled = false;
    this._meshComponent.enabled = false;
    this._rigidbodyComponent.enabled = false;

    SceneLoader.ImportMeshAsync(null, "./obj/", "lola.glb").then((result) => {
      this.enabled = true;
      this._meshComponent.enabled = true;
      this._meshComponent.mesh = result.meshes[0];
      this._rigidbodyComponent.enabled = true;
      // Exemple animations
      this._playerMesh = this._meshComponent.mesh
        .getChildren()[0]
        .getChildren()[1] as TransformNode;
      console.log(this.getAllAnimationGroups());
      this.getAllAnimationGroups()[2].play(true);
    });
  }

  private getAllAnimationGroups(): AnimationGroup[] {
    let animationGroups: AnimationGroup[] = [];
    for (const animationGroup of this.scene.animationGroups) {
      if (animationGroup.targetedAnimations[0].target === this._playerMesh) {
        animationGroups.push(animationGroup);
      }
    }
    return animationGroups;
  }

  public onFrameUpdate(): void {
    if (this.parent.position.y < -1) {
      this._rigidbodyComponent.velocity = new Vector3(0, 5, 0);
      console.log("TestRigidbodyComponent.onFrameUpdate(): Bounce!");
    }
  }

  public onDestroy(): void {}
}
