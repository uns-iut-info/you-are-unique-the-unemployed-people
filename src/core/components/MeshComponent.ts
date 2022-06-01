import { AbstractMesh, MeshBuilder, SceneLoader, Vector3 } from "@babylonjs/core";
import { IMeshData } from "../../data/IMeshData";
import { AnimationComponent } from "./AnimationComponent";
import { Component } from "./Component";

export class MeshComponent extends Component {
    private _data: IMeshData;
    private _mesh: AbstractMesh;

    public onInit(): void {
        this.setProperties(this._data);
    }

    public onDestroy(): void {
        super.onDestroy();
        this._destroyMesh();
    }

    public get mesh(): AbstractMesh {
        return this._mesh;
    }

    public set mesh(value: AbstractMesh) {
        if (this._mesh === value) {
            return;
        }

        this._destroyMesh();

        this._mesh = value;
        this._mesh.parent = this.parent;
        this._mesh.position = this._data.offset.clone();
        this._mesh.scaling = this._data.size.clone();
        this._mesh.rotation = Vector3.Zero();

        this._mesh.scaling.z *= -1;
    }

    public get enabled(): boolean {
        return super.enabled;
    }
    public set enabled(value: boolean) {
        super.enabled = value;

        if (this._mesh) {
            this._mesh.setEnabled(value);
        }
    }

    private _destroyMesh() {
        if (this._mesh) {
            this._mesh.parent = null;
            this._mesh.dispose();
        }
    }

    public setProperties(data: IMeshData) {
        this._data = data;
        
        if (this.initialized) {
            SceneLoader.ImportMeshAsync(null, "./obj/", this._data.model).then((result) => {
                const root = result.meshes[0];
        
                this.mesh = root;

                //dirty
                result.animationGroups.forEach((animationGroup) => {
                    animationGroup.targetedAnimations.forEach((animation) => {
                    animation.animation.enableBlending = true;
                    animation.animation.blendingSpeed = 0.2;
                    });
                });

                const animationComponent = this.parent.findComponent(AnimationComponent);

                if (animationComponent) {
                    animationComponent.setGroups(result.animationGroups);
                }
            });
        }
    }
}