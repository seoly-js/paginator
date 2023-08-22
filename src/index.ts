import type { State, Options, OptionsParameter, Items } from './types'

class Paginator {

  constructor(
    current: number,
    total: number,
    options?: OptionsParameter,
  ) {
    this.state = {
      current,
      total,
      isFirst: current === 1,
      isLast: current === total,
      hasPrev: current > 1,
      hasNext: current < total,
    }
    this.options = {
      windowSize: options?.windowSize ?? 5,
      windowMode: options?.windowMode ?? "SLIDING"
    }
    this.validateState()
  }

  private state: State
  private options: Options

  private validateState() {
    if (typeof this.state.current != "number") throw TypeError
    if (typeof this.state.total != "number") throw TypeError
    if (typeof this.options.windowSize != "number") throw TypeError
    if (this.options.windowMode != "SLIDING" && this.options.windowMode != "JUMPING") throw TypeError
  }

  private updateState() {
    if (this.state.current < 1) this.state.current = 1
    else if (this.state.current > this.state.total) this.state.current = this.state.total

    this.state.isFirst = this.state.current === 1
    this.state.isLast = this.state.current === this.state.total
    this.state.hasPrev = this.state.current > 1
    this.state.hasNext = this.state.current < this.state.total
  }

  getItems(): Items {
    const ret: Items = []
    let left = 0
    let right = 0
    if (this.options.windowMode === "SLIDING") {
      const halfSideSize = (this.options.windowSize - this.options.windowSize % 2) / 2
      left = (
        this.state.current - halfSideSize > 0 
        ? this.state.current + halfSideSize > this.state.total && this.state.total > this.options.windowSize
        ? this.state.total - this.options.windowSize + 1
        : this.state.current - halfSideSize 
        : 1
      )
      right = (
        left + this.options.windowSize - 1 < this.state.total 
        ? left + this.options.windowSize - 1 
        : this.state.total
      )  
    }
    else if (this.options.windowMode === "JUMPING") {
      const currentWindow = Math.floor((this.state.current - 1) / this.options.windowSize)
      left = currentWindow * this.options.windowSize + 1
      right = Math.min((currentWindow + 1) * this.options.windowSize, this.state.total)
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

  setCurrent (page: number) {
    this.state.current = page
    this.validateState()
    this.updateState()
  }

  getTotal(): number {
    return this.state.total
  }

  setTotal(total: number) {
    this.state.total = total
    this.validateState()
    this.updateState()
  }

  nextPage() {
    this.state.current++
    this.updateState()
  }

  prevPage() {
    this.state.current--
    this.updateState()
  }

  nextWindow() {
    this.state.current += this.options.windowSize
    this.updateState()
  }

  prevWindwow() {
    this.state.current -= this.options.windowSize
    this.updateState()
  }

  first() {
    this.state.current = 1
    this.updateState()
  }

  last() {
    this.state.current = this.state.total
    this.updateState()
  }
}

export { Paginator }