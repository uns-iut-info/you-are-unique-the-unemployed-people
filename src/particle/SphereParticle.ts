import {
  GPUParticleSystem,
  Scene,
  ThinEngine,
  Color4,
  Texture,
  Vector3,
} from "@babylonjs/core";

export class SphereParticle extends GPUParticleSystem {
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
    powers: Partial<{
      minEmitPower: number;
      maxEmitPower: number;
      emitRate: number;
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

    this.minEmitPower = powers.minEmitPower;
    this.maxEmitPower = powers.maxEmitPower;
    this.emitRate = powers.emitRate;

    this.updateSpeed = 0.005;
  }
}
