import { IAnimationData } from "./IAnimationData";
import { ICombatItemData } from "./ICombatItemData";
import { IMeshData } from "./IMeshData";
import { IRigidbodyData } from "./IRigidbodyData";

export interface ICharacterData {
    displayName: string;
    
    speed: number;
    jumpSpeed: number;

    hp: number;

    idleAnimation: IAnimationData;
    jumpAnimation: IAnimationData;
    walkAnimation: IAnimationData;
    dieAnimation: IAnimationData;

    combat: ICombatItemData;
    mesh: IMeshData;
    rigidbody: IRigidbodyData;
}