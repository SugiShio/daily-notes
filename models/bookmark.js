import { DailyItem } from './dailyItem'

export class Bookmark extends DailyItem {
  constructor(bookmark = {}) {
    super(bookmark)
    this.type = 'bookmark'
    this.description = bookmark.description || ''
    this.title = bookmark.title || ''
    this.url = bookmark.url || ''
    this.tags = bookmark.tags || []
  }

  static isUrlValid = (string) => /^https?:\/\/.+\..+/.test(string)
}
