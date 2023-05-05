import { Timestamp } from '~/models/timestamp'
import { convertDateToDateId } from '~/scripts/dateHelper'
export const TYPES = ['note', 'checklist']

export class DailyItem extends Timestamp {
  constructor(dailyItem = {}) {
    super(dailyItem)
    this.title = dailyItem.title || ''
    this.type = dailyItem.type || TYPES[0]
    this.date = dailyItem.date || convertDateToDateId(new Date())
  }
}
