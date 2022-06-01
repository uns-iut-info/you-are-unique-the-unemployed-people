import { Scene, Sound } from "@babylonjs/core";
import { ISoundData, SoundType } from "../data/ISoundData";

export class SoundManager {
    private _scene: Scene;
    private _ambientSounds: Array<Sound>;

    private _currentAmbientSound: Sound;

    constructor(scene: Scene) {
        this._scene = scene;
        this._scene.onBeforeDrawPhaseObservable.add(() => {
            this._update();
        });
        this._ambientSounds = new Array<Sound>();
        this._currentAmbientSound = null;
    }

    public addSound(data: ISoundData) {
        const sound = new Sound(data.name, './sound/' + data.name, this._scene, () => {
            sound.setVolume(data.volume);

            switch (data.type) {
                case SoundType.Ambient:
                    this._ambientSounds.push(sound);
                    break;
                default:
                    throw new Error('Sound type not supported');
            }
        });
    }

    public playSound(name: string, volume: number) {
        console.log('play sound: ' + name);
        
        const sound = new Sound(name, './sound/' + name, this._scene, () => {
            sound.setVolume(volume);
            sound.play();
        });
    }

    private _update() {
        if (!this._currentAmbientSound || !this._currentAmbientSound.isPlaying) {
            if (this._ambientSounds.length > 0) {
                this._currentAmbientSound = this._ambientSounds[Math.floor(Math.random() * this._ambientSounds.length)];
                this._currentAmbientSound.play();
            }
        }
    }
}