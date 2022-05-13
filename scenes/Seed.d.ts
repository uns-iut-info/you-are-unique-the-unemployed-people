declare module DEBUG {
    class Debugger {
        static log(message: string): void;
        static warn(message: string): void;
        static error(message: string): void;
        static assert(condition: boolean, message: string): void;
        static debugAssert(condition: boolean, message: string): void;
    }
}
declare module PROJECT {
    /**
     * Babylon universal camera rig system pro class
     * @class UniversalCameraSystem - All rights reserved (c) 2020 Mackey Kinard
     * https://doc.babylonjs.com/divingDeeper/postProcesses/defaultRenderingPipeline
     */
    class UniversalCameraSystem extends BABYLON.ScriptComponent {
        protected static PlayerOneCamera: BABYLON.FreeCamera;
        protected static PlayerTwoCamera: BABYLON.FreeCamera;
        protected static PlayerThreeCamera: BABYLON.FreeCamera;
        protected static PlayerFourCamera: BABYLON.FreeCamera;
        protected static XRExperienceHelper: BABYLON.WebXRDefaultExperience;
        private static multiPlayerView;
        private static multiPlayerCount;
        private static multiPlayerCameras;
        private static stereoCameras;
        private static startupMode;
        private static cameraReady;
        private static renderingPipeline;
        private static screenSpacePipeline;
        static GetRenderingPipeline(): BABYLON.DefaultRenderingPipeline;
        static GetScreenSpacePipeline(): BABYLON.SSAORenderingPipeline;
        static IsCameraSystemReady(): boolean;
        /** Register handler that is triggered when the webxr experience helper has been created */
        static OnXRExperienceHelperObservable: BABYLON.Observable<BABYLON.WebXRDefaultExperience>;
        private mainCamera;
        private cameraType;
        private cameraInertia;
        private cameraController;
        private immersiveOptions;
        private arcRotateConfig;
        private multiPlayerSetup;
        private editorPostProcessing;
        isMainCamera(): boolean;
        getCameraType(): number;
        protected m_cameraRig: BABYLON.TargetCamera;
        protected awake(): void;
        protected start(): void;
        protected update(): void;
        protected destroy(): void;
        protected awakeCameraSystemState(): void;
        protected startCameraSystemState(): Promise<void>;
        protected updateCameraSystemState(): void;
        protected cleanCameraSystemState(): void;
        protected destroyCameraSystemState(): void;
        /** Get the WebXR default experience helper */
        static GetWebXR(): BABYLON.WebXRDefaultExperience;
        /** Is universal camera system in WebXR mode */
        static IsInWebXR(): boolean;
        /** Setup navigation mesh for WebXR */
        private static SetupNavigationWebXR;
        /** Get main camera rig for the scene */
        static GetMainCamera(scene: BABYLON.Scene, detach?: boolean): BABYLON.FreeCamera;
        /** Get universal camera rig for desired player */
        static GetPlayerCamera(scene: BABYLON.Scene, player?: BABYLON.PlayerNumber, detach?: boolean): BABYLON.FreeCamera;
        /** Get camera transform node for desired player */
        static GetCameraTransform(scene: BABYLON.Scene, player?: BABYLON.PlayerNumber): BABYLON.TransformNode;
        /** Are stereo side side camera services available. */
        static IsStereoCameras(): boolean;
        /** Are local multi player view services available. */
        static IsMultiPlayerView(): boolean;
        /** Get the current local multi player count */
        static GetMultiPlayerCount(): number;
        /** Activates current local multi player cameras. */
        static ActivateMultiPlayerCameras(scene: BABYLON.Scene): boolean;
        /** Disposes current local multiplayer cameras */
        static DisposeMultiPlayerCameras(): void;
        /** Sets the multi player camera view layout */
        static SetMultiPlayerViewLayout(scene: BABYLON.Scene, totalNumPlayers: number): boolean;
    }
    /*********************************************/
    /** Camera Editor Properties Support Classes */
    /*********************************************/
    interface IEditorArcRtotate {
        alpha: number;
        beta: number;
        radius: number;
        target: BABYLON.IUnityVector3;
    }
    interface IEditorPostProcessing {
        usePostProcessing: boolean;
        highDynamicRange: boolean;
        screenAntiAliasing: PROJECT.IEditorAntiAliasing;
        focalDepthOfField: PROJECT.IEditorDepthOfField;
        chromaticAberration: PROJECT.IEditorChromaticAberration;
        glowLayerProperties: PROJECT.IEditorGlowLayer;
        grainEffectProperties: PROJECT.IEditorGrainEffect;
        sharpEffectProperties: PROJECT.IEditorSharpenEffect;
        bloomEffectProperties: PROJECT.IEditorBloomProcessing;
        imageProcessingConfig: PROJECT.IEditorImageProcessing;
        screenSpaceRendering: PROJECT.IEditorScreenSpace;
    }
    interface IEditorScreenSpace {
        SSAO: boolean;
        SSAORatio: number;
        combineRatio: number;
        totalStrength: number;
        radius: number;
        area: number;
        fallOff: number;
        baseValue: number;
    }
    interface IEditorAntiAliasing {
        msaaSamples: number;
        fxaaEnabled: boolean;
        fxaaScaling: boolean;
        fxaaSamples: number;
    }
    interface IEditorDepthOfField {
        depthOfField: boolean;
        blurLevel: number;
        focalStop: number;
        focalLength: number;
        focusDistance: number;
        maxLensSize: number;
    }
    interface IEditorChromaticAberration {
        aberrationEnabled: boolean;
        aberrationAmount: number;
        adaptScaleViewport: boolean;
        alphaMode: number;
        alwaysForcePOT: boolean;
        pixelPerfectMode: boolean;
        fullscreenViewport: boolean;
    }
    interface IEditorGlowLayer {
        glowEnabled: boolean;
        glowIntensity: number;
        blurKernelSize: number;
    }
    interface IEditorGrainEffect {
        grainEnabled: boolean;
        grainAnimated: boolean;
        grainIntensity: number;
        adaptScaleViewport: boolean;
    }
    interface IEditorSharpenEffect {
        sharpenEnabled: boolean;
        sharpEdgeAmount: number;
        sharpColorAmount: number;
        adaptScaleViewport: boolean;
    }
    interface IEditorBloomProcessing {
        bloomEnabled: boolean;
        bloomKernel: number;
        bloomScale: number;
        bloomWeight: number;
        bloomThreshold: number;
    }
    interface IEditorColorCurves {
        curvesEnabled: boolean;
        globalDen: number;
        globalExp: number;
        globalHue: number;
        globalSat: number;
        highlightsDen: number;
        highlightsExp: number;
        highlightsHue: number;
        highlightsSat: number;
        midtonesDen: number;
        midtonesExp: number;
        midtonesHue: number;
        midtonesSat: number;
        shadowsDen: number;
        shadowsExp: number;
        shadowsHue: number;
        shadowsSat: number;
    }
    interface IEditorImageProcessing {
        imageProcessing: boolean;
        imageContrast: number;
        imageExposure: number;
        vignetteEnabled: boolean;
        vignetteBlendMode: number;
        vignetteCameraFov: number;
        vignetteStretch: number;
        vignetteCentreX: number;
        vignetteCentreY: number;
        vignetteWeight: number;
        vignetteColor: BABYLON.IUnityColor;
        useColorGrading: boolean;
        setGradingTexture: any;
        imagingColorCurves: PROJECT.IEditorColorCurves;
    }
}
declare module PROJECT {
    import Bone = BABYLON.Bone;
    import Vector3 = BABYLON.Vector3;
    abstract class ParticleAlgo implements IParticleAlgo {
        protected particles: BABYLON.GPUParticleSystem[];
        protected bone: Bone;
        protected constructor(bone?: Bone);
        addParticle(particle: BABYLON.GPUParticleSystem): void;
        abstract updateAlgo(upc: UniversalPlayerController): void;
        abstract reset(): void;
        abstract getDamagePoint(): Vector3;
    }
}
declare module PROJECT {
    import Vector3 = BABYLON.Vector3;
    import Bone = BABYLON.Bone;
    class CircleAlgo extends ParticleAlgo {
        private readonly radius;
        private readonly rps;
        private readonly forwardSpeed;
        private readonly height;
        private i;
        constructor(bone: Bone, radius: number, rotationPerSecond: number, height?: number, forwardSpeed?: number);
        updateAlgo(upc: UniversalPlayerController): void;
        getDamagePoint(): Vector3;
        reset(): void;
    }
}
declare module PROJECT {
    interface IParticleAlgo {
        updateAlgo(upc: UniversalPlayerController): void;
        reset(): void;
    }
}
declare module PROJECT {
    import Bone = BABYLON.Bone;
    import Vector3 = BABYLON.Vector3;
    class SphereAlgo extends ParticleAlgo {
        private readonly height;
        constructor(bone: Bone, height: number);
        updateAlgo(upc: UniversalPlayerController): void;
        getDamagePoint(): Vector3;
        reset(): void;
    }
}
declare module PROJECT {
    import GPUParticleSystem = BABYLON.GPUParticleSystem;
    import Scene = BABYLON.Scene;
    abstract class ParticleFactory {
        static createSphereParticle(scene: Scene, color: BABYLON.Color4[], sphereSize: number, minSize: number, maxSize: number, minEmitPower: number, maxEmitPower: number, emitRate: number, minLifeTime: number, maxLifeTime: number, capacity?: number): GPUParticleSystem;
        static createSpheresParticle(sphereCount: number, scene: Scene, colors: BABYLON.Color4[][], sphereSize: number, minSize: number, maxSize: number, minEmitPower: number, maxEmitPower: number, emitRate: number, minLifeTime: number, maxLifeTime: number, capacity?: number): GPUParticleSystem[];
    }
}
declare module PROJECT {
    import Scene = BABYLON.Scene;
    import ThinEngine = BABYLON.ThinEngine;
    import Color4 = BABYLON.Color4;
    class SphereParticle extends BABYLON.GPUParticleSystem {
        constructor(name: string, options: Partial<{
            capacity: number;
            randomTextureSize: number;
        }>, sceneOrEngine: Scene | ThinEngine);
        createParticles(color: Color4[], sphereSize: number, sizes: Partial<{
            minSize: number;
            maxSize: number;
        }>, powers: Partial<{
            minEmitPower: number;
            maxEmitPower: number;
            emitRate: number;
        }>, life: Partial<{
            minLifeTime: number;
            maxLifeTime: number;
        }>): void;
    }
}
declare module PROJECT {
    import GPUParticleSystem = BABYLON.GPUParticleSystem;
    interface ISpell {
        update(upc: UniversalPlayerController): void;
        setParticles(particles: GPUParticleSystem[]): void;
        getStartTime(): number;
        getStopTime(): number;
        reset(): void;
    }
}
declare module PROJECT {
    import GPUParticleSystem = BABYLON.GPUParticleSystem;
    class Spell implements ISpell {
        private particleAlgo;
        private readonly startTime;
        private readonly stopTime;
        constructor(particleAlgo: ParticleAlgo, options: Partial<{
            startTime?: number;
            stopTime?: number;
        }>);
        reset(): void;
        update(upc: UniversalPlayerController): void;
        setParticles(particles: GPUParticleSystem[]): void;
        getStartTime(): number;
        getStopTime(): number;
    }
}
declare module PROJECT {
    import GPUParticleSystem = BABYLON.GPUParticleSystem;
    import Vector3 = BABYLON.Vector3;
    class SpellTransition implements ISpell {
        private particles;
        private readonly startTime;
        private readonly stopTime;
        private readonly transitionTime;
        private timeElapsed;
        private posB;
        constructor(posB: Vector3, options: Partial<{
            startTime?: number;
            stopTime?: number;
        }>);
        reset(): void;
        update(upc: UniversalPlayerController): void;
        setParticles(particles: GPUParticleSystem[]): void;
        getStartTime(): number;
        getStopTime(): number;
    }
}
declare module PROJECT {
    import Bone = BABYLON.Bone;
    import Vector3 = BABYLON.Vector3;
    import Scene = BABYLON.Scene;
    class AnimationManager {
        private spellAnimSyncs;
        private spellStates;
        private setName;
        private transformBones;
        private scene;
        constructor(setName: string, transformBones: any, scene: Scene);
        loadSpellnSet(): void;
        registerAnimationTrigger(animationSpellSync: AnimationSpellSync): void;
        registerAllAnimationTrigger(animationsSpellSync: AnimationSpellSync[]): void;
        updateAnimationState(currentAnimationState: BABYLON.AnimationState, upc: UniversalPlayerController): void;
        reportBoneTime(currentAnimationState: BABYLON.AnimationState, bone: Bone, playerPos: Vector3, animationNameTarget: string): void;
        getValueByName(array: any[], name: string): any;
    }
    enum AnimationState {
        WAS_NOT_CALLED = 0,
        WAS_CALLED = 1,
        IS_CALLED = 2
    }
}
declare module PROJECT {
    class AnimationSpellSync {
        private spellLayers;
        private triggerAnimationName;
        constructor(triggerAnimationName: string);
        addLayer(layer: SpellLayer): void;
        update(animationTime: number, upc: UniversalPlayerController): void;
        start(): void;
        stop(): void;
        getTriggerAnimationName(): string;
    }
}
declare module PROJECT {
    class SpellLayer {
        private readonly particles;
        private readonly spells;
        private index;
        constructor(particles: BABYLON.GPUParticleSystem[], spells: ISpell[]);
        update(animationTime: number, upc: UniversalPlayerController): void;
        updateLayer(animationTime: number): void;
        start(): void;
        stop(): void;
    }
}
declare module PROJECT {
    import Scene = BABYLON.Scene;
    abstract class SpellSet {
        protected setName: string;
        protected transformBones: any;
        constructor(setName: string, transformBones: any);
        abstract canSetBeUsed(setName: string): boolean;
        abstract getAll(scene: Scene): AnimationSpellSync[];
        protected getBone(name: string): any;
    }
}
declare module PROJECT {
    import Scene = BABYLON.Scene;
    class SpellTestSet extends SpellSet {
        constructor(transformBones: any);
        canSetBeUsed(setName: string): boolean;
        getAll(scene: Scene): AnimationSpellSync[];
    }
}
declare module PROJECT {
    import Vector3 = BABYLON.Vector3;
    class AnimationUtils {
        static isWithinSpell(x: number, spell: ISpell): boolean;
        static lerp(v1: number, v2: number, t: number): number;
        static lerpVector(v1: Vector3, v2: Vector3, speed: number): Vector3;
    }
}
declare module PROJECT {
    class ColorPattern {
        static readonly red: BABYLON.Color4[];
        static readonly blue: BABYLON.Color4[];
        static readonly green: BABYLON.Color4[];
        static readonly yellow: BABYLON.Color4[];
    }
}
declare module PROJECT {
    import Vector3 = BABYLON.Vector3;
    abstract class MathUtils {
        static rotate(pointToMove: BABYLON.Vector3, origin: BABYLON.Vector3, angle: number): BABYLON.Vector3;
        static addVectors(vectors: Vector3[]): Vector3;
        static multiplyVectors(vectors: Vector3[]): Vector3;
    }
}
declare module PROJECT {
    /**
     * Babylon Script Component
     * @class ObjRender
     */
    class ObjRender extends BABYLON.ScriptComponent {
        private static readonly RENDER_TAG;
        private static readonly RENDER_DISTANCE;
        private meshes;
        protected awake(): void;
        protected start(): void;
        protected ready(): void;
        protected update(): void;
        private enableDisableDistanceObject;
        private optimizeMesh;
        private optimizeScene;
        protected late(): void;
        protected after(): void;
        protected fixed(): void;
        protected destroy(): void;
    }
}
declare module PROJECT {
    class Toon extends BABYLON.ScriptComponent {
        private shaderName;
        private static readonly TEXTURE_LINK;
        private static readonly TEXTURE_REPLACE_STRING;
        protected start(): void;
        private applyMaterialTerrain;
        private applyMaterialStandard;
        private getNodeMaterialsStandardMesh;
        private getNodeMaterial;
    }
}
declare module PROJECT {
    class ToonMaterial {
        private static shaderName;
        static applyMaterial(scene: BABYLON.Scene, meshs: BABYLON.AbstractMesh[]): void;
        private static getNodeMaterial;
    }
}
declare module PROJECT {
    class AdvancedTextureUi {
        private advancedTexture;
        private GEJeEJIbGEAGEFDeaDJbbFCcHIHFHaCd;
        private fCHCbeacaBdDEIFfbcFIIDeAEdEEGHcf;
        private FGHHaDdEIICbEcFIIeEAeaHBfDJCcFBd;
        private CfbefaJCABaBEFBCJAbbEAHEBCFCaBAC;
        private BfcHdEFcCIDbECcbaaHAfJDBAJEeefDJ;
        private aCEfFJJddGbIEEdBaAbcFDGDHCBbdbfF;
        private cJDJIdCbCFdbEdbfbaFbFCADbdaaabCI;
        private HBAEEeIGaJeaEDIAIAJeEJcDJJFbbaCD;
        private bCDAdJAFIIAdEIEGIafeHJeIfHafcDHb;
        private IcEGDdIcaDABEBacIAacIdBFGcBeBCcA;
        private IFfffGaGcJHJECGCaHBebaHJeBfBDEGB;
        private CAceBIDCIHdeEDFebGJeCBHabDBJJIAB;
        private JGeEIECBAeEbEGHBbDCABBJcBAeBeafe;
        private bAaFJfdBaBDaEIBCICCFdDbIBCIFeAHD;
        private HEBdabbJJeEFEEaAbHJCcJdbHDfFfcbG;
        private cGDJAacBAfdJEcJbIBdHdeFDaAeadeIF;
        private aGCJbJfIGEfcEDBfbAEbAIACDJJdcBad;
        private abIAJGHJcGCaEDFIbcdHcbHCcGJJeJaF;
        private HFCbCEdeaGBIEBJFbfedBdCDbaeecCdI;
        constructor();
        create(): void;
        getAdvancedTexture(): BABYLON.GUI.AdvancedDynamicTexture;
        getGEJeEJIbGEAGEFDeaDJbbFCcHIHFHaCd(): BABYLON.GUI.Container;
        getFCHCbeacaBdDEIFfbcFIIDeAEdEEGHcf(): BABYLON.GUI.Button;
        getFGHHaDdEIICbEcFIIeEAeaHBfDJCcFBd(): BABYLON.GUI.Button;
        getCfbefaJCABaBEFBCJAbbEAHEBCFCaBAC(): BABYLON.GUI.Button;
        getBfcHdEFcCIDbECcbaaHAfJDBAJEeefDJ(): BABYLON.GUI.Button;
        getACEfFJJddGbIEEdBaAbcFDGDHCBbdbfF(): BABYLON.GUI.Button;
        getCJDJIdCbCFdbEdbfbaFbFCADbdaaabCI(): BABYLON.GUI.Button;
        getHBAEEeIGaJeaEDIAIAJeEJcDJJFbbaCD(): BABYLON.GUI.Button;
        getBCDAdJAFIIAdEIEGIafeHJeIfHafcDHb(): BABYLON.GUI.Button;
        getIcEGDdIcaDABEBacIAacIdBFGcBeBCcA(): BABYLON.GUI.Button;
        getIFfffGaGcJHJECGCaHBebaHJeBfBDEGB(): BABYLON.GUI.Container;
        getCAceBIDCIHdeEDFebGJeCBHabDBJJIAB(): BABYLON.GUI.Button;
        getJGeEIECBAeEbEGHBbDCABBJcBAeBeafe(): BABYLON.GUI.Button;
        getBAaFJfdBaBDaEIBCICCFdDbIBCIFeAHD(): BABYLON.GUI.Button;
        getHEBdabbJJeEFEEaAbHJCcJdbHDfFfcbG(): BABYLON.GUI.Button;
        getCGDJAacBAfdJEcJbIBdHdeFDaAeadeIF(): BABYLON.GUI.Button;
        getAGCJbJfIGEfcEDBfbAEbAIACDJJdcBad(): BABYLON.GUI.Button;
        getAbIAJGHJcGCaEDFIbcdHcbHCcGJJeJaF(): BABYLON.GUI.Button;
        getHFCbCEdeaGBIEBJFbfedBdCDbaeecCdI(): BABYLON.GUI.Button;
    }
}
declare module PROJECT {
    /**
    * Babylon Script Component
    * @class LightProjection
    */
    class LightProjection extends BABYLON.ScriptComponent {
        private static ShaderFragmentUpdated;
        private projectionTexture;
        private spotLightExponent;
        private spotLightAngle;
        private nearClipPlane;
        private farClipPlane;
        private excludeChildren;
        private includeTags;
        enableRotation: boolean;
        projectionRotation: number;
        projectionPosition: BABYLON.Vector3;
        getLightProjector(): BABYLON.SpotLight;
        protected m_spotLight: BABYLON.SpotLight;
        protected m_projectorDirty: boolean;
        protected m_projectorPosition: BABYLON.Vector3;
        protected m_projectorRotation: BABYLON.Vector3;
        protected m_lastPosition: BABYLON.Vector3;
        protected m_lastRotation: BABYLON.Vector3;
        protected awake(): void;
        protected start(): void;
        protected update(): void;
        protected destroy(): void;
        private updateProjectorPosition;
        private static UpdateShaderStore;
    }
}
declare module PROJECT {
    /**
    * Babylon Script Component
    * @class NodeMaterialInstance
    */
    class NodeMaterialInstance extends BABYLON.ScriptComponent {
        private nodeMaterialData;
        private setCustomRootUrl;
        getMaterialInstance(): BABYLON.NodeMaterial;
        protected m_nodeMaterial: BABYLON.NodeMaterial;
        protected awake(): void;
        protected destroy(): void;
    }
}
declare module PROJECT {
    /**
    * Babylon Script Component
    * @class NodeMaterialParticle
    */
    class NodeMaterialParticle extends BABYLON.ScriptComponent {
        private nodeMaterialEditor;
        protected awake(): void;
        protected start(): void;
        protected setupNodeMaterial(materialInstance: BABYLON.NodeMaterial): void;
        protected update(): void;
        protected late(): void;
        protected after(): void;
        protected fixed(): void;
        protected ready(): void;
        protected destroy(): void;
    }
}
declare module PROJECT {
    /**
    * Babylon Script Component
    * @class NodeMaterialProcess
    */
    class NodeMaterialProcess extends BABYLON.ScriptComponent {
        private nodeMaterialEditor;
        private numberOfSamples;
        private samplingMode;
        private textureType;
        private textureFormat;
        private sizeRatio;
        private resuable;
        getPostProcess(): BABYLON.PostProcess;
        protected m_postProcess: BABYLON.PostProcess;
        protected start(): void;
        protected setupNodeMaterial(materialInstance: BABYLON.NodeMaterial): void;
        protected destroy(): void;
    }
}
declare module PROJECT {
    /**
    * Babylon Script Component
    * @class NodeMaterialTexture
    */
    class NodeMaterialTexture extends BABYLON.ScriptComponent {
        private nodeMaterialEditor;
        private textureSize;
        getProceduralTexture(): BABYLON.ProceduralTexture;
        protected m_proceduralTexture: BABYLON.ProceduralTexture;
        protected start(): void;
        protected setupNodeMaterial(materialInstance: BABYLON.NodeMaterial): void;
        protected destroy(): void;
    }
}
declare module PROJECT {
    /**
     * Babylon TypeScript File (DEPRECIATED)
     * @script PostRobot Message Library
     *
     * Top Parent Window Handshake (Host Listener)
     *
     if (window.postRobot != null) {
      window.postRobot.on("handshake", (event) => {
        window.postRobot.send(event.source, 'handshake', { id: 0 }).then(function(event) {
            window["bridge"] = event.data;
        }).catch(function(err) {
            console.error(err);
        });
        return {
            id:   0,
            name: 'Parent Window Bridge',
            // ..
            // Bridge Properties And Async Functions
            // ..
            helloWorldAsync: (first, last) => {
                return "Hello " + last + ", " + first;
            },
        };
      });
    }
    export class PostRobot {
        public static CreatePostMessageBridge(hostWindow:Window, localBrideObject:any, onSuccess:()=>void = null, onError:(message:string)=>void = null):void {
            if (hostWindow != window) {
                if ((<any>window).postRobot != null) {
                    (<any>window).postRobot.on("handshake", () => { return localBrideObject; });
                    (<any>window).postRobot.send(hostWindow, "handshake", { id: 1 }).then(function(event:any) {
                        if (event.data != null) {
                            window["bridge"] = event.data;
                            if (onSuccess != null) onSuccess();
                        } else {
                            const msg0:string = "Null bridge interface return from host";
                            if (onError != null) onError(msg0); else console.error(msg0);
                        }
                    }).catch(function(err:Error) {
                        const msg1:string = err.message;
                        if (onError != null) onError(msg1); else console.error(msg1);
                    });
                } else {
                    const msg2:string = "Post robot message library not available";
                    if (onError != null) onError(msg2); else console.error(msg2);
                }
            } else {
                const msg3:string = "Cannot create post message bridge to local window";
                if (onError != null) onError(msg3); else console.error(msg3);
            }
        }
    }
    */
}
declare module PROJECT {
    /**
    * Babylon Script Component
    * @class MobileInputController
    */
    class MobileInputController extends BABYLON.ScriptComponent {
        private controlType;
        private sideMargins;
        private bottomMargins;
        private readyTimeout;
        private invertLeftStickY;
        private invertRightStickY;
        private enableLeftJoystick;
        private enableRightJoystick;
        private disableMouseRotation;
        private updateCameraInput;
        getLeftStick(): BABYLON.TouchJoystickHandler;
        getRightStick(): BABYLON.TouchJoystickHandler;
        getLeftStickEnabled(): boolean;
        getRightStickEnabled(): boolean;
        protected m_leftStick: BABYLON.TouchJoystickHandler;
        protected m_rightStick: BABYLON.TouchJoystickHandler;
        protected start(): void;
        protected ready(): void;
        protected update(): void;
        protected destroy(): void;
        protected createHtmlElements(): void;
    }
    /**
     * Manage the joystick inputs to control a free camera.
     * @see https://doc.babylonjs.com/how_to/customizing_camera_inputs
     */
    class FreeCameraTouchJoystickInput implements BABYLON.ICameraInput<BABYLON.FreeCamera> {
        /**
         * Define the camera the input is attached to.
         */
        camera: BABYLON.FreeCamera;
        /**
         * Define the joystick controlling the input
         */
        controller: BABYLON.Nullable<PROJECT.MobileInputController>;
        /**
         * Defines the joystick rotation sensiblity.
         * This is the threshold from when rotation starts to be accounted for to prevent jittering.
         */
        joystickAngularSensibility: number;
        /**
         * Defines the joystick move sensiblity.
         * This is the threshold from when moving starts to be accounted for for to prevent jittering.
         */
        joystickMoveSensibility: number;
        /**
         * Defines the minimum value at which any analog stick input is ignored.
         * Note: This value should only be a value between 0 and 1.
         */
        deadzoneDelta: number;
        private _yAxisScale;
        /**
         * Gets or sets a boolean indicating that Yaxis (for right stick) should be inverted
         */
        get invertYAxis(): boolean;
        set invertYAxis(value: boolean);
        private LSValues;
        private RSValues;
        private _cameraTransform;
        private _deltaTransform;
        private _vector3;
        private _vector2;
        private _attached;
        /**
         * Attach the input controls to a specific dom element to get the input from.
         */
        attachControl(): void;
        /**
         * Detach the current controls from the specified dom element.
         */
        detachControl(): void;
        /**
         * Update the current camera state depending on the inputs that have been used this frame.
         * This is a dynamically created lambda to avoid the performance penalty of looping for inputs in the render loop.
         */
        checkInputs(): void;
        /**
         * Gets the class name of the current input.
         * @returns the class name
         */
        getClassName(): string;
        /**
         * Get the friendly name associated with the input class.
         * @returns the input friendly name
         */
        getSimpleName(): string;
    }
}
declare module PROJECT {
    import Mesh = BABYLON.Mesh;
    class UniversalPlayerController extends BABYLON.ScriptComponent {
        static MIN_VERTICAL_VELOCITY: number;
        static MIN_GROUND_DISTANCE: number;
        static MIN_SLOPE_LIMIT: number;
        enableInput: boolean;
        attachCamera: boolean;
        rotateCamera: boolean;
        toggleView: boolean;
        freeLooking: boolean;
        requireSprintButton: boolean;
        gravitationalForce: number;
        terminalVelocity: number;
        minFallVelocity: number;
        airbornTimeout: number;
        normalAngle: number;
        radiusScale: number;
        rayLength: number;
        rayOrigin: number;
        maxAngle: number;
        speedFactor: number;
        moveSpeed: number;
        lookSpeed: number;
        jumpSpeed: number;
        jumpDelay: number;
        jumpAllowed: boolean;
        eyesHeight: number;
        pivotHeight: number;
        topLookLimit: number;
        downLookLimit: number;
        lowTurnSpeed: number;
        highTurnSpeed: number;
        smoothAcceleration: boolean;
        accelerationSpeed: number;
        decelerationSpeed: number;
        avatarSkinTag: string;
        distanceFactor: number;
        cameraSmoothing: number;
        cameraCollisions: boolean;
        inputMagnitude: number;
        landingEpsilon: number;
        minimumDistance: number;
        playerInputX: number;
        playerInputZ: number;
        playerMouseX: number;
        playerMouseY: number;
        canSpecialJump: () => boolean;
        ignoreTriggerTags: string;
        buttonJump: number;
        keyboardJump: number;
        buttonSprint: number;
        keyboardSprint: number;
        keyboardSpellOne: number;
        keyboardSpellTwo: number;
        keyboardSpellThree: number;
        keyboardSpellFour: number;
        keyboardSpellFive: number;
        buttonCamera: number;
        keyboardCamera: number;
        sprintThresholdSpeed: number;
        playerNumber: BABYLON.PlayerNumber;
        boomPosition: BABYLON.Vector3;
        airbornVelocity: BABYLON.Vector3;
        movementVelocity: BABYLON.Vector3;
        targetCameraOffset: BABYLON.Vector3;
        onPreUpdateObservable: BABYLON.Observable<BABYLON.TransformNode>;
        onBeforeMoveObservable: BABYLON.Observable<BABYLON.TransformNode>;
        onPostUpdateObservable: BABYLON.Observable<BABYLON.TransformNode>;
        onPlayerInputObservable: BABYLON.Observable<BABYLON.TransformNode>;
        protected m_velocityOffset: BABYLON.Vector3;
        protected m_actualVelocity: BABYLON.Vector3;
        protected m_linearVelocity: BABYLON.Vector3;
        protected m_lastPosition: BABYLON.Vector3;
        protected m_positionCenter: BABYLON.Vector3;
        protected m_scaledVelocity: number;
        protected playerDrawVelocity: number;
        protected box: Mesh;
        protected tr: BABYLON.Bone;
        private abstractMesh;
        private cameraDistance;
        private forwardCamera;
        private avatarRadius;
        private dollyDirection;
        private rotationEulers;
        private cameraPivotOffset;
        private cameraForwardVector;
        private cameraRightVector;
        private desiredForwardVector;
        private desiredRightVector;
        private scaledCamDirection;
        private scaledMaxDirection;
        private parentNodePosition;
        private maximumCameraPos;
        private tempWorldPosition;
        private cameraRaycastShape;
        private defaultRaycastGroup;
        private defaultRaycastMask;
        private cameraRaycastMask;
        private avatarSkins;
        private cameraNode;
        private cameraPivot;
        private navigationAgent;
        private characterController;
        private verticalVelocity;
        private movementSpeed;
        private isJumpPressed;
        private isSprintPressed;
        private isCharacterSliding;
        private isCharacterFalling;
        private isCharacterGrounded;
        private isCharacterFallTriggered;
        private isCharacterJumpFrame;
        private isCharacterJumping;
        private isCharacterJumpSpecial;
        private isCharacterNavigating;
        private updateStateParams;
        private animationStateParams;
        private sphereCollisionShape;
        private showDebugColliders;
        private colliderVisibility;
        private colliderRenderGroup;
        private deltaTime;
        private minJumpTimer;
        private delayJumpTimer;
        private playerControl;
        private moveWithCollision;
        private animationState;
        private lastJumpVelocity;
        private inputMovementVector;
        private playerLookRotation;
        private playerRotationVector;
        private playerMovementVelocity;
        private playerRotationQuaternion;
        private playerMoveDirection;
        private groundHit;
        private groundNode;
        private groundAngle;
        private groundPoint;
        private groundNormal;
        private groundDistance;
        private groundCollision;
        private groundVelocity;
        private groundSensorLine;
        private offsetGroundRaycastPosition;
        private startGroundRaycastPosition;
        private endGroundRaycastPosition;
        private downDirection;
        private forwardDirection;
        private _ikLeftController;
        private _ikLeftFootTarget;
        private _ikLeftPoleTarget;
        private _ikRightController;
        private _ikRightFootTarget;
        private _ikRightPoleTarget;
        private abstractSkinMesh;
        private rootBoneTransform;
        private leftFootTransform;
        private leftFootPolePos;
        private leftFootBendAxis;
        private leftFootPoleAngle;
        private leftFootMaxAngle;
        private rightFootTransform;
        private rightFootPolePos;
        private rightFootBendAxis;
        private rightFootPoleAngle;
        private rightFootMaxAngle;
        private pickingRay;
        private pickingHelper;
        private pickingOrigin;
        private pickingDirection;
        private cameraRay;
        private cameraHelper;
        private cameraForward;
        private cameraDirection;
        private animationManager;
        private spellOneState;
        constructor(transform: BABYLON.TransformNode, scene: BABYLON.Scene, properties?: any);
        isAnimationEnabled(): boolean;
        isSprintButtonPressed(): boolean;
        getSpecialJumped(): boolean;
        getPlayerJumped(): boolean;
        getPlayerJumping(): boolean;
        getPlayerFalling(): boolean;
        getPlayerSliding(): boolean;
        getPlayerGrounded(): boolean;
        getFallTriggered(): boolean;
        getMovementSpeed(): number;
        getCameraBoomNode(): BABYLON.TransformNode;
        getCameraTransform(): BABYLON.TransformNode;
        getAnimationState(): BABYLON.AnimationState;
        getVerticalVelocity(): number;
        getCharacterController(): BABYLON.CharacterController;
        getPlayerMoveDirection(): PROJECT.PlayerMoveDirection;
        getInputMovementVector(): BABYLON.Vector3;
        getInputMagnitudeValue(): number;
        getCameraPivotPosition(): BABYLON.Vector3;
        getCameraPivotRotation(): BABYLON.Quaternion;
        getGroundHit(): boolean;
        getGroundNode(): BABYLON.TransformNode;
        getGroundPoint(): BABYLON.Vector3;
        getGroundAngle(): number;
        getGroundNormal(): BABYLON.Vector3;
        getGroundDistance(): number;
        getGroundCollision(): boolean;
        getSpellOneState(): boolean;
        setGavityForce(gravity: number): void;
        setTerminalVelocity(velocity: number): void;
        setWorldPosition(x: number, y: number, z: number): void;
        setPlayerControl(mode: PROJECT.PlayerInputControl): void;
        togglePlayerControl(): void;
        attachPlayerCamera(player: BABYLON.PlayerNumber): void;
        getLeftFootTarget(): BABYLON.TransformNode;
        getRightFootTarget(): BABYLON.TransformNode;
        getLeftFootController(): BABYLON.BoneIKController;
        getRightFootController(): BABYLON.BoneIKController;
        attachBoneControllers(): void;
        enableCharacterController(state: boolean): void;
        resetPlayerRotation(): void;
        protected awake(): void;
        protected start(): void;
        protected update(): void;
        protected destroy(): void;
        private showAvatarSkins;
        private attachAnimationController;
        private awakePlayerController;
        private startPlayerController;
        private updatePlayerController;
        private updateCharacterController;
        private updateCheckCollisions;
        private updateCameraController;
        private castPhysicsGroundCheckRay;
        private pickCheckCollisionsRaycast;
        private pickCameraCollisionsRaycast;
        private getActualVerticalVelocity;
        private getCheckedVerticalVelocity;
        private destroyPlayerController;
        private validateAnimationStateParams;
    }
    interface AnimationStateParams {
        moveDirection: string;
        inputMagnitude: string;
        horizontalInput: string;
        verticalInput: string;
        mouseXInput: string;
        mouseYInput: string;
        heightInput: string;
        speedInput: string;
        jumpInput: string;
        jumpState: string;
        fallingState: string;
        slidingState: string;
        specialState: string;
        groundedState: string;
        spellOneState: string;
        spellTwoState: string;
        spellThreeState: string;
        spellFourState: string;
        spellFiveState: string;
    }
    enum PlayerInputControl {
        FirstPersonStrafing = 0,
        ThirdPersonStrafing = 1,
        ThirdPersonTurning = 2,
        ThirdPersonForward = 3
    }
    enum SpellAnimationState {
        NoSpellStarted = 0,
        SpellStarted = 1
    }
    enum PlayerMoveDirection {
        Stationary = 0,
        Forward = 1,
        ForwardLeft = 2,
        ForwardRight = 3,
        Backward = 4,
        BackwardLeft = 5,
        BackwardRight = 6,
        StrafingLeft = 7,
        StrafingRight = 8
    }
}
declare module PROJECT {
    /**
    * Babylon Script Component
    * @class FxParticleSystem
    */
    class FxParticleSystem extends BABYLON.ScriptComponent {
        getParticleEmitter(): BABYLON.AbstractMesh;
        getParticleSystem(): BABYLON.ParticleSystem | BABYLON.GPUParticleSystem;
        protected m_particleEmitter: BABYLON.AbstractMesh;
        protected m_particleSystem: BABYLON.ParticleSystem | BABYLON.GPUParticleSystem;
        protected awake(): void;
        protected destroy(): void;
    }
}
declare module PROJECT {
    /**
     * Babylon water material system pro class (Babylon Water Material)
     * @class SkyMaterialSystem - All rights reserved (c) 2020 Mackey Kinard
     */
    class SkyMaterialSystem extends BABYLON.ScriptComponent {
        private skyfog;
        private skysize;
        private probesize;
        private reflections;
        private reflectlevel;
        private skytintcolor;
        getSkyboxMesh(): BABYLON.AbstractMesh;
        getSkyMaterial(): BABYLON.SkyMaterial;
        getReflectionProbe(): BABYLON.ReflectionProbe;
        protected awake(): void;
        protected start(): void;
        protected update(): void;
        protected late(): void;
        protected after(): void;
        protected destroy(): void;
        protected m_skyboxMesh: BABYLON.Mesh;
        protected m_skyMaterial: BABYLON.SkyMaterial;
        protected m_reflectProbe: BABYLON.ReflectionProbe;
        protected awakeSkyboxMaterial(): void;
        protected destroySkyboxMaterial(): void;
        /** Set Skybox Mesh tint color. (Box Mesh Vertex Colors) */
        setSkyboxTintColor(color: BABYLON.Color3): void;
    }
}
declare module PROJECT {
    /**
          * Babylon water material system pro class (Babylon Water Material)
          * @class WaterMaterialSystem - All rights reserved (c) 2020 Mackey Kinard
          */
    class WaterMaterialSystem extends BABYLON.ScriptComponent {
        private waterTag;
        private targetSize;
        private renderSize;
        private depthFactor;
        private reflectSkybox;
        private subDivisions;
        private heightOffset;
        private windDirection;
        private windForce;
        private waveSpeed;
        private waveLength;
        private waveHeight;
        private bumpHeight;
        private bumpSuperimpose;
        private bumpAffectsReflection;
        private waterColor;
        private colorBlendFactor;
        private waterColor2;
        private colorBlendFactor2;
        private disableClipPlane;
        private fresnelSeparate;
        getWaterGeometry(): BABYLON.AbstractMesh;
        getWaterMaterial(): BABYLON.WaterMaterial;
        protected m_waterGeometry: BABYLON.AbstractMesh;
        protected m_waterMaterial: BABYLON.WaterMaterial;
        protected awake(): void;
        protected start(): void;
        protected update(): void;
        protected late(): void;
        protected after(): void;
        protected destroy(): void;
    }
}
declare module PROJECT {
    /**
    * Babylon Script Component
    * @class SimpleFollowCamera
    */
    class SimpleFollowCamera extends BABYLON.ScriptComponent {
        private smoothFollow;
        private smoothRotate;
        private matchRotation;
        private followTarget;
        private targetPosition;
        private targetRotation;
        protected awake(): void;
        protected start(): void;
        protected late(): void;
    }
}
declare module PROJECT {
    /**
    * Babylon Script Component
    * @class SmoothFollowTarget
    */
    class SmoothFollowTarget extends BABYLON.ScriptComponent {
        target: BABYLON.TransformNode;
        targetHeight: number;
        followHeight: number;
        heightDamping: number;
        rotationDamping: number;
        minimumDistance: number;
        maximumDistance: number;
        startBehindTarget: boolean;
        followBehindTarget: boolean;
        private targetPosition;
        private targetAngles;
        private transformAngles;
        private positionBuffer;
        private rotationBuffer;
        private tempRotationBuffer;
        protected awake(): void;
        protected start(): void;
        protected late(): void;
        protected destroy(): void;
    }
}
declare module PROJECT {
    /**
    * Babylon Script Component
    * @class WaypointTargetManager
    */
    class WaypointTargetManager extends BABYLON.ScriptComponent {
        private _waypointMeshLines;
        private _waypointSplineCurve;
        private _waypointTransformNodes;
        private _waypointSplinePositions;
        private _waypointSphereMaterial;
        resolution: number;
        closedLoop: boolean;
        drawLines: boolean;
        drawPoints: boolean;
        drawTraces: boolean;
        pointSize: number;
        lineHeight: number;
        lineColor: BABYLON.Color3;
        pointColor: BABYLON.Color3;
        traceColor: BABYLON.Color3;
        getSplineCurve(): BABYLON.Curve3;
        getSplineCurveLength(): number;
        getSplineCurvePositions(): BABYLON.Vector3[];
        getControlPointTransforms(): BABYLON.TransformNode[];
        protected awake(): void;
        protected start(): void;
        protected destroy(): void;
    }
}
declare module PROJECT {
    /**
     * Babylon Script Component
     * @class DebugInformation
     */
    class DebugInformation extends BABYLON.ScriptComponent {
        private keys;
        private show;
        private popup;
        private views;
        private xbox;
        private color;
        protected awake(): void;
        protected start(): void;
        protected destroy(): void;
    }
}
declare module PROJECT {
    /**
    * Babylon Script Component
    * @class TestNavigationAgent
    */
    class TestNavigationAgent extends BABYLON.ScriptComponent {
        protected m_playerAgent: BABYLON.NavigationAgent;
        protected m_charController: BABYLON.CharacterController;
        protected awake(): void;
        protected doPointerCancel(): void;
        protected doPointerDown(pointerInfo: BABYLON.PointerInfo): void;
        protected update(): void;
        private time;
        private duration;
        private jumpCurve;
        private traversalTime;
        protected updateNavAgent(): void;
    }
}
declare module PROJECT {
    /**
    * Babylon Script Component
    * @class TestRootMotion
    */
    class TestRootMotion extends BABYLON.ScriptComponent {
        private motionType;
        updatePosition: boolean;
        updateRotation: boolean;
        moveWithCollisions: boolean;
        protected m_animator: BABYLON.AnimationState;
        protected m_character: BABYLON.CharacterController;
        protected m_rigidbody: BABYLON.RigidbodyPhysics;
        protected awake(): void;
        protected start(): void;
        protected update(): void;
        protected turn(): void;
        protected move(): void;
    }
}
declare module BABYLON {
    /**
     * Babylon windows platform pro class
     * @class WindowsPlatform - All rights reserved (c) 2020 Mackey Kinard
     */
    class WindowsPlatform {
        /** Is xbox live user signed in if platform services enabled. (WinRT) */
        static IsXboxLiveUserSignedIn(systemUser?: Windows.System.User, player?: BABYLON.PlayerNumber): boolean;
        /** Validated sign in xbox live user if platform services available. (WinRT) */
        static XboxLiveUserSignIn(player?: BABYLON.PlayerNumber, oncomplete?: (result: Microsoft.Xbox.Services.System.SignInResult) => void, onerror?: (error: any) => void, onprogress?: (progress: any) => void): void;
        /** Silent sign in xbox live user if platform services available. (WinRT) */
        static XboxLiveUserSilentSignIn(player?: BABYLON.PlayerNumber, oncomplete?: (result: Microsoft.Xbox.Services.System.SignInResult) => void, onerror?: (error: any) => void, onprogress?: (progress: any) => void): Windows.Foundation.Projections.Promise<void>;
        /** Dialog sign in xbox live user if platform services available. (WinRT) */
        static XboxLiveUserDialogSignIn(player?: BABYLON.PlayerNumber, oncomplete?: (result: Microsoft.Xbox.Services.System.SignInResult) => void, onerror?: (error: any) => void, onprogress?: (progress: any) => void): Windows.Foundation.Projections.Promise<void>;
        /** Loads a xbox live user profile if platform services available. (WinRT) */
        static LoadXboxLiveUserProfile(player?: BABYLON.PlayerNumber, oncomplete?: (result: Microsoft.Xbox.Services.Social.XboxUserProfile) => void, onerror?: (error: any) => void, onprogress?: (progress: any) => void): Windows.Foundation.Projections.Promise<void>;
        /** Get xbox live user if platform services available. (WinRT) */
        static GetXboxLiveUser(player?: BABYLON.PlayerNumber): Microsoft.Xbox.Services.System.XboxLiveUser;
        /** Get xbox live user if platform services available. (WinRT) */
        static GetXboxLiveSystemUser(systemUser: Windows.System.User, player?: BABYLON.PlayerNumber): Microsoft.Xbox.Services.System.XboxLiveUser;
        /** Get xbox live user context if platform services available. (WinRT) */
        static GetXboxLiveUserContext(player?: BABYLON.PlayerNumber): Microsoft.Xbox.Services.XboxLiveContext;
        /** Resets xbox live user context if platform services available. (WinRT) */
        static ResetXboxLiveUserContext(player?: BABYLON.PlayerNumber): void;
        /** Get xbox live context property if platform services available. (WinRT) */
        static GetXboxLiveContextProperty(name: any): any;
        /** Get xbox live context property if platform services available. (WinRT) */
        static SetXboxLiveContextProperty(name: any, property: any): void;
        /** Resets xbox live property context bag if platform services available. (WinRT) */
        static ResetXboxLivePropertyContexts(): void;
        /** Sets the Xbox User Sign Out Complete Handler (WinRT) */
        static SetXboxLiveSignOutHandler(handler?: (result: Microsoft.Xbox.Services.System.SignOutCompletedEventArgs) => void): void;
    }
}
declare module PROJECT {
    /**
    * Babylon Script Component
    * @class Debugger
    */
    class Debugger extends BABYLON.ScriptComponent {
        protected awake(): void;
        protected start(): void;
        protected ready(): void;
        protected update(): void;
        protected late(): void;
        protected after(): void;
        protected fixed(): void;
        protected destroy(): void;
    }
}
declare module PROJECT {
    /**
     * Babylon Script Component
     * @class FixTerrain
     */
    class FixTerrain extends BABYLON.ScriptComponent {
        protected awake(): void;
        protected start(): void;
        protected ready(): void;
        protected update(): void;
        protected late(): void;
        protected after(): void;
        protected fixed(): void;
        protected destroy(): void;
    }
}
declare module BABYLON {
    /**
     * Babylon animation state pro class (Unity Style Mechanim Animation System)
     * @class AnimationState - All rights reserved (c) 2020 Mackey Kinard
     */
    class AnimationState extends BABYLON.ScriptComponent {
        private static FPS;
        private static EXIT;
        private static TIME;
        private static SPEED;
        private _frametime;
        private _layercount;
        private _updatemode;
        private _hasrootmotion;
        private _animationplaying;
        private _initialtargetblending;
        private _hastransformhierarchy;
        private _leftfeetbottomheight;
        private _rightfeetbottomheight;
        private _initialRootBonePosition;
        private _initialRootBoneRotation;
        private _runtimecontroller;
        private _executed;
        private _checkers;
        private _source;
        private _machine;
        private _deltaPosition;
        private _deltaRotation;
        private _positionWeight;
        private _rootBoneWeight;
        private _rotationWeight;
        private _rootQuatWeight;
        private _angularVelocity;
        private _positionHolder;
        private _rootBoneHolder;
        private _rotationHolder;
        private _rootQuatHolder;
        private _rootMotionMatrix;
        private _rootMotionScaling;
        private _rootMotionRotation;
        private _rootMotionPosition;
        private _lastMotionRotation;
        private _lastMotionPosition;
        private _deltaPositionFixed;
        private _deltaPositionMatrix;
        private _saveDeltaPosition;
        private _saveDeltaRotation;
        private _dirtyMotionMatrix;
        private _dirtyBlenderMatrix;
        private _targetPosition;
        private _targetRotation;
        private _targetScaling;
        private _updateMatrix;
        private _blenderMatrix;
        private _blendWeights;
        private _emptyScaling;
        private _emptyPosition;
        private _emptyRotation;
        private _ikFrameEanbled;
        private _data;
        private _anims;
        private _numbers;
        private _booleans;
        private _triggers;
        private _parameters;
        speedRatio: number;
        applyRootMotion: boolean;
        delayUpdateUntilReady: boolean;
        enableAnimation: boolean;
        updateRootMotionPosition: boolean;
        updateRootMotionRotation: boolean;
        hasRootMotion(): boolean;
        ikFrameEnabled(): boolean;
        getAnimationTime(): number;
        getAnimationPlaying(): boolean;
        getRootMotionAngle(): number;
        getRootMotionSpeed(): number;
        getRootMotionPosition(): BABYLON.Vector3;
        getRootMotionRotation(): BABYLON.Quaternion;
        getCharacterController(): BABYLON.CharacterController;
        getRuntimeController(): string;
        /** Register handler that is triggered when the animation ik setup has been triggered */
        onAnimationIKObservable: Observable<number>;
        /** Register handler that is triggered when the animation end has been triggered */
        onAnimationEndObservable: Observable<number>;
        /** Register handler that is triggered when the animation loop has been triggered */
        onAnimationLoopObservable: Observable<number>;
        /** Register handler that is triggered when the animation event has been triggered */
        onAnimationEventObservable: Observable<IAnimatorEvent>;
        /** Register handler that is triggered when the animation frame has been updated */
        onAnimationUpdateObservable: Observable<TransformNode>;
        protected m_defaultGroup: BABYLON.AnimationGroup;
        protected m_animationTargets: BABYLON.TargetedAnimation[];
        protected m_characterController: BABYLON.CharacterController;
        protected awake(): void;
        protected update(): void;
        protected destroy(): void;
        playAnimation(state: string, transitionDuration?: number, animationLayer?: number, frameRate?: number): boolean;
        stopAnimation(animationLayer?: number): boolean;
        getBool(name: string): boolean;
        setBool(name: string, value: boolean): void;
        getFloat(name: string): float;
        setFloat(name: string, value: float): void;
        getInteger(name: string): int;
        setInteger(name: string, value: int): void;
        getTrigger(name: string): boolean;
        setTrigger(name: string): void;
        resetTrigger(name: string): void;
        setSmoothFloat(name: string, targetValue: float, dampTime: number, deltaTime: number): void;
        setSmoothInteger(name: string, targetValue: int, dampTime: number, deltaTime: number): void;
        private getMachineState;
        private setMachineState;
        getCurrentState(layer: number): BABYLON.MachineState;
        getAnimationGroup(name: string): BABYLON.AnimationGroup;
        getAnimationGroups(): Map<string, BABYLON.AnimationGroup>;
        setAnimationGroups(groups: BABYLON.AnimationGroup[], remapTargets?: boolean): void;
        private awakeStateMachine;
        private updateStateMachine;
        private destroyStateMachine;
        private updateAnimationState;
        private updateAnimationTargets;
        private updateBlendableTargets;
        private finalizeAnimationTargets;
        private checkStateMachine;
        private checkStateTransitions;
        private playCurrentAnimationState;
        private stopCurrentAnimationState;
        private checkAvatarTransformPath;
        private filterTargetAvatarMask;
        private sortWeightedBlendingList;
        private computeWeightedFrameRatio;
        private setupTreeBranches;
        private parseTreeBranches;
        private parse1DSimpleTreeBranches;
        private parse2DSimpleDirectionalTreeBranches;
        private parse2DFreeformDirectionalTreeBranches;
        private parse2DFreeformCartesianTreeBranches;
    }
    class BlendTreeValue {
        source: BABYLON.IBlendTreeChild;
        motion: string;
        posX: number;
        posY: number;
        weight: number;
        constructor(config: {
            source: BABYLON.IBlendTreeChild;
            motion: string;
            posX?: number;
            posY?: number;
            weight?: number;
        });
    }
    class BlendTreeUtils {
        static ClampValue(num: number, min: number, max: number): number;
        static GetSignedAngle(a: BABYLON.Vector2, b: BABYLON.Vector2): number;
        static GetLinearInterpolation(x0: number, y0: number, x1: number, y1: number, x: number): number;
        static GetRightNeighbourIndex(inputX: number, blendTreeArray: BABYLON.BlendTreeValue[]): number;
    }
    class BlendTreeSystem {
        static Calculate1DSimpleBlendTree(inputX: number, blendTreeArray: BABYLON.BlendTreeValue[]): void;
        static Calculate2DFreeformDirectional(inputX: number, inputY: number, blendTreeArray: BABYLON.BlendTreeValue[]): void;
        static Calculate2DFreeformCartesian(inputX: number, inputY: number, blendTreeArray: BABYLON.BlendTreeValue[]): void;
        private static TempVector2_IP;
        private static TempVector2_POSI;
        private static TempVector2_POSJ;
        private static TempVector2_POSIP;
        private static TempVector2_POSIJ;
    }
    class MachineState {
        hash: number;
        name: string;
        tag: string;
        time: number;
        type: BABYLON.MotionType;
        rate: number;
        length: number;
        layer: string;
        layerIndex: number;
        played: number;
        machine: string;
        motionid: number;
        interrupted: boolean;
        apparentSpeed: number;
        averageAngularSpeed: number;
        averageDuration: number;
        averageSpeed: number[];
        cycleOffset: number;
        cycleOffsetParameter: string;
        cycleOffsetParameterActive: boolean;
        iKOnFeet: boolean;
        mirror: boolean;
        mirrorParameter: string;
        mirrorParameterActive: boolean;
        speed: number;
        speedParameter: string;
        speedParameterActive: boolean;
        blendtree: BABYLON.IBlendTree;
        transitions: BABYLON.ITransition[];
        behaviours: BABYLON.IBehaviour[];
        events: BABYLON.IAnimatorEvent[];
        ccurves: BABYLON.IUnityCurve[];
        tcurves: BABYLON.Animation[];
        constructor();
    }
    class TransitionCheck {
        result: string;
        offest: number;
        blending: number;
        triggered: string[];
    }
    class AnimationMixer {
        influenceBuffer: number;
        positionBuffer: BABYLON.Vector3;
        rotationBuffer: BABYLON.Quaternion;
        scalingBuffer: BABYLON.Vector3;
        originalMatrix: BABYLON.Matrix;
        blendingFactor: number;
        blendingSpeed: number;
        rootPosition: BABYLON.Vector3;
        rootRotation: BABYLON.Quaternion;
    }
    class BlendingWeights {
        primary: BABYLON.IBlendTreeChild;
        secondary: BABYLON.IBlendTreeChild;
    }
    enum MotionType {
        Clip = 0,
        Tree = 1
    }
    enum ConditionMode {
        If = 1,
        IfNot = 2,
        Greater = 3,
        Less = 4,
        Equals = 6,
        NotEqual = 7
    }
    enum InterruptionSource {
        None = 0,
        Source = 1,
        Destination = 2,
        SourceThenDestination = 3,
        DestinationThenSource = 4
    }
    enum BlendTreeType {
        Simple1D = 0,
        SimpleDirectional2D = 1,
        FreeformDirectional2D = 2,
        FreeformCartesian2D = 3,
        Direct = 4,
        Clip = 5
    }
    enum BlendTreePosition {
        Lower = 0,
        Upper = 1
    }
    enum AnimatorParameterType {
        Float = 1,
        Int = 3,
        Bool = 4,
        Trigger = 9
    }
    interface IAnimatorEvent {
        id: number;
        clip: string;
        time: number;
        function: string;
        intParameter: number;
        floatParameter: number;
        stringParameter: string;
        objectIdParameter: string;
        objectNameParameter: string;
    }
    interface IAvatarMask {
        hash: number;
        maskName: string;
        maskType: string;
        transformCount: number;
        transformPaths: string[];
    }
    interface IAnimationLayer {
        hash: number;
        name: string;
        index: number;
        entry: string;
        machine: string;
        iKPass: boolean;
        avatarMask: BABYLON.IAvatarMask;
        blendingMode: number;
        defaultWeight: number;
        syncedLayerIndex: number;
        syncedLayerAffectsTiming: boolean;
        animationTime: number;
        animationNormal: number;
        animationMaskMap: Map<string, number>;
        animationFirstRun: boolean;
        animationEndFrame: boolean;
        animationLoopFrame: boolean;
        animationLoopCount: number;
        animationLoopEvents: any;
        animationStateMachine: BABYLON.MachineState;
    }
    interface IAnimationCurve {
        length: number;
        preWrapMode: string;
        postWrapMode: string;
        keyframes: BABYLON.IAnimationKeyframe[];
    }
    interface IAnimationKeyframe {
        time: number;
        value: number;
        inTangent: number;
        outTangent: number;
        tangentMode: number;
    }
    interface IBehaviour {
        hash: number;
        name: string;
        layerIndex: number;
        properties: any;
    }
    interface ITransition {
        hash: number;
        anyState: boolean;
        layerIndex: number;
        machineLayer: string;
        machineName: string;
        canTransitionToSelf: boolean;
        destination: string;
        duration: number;
        exitTime: number;
        hasExitTime: boolean;
        fixedDuration: boolean;
        intSource: BABYLON.InterruptionSource;
        isExit: boolean;
        mute: boolean;
        name: string;
        offset: number;
        orderedInt: boolean;
        solo: boolean;
        conditions: BABYLON.ICondition[];
    }
    interface ICondition {
        hash: number;
        mode: BABYLON.ConditionMode;
        parameter: string;
        threshold: number;
    }
    interface IBlendTree {
        hash: number;
        name: string;
        state: string;
        children: BABYLON.IBlendTreeChild[];
        layerIndex: number;
        apparentSpeed: number;
        averageAngularSpeed: number;
        averageDuration: number;
        averageSpeed: number[];
        blendParameterX: string;
        blendParameterY: string;
        blendType: BABYLON.BlendTreeType;
        isAnimatorMotion: boolean;
        isHumanMotion: boolean;
        isLooping: boolean;
        minThreshold: number;
        maxThreshold: number;
        useAutomaticThresholds: boolean;
        valueParameterX: number;
        valueParameterY: number;
    }
    interface IBlendTreeChild {
        hash: number;
        layerIndex: number;
        cycleOffset: number;
        directBlendParameter: string;
        apparentSpeed: number;
        averageAngularSpeed: number;
        averageDuration: number;
        averageSpeed: number[];
        mirror: boolean;
        type: BABYLON.MotionType;
        motion: string;
        positionX: number;
        positionY: number;
        threshold: number;
        timescale: number;
        subtree: BABYLON.IBlendTree;
        weight: number;
        ratio: number;
        track: BABYLON.AnimationGroup;
    }
}
declare module BABYLON {
    /**
     * Babylon audio source manager pro class
     * @class AudioSource - All rights reserved (c) 2020 Mackey Kinard
     */
    class AudioSource extends BABYLON.ScriptComponent implements BABYLON.IAssetPreloader {
        private _audio;
        private _name;
        private _loop;
        private _mute;
        private _pitch;
        private _volume;
        private _preload;
        private _priority;
        private _panstereo;
        private _mindistance;
        private _maxdistance;
        private _rolloffmode;
        private _rollofffactor;
        private _playonawake;
        private _spatialblend;
        private _preloaderUrl;
        private _reverbzonemix;
        private _lastmutedvolume;
        private _bypasseffects;
        private _bypassreverbzones;
        private _bypasslistenereffects;
        private _initializedReadyInstance;
        getSoundClip(): BABYLON.Sound;
        getAudioElement(): HTMLAudioElement;
        /** Register handler that is triggered when the audio clip is ready */
        onReadyObservable: Observable<Sound>;
        protected awake(): void;
        protected destroy(): void;
        protected awakeAudioSource(): void;
        protected destroyAudioSource(): void;
        /**
         * Gets the ready status for track
         */
        isReady(): boolean;
        /**
         * Gets the playing status for track
         */
        isPlaying(): boolean;
        /**
         * Gets the paused status for track
         */
        isPaused(): boolean;
        /**
         * Play the sound track
         * @param time (optional) Start the sound after X seconds. Start immediately (0) by default.
         * @param offset (optional) Start the sound at a specific time in seconds
         * @param length (optional) Sound duration (in seconds)
         */
        play(time?: number, offset?: number, length?: number): boolean;
        private internalPlay;
        /**
         * Pause the sound track
         */
        pause(): boolean;
        /**
         * Stop the sound track
         * @param time (optional) Start the sound after X seconds. Start immediately (0) by default.
         */
        stop(time?: number): boolean;
        /**
         * Mute the sound track
         * @param time (optional) Mute the sound after X seconds. Start immediately (0) by default.
         */
        mute(time?: number): boolean;
        /**
         * Unmute the sound track
         * @param time (optional) Unmute the sound after X seconds. Start immediately (0) by default.
         */
        unmute(time?: number): boolean;
        /**
         * Gets the volume of the track
         */
        getVolume(): number;
        /**
         * Sets the volume of the track
         * @param volume Define the new volume of the sound
         * @param time Define time for gradual change to new volume
         */
        setVolume(volume: number, time?: number): boolean;
        /**
         * Gets the spatial sound option of the track
         */
        getSpatialSound(): boolean;
        /**
         * Gets the spatial sound option of the track
         * @param value Define the value of the spatial sound
         */
        setSpatialSound(value: boolean): void;
        /**
         * Sets the sound track playback speed
         * @param rate the audio playback rate
         */
        setPlaybackSpeed(rate: number): void;
        /**
         * Gets the current time of the track
         */
        getCurrentTrackTime(): number;
        /** Set audio data source */
        setDataSource(source: string | ArrayBuffer | MediaStream): void;
        /** Add audio preloader asset tasks (https://doc.babylonjs.com/divingDeeper/importers/assetManager) */
        addPreloaderTasks(assetsManager: BABYLON.PreloadAssetsManager): void;
    }
}
declare module BABYLON {
    /**
     * Babylon kinematic character controller pro class (Native Bullet Physics 2.82)
     * @class CharacterController - All rights reserved (c) 2020 Mackey Kinard
     */
    class CharacterController extends BABYLON.ScriptComponent {
        private _abstractMesh;
        private _avatarRadius;
        private _avatarHeight;
        private _centerOffset;
        private _slopeLimit;
        private _skinWidth;
        private _stepOffset;
        private _capsuleSegments;
        private _minMoveDistance;
        private _isPhysicsReady;
        private _maxCollisions;
        private _createCylinderShape;
        private _movementVelocity;
        private _tmpPositionBuffer;
        private _tmpCollisionContacts;
        updatePosition: boolean;
        syncGhostToTransform: boolean;
        preCreateCylinderShape(): void;
        getInternalCharacter(): any;
        getCollisionShape(): any;
        getAvatarRadius(): number;
        getAvatarHeight(): number;
        getSkinWidth(): number;
        getStepOffset(): number;
        getCenterOffset(): BABYLON.Vector3;
        getCapsuleSize(): BABYLON.Vector3;
        getMinMoveDistance(): number;
        setMinMoveDistance(distance: number): void;
        getVerticalVelocity(): number;
        getAddedMargin(): number;
        setAddedMargin(margin: number): void;
        setMaxJumpHeight(maxJumpHeight: number): void;
        setFallingSpeed(fallSpeed: number): void;
        getSlopeLimit(): number;
        setSlopeLimit(slopeRadians: number): void;
        setUpAxis(axis: number): void;
        getGravity(): number;
        setGravity(gravity: number): void;
        isGrounded(): boolean;
        isReady(): boolean;
        canJump(): boolean;
        /** Register handler that is triggered when the transform position has been updated */
        onUpdatePositionObservable: Observable<TransformNode>;
        /** Register handler that is triggered when the a collision contact has entered */
        onCollisionEnterObservable: Observable<AbstractMesh>;
        /** Register handler that is triggered when the a collision contact is active */
        onCollisionStayObservable: Observable<AbstractMesh>;
        /** Register handler that is triggered when the a collision contact has exited */
        onCollisionExitObservable: Observable<AbstractMesh>;
        protected m_character: any;
        protected m_ghostShape: any;
        protected m_ghostObject: any;
        protected m_ghostCollision: any;
        protected m_ghostTransform: any;
        protected m_ghostPosition: any;
        protected m_startPosition: any;
        protected m_startTransform: any;
        protected m_walkDirection: any;
        protected m_warpPosition: any;
        protected m_turningRate: number;
        protected m_moveDeltaX: number;
        protected m_moveDeltaZ: number;
        protected m_capsuleSize: BABYLON.Vector3;
        protected m_physicsEngine: BABYLON.IPhysicsEngine;
        protected m_characterPosition: BABYLON.Vector3;
        protected internalWarp(position: any): void;
        protected internalJump(): void;
        protected internalSetJumpSpeed(speed: number): void;
        protected internalSetWalkDirection(direction: any): void;
        protected internalSetVelocityForTimeInterval(velocity: any, interval: number): void;
        protected awake(): void;
        protected start(): void;
        protected update(): void;
        protected destroy(): void;
        protected awakeMovementState(): void;
        protected startMovementState(): void;
        protected setupMovementState(): void;
        protected syncMovementState(): void;
        protected updateMovementState(): void;
        protected parseGhostCollisionContacts(): void;
        protected destroyMovementState(): void;
        /** Gets the ghost collision shape margin value. (Advanved Use Only) */
        getGhostMargin(): number;
        /** Sets ghost collision shape margin value. (Advanved Use Only) */
        setGhostMargin(margin: number): void;
        /** Gets character slope slide patch state using physics ghost object. (Advanved Use Only) */
        getUseSlopeSlidePatch(): boolean;
        /** Sets character slope slide patch state using physics ghost object. (Advanved Use Only) */
        setUseSlopeSlidePatch(use: boolean): void;
        /** Sets the maximum number of simultaneous contact notfications to dispatch per frame. Defaults value is 4. (Advanved Use Only) */
        setMaxNotifications(max: number): void;
        /** Sets character collision activation state using physics ghost object. (Advanved Use Only) */
        setActivationState(state: number): void;
        /** Gets character collision group filter using physics ghost object. (Advanved Use Only) */
        getCollisionFilterGroup(): number;
        /** Sets character collision group filter using physics ghost object. (Advanved Use Only) */
        setCollisionFilterGroup(group: number): void;
        /** Gets character collision mask filter using physics ghost object. (Advanved Use Only) */
        getCollisionFilterMask(): number;
        /** Sets the character collision mask filter using physics ghost object. (Advanved Use Only) */
        setCollisionFilterMask(mask: number): void;
        /** Gets the chracter contact processing threshold using physics ghost object. (Advanved Use Only) */
        getContactProcessingThreshold(): number;
        /** Sets character contact processing threshold using physics ghost object. (Advanved Use Only) */
        setContactProcessingThreshold(threshold: number): void;
        /** Get the current position of the physics ghost object world transform. (Advanved Use Only) */
        getGhostWorldPosition(): BABYLON.Vector3;
        /** Get the current position of the physics ghost object world transform. (Advanved Use Only) */
        getGhostWorldPositionToRef(result: BABYLON.Vector3): void;
        /** Manually set the position of the physics ghost object world transform. (Advanved Use Only) */
        setGhostWorldPosition(position: BABYLON.Nullable<BABYLON.Vector3>): void;
        /** Set ghost collision shape local scaling. (Advanved Use Only) */
        scaleGhostCollisionShape(x: number, y: number, z: number): void;
        /** Sets the kinematic character position to the specified location. */
        set(x: number, y: number, z: number): void;
        /** Translates the kinematic character with the specfied velocity. */
        move(velocity: BABYLON.Vector3): void;
        /** Jumps the kinematic chacracter with the specified speed. */
        jump(speed: number): void;
        /** Warps the kinematic chacracter to the specified position. */
        warp(position: BABYLON.Vector3): void;
    }
}
declare module BABYLON {
    /**
     * Babylon navigation agent pro class (Unity Style Navigation Agent System)
     * @class NavigationAgent - All rights reserved (c) 2020 Mackey Kinard
     */
    class NavigationAgent extends BABYLON.ScriptComponent {
        private static TARGET_ANGLE_FACTOR;
        private static ANGULAR_SPEED_RATIO;
        private type;
        private speed;
        private baseOffset;
        private avoidRadius;
        private avoidHeight;
        private acceleration;
        private areaMask;
        private autoRepath;
        private autoBraking;
        private autoTraverseOffMeshLink;
        private avoidancePriority;
        private obstacleAvoidanceType;
        private distanceToTarget;
        private teleporting;
        private moveDirection;
        private resetPosition;
        private lastPosition;
        private distancePosition;
        private currentPosition;
        private currentRotation;
        private currentVelocity;
        private currentWaypoint;
        heightOffset: number;
        angularSpeed: number;
        updatePosition: boolean;
        updateRotation: boolean;
        distanceEpsilon: number;
        velocityEpsilon: number;
        offMeshVelocity: number;
        stoppingDistance: number;
        isReady(): boolean;
        isNavigating(): boolean;
        isTeleporting(): boolean;
        isOnOffMeshLink(): boolean;
        getAgentType(): number;
        getAgentState(): number;
        getAgentIndex(): number;
        getAgentOffset(): number;
        getTargetDistance(): number;
        getCurrentPosition(): BABYLON.Vector3;
        getCurrentRotation(): BABYLON.Quaternion;
        getCurrentVelocity(): BABYLON.Vector3;
        getAgentParameters(): BABYLON.IAgentParameters;
        setAgentParameters(parameters: BABYLON.IAgentParameters): void;
        /** Register handler that is triggered when the agent is ready for navigation */
        onReadyObservable: Observable<TransformNode>;
        /** Register handler that is triggered before the navigation update */
        onPreUpdateObservable: Observable<TransformNode>;
        /** Register handler that is triggered after the navigation update */
        onPostUpdateObservable: Observable<TransformNode>;
        /** Register handler that is triggered when the navigation is complete */
        onNavCompleteObservable: Observable<TransformNode>;
        protected m_agentState: number;
        protected m_agentIndex: number;
        protected m_agentReady: boolean;
        protected m_agentGhost: BABYLON.TransformNode;
        protected m_agentParams: BABYLON.IAgentParameters;
        protected m_agentMovement: BABYLON.Vector3;
        protected m_agentDirection: BABYLON.Vector3;
        protected m_agentQuaternion: BABYLON.Quaternion;
        protected m_agentDestination: BABYLON.Vector3;
        protected awake(): void;
        protected update(): void;
        protected destroy(): void;
        private awakeNavigationAgent;
        private updateNavigationAgent;
        private updateAgentParameters;
        private destroyNavigationAgent;
        /** Move agent relative to current position. */
        move(offset: BABYLON.Vector3, closetPoint?: boolean): void;
        /** Teleport agent to destination point. */
        teleport(destination: BABYLON.Vector3, closetPoint?: boolean): void;
        /** Sets agent current destination point. */
        setDestination(destination: BABYLON.Vector3, closetPoint?: boolean): void;
        /** Gets agent current world space velocity. */
        getAgentVelocity(): BABYLON.Vector3;
        /** Gets agent current world space velocity. */
        getAgentVelocityToRef(result: BABYLON.Vector3): void;
        /** Gets agent current world space position. */
        getAgentPosition(): BABYLON.Vector3;
        /** Gets agent current world space position. */
        getAgentPositionToRef(result: BABYLON.Vector3): void;
        /** Gets agent current waypoint position. */
        getAgentWaypoint(): BABYLON.Vector3;
        /** Gets agent current waypoint position. */
        getAgentWaypointToRef(result: BABYLON.Vector3): void;
        /** Cancel current waypoint path navigation. */
        cancelNavigation(): void;
    }
    /**
     *  Recast Detour Crowd Agent States
     */
    enum CrowdAgentState {
        DT_CROWDAGENT_STATE_INVALID = 0,
        DT_CROWDAGENT_STATE_WALKING = 1,
        DT_CROWDAGENT_STATE_OFFMESH = 2
    }
}
declare module BABYLON {
    /**
     * Babylon raycast vehicle controller pro class (Native Bullet Physics 2.82)
     * @class RaycastVehicle - All rights reserved (c) 2020 Mackey Kinard
     */
    class RaycastVehicle {
        private static TempAmmoVector;
        private _centerMass;
        private _chassisMesh;
        private _tempVectorPos;
        lockedWheelIndexes: number[];
        getCenterMassOffset(): BABYLON.Vector3;
        getInternalVehicle(): any;
        getUpAxis(): number;
        getRightAxis(): number;
        getForwardAxis(): number;
        getForwardVector(): any;
        getNumWheels(): number;
        getWheelInfo(wheel: number): any;
        resetSuspension(): void;
        setPitchControl(pitch: number): void;
        setEngineForce(power: number, wheel: number): void;
        setBrakingForce(brake: number, wheel: number): void;
        getWheelTransform(wheel: number): any;
        updateWheelTransform(wheel: number, interpolate: boolean): void;
        getUserConstraintType(): number;
        setUserConstraintType(userConstraintType: number): void;
        setUserConstraintId(uid: number): void;
        getUserConstraintId(): number;
        getRawCurrentSpeedKph(): number;
        getRawCurrentSpeedMph(): number;
        getAbsCurrentSpeedKph(): number;
        getAbsCurrentSpeedMph(): number;
        getVehicleTuningSystem(): any;
        getChassisWorldTransform(): any;
        protected m_vehicle: any;
        protected m_vehicleTuning: any;
        protected m_vehicleRaycaster: any;
        protected m_vehicleColliders: any[];
        protected m_tempTransform: any;
        protected m_tempPosition: any;
        protected m_wheelDirectionCS0: any;
        protected m_wheelAxleCS: any;
        constructor(entity: BABYLON.AbstractMesh, world: any, center: BABYLON.Vector3, defaultAngularFactor?: BABYLON.Vector3);
        dispose(): void;
        /** Gets the rigidbody raycast vehicle controller for the entity. Note: Wheel collider metadata informaion is required for raycast vehicle control. */
        static GetInstance(scene: BABYLON.Scene, rigidbody: BABYLON.RigidbodyPhysics, defaultAngularFactor?: BABYLON.Vector3): BABYLON.RaycastVehicle;
        /** Gets vehicle enable multi raycast flag using physics vehicle object. (Advanved Use Only) */
        getEnableMultiRaycast(): boolean;
        /** Sets vehicle enable multi raycast flag using physics vehicle object. (Advanved Use Only) */
        setEnableMultiRaycast(flag: boolean): void;
        /** Gets vehicle stable force using physics vehicle object. (Advanved Use Only) */
        getStabilizingForce(): number;
        /** Sets vehicle stable force using physics vehicle object. (Advanved Use Only) */
        setStabilizingForce(force: number): void;
        /** Gets vehicle max stable force using physics vehicle object. (Advanved Use Only) */
        getMaxImpulseForce(): number;
        /** Sets vehicle max stable force using physics vehicle object. (Advanved Use Only) */
        setMaxImpulseForce(force: number): void;
        /** Gets vehicle smooth flying impulse force using physics vehicle object. (Advanved Use Only) */
        getSmoothFlyingImpulse(): number;
        /** Sets vehicle smooth flying impulse using physics vehicle object. (Advanved Use Only) */
        setSmoothFlyingImpulse(impulse: number): void;
        /** Gets vehicle track connection accel force using physics vehicle object. (Advanved Use Only) */
        getTrackConnectionAccel(): number;
        /** Sets vehicle track connection accel force using physics vehicle object. (Advanved Use Only) */
        setTrackConnectionAccel(force: number): void;
        /** Gets vehicle min wheel contact count using physics vehicle object. (Advanved Use Only) */
        getMinimumWheelContacts(): number;
        /** Sets vehicle min wheel contact count using physics vehicle object. (Advanved Use Only) */
        setMinimumWheelContacts(force: number): void;
        /** Gets vehicle interpolate mesh normals flag using physics raycaster object. (Advanved Use Only) */
        getInterpolateNormals(): boolean;
        /** Sets the vehicle interpolate mesh normals using physics raycaster object. (Advanved Use Only) */
        setInterpolateNormals(flag: boolean): void;
        /** Gets vehicle shape testing mode using physics raycaster object. (Advanved Use Only) */
        getShapeTestingMode(): boolean;
        /** Sets the vehicle shape testing mode using physics raycaster object. (Advanved Use Only) */
        setShapeTestingMode(mode: boolean): void;
        /** Gets vehicle shape testing size using physics raycaster object. (Advanved Use Only) */
        getShapeTestingSize(): float;
        /** Sets the vehicle shape testing mode using physics raycaster object. (Advanved Use Only) */
        setShapeTestingSize(size: float): void;
        /** Gets vehicle shape test point count using physics raycaster object. (Advanved Use Only) */
        getShapeTestingCount(): float;
        /** Sets the vehicle shape test point count using physics raycaster object. (Advanved Use Only) */
        setShapeTestingCount(count: float): void;
        /** Gets vehicle sweep penetration amount using physics raycaster object. (Advanved Use Only) */
        getSweepPenetration(): float;
        /** Sets the vehicle sweep penetration amount using physics raycaster object. (Advanved Use Only) */
        setSweepPenetration(amount: float): void;
        /** Gets vehicle collision group filter using physics raycaster object. (Advanved Use Only) */
        getCollisionFilterGroup(): number;
        /** Sets vehicle collision group filter using physics raycaster object. (Advanved Use Only) */
        setCollisionFilterGroup(group: number): void;
        /** Gets vehicle collision mask filter using physics raycaster object. (Advanved Use Only) */
        getCollisionFilterMask(): number;
        /** Sets the vehicle collision mask filter using physics raycaster object. (Advanved Use Only) */
        setCollisionFilterMask(mask: number): void;
        /** Gets the internal wheel index by id string. */
        getWheelIndexByID(id: string): number;
        /** Gets the internal wheel index by name string. */
        getWheelIndexByName(name: string): number;
        /** Gets the internal wheel collider information. */
        getWheelColliderInfo(wheel: number): number;
        /** Sets the internal wheel hub transform mesh by index. Used to rotate and bounce wheels. */
        setWheelTransformMesh(wheel: number, transform: BABYLON.TransformNode): void;
        getVisualSteeringAngle(wheel: number): number;
        setVisualSteeringAngle(angle: number, wheel: number): void;
        getPhysicsSteeringAngle(wheel: number): number;
        setPhysicsSteeringAngle(angle: number, wheel: number): void;
        protected setupWheelInformation(defaultAngularFactor?: BABYLON.Vector3): void;
        protected updateWheelInformation(): void;
        protected lockedWheelInformation(wheel: number): boolean;
        protected deleteWheelInformation(): void;
    }
}
declare module BABYLON {
    /**
     * Babylon realtime reflection system pro class (Unity Style Realtime Reflection Probes)
     * @class RealtimeReflection - All rights reserved (c) 2020 Mackey Kinard
     */
    class RealtimeReflection extends BABYLON.ScriptComponent {
        private static SKYBOX_FLAG;
        private renderList;
        private probeList;
        private refreshMode;
        private cullingMask;
        private clearFlags;
        private probeid;
        private useProbeList;
        private includeChildren;
        private resolution;
        private boxPos;
        private boxSize;
        private boxProjection;
        getProbeList(): BABYLON.AbstractMesh[];
        getRenderList(): BABYLON.AbstractMesh[];
        protected awake(): void;
        protected start(): void;
        protected destroy(): void;
        protected awakeRealtimReflections(): void;
        protected startRealtimReflections(): void;
        protected destroyRealtimReflections(): void;
    }
}
declare module BABYLON {
    /**
     * Babylon full rigidbody physics pro class (Native Bullet Physics 2.82)
     * @class RigidbodyPhysics - All rights reserved (c) 2020 Mackey Kinard
     */
    class RigidbodyPhysics extends BABYLON.ScriptComponent {
        private static TempAmmoVector;
        private static TempAmmoVectorAux;
        private static TempCenterTransform;
        private _abstractMesh;
        private _isKinematic;
        private _maxCollisions;
        private _isPhysicsReady;
        private _collisionObject;
        private _centerOfMass;
        private _tmpLinearFactor;
        private _tmpAngularFactor;
        private _tmpCenterOfMass;
        private _tmpCollisionContacts;
        get isKinematic(): boolean;
        get centerOfMass(): BABYLON.Vector3;
        /** Register handler that is triggered when the a collision contact has entered */
        onCollisionEnterObservable: Observable<AbstractMesh>;
        /** Register handler that is triggered when the a collision contact is active */
        onCollisionStayObservable: Observable<AbstractMesh>;
        /** Register handler that is triggered when the a collision contact has exited */
        onCollisionExitObservable: Observable<AbstractMesh>;
        protected m_physicsWorld: any;
        protected m_physicsEngine: BABYLON.IPhysicsEngine;
        protected m_raycastVehicle: any;
        protected awake(): void;
        protected update(): void;
        protected after(): void;
        protected destroy(): void;
        protected awakeRigidbodyState(): void;
        protected updateRigidbodyState(): void;
        protected afterRigidbodyState(): void;
        protected destroyRigidbodyState(): void;
        protected syncronizeVehicleController(): void;
        protected parseBodyCollisionContacts(): void;
        protected resetBodyCollisionContacts(): void;
        /** Sets entity gravity value using physics impostor body. */
        setGravity(gravity: BABYLON.Vector3): void;
        /** Gets entity gravity value using physics impostor body. */
        getGravity(): BABYLON.Nullable<BABYLON.Vector3>;
        /** Gets entity gravity value using physics impostor body. */
        getGravityToRef(result: BABYLON.Vector3): void;
        /** Gets mass of entity using physics impostor. */
        getMass(): number;
        /** Sets mass to entity using physics impostor. */
        setMass(mass: number): void;
        /** Gets entity friction level using physics impostor. */
        getFriction(): number;
        /** Applies friction to entity using physics impostor. */
        setFriction(friction: number): void;
        /** Gets restitution of entity using physics impostor. */
        getRestitution(): number;
        /** Sets restitution to entity using physics impostor. */
        setRestitution(restitution: number): void;
        /** Gets entity linear velocity using physics impostor. */
        getLinearVelocity(): BABYLON.Nullable<BABYLON.Vector3>;
        /** Sets entity linear velocity using physics impostor. */
        setLinearVelocity(velocity: BABYLON.Vector3): void;
        /** Gets entity angular velocity using physics impostor. */
        getAngularVelocity(): BABYLON.Nullable<BABYLON.Vector3>;
        /** Sets entity angular velocity using physics impostor. */
        setAngularVelocity(velocity: BABYLON.Vector3): void;
        /** Gets the native physics world transform object using physics impostor body. (Ammo.btTransform) */
        getWorldTransform(): any;
        /** sets the native physics world transform object using physics impostor body. (Ammo.btTransform) */
        setWorldTransform(btTransform: any): any;
        clearForces(): void;
        applyTorque(torque: BABYLON.Vector3): void;
        applyLocalTorque(torque: BABYLON.Vector3): void;
        applyImpulse(impulse: BABYLON.Vector3, rel_pos: BABYLON.Vector3): void;
        applyCentralImpulse(impulse: BABYLON.Vector3): void;
        applyTorqueImpulse(torque: BABYLON.Vector3): void;
        applyForce(force: BABYLON.Vector3, rel_pos: BABYLON.Vector3): void;
        applyCentralForce(force: BABYLON.Vector3): void;
        applyCentralLocalForce(force: BABYLON.Vector3): void;
        /** gets rigidbody center of mass */
        getCenterOfMassTransform(): BABYLON.Vector3;
        /** Sets rigidbody center of mass */
        setCenterOfMassTransform(center: BABYLON.Vector3): void;
        /** Gets entity linear factor using physics impostor body. */
        getLinearFactor(): BABYLON.Vector3;
        /** Sets entity linear factor using physics impostor body. */
        setLinearFactor(factor: BABYLON.Vector3): void;
        /** Gets entity angular factor using physics impostor body. */
        getAngularFactor(): BABYLON.Vector3;
        /** Sets entity angular factor using physics impostor body. */
        setAngularFactor(factor: BABYLON.Vector3): void;
        /** Gets entity angular damping using physics impostor body. */
        getAngularDamping(): number;
        /** Gets entity linear damping using physics impostor body. */
        getLinearDamping(): number;
        /** Sets entity drag damping using physics impostor body. */
        setDamping(linear: number, angular: number): void;
        /** Sets entity sleeping threshold using physics impostor body. */
        setSleepingThresholds(linear: number, angular: number): void;
        /** Checks if rigidbody has wheel collider metadata for the entity. Note: Wheel collider metadata informaion is required for vehicle control. */
        hasWheelColliders(): boolean;
        /** Sets the maximum number of simultaneous contact notfications to dispatch per frame. Defaults value is 4. (Advanved Use Only) */
        setMaxNotifications(max: number): void;
        /** Sets entity collision activation state using physics impostor body. (Advanved Use Only) */
        setActivationState(state: number): void;
        /** Gets entity collision filter group using physics impostor body. (Advanved Use Only) */
        getCollisionFilterGroup(): number;
        /** Sets entity collision filter group using physics impostor body. (Advanved Use Only) */
        setCollisionFilterGroup(group: number): void;
        /** Gets entity collision filter mask using physics impostor body. (Advanved Use Only) */
        getCollisionFilterMask(): number;
        /** Sets entity collision filter mask using physics impostor body. (Advanved Use Only) */
        setCollisionFilterMask(mask: number): void;
        /** Gets the entity collision shape type using physics impostor body. (Advanved Use Only) */
        getCollisionShapeType(): number;
        /** Gets the entity collision shape margin using physics impostor body. (Advanved Use Only) */
        getCollisionShapeMargin(): number;
        /** Sets entity collision shape margin using physics impostor body. (Advanved Use Only) */
        setCollisionShapeMargin(margin: number): void;
        /** Gets the entity contact processing threshold using physics impostor body. (Advanved Use Only) */
        /** Sets entity contact processing threshold using physics impostor body. (Advanved Use Only) */
        setContactProcessingThreshold(threshold: number): void;
        /** TODO */
        static CreatePhysicsMetadata(mass: number, drag?: number, angularDrag?: number, centerMass?: Vector3): any;
        /** TODO */
        static CreateCollisionMetadata(type: string, trigger?: boolean, convexmesh?: boolean, restitution?: number, dynamicfriction?: number, staticfriction?: number): any;
        /** TODO */
        static CreatePhysicsProperties(mass: number, drag?: number, angularDrag?: number, useGravity?: boolean, isKinematic?: boolean): any;
        /** TODO */
        static SetupPhysicsComponent(scene: BABYLON.Scene, entity: BABYLON.AbstractMesh): void;
        private static ConfigRigidbodyPhysics;
    }
    /**
     * Babylon collision contact info pro class (Native Bullet Physics 2.82)
     * @class CollisionContactInfo - All rights reserved (c) 2020 Mackey Kinard
     */
    class CollisionContactInfo {
        mesh: BABYLON.AbstractMesh;
        state: number;
        reset: boolean;
    }
}
declare module BABYLON {
    /**
     * Babylon shuriken particle system pro class (Unity Style Shuriken Particle System)
     * @class ShurikenParticles - All rights reserved (c) 2020 Mackey Kinard
     */
    class ShurikenParticles extends BABYLON.ScriptComponent {
        protected awake(): void;
        protected start(): void;
        protected ready(): void;
        protected update(): void;
        protected late(): void;
        protected after(): void;
        protected fixed(): void;
        protected destroy(): void;
    }
}
declare module BABYLON {
    /**
     * Babylon terrain building system pro class (Unity Style Terrain Building System)
     * @class TerrainGenerator - All rights reserved (c) 2020 Mackey Kinard
     */
    class TerrainGenerator extends BABYLON.ScriptComponent {
        private treeInstances;
        protected awake(): void;
        protected start(): void;
        protected ready(): void;
        protected update(): void;
        protected late(): void;
        protected after(): void;
        protected fixed(): void;
        protected destroy(): void;
    }
}
declare module BABYLON {
    /**
     * Babylon web video player pro class (Unity Style Shuriken Particle System)
     * @class WebVideoPlayer - All rights reserved (c) 2020 Mackey Kinard
     */
    class WebVideoPlayer extends BABYLON.ScriptComponent implements BABYLON.IAssetPreloader {
        private videoLoop;
        private videoMuted;
        private videoAlpha;
        private videoFaded;
        private videoPoster;
        private videoInvert;
        private videoSample;
        private videoVolume;
        private videoMipmaps;
        private videoPlayback;
        private videoPlayOnAwake;
        private videoPreloaderUrl;
        private videoBlobUrl;
        private videoPreload;
        private _initializedReadyInstance;
        getVideoMaterial(): BABYLON.StandardMaterial;
        getVideoTexture(): BABYLON.VideoTexture;
        getVideoElement(): HTMLVideoElement;
        getVideoScreen(): BABYLON.AbstractMesh;
        getVideoBlobUrl(): string;
        /** Register handler that is triggered when the video clip is ready */
        onReadyObservable: Observable<VideoTexture>;
        protected m_abstractMesh: BABYLON.AbstractMesh;
        protected m_videoTexture: BABYLON.VideoTexture;
        protected m_videoMaterial: BABYLON.StandardMaterial;
        protected m_diffuseIntensity: number;
        protected awake(): void;
        protected destroy(): void;
        protected awakeWebVideoPlayer(): void;
        protected destroyWebVideoPlayer(): void;
        /**
         * Gets the video ready status
         */
        isReady(): boolean;
        /**
         * Gets the video playing status
         */
        isPlaying(): boolean;
        /**
         * Gets the video paused status
         */
        isPaused(): boolean;
        /**
         * Play the video track
         */
        play(): boolean;
        private internalPlay;
        private checkedPlay;
        private checkedRePlay;
        /**
         * Pause the video track
         */
        pause(): boolean;
        /**
         * Mute the video track
         */
        mute(): boolean;
        /**
         * Unmute the video track
         */
        unmute(): boolean;
        /**
         * Gets the video volume
         */
        getVolume(): number;
        /**
         * Sets the video volume
         * @param volume Define the new volume of the sound
         */
        setVolume(volume: number): boolean;
        /** Set video data source */
        setDataSource(source: string | string[] | HTMLVideoElement): void;
        /** Revokes the current video blob url and releases resouces */
        revokeVideoBlobUrl(): void;
        /** Add video preloader asset tasks (https://doc.babylonjs.com/divingDeeper/importers/assetManager) */
        addPreloaderTasks(assetsManager: BABYLON.PreloadAssetsManager): void;
    }
}
