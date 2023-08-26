export class GraphItem {
  constructor(graphItem = {}) {
    this.title = graphItem.title || ''
    this.values = graphItem.values || []
    this.base = graphItem.base || 100
    this.unit = graphItem.unit || ''
  }

  get totalValue() {
    return this.values.reduce((a, b) => {
      return a + (b || 0)
    }, 0)
  }
}
