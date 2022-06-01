import {
  GPUParticleSystem,
  Scene,
  ThinEngine,
  Color4,
  Texture,
  Vector3,
} from "@babylonjs/core";

export class ExplosionParticle extends GPUParticleSystem {
  constructor(
    name: string,
    options: Partial<{
      capacity: number;
      randomTextureSize: number;
    }>,
    sceneOrEngine: Scene | ThinEngine
  ) {
    super(name, options, sceneOrEngine);
  }

  public createParticles(
    color: Color4[],
    sphereSize: number,
    sizes: Partial<{
      minSize: number;
      maxSize: number;
    }>,
    life: Partial<{
      minLifeTime: number;
      maxLifeTime: number;
    }>
  ): void {
    this.particleTexture = new Texture(
      "https://www.babylonjs-playground.com/textures/flare.png",
      this._scene
    );
    this.emitter = Vector3.Zero();

    this.color1 = color[0];
    this.color2 = color[1];
    this.colorDead = color[2];

    this.minSize = sizes.minSize;
    this.maxSize = sizes.maxSize;

    this.minLifeTime = life.minLifeTime;
    this.maxLifeTime = life.maxLifeTime;

    this.createSphereEmitter(sphereSize);
    this.gravity = new Vector3(0, this._scene.getPhysicsEngine().gravity.y, 0);
    this.minEmitPower = 1;
    this.maxEmitPower = 2;
    this.emitRate = 200;
    this.updateSpeed = 0.005;
  }
}
