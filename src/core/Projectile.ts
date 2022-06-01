import { Vector3 } from "@babylonjs/core";
import { IProjectileData } from "../data/IProjectileData";
import { ProjectileComponent } from "./components/projectile/ProjectileComponent";
import { GameObject } from "./GameObject";

export class Projectile extends GameObject {
    constructor(name: string, scene: any, caster: GameObject, data: IProjectileData) {
        super(name, scene);
        
        const projectileComponent = this.addComponent(ProjectileComponent);
        projectileComponent.setProperties(data, caster);
    }
}