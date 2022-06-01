import { Engine, Observer, Scene } from "@babylonjs/core";
import { GameObject } from "../GameObject";

export abstract class Component {
    private _parent: GameObject;
    private _enabled: boolean;
    private _initialized: boolean;

    private _frameUpdateObserver: Observer<Scene> = null;
    private _frameUpdatedObserver: Observer<Scene> = null;
    private _physicsUpdateObserver: Observer<Scene> = null;
    private _physicsUpdatedObserver: Observer<Scene> = null;
    
    public init(): void {
        if (this._initialized) {
            return;
        }
        this._initialized = true;
        this._enabled = true;
        this.onInit();

        if (this._enabled) {
            this._enabled = false;
            this.enabled = true;
        }
    };

    public onInit(): void {}

    public onEnable(): void {}
    public onDisable(): void {}
    
    public onFrameUpdate(): void {}
    public onFrameUpdated(): void {}

    public onPhysicsUpdate(): void {}
    public onPhysicsUpdated(): void {}

    public onDestroy(): void {
        if (this._frameUpdateObserver) {
            this.scene.onBeforeDrawPhaseObservable.remove(this._frameUpdateObserver);
            this._frameUpdateObserver = null;
        }
        if (this._frameUpdatedObserver) {
            this.scene.onAfterDrawPhaseObservable.remove(this._frameUpdatedObserver);
            this._frameUpdatedObserver = null;
        }
        if (this._physicsUpdateObserver) {
            this.scene.onBeforePhysicsObservable.remove(this._physicsUpdateObserver);
            this._physicsUpdateObserver = null;
        }
        if (this._physicsUpdatedObserver) {
            this.scene.onAfterPhysicsObservable.remove(this._physicsUpdatedObserver);
            this._physicsUpdatedObserver = null;
        }
    };

    public get parent(): GameObject {
        return this._parent;
    }

    public set parent(value: GameObject) {
        if (this._parent) {
            throw new Error("Component already has a parent");
        }
        this._parent = value;
    }

    public get initialized() {
        return this._initialized;
    }

    public get enabled(): boolean {
        return this._enabled;
    }

    public set enabled(value: boolean) {
        if (this._enabled === value) {
            return;
        }

        this._enabled = value;

        if (this._enabled) {
            if (this.onFrameUpdate !== Component.prototype.onFrameUpdate) {
                this._frameUpdateObserver = this.scene.onBeforeDrawPhaseObservable.add(this.onFrameUpdate.bind(this));
            }
            if (this.onFrameUpdated !== Component.prototype.onFrameUpdated) {
                this._frameUpdatedObserver = this.scene.onAfterDrawPhaseObservable.add(this.onFrameUpdated.bind(this));
            }
            if (this.onPhysicsUpdate !== Component.prototype.onPhysicsUpdate) {
                this._physicsUpdateObserver = this.scene.onBeforePhysicsObservable.add(this.onPhysicsUpdate.bind(this));
            }
            if (this.onPhysicsUpdated !== Component.prototype.onPhysicsUpdated) {
                this._physicsUpdatedObserver = this.scene.onAfterPhysicsObservable.add(this.onPhysicsUpdated.bind(this));
            }
            this.onEnable();
        }
        else {
            if (this._frameUpdateObserver) {
                this.scene.onBeforeDrawPhaseObservable.remove(this._frameUpdateObserver);
                this._frameUpdateObserver = null;
            }
            if (this._frameUpdatedObserver) {
                this.scene.onAfterDrawPhaseObservable.remove(this._frameUpdatedObserver);
                this._frameUpdatedObserver = null;
            }
            if (this._physicsUpdateObserver) {
                this.scene.onBeforePhysicsObservable.remove(this._physicsUpdateObserver);
                this._physicsUpdateObserver = null;
            }
            if (this._physicsUpdatedObserver) {
                this.scene.onAfterPhysicsObservable.remove(this._physicsUpdatedObserver);
                this._physicsUpdatedObserver = null;
            }
            this.onDisable();
        }
    }

    public get scene(): Scene {
        return this.parent.getScene();
    }

    public get engine(): Engine {
        return this.parent.getEngine();
    }
}

export interface ISerializableComponent {
    serialize(): any;
    deserialize(serializedData: any): void;
}