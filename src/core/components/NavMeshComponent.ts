//https://playground.babylonjs.com/#TN7KNN#281

import {
  MeshBuilder,
  Vector3,
  Mesh,
  RecastJSPlugin,
  StandardMaterial,
  Color3,
  TransformNode,
  ICrowd,
  SceneLoader,
  Observable,
} from "@babylonjs/core";
import { IEnemyData } from "../../data/IEnemyData";
import { NavMeshWorker } from "../../navmesh/NavMeshWorker";
import { GameObject } from "../GameObject";
import { Component } from "./Component";
export class NavMeshComponent extends Component {
  private _navigationPlugin = new RecastJSPlugin();
  private _crowd: ICrowd;
  private _agents: any[] = [];
  private _debug: boolean = true;

  private _onNavMeshReady: Observable<any>;
  private _isNavMeshReady: boolean;

  private getNavMeshParams(): any {
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

  private getAgentParams(): any {
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

  public async onInit() {
    this._onNavMeshReady = new Observable();
    this._navigationPlugin = new RecastJSPlugin();
    this._navigationPlugin.setWorkerURL(NavMeshWorker.getUrl());
    this._navigationPlugin;

    let allMeshes = this.scene.meshes.filter(
      (m) => m.metadata != null && m.metadata.role === "decoration"
    ) as Mesh[];

    this._navigationPlugin.createNavMesh(
      allMeshes,
      this.getNavMeshParams(),
      (navmeshData) => {
        console.log("got worker data", navmeshData);
        this._navigationPlugin.buildFromNavmeshData(navmeshData);
        this.debugMat();

        this._crowd = this._navigationPlugin.createCrowd(10, 0.1, this.scene);

        this._isNavMeshReady = true;
        this._onNavMeshReady.notifyObservers(null);
      }
    );
  }

  public onNavMeshReady(callback: () => void) {
    if (this._isNavMeshReady) {
      callback.apply(null);
    } else this._onNavMeshReady.add(callback);
  }

  private debugMat() {
    if (this._debug) {
      var navmeshdebug = this._navigationPlugin.createDebugNavMesh(this.scene);
      navmeshdebug.position = new Vector3(0, 0.01, 0);

      var matdebug = new StandardMaterial("matdebug", this.scene);
      matdebug.diffuseColor = new Color3(0.1, 0.2, 1);
      matdebug.alpha = 0.2;
      navmeshdebug.material = matdebug;
    }
  }

  public async createAgent(initiaPosition: Vector3, enemyData: IEnemyData) {
    var agentParams = this.getAgentParams();
    var targetCube = MeshBuilder.CreateBox(
      "cube",
      { size: 0.1, height: 0.1 },
      this.scene
    );

    let result = await SceneLoader.ImportMeshAsync(
      null,
      "./obj/",
      enemyData.model
    );
    console.log(GameObject instanceof TransformNode);
    var transform = new TransformNode(result.meshes[0].name);
    var agentIndex = this._crowd.addAgent(
      initiaPosition,
      agentParams,
      transform
    );
    this._agents.push({
      idx: agentIndex,
      trf: transform,
      mesh: result.meshes[0],
      target: targetCube,
    });

    return agentIndex;
  }

  public async createAgentWithGameObject(
    initiaPosition: Vector3,
    gameObject: GameObject
  ) {
    var agentParams = this.getAgentParams();
    var targetCube = MeshBuilder.CreateBox(
      "cube",
      { size: 0.1, height: 0.1 },
      this.scene
    );
    var transform = new TransformNode(gameObject.name);
    var agentIndex = this._crowd.addAgent(
      initiaPosition,
      agentParams,
      transform
    );
    this._agents.push({
      idx: agentIndex,
      trf: transform,
      mesh: gameObject,
      target: targetCube,
    });

    return agentIndex;
  }

  public navMeshGoto(index: number, position: Vector3) {
    this._crowd.agentGoto(
      index,
      this._navigationPlugin.getClosestPoint(position)
    );
  }

  public onFrameUpdate(): void {
    var agentCount = this._agents.length;
    for (let i = 0; i < agentCount; i++) {
      var ag = this._agents[i];
      ag.mesh.position = this._crowd.getAgentPosition(ag.idx);
      let vel = this._crowd.getAgentVelocity(ag.idx);
      this._crowd.getAgentNextTargetPathToRef(ag.idx, ag.target.position);
      if (vel.length() > 0.2) {
        vel.normalize();
        var desiredRotation = Math.atan2(vel.x, vel.z);
        ag.mesh.rotation.y =
          ag.mesh.rotation.y + (desiredRotation - ag.mesh.rotation.y) * 0.05;
      }
    }
  }

  public onFrameUpdated(): void {}

  public destroy(): void {}
}
