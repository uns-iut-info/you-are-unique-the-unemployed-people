import { Vector3 } from "@babylonjs/core";

export class AnchorPoint {
    private _position: Vector3;
    private _rotation: Vector3;

    private _portalAttribute: AnchorPortalAttribute;

    constructor(position: Vector3, rotation: Vector3, portal?: AnchorPortalAttribute) {
        this._position = position;
        this._rotation = rotation;
        this._portalAttribute = portal;
    }

    get position(): Vector3 {
        return this._position;
    }

    get rotation(): Vector3 {
        return this._rotation;
    }

    get portalAttribute(): AnchorPortalAttribute {
        return this._portalAttribute;
    }
}

export class AnchorPortalAttribute {
    private _isDungeon: boolean;
    private _file: string;
    private _inputRadius: number;

    constructor(isDungeon: boolean, file: string, inputRadius: number) {
        this._isDungeon = isDungeon;
        this._file = file;
        this._inputRadius = inputRadius;
    }

    get isDungeon(): boolean {
        return this._isDungeon;
    }

    get file(): string {
        return this._file;
    }

    get inputRadius(): number {
        return this._inputRadius;
    }
}