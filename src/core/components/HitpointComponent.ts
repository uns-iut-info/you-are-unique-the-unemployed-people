import { Component } from "./Component";

export class HitpointComponent extends Component {
    private _hitpoints: number;
    private _maxHitpoints: number;
    private _team: Team;

    public onDamageTaken: (damage: number) => void;
    public onDeath: () => void;

    public causeDamage(damage: number): void {
        if (damage < 0) {
            this._hitpoints = Math.min(this._hitpoints + damage, this._maxHitpoints);
        } else {
            this._hitpoints = Math.max(this._hitpoints - damage, 0);

            if (this.onDamageTaken) {
                this.onDamageTaken(damage);
            }
        
            if (this._hitpoints <= 0) {
                if (this.onDeath) {
                    this.onDeath();
                }
            }
        }
    }

    public onFrameUpdate(): void {
        super.onFrameUpdate();
    }

    public get alive(): boolean {
        return this._hitpoints > 0;
    }

    public get hitpoints(): number {
        return this._hitpoints;
    }

    public get maxHitpoints(): number {
        return this._maxHitpoints;
    }

    public get team(): Team {
        return this._team;
    }

    public setProperties(hitpoints: number, team: Team): void {
        this._hitpoints = hitpoints;
        this._maxHitpoints = hitpoints;
        this._team = team;
    }
}

export enum Team {
    Player,
    Enemy
}