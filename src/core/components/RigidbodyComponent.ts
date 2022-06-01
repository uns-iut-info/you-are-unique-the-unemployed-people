import {
  AbstractMesh,
  BoundingInfo,
  MeshBuilder,
  PhysicsImpostor,
  PhysicsImpostorParameters,
  Quaternion,
  Vector3,
} from "@babylonjs/core";
import { IRigidbodyData } from "../../data/IRigidbodyData";
import { Component } from "./Component";

export class RigidbodyComponent extends Component {
  private _data: IRigidbodyData;
  private _physicsObject: AbstractMesh;
  private _parentOffset: Vector3;

  private _lastFramePosition: Vector3;
  private _lastFrameRotation: Vector3;

  private _parameters: PhysicsImpostorParameters;
  private _impostor: PhysicsImpostor;

  public onInit(): void {
    this._parameters = {
      mass: 150,
      friction: 1,
      restitution: 1,
    };

    this.setProperties(this._data);

    const boxMesh = MeshBuilder.CreateCapsule('collider_' + this.parent.name, {
      height: this._data.height,
      radius: this._data.radius,
    }, this.scene);

    this._lastFramePosition = new Vector3();
    this._lastFrameRotation = new Vector3();
    
    boxMesh.position = new Vector3();
    boxMesh.rotationQuaternion = new Quaternion();
    boxMesh.isVisible = false;

    this._impostor = new PhysicsImpostor(boxMesh, PhysicsImpostor.CapsuleImpostor, this._parameters, this.scene);
    this._physicsObject = boxMesh;

    this.parent.setBoundingInfo(new BoundingInfo(Vector3.Zero(), new Vector3(this._data.radius, this._data.height, this._data.radius)));
  }

  public onEnable(): void {
    this._impostor.wakeUp();
  }

  public onDisable(): void {
    this._impostor.sleep();
  }

  public onDestroy(): void {
    super.onDestroy();
    this._impostor.dispose();
  }

  public onPhysicsUpdate(): void {
    if (!this.parent.position.equals(this._lastFramePosition) || 
        !this.parent.rotation.equals(this._lastFrameRotation)) {
      this._physicsObject.position.copyFrom(this.parent.position.add(this._parentOffset));
      this._physicsObject.rotationQuaternion.copyFrom(this.parent.rotation.toQuaternion());
    }
  }

  public onPhysicsUpdated(): void {
    if (this._data.freezeRotation) {
      this._physicsObject.rotationQuaternion.copyFrom(this.parent.rotation.toQuaternion());
    } else {
      this.parent.rotation.copyFrom(this._physicsObject.rotation);
    }

    this.parent.position.copyFrom(this._physicsObject.position.subtract(this._parentOffset));

    this._lastFramePosition.copyFrom(this.parent.position);
    this._lastFrameRotation.copyFrom(this.parent.rotation);
  }

  private _updateImpostor(): void {
    if (this._impostor) {
      this._impostor.setMass(this._parameters.mass);
      this._impostor.friction = this._parameters.friction;
      this._impostor.restitution = this._parameters.restitution;
    }
  }

  public get mass(): number {
    return this._parameters.mass;
  }

  public set mass(value: number) {
    this._parameters.mass = value;
    this._updateImpostor();
  }

  public get friction(): number {
    return this._parameters.friction;
  }

  public set friction(value: number) {
    this._parameters.friction = value;
    this._updateImpostor();
  }

  public get restitution(): number {
    return this._parameters.restitution;
  }

  public set restitution(value: number) {
    this._parameters.restitution = value;
    this._updateImpostor();
  }

  public get velocity(): Vector3 {
    return this._impostor.getLinearVelocity() ?? Vector3.Zero();
  }

  public set velocity(value: Vector3) {
    this._impostor.setLinearVelocity(value);
  }

  public setProperties(data: IRigidbodyData): void {
    this._data = data;

    if (this.initialized) {
      this._parameters.mass = data.mass;
      this._parameters.friction = data.friction;
      this._parameters.restitution = data.restitution;

      this._parentOffset = new Vector3(0, data.height / 2, 0);

      this._updateImpostor();
    }
  }
}
