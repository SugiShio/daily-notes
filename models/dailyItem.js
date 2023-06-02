import { Timestamp } from '~/models/timestamp'
import { convertDateToDateId } from '~/scripts/dateHelper'
export const TYPES = ['meal', 'note']

export class DailyItem extends Timestamp {
  constructor(dailyItem = {}) {
    super(dailyItem)
    this.title = dailyItem.title || ''
    this.type = dailyItem.type || TYPES[0]
    this.date = dailyItem.date || convertDateToDateId(new Date())
  }

  setType(type) {
    if (!TYPES.includes(type)) throw new Error('Type is invalid')
    this.type = type
  }
}
