import { SceneType } from "../scene/SceneType";

export interface IMissionData {
    scene: SceneType;
    next?: string;
}

export class TextMissionData implements IMissionData {
    public scene: SceneType;
    public text: string;
    public duration: number;
    public next?: string;

    constructor(scene: SceneType, text: string, duration: number, next?: string) {
        this.scene = scene;
        this.text = text;
        this.duration = duration;
        this.next = next;
    }
}

export class GoToAnchorPointMissionData implements IMissionData {
    public scene: SceneType;
    public name: string;
    public displayName: string;
    public next?: string;

    constructor(scene: SceneType, name: string, displayName: string, next?: string) {
        this.scene = scene;
        this.name = name;
        this.displayName = displayName;
        this.next = next;
    }
}

export class KillMonsterMissionData implements IMissionData {
    public scene: SceneType;
    public name: string;
    public displayName: string;
    public next?: string;

    constructor(scene: SceneType, name: string, displayName: string, next?: string) {
        this.scene = scene;
        this.name = name;
        this.displayName = displayName;
        this.next = next;
    }
}

export class TransitionMissionData implements IMissionData {
    public scene: SceneType;
    public displayName: string;
    public next?: string;

    constructor(scene: SceneType, displayName: string, next?: string) {
        this.scene = scene;
        this.displayName = displayName;
        this.next = next;
    }
}