export interface ISoundData {
    name: string;
    type: SoundType;
    volume: number;
}

export enum SoundType {
    Ambient,
    Effect,
}