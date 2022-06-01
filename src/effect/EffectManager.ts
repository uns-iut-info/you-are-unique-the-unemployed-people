import { AbstractMesh, Color3, Color4, Material, MeshBuilder, Scalar, Scene, StandardMaterial, Texture, Vector3 } from "@babylonjs/core";
import { GameObject } from "../core/GameObject";
import { IEffectData, ImageEffectData, SoundEffectData } from "../data/IEffectData";
import { BaseScene } from "../scene/BaseScene";

export class EffectManager {
    private readonly _effects: Array<Effect>;
    private readonly _scene: BaseScene;

    public constructor(scene: BaseScene) {
        this._effects = [];
        this._scene = scene;

        this._scene.onBeforeDrawPhaseObservable.add(() => {
            const deltaTime = this._scene.getEngine().getDeltaTime();

            this._effects.forEach((effect) => {
                effect.update(deltaTime);
            });
        });

        this._scene.onAfterDrawPhaseObservable.add(() => {
            for (let i = 0; i < this._effects.length; i++) {
                const effect = this._effects[i];

                if (effect.shouldDestroy) {
                    effect.destroy();
                    this._effects.splice(i, 1);
                    i--;
                }
            }
        });
    }

    public createEffect(data: IEffectData, owner: GameObject) {
        if (data instanceof ImageEffectData) {
            this._createImageEffect(data, owner);
        } else if (data instanceof SoundEffectData) {
            this._createSoundEffect(data, owner);
        }
    }

    private _createImageEffect(data: ImageEffectData, owner: GameObject) {
        const effect = new ImageEffect(data, owner, this._scene);
        this._effects.push(effect);
    }

    private _createSoundEffect(data: SoundEffectData, owner: GameObject) {
        this._scene.soundManager.playSound(data.name, data.volume);
    }
}

export class Effect {
    protected _owner: GameObject;

    public constructor(data: IEffectData, owner: GameObject, scene: Scene) {
        this._owner = owner;
    }

    public update(deltaTime: number) {
    }

    public destroy() {
    }

    public get shouldDestroy(): boolean {
        return false;
    }
}

export class ImageEffect extends Effect {
    private _data: ImageEffectData;
    private _mesh: AbstractMesh;
    private _material: StandardMaterial;

    private _lifeTime: number;

    public constructor(data: ImageEffectData, owner: GameObject, scene: Scene) {
        super(data, owner, scene);

        this._data = data;
        this._mesh = MeshBuilder.CreatePlane(
            "imageEffect",
            {
                width: data.width,
                height: data.height,
            },
            scene
        );
        
        if (data.trackOwner) {
            this._mesh.parent = owner;
            this._mesh.position = data.offset.clone();
            this._mesh.rotation = data.rotation.clone();
        } else {
            this._mesh.position = owner.position.add(data.offset);
            this._mesh.rotation = owner.rotation.add(data.rotation);
        }

        const material = new StandardMaterial("imageEffectMaterial", scene);

        material.diffuseTexture = new Texture(data.texture, scene);
        material.diffuseTexture.hasAlpha = true;
        material.backFaceCulling = false;

        this._material = material;
        this._mesh.material = material;

        this._mesh.isVisible = true;

        this._lifeTime = 0;
    }

    public update(deltaTime: number) {
        super.update(deltaTime);
        this._lifeTime += deltaTime;

        if (this._lifeTime >= this._data.lifetime) {
            if (this._lifeTime >= this._data.endLifetime) {
                this._material.diffuseColor = this._data.endColor;
            } else {
                const start = this._data.color2;
                const end = this._data.endColor;
                const amount = (this._lifeTime - this._data.lifetime) / (this._data.endLifetime - this._data.lifetime);

                this._material.diffuseColor = Color3.Lerp(start, end, amount);
            }
        } else {
            const start = this._data.color1;
            const end = this._data.color2;
            const amount = Math.min(this._lifeTime / this._data.colorTime, 1);

            this._material.diffuseColor = Color3.Lerp(start, end, amount);
        }
    }

    public destroy() {
        super.destroy();
        this._mesh.dispose();
    }

    public get shouldDestroy(): boolean {
        return this._lifeTime >= this._data.lifetime * 2;
    }
}