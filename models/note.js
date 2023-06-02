import { marked } from 'marked'
import DOMPurify from 'dompurify'
import { DailyItem } from './dailyItem'

export class Note extends DailyItem {
  constructor(note = {}) {
    super(note)
    this.type = 'note'
    this.content = note.content || ''
    this.title = note.title || ''
  }

  get isEmpty() {
    return !this.title && !this.content
  }

  get markedContent() {
    return DOMPurify.sanitize(marked.parse(this.content.replace(/\\n/g, '\n')))
  }
}
