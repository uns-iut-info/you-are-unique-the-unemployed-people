import { AnimationGroup } from "@babylonjs/core";
import { IAnimationData } from "../../data/IAnimationData";
import { Component } from "./Component";

export class AnimationComponent extends Component {
  private _groups: { [name: string]: AnimationGroup } = {};
  private _currentAnimation: IAnimationData;

  public play(data: IAnimationData, stopCurrent: boolean = true): void {
    const group = this._groups[data.name];

    if (!group) {
      console.warn(`Animation group ${data.name} not found`);
      return null;
    }

    group.speedRatio = data.speed;
    group.play(data.loop);

    this._currentAnimation = data;

    if (stopCurrent) {
      for (const groupName in this._groups) {
        if (groupName !== data.name) {
          this._groups[groupName].stop();
        }
      }
    }
  }

  public stop(data: IAnimationData): void {
    const group = this._groups[data.name];

    if (!group) {
      console.warn(`Animation group ${data.name} not found`);
      return;
    }

    group.stop();
  }

  public stopAll(): void {
    for (const groupName in this._groups) {
      this._groups[groupName].stop();
    }
  }

  public setGroups(groups: AnimationGroup[]): void {
    this.stopAll();
    this._groups = {};

    for (const group of groups) {
      this._groups[group.name] = group;
      // TODO: rollback at end animation
    }

    this.stopAll();
  }

  public getAnimationGroup(name: string) {
    return this._groups[name];
  }

  public get currentAnimation() {
    return this._currentAnimation && this._groups[this._currentAnimation.name].isPlaying ? this._currentAnimation : null;
  }
}
