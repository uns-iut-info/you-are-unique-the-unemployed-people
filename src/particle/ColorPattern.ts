import { Color4 } from "@babylonjs/core";

export class ColorPattern {
  public static readonly red = [
    new Color4(1, 0.7, 0.7),
    new Color4(1, 0.2, 0.2),
    new Color4(0.2, 0, 0, 0.0),
  ];

  public static readonly blue = [
    new Color4(0.7, 0.8, 1.0, 1.0),
    new Color4(0.2, 0.5, 1.0, 1.0),
    new Color4(0, 0, 0.2, 0.0),
  ];

  public static readonly green = [
    new Color4(0.7, 1, 0.7, 1.0),
    new Color4(0.2, 1, 0.2, 1.0),
    new Color4(0, 0.2, 0, 0.0),
  ];

  public static readonly yellow = [
    new Color4(1, 1, 0.7, 1.0),
    new Color4(1, 1, 0.2, 1.0),
    new Color4(0.2, 0.2, 0, 0.0),
  ];
}
