import { Color3, Mesh, Scalar, Scene, Texture, TransformNode, Vector2 } from "@babylonjs/core";

import { WaterMaterial } from 'babylonjs-materials';

export class Water {
    private _scene: Scene;
    private _waterMaterial: WaterMaterial;
    private _waterMesh: Mesh;

    private _nextUpdate: number = 0;
    private _targetWaveHeight: number = 0;
    private _targetWindForce: number = 0;
    private _targetWindDirection: Vector2 = new Vector2(1, 1);

    constructor(scene: Scene, skybox: TransformNode, width: number, height: number) {
        this._scene = scene;
        this._waterMesh = Mesh.CreateGround("waterMesh", width, height, 16, scene, false);

        const water = new WaterMaterial("water", this._scene, new Vector2(512, 512));
        // @ts-ignore
        water.backFaceCulling = true;
        water.bumpTexture = new Texture("https://assets.babylonjs.com/textures/waterbump.png", scene);
        water.windForce = -10;
        water.waveHeight = 1.7;
        water.bumpHeight = 0.1;
        water.windDirection = new Vector2(1, 1);
        water.waterColor = new Color3(0, 0, 221 / 255);
        water.colorBlendFactor = 0.0;
        water.addToRenderList(skybox);
        // @ts-ignore
        this._waterMesh.material = water;
        this._waterMesh.position.y = 8;

        this._waterMaterial = water;

        scene.onBeforeRenderObservable.add(() => {
            this.update(this._scene.getEngine().getDeltaTime());
        });
    }

    public update(deltaTime: number) {
        if (this._nextUpdate > 0) {
            const amount = deltaTime / 1000 / 60;

            this._waterMaterial.waveHeight = Scalar.Lerp(this._waterMaterial.waveHeight, this._targetWaveHeight, amount);
            this._waterMaterial.windForce = Scalar.Lerp(this._waterMaterial.windForce, this._targetWindForce, amount);
            this._waterMaterial.windDirection = Vector2.Lerp(this._waterMaterial.windDirection, this._targetWindDirection, amount);
           
            this._nextUpdate -= deltaTime;
            return;
        }

        this._nextUpdate = 60000;
        this._targetWaveHeight = this.random(0.5, 0.8);
        this._targetWindForce = this.random(-5, 5);
        this._targetWindDirection = new Vector2(this.random(-1, 1), this.random(-1, 1)).normalize();
    }

    private random(min: number, max: number) {
        return Math.random() * (max - min) + min;
    }
}