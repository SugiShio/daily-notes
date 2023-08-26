import { DailyItem } from './dailyItem'

export class Item {
  constructor(foodItem = {}) {
    this.id = foodItem.id
    this.name = foodItem.name
    this.unit = foodItem.unit
    this.units = foodItem.units
    this.value = foodItem.value
  }
}
export class Meal extends DailyItem {
  constructor(meal = {}) {
    const mark = meal.mark || 'apple'
    super({ ...meal, mark })
    this.type = 'meal'
    this.items = meal.items
      ? meal.items.map((item) => {
          return new Item(item)
        })
      : []
  }

  get isSaveAvailable() {
    return !!this.items.length
  }
}
