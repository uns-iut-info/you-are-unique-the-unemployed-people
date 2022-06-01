import { Engine, Scene } from "@babylonjs/core";
import { App } from "../app";
import { BaseScene } from "./BaseScene";

export class SceneManager {
    public static async load<T extends BaseScene>(sceneClass: { new(engine: Engine): T}): Promise<T> {
        const currentScene = App.getScene();

        if (currentScene) {
            currentScene.dispose();
        }

        const scene = new sceneClass(App.getEngine());

        App.setScene(scene);

        await scene.init();
        await scene.setupRender();

        return scene;
    }

    public static async loadWithArgs<T extends BaseScene>(sceneClass: { new(engine: Engine, ...args): T}, ...args): Promise<T> {
        const currentScene = App.getScene();

        if (currentScene) {
            currentScene.dispose();
        }

        const scene = new sceneClass(App.getEngine(), ...args);

        App.setScene(scene);

        await scene.init();
        await scene.setupRender();

        return scene;
    }
}