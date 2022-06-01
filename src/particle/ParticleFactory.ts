import { Scene, GPUParticleSystem, Color4 } from "@babylonjs/core";
import { ExplosionParticle } from "./ExplosionParticle";
import { SphereParticle } from "./SphereParticle";

export abstract class ParticleFactory {
  public static createSphereParticle(
    scene: Scene,
    color: Color4[],
    sphereSize: number,
    minSize: number,
    maxSize: number,
    minEmitPower: number,
    maxEmitPower: number,
    emitRate: number,
    minLifeTime: number,
    maxLifeTime: number,
    capacity: number = 20000
  ): GPUParticleSystem {
    let sphereParticle = new SphereParticle("", { capacity: capacity }, scene);

    sphereParticle.createParticles(
      color,
      sphereSize,
      { minSize: minSize, maxSize: maxSize },
      {
        minEmitPower: minEmitPower,
        maxEmitPower: maxEmitPower,
        emitRate: emitRate,
      },
      { minLifeTime: minLifeTime, maxLifeTime: maxLifeTime }
    );

    return sphereParticle;
  }

  public static createSpheresParticle(
    sphereCount: number,
    scene: Scene,
    colors: Color4[][],
    sphereSize: number,
    minSize: number,
    maxSize: number,
    minEmitPower: number,
    maxEmitPower: number,
    emitRate: number,
    minLifeTime: number,
    maxLifeTime: number,
    capacity: number = 20000
  ): GPUParticleSystem[] {
    let sphereParticles: GPUParticleSystem[] = [];
    for (let i = 0; i < sphereCount; i++) {
      sphereParticles.push(
        ParticleFactory.createSphereParticle(
          scene,
          colors[i],
          sphereSize,
          minSize,
          maxSize,
          minEmitPower,
          maxEmitPower,
          emitRate,
          minLifeTime,
          maxLifeTime,
          capacity
        )
      );
    }

    return sphereParticles;
  }

  public static createExplosionParticle(
    scene: Scene,
    color: Color4[],
    sphereSize: number,
    minSize: number,
    maxSize: number,
    minLifeTime: number,
    maxLifeTime: number,
    capacity: number = 20000
  ): GPUParticleSystem {
    let explosionParticle = new ExplosionParticle(
      "Explosion",
      { capacity: capacity },
      scene
    );

    explosionParticle.createParticles(
      color,
      sphereSize,
      { minSize: minSize, maxSize: maxSize },
      {
        minLifeTime: minLifeTime,
        maxLifeTime: maxLifeTime,
      }
    );

    return explosionParticle;
  }
}
