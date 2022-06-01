import { Vector3 } from "@babylonjs/core";
import { ICombatItemData } from "../../data/ICombatItemData";
import { BaseScene } from "../../scene/BaseScene";
import { GameObject } from "../GameObject";
import { Projectile } from "../Projectile";
import { AnimationComponent } from "./AnimationComponent";
import { Component } from "./Component";
import { HitpointComponent } from "./HitpointComponent";
import { ProjectileComponent } from "./projectile/ProjectileComponent";

export class CombatComponent extends Component {
    private _data: ICombatItemData;

    private _hitpointComponent: HitpointComponent;
    private _animationComponent?: AnimationComponent;

    private _hitCounter: number;
    private _attackCooldown: number;

    private _attackDirection: Vector3;
    private _attackFreezeCooldown: number;
    private _hitLoadTime: number;
    private _hitBurstCooldown: number;
    private _hitBurstCount: number;

    public onInit(): void {
        this._hitCounter = 0;
        this._attackCooldown = 0;
        this._attackDirection = null;
        this._hitLoadTime = 0;
        this._hitBurstCooldown = 0;
        this._hitBurstCount = 0;

        this._hitpointComponent = this.parent.getComponent(HitpointComponent);
        this._animationComponent = this.parent.findComponent(AnimationComponent);

        if (this._data) {
            this.setProperties(this._data);
        }
    }

    public onFrameUpdate(): void {
        if (this._attackCooldown > 0) {
            this._attackCooldown -= this.engine.getDeltaTime();
        }

        if (this._attackFreezeCooldown > 0) {
            this._attackFreezeCooldown -= this.engine.getDeltaTime();
        }

        if (this._attackDirection) {
            if (this._hitLoadTime >= this._data.hitLoadingTime) {
                this._hitBurstCooldown -= this.engine.getDeltaTime();

                if (this._hitBurstCooldown <= 0) {
                    this.hit();

                    if (this._data.hitAnimations.length) {
                        this._animationComponent?.play(this._data.hitAnimations[this._hitBurstCount]);
                    }

                    this._hitBurstCount++;

                    if (this._hitBurstCount >= this._data.hitBurstCount) {
                        this._attackCooldown = this._data.attackCooldown + this.random(0, this._data.attackCooldownVariance);
                        this._attackDirection = null;
                        this._hitLoadTime = 0;
                        this._hitBurstCount = 0;
                        this._hitBurstCooldown = 0;
                    } else {
                        this._hitBurstCooldown += this._data.hitBurstDelay;
                    }
                }
            } else {
                this._hitLoadTime += this.engine.getDeltaTime();
            }
        }
    }

    public canAttack(): boolean {
        return this._attackCooldown <= 0 && this._attackDirection === null;
    }

    public isAttacking(): boolean {
        return this._attackDirection !== null || this._attackCooldown > 0;
    }

    public attack(direction: Vector3): void {
        console.log(`${this.parent.name} is attacking in direction ${direction.toString()}`);
        this._attackDirection = direction;
        this._hitLoadTime = 0;
        this._hitBurstCount = 0;
        this._hitBurstCooldown = 0;

        if (this._data.attackAnimation) {
            this._animationComponent?.play(this._data.attackAnimation);
        }

        if (this._data.attackEffects) {
            const effectManager = (this.scene as BaseScene).effectManager;

            for (const effect of this._data.attackEffects) {
                effectManager.createEffect(effect, this.parent);
            }
        }
    }

    public hit(): void {
        this._hitCounter++;

        const damage = this.calculateHitDamage();

        console.log(`${this.parent.name} hit ${this._attackDirection.toString()} for ${damage} damage`);

        if (this._data.projectile) {
            const projectile = new Projectile('projectile_' + this._hitCounter, this.scene, this.parent, this._data.projectile);
            const component = projectile.getComponent(ProjectileComponent);

            if (this._data.projectileSpawnRandomStartOffset && this._data.projectileSpawnRandomEndOffset) {
                const randomOffset = new Vector3(
                    this.randomFloat(this._data.projectileSpawnRandomStartOffset.x, this._data.projectileSpawnRandomEndOffset.x),
                    this.randomFloat(this._data.projectileSpawnRandomStartOffset.y, this._data.projectileSpawnRandomEndOffset.y),
                    this.randomFloat(this._data.projectileSpawnRandomStartOffset.z, this._data.projectileSpawnRandomEndOffset.z)
                );

                component.parent.position = this.parent.position.add(randomOffset);
            } else {
                component.parent.position = this.parent.position.clone();
            }

            let targetOrPosition: GameObject | Vector3 = this._attackDirection.scale(this.attackRange).add(this.parent.center);

            if (this._data.projectileTrackTarget === true) {
                const enemy = this.findClosestEnemy(this.attackRange * 2);

                if (enemy) {
                    targetOrPosition = enemy;
                }
            } 

            component.setTarget(targetOrPosition);
            component.setDamage(damage, this._data.damageRadius);
            component.setInitDelay(this._data.projectileInitDelay);
        } else {
            throw new Error('CombatComponent: Direct damage is not implemented yet.');
        }
    }

    private calculateHitDamage(): number {
        const baseDamage = this._data.damage;
        const criticalChance = this._data.criticalChance;
        const isCrital = criticalChance > 0 && this.random(0, 100) <= criticalChance;
    
        return Math.floor(isCrital ? baseDamage + baseDamage * this._data.criticalDamagePercentage / 100 : baseDamage);
    }

    private random(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    private randomFloat(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

    public setProperties(data: ICombatItemData): void {
        this._data = data;
    }

    public get attackRange(): number {
        return this._data.attackRadius;
    }

    public get alertRange(): number {
        return this._data.alertRadius;
    }
    
    public findClosestEnemy(radius: number): GameObject {
        const radiusSquared = radius * radius;
        const enemies = (this.scene as BaseScene).getEnemies(this._hitpointComponent.team);

        let closestEnemy: GameObject = null;
        let closestDistanceSquared = radiusSquared;

        for (const enemy of enemies) {
            const distanceSquared = Vector3.DistanceSquared(this.parent.position, enemy.position);

            console.log(`${this.parent.name} distance to ${enemy.name} is ${distanceSquared}`);

            if (distanceSquared < closestDistanceSquared && enemy.getComponent(HitpointComponent).alive) {
                closestEnemy = enemy;
                closestDistanceSquared = distanceSquared;
            }
        }

        return closestEnemy;
    }

    public isTargetInAttackRange(position: Vector3, target: GameObject): boolean {
        const targetPosition = target.position;
        const distance = position.subtract(targetPosition);

        return Math.abs(distance.x) <= this.attackRange &&
            Math.abs(distance.y) <= this.attackRange &&
            Math.abs(distance.z) <= this.attackRange &&
            distance.lengthSquared() <= this.attackRange * this.attackRange;
    }
}