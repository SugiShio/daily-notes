import { Timestamp } from '~/models/timestamp'
import { convertDateToDateId } from '~/scripts/dateHelper'
export const TYPES = [
  { value: 'note', icon: 'document' },
  { value: 'task', icon: 'circle-check' },
  { value: 'meal', icon: 'apple' },
]

export class DailyItem extends Timestamp {
  constructor(dailyItem = {}) {
    super(dailyItem)
    this.title = dailyItem.title || ''
    this.type = dailyItem.type || TYPES[0].value
    this.date = dailyItem.date || convertDateToDateId(new Date())
    this.mark = dailyItem.mark || ''
  }

  setType(type) {
    if (!TYPES.map((type) => type.value).includes(type))
      throw new Error('Type is invalid')
    this.type = type
  }
}
