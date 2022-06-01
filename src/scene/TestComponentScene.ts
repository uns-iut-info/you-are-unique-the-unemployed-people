import { FlyCamera, HemisphericLight, Vector3 } from "@babylonjs/core";
import { MeshComponent } from "../core/components/MeshComponent";
import { RigidbodyComponent } from "../core/components/RigidbodyComponent";
import { TestMeshComponent } from "../core/components/test/TestMeshComponent";
import { TestRigidbodyComponent } from "../core/components/test/TestRigidbodyComponent";
import { GameObject } from "../core/GameObject";
import { BaseScene } from "./BaseScene";
import { SceneType } from "./SceneType";

export class TestComponentScene extends BaseScene {
    constructor(engine: any) {
        super(engine);
    }

    public async init(): Promise<void> {
        await super.init();

        const testGameObject1 = new GameObject("testGameObject1", this);
        testGameObject1.addComponent(MeshComponent);
        testGameObject1.addComponent(TestMeshComponent);
        testGameObject1.position.set(0, 0, 0);

        const testGameObject2 = new GameObject("testGameObject2", this);
        testGameObject2.addComponent(MeshComponent);
        testGameObject2.addComponent(RigidbodyComponent);
        testGameObject2.addComponent(TestRigidbodyComponent);
        testGameObject2.position.set(1, 0, 1);


        const camera = new FlyCamera("camera", new Vector3(0, 0, -5), this);
        camera.setTarget(new Vector3(0, 0, 0));

        const light = new HemisphericLight("light", new Vector3(0, 1, 0), this);

        console.log("WorldScene.init()");
    }

    public get sceneType(): SceneType {
        return SceneType.World;
    }
}