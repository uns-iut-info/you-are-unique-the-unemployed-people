import { Vector3 } from "@babylonjs/core";
import { ICharacterData } from "../../../data/ICharacterData";
import { BaseScene } from "../../../scene/BaseScene";
import { Globals } from "../../../scene/Globals";
import { GameObject } from "../../GameObject";
import { HitpointComponent } from "../HitpointComponent";
import { BaseCharacterComponent } from "./BaseCharacterComponent";
import { MovementComponent } from "./movement/MovementComponent";

export class EnemyCharacterComponent extends BaseCharacterComponent {
    private _target: GameObject;
    private _targetFarAwayTime: number;

    private _movementComponent: MovementComponent;

    public onInit(): void {
        super.onInit();

        this._movementComponent = this.parent.findComponent(MovementComponent);
    }

    public onFrameUpdate(): void {
        super.onFrameUpdate();
        this.refreshTarget();

        if (!this._hitpointComponent.alive) {
            this._movementComponent.enabled = false;
            return;
        }

        if (this._target && this._combatComponent.canAttack() && this._combatComponent.isTargetInAttackRange(this.parent.position, this._target)) {
            this._combatComponent.attack(this._target.center.subtract(this.parent.center).normalize());
        }
    }

    private refreshTarget(): void {
        if (this._target) {
            const hitpointComponent = this._target.getComponent(HitpointComponent);

            if (!hitpointComponent.alive) {
                this._target = null;
                this._movementComponent.onTargetChanged(null);
            }

            if (this.calculateTargetCost(this._target) === Number.MAX_VALUE) {
                this._targetFarAwayTime += this.scene.getEngine().getDeltaTime();

                if (this._targetFarAwayTime > Globals.ENEMY_FAR_AWAY_RETARGET_TIME) {
                    this._targetFarAwayTime = 0;
                    this._target = null;
                    this._movementComponent.onTargetChanged(null);
                }
            }
        }

        if (!this._target) {
            this._target = this.searchTarget();

            if (this._target) {
                this.onNewTargetFound(this._target);
            }
        }
    }

    private searchTarget(): GameObject {
        const enemies = (this.scene as BaseScene).getEnemies(this._hitpointComponent.team);

        let bestTarget: GameObject = null;
        let bestTargetCost = Number.MAX_VALUE;

        for (const enemy of enemies) {
            const hitpointComponent = enemy.getComponent(HitpointComponent);

            if (hitpointComponent.alive) {
                const cost = this.calculateTargetCost(enemy);

                if (cost != Number.MAX_VALUE && cost < bestTargetCost) {
                    bestTarget = enemy;
                    bestTargetCost = cost;
                }
            }
        }

        return bestTarget;
    }

    private onNewTargetFound(target: GameObject): void {
        this._target = target;
        this._targetFarAwayTime = 0;

        console.log(`New target found: ${this._target.name}`);

        if (this._movementComponent) {
            this._movementComponent.onTargetChanged(this._target);
        }
    }

    private calculateTargetCost(target: GameObject): number {
        const distance = this.parent.position.subtract(target.position).lengthSquared();
        const alertRange = this._combatComponent.alertRange;

        if (distance > alertRange * alertRange) {
            return Number.MAX_VALUE;
        }

        const hitpoints = target.getComponent(HitpointComponent).hitpoints;
        const cost = Math.floor(distance + hitpoints / 100);

        return cost;
    }

    public setProperties(data: ICharacterData): void {
        super.setProperties(data);
    }
}