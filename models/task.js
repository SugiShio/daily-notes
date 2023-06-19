import { Timestamp } from '~/models/timestamp'

export class Task extends Timestamp {
  constructor(task = {}) {
    super(task)
    this.category = task.category || ''
    this.descripton = task.descripton || ''
    this.doneAt = task.doneAt || null
    this.limit = task.limit || null
    this.title = task.title || ''
    this.type = 'task'
  }

  get isSaveAvailable() {
    return !!this.title
  }
}
