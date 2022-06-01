import { AbstractMesh, AmmoJSPlugin, AssetsManager, Color3, DynamicTexture, KeyboardEventTypes, MeshBuilder, Scene, StandardMaterial, Vector3 } from "@babylonjs/core";
import { Character } from "../core/Character";
import { PlayerCharacterComponent } from "../core/components/character/PlayerCharacterComponent";
import { HitpointComponent, Team } from "../core/components/HitpointComponent";
import { GameObject } from "../core/GameObject";
import { EffectManager } from "../effect/EffectManager";
import { MissionManager } from "../mission/MissionManager";
import { NavMeshService } from "../navmesh/NavMeshService";
import { SoundManager } from "../sound/SoundManager";
import { AnchorPoint, AnchorPortalAttribute } from "./AnchorPoint";
import { SceneType } from "./SceneType";

export abstract class BaseScene extends Scene {
  private _navMeshService: NavMeshService;
  private _effectManager: EffectManager;
  private _assetManager: AssetsManager;
  private _soundManager: SoundManager;

  protected _anchors: { [key: string]: AnchorPoint } = {};

  private _currentPortalHintMesh: AbstractMesh;

  public async init(): Promise<void> {
    await this.whenReadyAsync();
    this.setupPhysics();
    this.optimize();
    this.setupResize();
    this.setupInspector();

    this._effectManager = new EffectManager(this);
    this._assetManager = new AssetsManager(this);
    this._soundManager = new SoundManager(this);

    this.onAfterCameraRenderObservable.add(() => {
      MissionManager.update(this.getEngine().getDeltaTime());

      for (const anchor of Object.values(this._anchors)) {
        const portalAttribute = anchor.portalAttribute;

        if (portalAttribute) {
          const player = this.player;
          const distance = Vector3.Distance(player.position, anchor.position);

          if (distance < portalAttribute.inputRadius) {
            this.showTeleportHint(anchor.position);
            return
          }
        }
      }

      this.hideTeleportHint();
    });

    this.onKeyboardObservable.add((ev) => {
      if (ev.type === KeyboardEventTypes.KEYDOWN && ev.event.key === "f") {
        for (const anchor of Object.values(this._anchors)) {
          const portalAttribute = anchor.portalAttribute;
  
          if (portalAttribute) {
            const player = this.player;
            const distance = Vector3.Distance(player.position, anchor.position);
  
            if (distance < portalAttribute.inputRadius) {
              this.onPortalEnter(portalAttribute);
              return
            }
          }
        }
      }
    });
  }

  protected onPortalEnter(portal: AnchorPortalAttribute) {

  }

  private showTeleportHint(position: Vector3) {
    if (this._currentPortalHintMesh) {
      return;
    }

    const mesh = MeshBuilder.CreatePlane("portalHint", {
      width: 1,
      height: 1,
    });
    const outputplaneTexture = new DynamicTexture("dynamic texture", 512, this, true);
    const material = new StandardMaterial('portalHintMaterial', this);
    material.diffuseTexture = outputplaneTexture;
    material.diffuseTexture.hasAlpha = true;
    material.specularColor = new Color3(0, 0, 0);
    material.emissiveColor = new Color3(1, 1, 1);
    material.backFaceCulling = false;

    // @ts-ignore
    mesh.useAlphaFromDiffuseTexture = true;
    mesh.billboardMode = AbstractMesh.BILLBOARDMODE_ALL;
    mesh.material = material;
    mesh.position = position.add(new Vector3(0, 2, 0));
  
    outputplaneTexture.drawText("Press F", null, 140, "bold 140px verdana", "white", "#00000000");

    this._currentPortalHintMesh = mesh;

    console.log("show teleport hint");
  }

  private hideTeleportHint() {
    if (this._currentPortalHintMesh) {
      this._currentPortalHintMesh.dispose();
      this._currentPortalHintMesh = null;
    
      console.log("hide teleport hint");
    }
  }

  private optimize() {
    this.pointerMovePredicate = () => false;
    this.pointerDownPredicate = () => false;
    this.pointerUpPredicate = () => false;
  }

  public async enableNavigationPlugin() {
    this._navMeshService = new NavMeshService(this);

    await this._navMeshService.waitForReady();
  }

  private setupPhysics(): void {
    this.collisionsEnabled = true;
    this.enablePhysics(new Vector3(0, -9.81, 0), new AmmoJSPlugin());
  }

  public setupRender() {
    this.getEngine().runRenderLoop(() => {
      this.render();
    });
  }

  private setupResize() {
    window.addEventListener("resize", (ev) => {
      this.getEngine().resize();
    });
  }
  
  private setupInspector() {
    window.addEventListener("keydown", (ev) => {
      if (ev.ctrlKey && ev.keyCode === 73) {
        if (this.debugLayer.isVisible()) {
          this.debugLayer.hide();
        } else {
          this.debugLayer.show();
        }
      }
    });
  }

  public get gameObjects(): GameObject[] {
    return this.getNodes().filter((node) => node instanceof GameObject) as GameObject[];
  }

  public get player(): Character {
    return this.gameObjects.find((gameObject) => {
      const playerCharacterComponent = gameObject.findComponent(PlayerCharacterComponent);

      return playerCharacterComponent;
    }) as Character;
  }

  public getEnemies(team: Team): GameObject[] {
    return this.gameObjects.filter((gameObject) => {
      const hitpointComponent = gameObject.findComponent(HitpointComponent);

      if (hitpointComponent && hitpointComponent.team !== team) {
        return true;
      }
    });
  }

  public get navMeshService(): NavMeshService {
    return this._navMeshService;
  }

  public get effectManager(): EffectManager {
    return this._effectManager;
  }

  public get assetManager(): AssetsManager {
    return this._assetManager;
  }

  public get soundManager(): SoundManager {
    return this._soundManager;
  }

  public getAnchorByName(name: string): AnchorPoint {
    return this._anchors[name];
  }

  public addAnchor(name: string, position: Vector3, rotation: Vector3, portalAttribute?: AnchorPortalAttribute): AnchorPoint {
    const anchor = new AnchorPoint(position, rotation, portalAttribute);
    this._anchors[name] = anchor;

    return anchor;
  }

  public getGameObjectByExportName(name: string): GameObject {
    return this.gameObjects.find((gameObject) => gameObject.metadata?.export === name);
  }

  dispose(): void {
    super.dispose();

    this._soundManager.dispose();
  }

  public abstract get sceneType(): SceneType;
}
