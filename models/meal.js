import { DailyItem } from './dailyItem'

class Item {
  constructor(foodItem = {}) {
    this.id = foodItem.id
    this.name = foodItem.name
    this.unit = foodItem.unit
    this.value = foodItem.value
  }
}
export class Meal extends DailyItem {
  constructor(meal = {}) {
    super(meal)
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
