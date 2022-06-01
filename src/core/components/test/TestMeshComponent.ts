import { SceneLoader, Vector3 } from "@babylonjs/core";
import { Component } from "../Component";
import { MeshComponent } from "../MeshComponent";

export class TestMeshComponent extends Component {
    private _meshComponent: MeshComponent;
    private _time: number = 0;

    public onInit(): void {
        this._meshComponent = this.parent.getComponent(MeshComponent);

        if (!this._meshComponent) {
            throw new Error("MeshComponent is required for TestMeshComponent");
        }

        this.enabled = false;
        this._meshComponent.enabled = false;

        SceneLoader.ImportMeshAsync(null, "./obj/", "lola.glb").then(
            (result) => {
                this.enabled = true;
                this._meshComponent.enabled = true;
                this._meshComponent.mesh = result.meshes[0];
            }
        );
    }

    public onFrameUpdate(): void {
        this._time += this.engine.getDeltaTime() / 1000;
        this.parent.position = new Vector3(Math.sin(this._time * 4) * 1, Math.cos(this._time * 4) * 1, 0).subtract(new Vector3(2, 0.5, -1));
    }

    public onFrameUpdated(): void {

    }

    public onDestroy(): void {

    }
}