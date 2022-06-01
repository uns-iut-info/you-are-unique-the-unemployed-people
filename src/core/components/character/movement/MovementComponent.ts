import { Vector3 } from "@babylonjs/core";
import { BaseScene } from "../../../../scene/BaseScene";
import { GameObject } from "../../../GameObject";
import { CombatComponent } from "../../CombatComponent";
import { Component } from "../../Component";
import { EnemyCharacterComponent } from "../EnemyCharacterComponent";

export class MovementComponent extends Component {
    private _enemyCharacterComponent: EnemyCharacterComponent;

    private _combatComponent: CombatComponent;
    private _target: GameObject;
    private _path: Vector3[];

    private _pathUpdateDelay: number;

    private _patrolRadius: number = 0;
    private _patrolPath: Vector3[] = [];
    private _patrolNextPointTime: number = 0;

    public onInit(): void {
        super.onInit();

        this._target = null;

        this._path = [];
        this._pathUpdateDelay = 0;

        this._combatComponent = this.parent.getComponent(CombatComponent);
        this._enemyCharacterComponent = this.parent.getComponent(EnemyCharacterComponent);
    }

    public onFrameUpdate(): void {
        super.onFrameUpdate();

        if (this._target) {
            if (this._combatComponent.isTargetInAttackRange(this.parent.position, this._target)) {
                this._enemyCharacterComponent.move(Vector3.Zero());
                this._enemyCharacterComponent.calculateDirection(this._target.position.subtract(this.parent.position).normalize());

                this._path = [];
                this._pathUpdateDelay = 0;

                return;
            }
        }

        if (this._patrolRadius && this._target === null) {
            if (this._path.length === 0) {
                if (this._patrolNextPointTime > 0) {
                    this._patrolNextPointTime -= this.engine.getDeltaTime();
                    this._enemyCharacterComponent.move(Vector3.Zero());
                    return;
                }

                this._patrolPath.shift();
    
                if (this._patrolPath.length === 0) {
                    this._patrolPath = this.generatePatrolPath();
                }

                const pathPoint = this._patrolPath[0];

                if (pathPoint) {
                    console.log("patrol path point: ", this.parent.position.toString(), '->', pathPoint.toString());
                    this._path = (this.scene as BaseScene).navMeshService.findPath(this.parent.position, pathPoint) || [];
                }
            }

            const pathPoint = this._path[0];

            if (pathPoint) {
                const distance = pathPoint.subtract(this.parent.position);

                distance.y = 0;

                if (distance.lengthSquared() < 1) {
                    this._enemyCharacterComponent.move(Vector3.Zero());
                    this._path.shift();
                    this._patrolNextPointTime = this.random(5000, 7500);
                } else {
                    this._enemyCharacterComponent.move(distance.normalize());
                }

                return;
            }
        }

        if (this._target !== null) {
            if (this._pathUpdateDelay > 0) {
                this._pathUpdateDelay -= this.engine.getDeltaTime();
            }

            if (this.isPathValid()) {
                const pathPoint = this._path[0];
                const distance = pathPoint.subtract(this.parent.position);

                distance.y = 0;

                if (distance.lengthSquared() < 0.1 * 0.1) {
                    this._path.shift();
                } else {
                    this._enemyCharacterComponent.move(distance.normalize());
                }
            } else {
                if (this._pathUpdateDelay <= 0) {
                    this._path = [];
                    this.updatePath();
                }
            }
        } else {
            this._enemyCharacterComponent.move(Vector3.Zero());
        }
    }

    public onTargetChanged(target: GameObject): void {
        console.log("target changed: " + target?.name);
        this._target = target;

        if (!target) {
            this._path = [];
            this._pathUpdateDelay = 0;  
        }
    }

    private updatePath() {
        const closestAttackPosition = this.findAttackPosition(this._target);

        if (!closestAttackPosition.equals(this.parent.position)) {
            this._path = (this.scene as BaseScene).navMeshService.findPath(this.parent.position, closestAttackPosition) || [];
        }

        this._pathUpdateDelay = 64;
    }

    private findAttackPosition(target: GameObject): Vector3 {
        const currentPosition = this.parent.position;
        const targetPosition = target.position;

        if (this._combatComponent.isTargetInAttackRange(currentPosition, target)) {
            return currentPosition;
        }

        const attackRange = this._combatComponent.attackRange;
        const distance = targetPosition.subtract(currentPosition).length();
        const direction = targetPosition.subtract(currentPosition).normalize();
        const closestAttackPosition = currentPosition.add(direction.scale(distance - attackRange + 0.1));

        return closestAttackPosition;
    }

    private isPathValid(): boolean {
        if (this._path.length === 0) {
            return false;
        }

        const lastPoint = this._path[this._path.length - 1];
        const nextPoint = this._path[0];

        return this._combatComponent.isTargetInAttackRange(lastPoint, this._target) || nextPoint.subtract(this._target.position).lengthSquared() >= this.parent.position.subtract(nextPoint).lengthSquared() * 1.25;
    }

    public enablePatrol(radius: number): void {
        this._patrolRadius = radius;
    }

    private generatePatrolPath(): Vector3[] {
        const path: Vector3[] = [];
        const radius = this._patrolRadius;

        for (let i = 0; i < 6; i++) {
            const angle = (i + Math.random()) * Math.PI / 3;
            const point = this.parent.position.clone();

            point.x += radius * Math.cos(angle);
            point.z += radius * Math.sin(angle);
            point.y += 2;

            path.push(point);
        }

        return path;
    }

    private random(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}