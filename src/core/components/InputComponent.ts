import {
  KeyboardEventTypes,
  KeyboardInfo,
  Nullable,
  Observer,
} from "@babylonjs/core";
import { Component } from "./Component";

export class InputComponent extends Component {
  private _keyState: { [key: string]: boolean } = {};
  private _keyboardObservable: Observer<KeyboardInfo>;

  public onEnable(): void {
    this.reset();

    this._keyboardObservable = this.scene.onKeyboardObservable.add((kbInfo) => {
      if (kbInfo.type === KeyboardEventTypes.KEYDOWN) {
        this._keyState[kbInfo.event.key] = true;
      } else {
        this._keyState[kbInfo.event.key] = false;
      }
    });
  }

  public onDisable(): void {
    this.reset();

    this.scene.onKeyboardObservable.remove(this._keyboardObservable);

    this._keyboardObservable = null;
  }

  public reset(): void {
    this._keyState = {};
  }

  public keyDown(key: string): boolean {
    return this._keyState[key];
  }
}

export enum ForwardDirection {
  Forward,
  Backward,
  Left,
  Right,
  Jump,
}
