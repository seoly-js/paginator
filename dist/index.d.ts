import type { State, OptionsParameter, Items } from './types/paginator';
declare class Paginator {
    constructor(current: number, pages: number, options: OptionsParameter);
    private state;
    private options;
    private validateState;
    getItems(): Items;
    getState(): State;
    getCurrent(): number;
    setPage(page: number): void;
    nextPage(): void;
    prevPage(): void;
    nextWindow(): void;
    prevWindwow(): void;
    first(): void;
    last(): void;
}
export { Paginator };
