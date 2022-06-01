import { Vector3 } from "@babylonjs/core";
import { IAnimationData } from "./IAnimationData";
import { IEffectData } from "./IEffectData";
import { IProjectileData } from "./IProjectileData";

export interface ICombatItemData {
    attackRadius: number;
    alertRadius: number;

    damage: number;
    damageRadius: number;

    criticalChance: number;
    criticalDamagePercentage: number;

    projectile?: IProjectileData;
    projectileTrackTarget?: boolean;
    projectileSpawnRandomStartOffset?: Vector3;
    projectileSpawnRandomEndOffset?: Vector3;
    projectileInitDelay?: number;

    attackCooldown: number;
    attackCooldownVariance: number;
    attackFreezeCooldown: number;

    hitLoadingTime: number;
    hitBurstCount: number;
    hitBurstDelay: number;

    attackEffects?: IEffectData[];

    attackAnimation: IAnimationData;
    hitAnimations: IAnimationData[];
} 