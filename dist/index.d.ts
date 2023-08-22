import type { State, OptionsParameter, Items } from './types';
declare class Paginator {
    constructor(current: number, total: number, options?: OptionsParameter);
    private state;
    private options;
    private validateState;
    private updateState;
    getItems(): Items;
    getState(): State;
    getCurrent(): number;
    setCurrent(page: number): void;
    getTotal(): number;
    setTotal(total: number): void;
    nextPage(): void;
    prevPage(): void;
    nextWindow(): void;
    prevWindwow(): void;
    first(): void;
    last(): void;
}
export { Paginator };
