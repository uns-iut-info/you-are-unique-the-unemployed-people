import {
  AbstractMesh,
  Nullable,
  Quaternion,
  Scene,
  Vector3,
} from "@babylonjs/core";
import { Component } from "./components/Component";

export class GameObject extends AbstractMesh {
  private readonly components: Map<string, Component> = new Map();

  private _ready: boolean = false;

  constructor(name: string, scene?: Nullable<Scene>) {
    super(name, scene);

    this.onDispose = () => {
      this.components.forEach((component) => {
        component.onDestroy();
      });
      this.components.clear();
    };

    this._scene.onReadyObservable.add(() => {
      this.components.forEach((component) => {
        component.init();
      });
      this._ready = true;
    });
  }

  public get position(): Vector3 {
    return super.position;
  }

  public set position(value: Vector3) {
    super.position.copyFrom(value);
  }

  public get rotation(): Vector3 {
    return super.rotation;
  }

  public set rotation(value: Vector3) {
    if (super.rotationQuaternion) {
      super.rotationQuaternion = Quaternion.RotationYawPitchRoll(
        value.y,
        value.x,
        value.z
      );
    } else {
      super.rotation.copyFrom(value);
    }
  }

  public get center(): Vector3 {
    return super.getBoundingInfo().boundingBox.centerWorld;
  }

  public disposeOnNextFrame(): void {
    this._scene.onAfterDrawPhaseObservable.addOnce(() => {
      this.dispose();
    });
  }

  public getComponent<T extends Component>(type: { new (): T }): T {
    const componentName = type.name;
    if (!this.components.has(componentName)) {
      throw new Error(`Component ${componentName} not found`);
    }
    return this.components.get(componentName) as T;
  }

  public findComponent<T extends Component>(type: { new (): T }): T | null {
    const componentName = type.name;
    if (!this.components.has(componentName)) {
      return null;
    }
    return this.components.get(componentName) as T;
  }

  public addComponent<T extends Component>(type: { new (): T }): T {
    const componentName = type.name;
    if (this.components.has(componentName)) {
      throw new Error(`Component ${componentName} already exists`);
    }
    const component = new type();
    this.components.set(componentName, component);
    component.parent = this;

    if (this._ready) {
      component.init();
    }

    return component;
  }

  public hasComponent<T extends Component>(type: { new (): T }): boolean {
    const componentName = type.name;
    return this.components.has(componentName);
  }

  public removeComponent<T extends Component>(type: { new (): T }): void {
    const componentName = type.name;
    if (!this.components.has(componentName)) {
      throw new Error(`Component ${componentName} not found`);
    }
    this.components.delete(componentName);
  }

  public getComponents(): IterableIterator<Component> {
    return this.components.values();
  }

  public get enabled(): boolean {
    return super.isEnabled();
  }

  public set enabled(value: boolean) {
    throw new Error("GameObject.enabled is readonly");
  }

  public static findGameObjectByName(scene: Scene, name: string): GameObject {
    let allGameObject = scene.meshes.filter(
      (mesh) => mesh instanceof GameObject
    );
    return allGameObject[0] as GameObject;
  }

  public static findGameObjectByType(scene: Scene, type: string): GameObject[] {
    let allGameObject = scene.meshes.filter(
      (mesh) => mesh instanceof GameObject && mesh.constructor.name === type
    );
    return allGameObject as GameObject[];
  }

  public static findAllGameObjects(scene: Scene): GameObject[] {
    return scene.meshes.filter((m) => m instanceof GameObject) as GameObject[];
  }
}
