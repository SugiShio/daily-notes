import { DailyItem } from './dailyItem'

export class Meal extends DailyItem {
  constructor(meal = {}) {
    super(meal)
    this.type = 'meal'
    this.items = meal.items
      ? meal.items.map((item) => {
          return {
            id: item.id,
            unit: item.unit,
            value: item.value,
          }
        })
      : []
  }
}
