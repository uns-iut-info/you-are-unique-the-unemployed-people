import { Color4, IParticleSystem, ParticleHelper, ParticleSystem, Scalar, Vector3 } from "@babylonjs/core";
import { IProjectileData } from "../../../data/IProjectileData";
import { BaseScene } from "../../../scene/BaseScene";
import { GameObject } from "../../GameObject";
import { Component } from "../Component";
import { HitpointComponent, Team } from "../HitpointComponent";

export class ProjectileComponent extends Component {
    private _caster: GameObject;
    private _data: IProjectileData;

    private _damage: number;
    private _damageRadius: number;

    private _target: GameObject;
    private _targetPosition: Vector3;
    private _targetReached: boolean;

    private _initDelay: number;

    private _team: Team;

    private _destructDelay: number;
    private _particleSystem: IParticleSystem;

    public onInit(): void {
        this._team = this._caster.getComponent(HitpointComponent).team;
        this._destructDelay = Number.MAX_VALUE;

        this.setProperties(this._data, this._caster);

        this.parent.checkCollisions = true;
    }

    public onFrameUpdate(): void {
        if (!this._particleSystem) {
            this._particleSystem = ParticleHelper.CreateDefault(this.parent, 256, this.scene, true);
            this._particleSystem.createSphereEmitter(0.2, 1);

            // this._particleSystem.particleTexture = this._data.particleTexture;
            this._particleSystem.color1 = Color4.FromHexString("#fC7B09FF");
            this._particleSystem.color2 = Color4.FromHexString("#FC4E03FF");
            this._particleSystem.colorDead = new Color4(0, 0, 0, 1.0);

            this._particleSystem.emitRate = 4;
            this._particleSystem.updateSpeed = 1;
            this._particleSystem.minLifeTime = 1;
            this._particleSystem.maxLifeTime = 1.2;
            this._particleSystem.minSize = 0.2;
            this._particleSystem.maxSize = 0.25;
            this._particleSystem.minEmitPower = 0.1;
            this._particleSystem.maxEmitPower = 0.15;
            this._particleSystem.disposeOnStop = true;
            this._particleSystem.start();
        }


        if (this._initDelay > 0) {
            this._initDelay -= this.engine.getDeltaTime();

            if (this._initDelay > 0) {
                return;
            }
        }

        if (this._targetReached) {
            this._destructDelay -= this.engine.getDeltaTime();

            if (this._destructDelay <= 0) {
                this.parent.disposeOnNextFrame();
            }
        } else {
            this.updateTargetPosition();
            this.moveToTarget();
        }
    }

    private moveToTarget(): void {
        const targetPosition = this._targetPosition;
        const distanceSquared = this.getDistanceSquaredTo(targetPosition);
        const speed = this._data.speed * this.engine.getDeltaTime() / 1000;

        if (distanceSquared > speed) {
            const direction = targetPosition.subtract(this.parent.position).normalize();
            this.parent.position.addInPlace(direction.scale(speed));

            if (this._data.hitOnPath && this.applyDamageInRadius()) {
                this.onHit();
            }
        } else {
            this.parent.position = targetPosition.clone();
            this.applyDamageInRadius();
            this.onHit();
        }
    }

    private updateTargetPosition(): void {
        if (this._target) {
            const originalTargetPositionY = this._targetPosition.y;
            this._targetPosition = Vector3.Lerp(this._targetPosition, this._target.center, 1 * this.engine.getDeltaTime() / 1000);
            this._targetPosition.y = Math.min(originalTargetPositionY, this._targetPosition.y);
        }
    }

    private onHit() {
        // TODO: Play hit/dispose animation
        this._destructDelay = this._data.destructDelay;
        this._targetReached = true;

        this._particleSystem.stop();
    }

    private collidesWithGround(): boolean {
        return this.parent.position.y < 0.25;
    }

    private applyDamageInRadius(): number {
        const enemies = (this.scene as BaseScene).getEnemies(this._team);
        let totalHits = 0;

        /*for (const enemy of enemies) {
            const hitpointComponent = enemy.getComponent(HitpointComponent);

            if (hitpointComponent.hitpoints > 0) {
                const distanceSquared = this.getDistanceSquaredTo(enemy.position);

                if (distanceSquared <= this._damageRadius) {
                    this.applyDamage(enemy);
                    totalHits++;
                }
            }
        }*/

        for (const enemy of enemies) {
            const hitpointComponent = enemy.getComponent(HitpointComponent);

            if (hitpointComponent.alive) {
                if (this.parent.intersectsMesh(enemy, false)) {
                    this.applyDamage(enemy);
                    totalHits++;
                }
            }
        }

        if (this.collidesWithGround()) {
            totalHits++;
        }

        return totalHits;
    }

    private applyDamage(target: GameObject): void {
        console.log('Apply', this._damage, 'damage to', target.name);
        target.getComponent(HitpointComponent).causeDamage(this._damage);
    }

    public setDamage(damage: number, radius: number): void {
        this._damage = damage;
        this._damageRadius = radius;
    }

    public setTarget(targetOrPosition: GameObject | Vector3): void {
        if (targetOrPosition instanceof GameObject) {
            this._target = targetOrPosition;
            this._targetPosition = this._target.position;
        } else {
            this._target = null;
            this._targetPosition = targetOrPosition;
        }

        this.parent.rotation = this.getRotationTo(this._targetPosition);
    }

    public setInitDelay(delay?: number): void {
        this._initDelay = delay || 0;
    }

    public setProperties(data: IProjectileData, caster: GameObject): void {
        this._data = data;
        this._caster = caster;
    }

    private getDistanceSquaredTo(targetPosition: Vector3): number {
        return this.parent.position.subtract(targetPosition).length();
    }

    private getRotationTo(targetPosition: Vector3): Vector3 {
        const direction = targetPosition.subtract(this.parent.position).normalize();

        return new Vector3(0, Math.atan2(direction.z, direction.x), 0);
    }
}