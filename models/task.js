import { Timestamp } from '~/models/timestamp'
import { convertFirebaseDateToDateObject } from '~/scripts/dateHelper'

export class Task extends Timestamp {
  constructor(task = {}) {
    super(task)
    this.category = task.category || ''
    this.descripton = task.descripton || ''
    this.doneAt = task.doneAt || null
    this.limit = task.limit ? convertFirebaseDateToDateObject(task.limit) : null
    this.isTimeNull = task.isTimeNull === true
    this.title = task.title || ''
    this.type = 'task'
  }

  setDoneAt() {
    this.doneAt = new Date()
  }

  resetDoneAt() {
    this.doneAt = null
  }

  setLimit(date) {
    this.limit = date
  }

  setIsTimeNull(isTimeNull) {
    this.isTimeNull = isTimeNull
  }

  get isDone() {
    return this.doneAt != null
  }

  get limitDateText() {
    const year = this.limit.getFullYear()
    const month = this.limit.getMonth()
    const date = this.limit.getDate()
    return `${year}.${month + 1}.${date}`
  }

  get limitTimeText() {
    if (this.isTimeNull) return ''
    const hours = this.limit.getHours()
    const minutes = this.limit.getMinutes()
    return `${hours}:${`0${minutes}`.slice(-2)}`
  }

  get isSaveAvailable() {
    return !!this.title
  }
}
