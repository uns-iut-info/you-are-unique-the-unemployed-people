import { Color3, ICrowd, Mesh, RecastJSPlugin, StandardMaterial, Vector3 } from "@babylonjs/core";
import { NavMeshComponent } from "../core/components/NavMeshComponent";
import { BaseScene } from "../scene/BaseScene";
import { NavMeshWorker } from "./NavMeshWorker";

export class NavMeshService {
    private _navigationPlugin: RecastJSPlugin;
    private _scene: BaseScene;

    private _ready: boolean;

    private _crowd: ICrowd;
    private _debug: boolean = false;

    private _readyCallback: () => void;

    constructor(scene: BaseScene) {
        this._scene = scene;

        this._navigationPlugin = new RecastJSPlugin();
        this._navigationPlugin.setWorkerURL(NavMeshWorker.getUrl());

        const allMeshes = this._scene.meshes.filter(
            (m) => m.metadata != null && m.metadata.role === "decoration"
        ) as Mesh[];

        this._navigationPlugin.createNavMesh(
            allMeshes,
            NavMeshService.getNavMeshParams(),
            (navmeshData) => {
                console.log("got worker data", navmeshData);
                this._navigationPlugin.buildFromNavmeshData(navmeshData);
                this.createDebugMaterial();

                this._crowd = this._navigationPlugin.createCrowd(10, 0.1, this._scene);
                this._ready = true;

                if (this._readyCallback) {
                    this._readyCallback();
                }
            }
        );
    }

    public waitForReady(): Promise<void> {
        if (this._ready) {
            return Promise.resolve();
        }

        return new Promise((resolve) => {
            if (this._ready) {
                resolve();
            } else {
                this._readyCallback = resolve;
            }
        });
    };

    private createDebugMaterial() {
        if (this._debug) {
            var navmeshdebug = this._navigationPlugin.createDebugNavMesh(this._scene);
            navmeshdebug.position = new Vector3(0, 0.01, 0);

            var matdebug = new StandardMaterial("matdebug", this._scene);
            matdebug.diffuseColor = new Color3(0.1, 0.2, 1);
            matdebug.alpha = 0.2;
            navmeshdebug.material = matdebug;
        }
    }

    public findPath(from: Vector3, to: Vector3): Vector3[] {
        if (!this._ready) {
            throw new Error("NavMeshService not ready");
        }

        from = this._navigationPlugin.getClosestPoint(from);
        to = this._navigationPlugin.getClosestPoint(to);

        const path = this._navigationPlugin.computePath(from, to);
    
        return path;
    }

    public getClosestPoint(from: Vector3): Vector3 {
        return this._navigationPlugin.getClosestPoint(from);
    }

    public getRandomPoint(from: Vector3, radius: number): Vector3 {
        return this._navigationPlugin.getRandomPointAround(from, radius);
    }

    private static getNavMeshParams(): any {
        return {
            cs: 0.2,
            ch: 0.2,
            walkableSlopeAngle: 90,
            walkableHeight: 2.0,
            walkableClimb: 2,
            walkableRadius: 2,
            maxEdgeLen: 12,
            maxSimplificationError: 1.3,
            minRegionArea: 8,
            mergeRegionArea: 20,
            maxVertsPerPoly: 6,
            detailSampleDist: 6,
            detailSampleMaxError: 1,
        };
    }

    private static getAgentParams(): any {
        return {
            radius: 0.1,
            height: 0.2,
            maxAcceleration: 4.0,
            maxSpeed: 1.0,
            collisionQueryRange: 0.5,
            pathOptimizationRange: 0.0,
            separationWeight: 1.0,
        };
    }
}