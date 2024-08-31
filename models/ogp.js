export class Ogp {
  constructor(ogp = {}) {
    this.title = ogp.title || ''
    this.image = ogp.image || ''
    this.description = ogp.description || ''
  }
}
