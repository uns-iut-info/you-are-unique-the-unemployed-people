import {
  AbstractMesh,
  Mesh,
  MeshBuilder,
  Node,
  PhysicsImpostor,
  Quaternion,
  Scene,
  SceneLoader,
  StandardMaterial,
  Texture,
  Vector3,
} from "@babylonjs/core";
import { App } from "../app";
import { Asset } from "../Asset";
import { FileUtils } from "../utils/FileUtils";

export class TerrainBuilder {
  private readonly scene: Scene;
  private instances: { [key: string]: AbstractMesh } = {};
  private terrain: AbstractMesh;

  constructor(scene: Scene) {
    this.scene = scene;
  }

  public async createTerrain(terrainAssets: boolean) {
    const root = await SceneLoader.ImportMeshAsync(
      "",
      "./obj/terrain/",
      "terrain.obj",
      App.getScene()
    );
    this.terrain = root.meshes[0];
    this.terrain.position = new Vector3(256, 0, -256);

    this.terrain.metadata = { role: "decoration" };
    this.terrain.physicsImpostor = new PhysicsImpostor(
      this.terrain,
      PhysicsImpostor.MeshImpostor,
      { mass: 0, restitution: 0.9 },
      App.getScene()
    );
    this.addMaterial(Asset.COLOR_MAP);
    // create a sphere
    let sphere = MeshBuilder.CreateSphere(
      "sphere",
      { diameter: 6 },
      App.getScene()
    );
    sphere.position = new Vector3(0, 150, 0);
    sphere.physicsImpostor = new PhysicsImpostor(
      sphere,
      PhysicsImpostor.SphereImpostor,
      { mass: 1, restitution: 0.9 },
      App.getScene()
    );

    if (terrainAssets) {
      await this.loadTerrainMesh(await FileUtils.loadFile(Asset.TERRAIN_ASSET));
    }
  }

  public enablePhysics(): void {
    this.terrain.physicsImpostor = new PhysicsImpostor(
      this.terrain,
      PhysicsImpostor.MeshImpostor,
      { mass: 0, friction: 1 },
      this.scene
    );
    this.terrain.checkCollisions = true;
    this.terrain.isPickable = true;
  }

  public addMaterial(path: string): void {
    var material = new StandardMaterial("GroundMat", this.scene);
    material.diffuseTexture = new Texture(path, this.scene);
    this.terrain.material = material;
    this.terrain.material.freeze();
  }

  public async loadTerrainMesh(json: any) {
    await this.loadMeshAsync(json);
    await this.instantiateMeshSync(json);
  }

  private async loadMeshAsync(json: any) {
    const tasks = [];

    for (const mesh of json.objs) {
      tasks.push(SceneLoader.LoadAssetContainerAsync(
        "./obj/terrain/",
        mesh,
        App.getScene()
      ));
    }

    await Promise.all(tasks);
  }

  private async instantiateMeshSync(json: any) {
    for (const dataJson of json.objData) {
      if (json.details.includes(dataJson.name)) {
        continue;
      }

      if (this.instances[dataJson.name] === undefined) {
        const root = await SceneLoader.ImportMeshAsync(
          "",
          "./obj/terrain/",
          dataJson.name,
          App.getScene()
        );

        root.meshes[0].name = dataJson.name + "_group";
        let asset = root.meshes[0].getChildren()[0];
        asset.name = dataJson.name;
        this.instances[dataJson.name] = asset as AbstractMesh;
        this.addData(asset, dataJson);

        console.log("Created " + dataJson.name);
      } else {
        let asset = this.getObject(dataJson.name);
        let assetClone = asset.clone(dataJson.name + "_clone", asset.parent);
        this.addData(assetClone, dataJson);
        console.log("Cloned " + dataJson.name);
      }
    }

    console.log("Finished !");
  }

  public getObject(name: string): AbstractMesh | undefined {
    return this.instances[name];
  }

  private addData(transform, data) {
    transform.metadata = { role: "decoration" };
    transform.scaling = new Vector3(data.scale.x, data.scale.y, data.scale.z);
    transform.position = new Vector3(
      data.position.x,
      data.position.y,
      data.position.z
    );
    transform.rotationQuaternion = new Quaternion(
      data.rotation.x,
      data.rotation.y,
      data.rotation.z,
      data.rotation.w
    );
    this.optimizeMesh(transform);
  }

  private optimizeMesh(instance) {
    if (!(instance instanceof Mesh)) return;
    instance.isPickable = false;
    instance.material.freeze();
    instance.freezeWorldMatrix();
  }
}
