export class NodesMap {
  #nodes = new Map()

  constructor() {}

  get(id) {
    // Invalidate cached node if it's no longer in the document
    if (this.#nodes.has(id)) {
      const cachedNode = this.#nodes.get(id)
      if (document.body.contains(cachedNode)) {
        return cachedNode
      } else {
        this.#nodes.delete(id) // Remove stale node
      }
    }

    const node = document.getElementById(id)
    if (!node) {
      return null
    }

    this.#nodes.set(id, node)
    return node
  }
}
