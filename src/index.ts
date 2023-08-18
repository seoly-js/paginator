import type { State, Options, OptionsParameter, Items } from './types/paginator'

class Paginator {

  constructor(
    current: number,
    pages: number,
    options: OptionsParameter,
  ) {
    this.state = {
      current,
      pages,
      isFirst: current === 1,
      isLast: current === pages,
      hasPrev: current > 1,
      hasNext: current < pages,
    }
    this.options = {
      windowSize: options.windowSize ?? 5,
      windowMode: options.windowMode ?? "SLIDING"
    }
  }

  private state: State
  private options: Options

  private validateState() {
    if (this.state.current < 1) this.state.current = 1
    else if (this.state.current > this.state.pages) this.state.current = this.state.pages

    this.state.isFirst = this.state.current === 1
    this.state.isLast = this.state.current === this.state.pages
    this.state.hasPrev = this.state.current > 1
    this.state.hasNext = this.state.current < this.state.pages
  }

  getItems(): Items {
    const ret: Items = []
    let left = 0
    let right = 0
    if (this.options.windowMode === "SLIDING") {
      const halfSideSize = (this.options.windowSize - this.options.windowSize % 2) / 2
      left = (
        this.state.current - halfSideSize > 0 
        ? this.state.current + halfSideSize > this.state.pages && this.state.pages > this.options.windowSize
        ? this.state.pages - this.options.windowSize + 1
        : this.state.current - halfSideSize 
        : 1
      )
      right = (
        left + this.options.windowSize - 1 < this.state.pages 
        ? left + this.options.windowSize - 1 
        : this.state.pages
      )  
    }
    else if (this.options.windowMode === "JUMPING") {
      const currentWindow = Math.floor((this.state.current - 1) / this.options.windowSize)
      left = currentWindow * this.options.windowSize + 1
      right = Math.min((currentWindow + 1) * this.options.windowSize, this.state.pages)
    }
    for (let i = left; i <= right; i++) ret.push(i)
    return ret
  }

  getState(): State {
    return this.state
  }

  getCurrent(): number {
    return this.state.current
  }

  setPage (page: number) {
    this.state.current = page
    this.validateState()
  }

  nextPage() {
    this.state.current++
    this.validateState()
  }

  prevPage() {
    this.state.current--
    this.validateState()
  }

  nextWindow() {
    this.state.current += this.options.windowSize
    this.validateState()
  }

  prevWindwow() {
    this.state.current -= this.options.windowSize
    this.validateState()
  }

  first() {
    this.state.current = 1
    this.validateState()
  }

  last() {
    this.state.current = this.state.pages
    this.validateState()
  }
}

export { Paginator }