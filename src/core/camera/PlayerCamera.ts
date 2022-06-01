import {
  ArcRotateCamera,
  PointerEventTypes,
  Scene,
  Vector3,
} from "@babylonjs/core";
import { Character } from "../Character";

export class PlayerCamera extends ArcRotateCamera {
  constructor(name: string, target: Character, scene: Scene) {
    super(name, Math.PI / 2, Math.PI / 3, 7, new Vector3(0, 0, 0), scene);

    this.radius = 7;
    this.lockedTarget = target.getCameraTarget();
    this.useFramingBehavior = true;
    this.noRotationConstraint = true;
    this.lowerRadiusLimit = 2;
    this.upperRadiusLimit = 7;
    this.lowerBetaLimit = Math.PI / 4;
    this.upperBetaLimit = this.lowerBetaLimit * 3;
    this.attachControl();
    this.inputs.removeByType("ArcRotateCameraKeyboardMoveInput");
    this.inputs.removeByType("ArcRotateCameraPointersInput");
  }

  public attachPointerLock(): void {
    this.getScene().onPointerObservable.add((p) => {
      switch (p.type) {
        case PointerEventTypes.POINTERMOVE:
          this.inertialAlphaOffset -= p.event.movementX / 1000;
          this.inertialBetaOffset -= p.event.movementY / 1000;
          break;
      }
    });
  }
}
