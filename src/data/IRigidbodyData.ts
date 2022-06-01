import { Vector3 } from "@babylonjs/core";

export interface IRigidbodyData {
    height: number;
    radius: number;
    
    freezeRotation: boolean;
    mass: number;
    friction: number;
    restitution: number;
}