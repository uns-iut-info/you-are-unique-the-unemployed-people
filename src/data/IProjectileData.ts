import { Texture } from "@babylonjs/core";

export interface IProjectileData {
    speed: number;
    destructDelay: number;
    hitOnPath: boolean;

    particleTexture: Texture;
}