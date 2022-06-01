import { Color3, Color4, Vector3 } from "@babylonjs/core";

export interface IEffectData {

}

export class ImageEffectData implements IEffectData {
    offset: Vector3;
    rotation: Vector3;
    texture: string;
    width: number;
    height: number;
    color1: Color3;
    color2: Color3;
    endColor: Color3;
    colorTime: number;
    lifetime: number;
    endLifetime: number;
    trackOwner?: boolean;
    
    constructor(offset: Vector3, rotation: Vector3, texture: string, width: number, height: number, color1: Color3, color2: Color3, endColor: Color3, colorTime: number, lifetime: number, endLifetime: number, trackOwner?: boolean) {
        this.offset = offset;
        this.rotation = rotation;
        this.texture = texture;
        this.width = width;
        this.height = height;
        this.color1 = color1;
        this.color2 = color2;
        this.endColor = endColor;
        this.colorTime = colorTime;
        this.lifetime = lifetime;
        this.endLifetime = endLifetime;
        this.trackOwner = trackOwner;
    }
}

export class SoundEffectData implements IEffectData {
    name: string;
    volume: number;

    constructor(name: string, volume: number) {
        this.name = name;
        this.volume = volume;
    }
}