import { idGenerator } from './id-generator'

const id = idGenerator()
const cleanupMap = new Map()

export class Component {
  #mountId = null

  constructor(props) {
    this.id = this.getId()
    this.state = props.state ?? {}
    this.getHtml = props.render
    this.className = props.className
    this.onMount = props.onMount
  }

  getId() {
    return `component-${String(id.next().value)}`
  }

  setState(newState) {
    this.state = { ...this.state, ...newState }

    this.updateHtml()
  }

  updateHtml() {
    const container = this.getContainer()
    if (!container) return

    container.innerHTML = this.getHtml()
  }

  getContainer() {
    return document.getElementById(this.id)
  }

  toString() {
    this.mount()
    return this.render()
  }

  mount() {
    if (this.#mountId) {
      clearTimeout(this.#mountId)
      this.#mountId = null
    }

    const cleanups = cleanupMap.get(this.constructor.name)
    if (cleanups) {
      cleanups.forEach((cleanup) => cleanup())
      cleanupMap.delete(this.constructor.name)
    }

    this.#mountId = queueMicrotask(() => {
      if (!this.onMount) return

      const cleanup = this.onMount()
      if (!cleanup) return

      const cleanups = cleanupMap.get(this.constructor.name) ?? []
      cleanups.push(cleanup)
      cleanupMap.set(this.constructor.name, cleanups)
    })
  }

  render() {
    return /* html */ `
    <div
        id="${this.id}"
        class="${this.className}"
      >
        ${this.getHtml()}
      </div>`
  }
}
