import { marked } from 'marked'
import DOMPurify from 'dompurify'
import { Timestamp } from '~/models/timestamp'

export class Note extends Timestamp {
  constructor(note = {}) {
    super(note)
    this.content = note.content || ''
    this.id = note.id || null
    this.title = note.title || ''
    this.type = 'note'
  }

  get isEmpty() {
    return !this.title && !this.content
  }

  get markedContent() {
    return DOMPurify.sanitize(marked.parse(this.content.replace(/\\n/g, '\n')))
  }
}
