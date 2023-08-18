export interface State {
    current: number;
    pages: number;
    isFirst: boolean;
    isLast: boolean;
    hasPrev: boolean;
    hasNext: boolean;
}
export interface OptionsParameter {
    windowSize?: number;
    windowMode?: WindowMode;
}
export interface Options {
    windowSize: number;
    windowMode: WindowMode;
}
export type Items = Array<number>;
export type WindowMode = "SLIDING" | "JUMPING";
