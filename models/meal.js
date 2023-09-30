import { DailyItem } from './dailyItem'

export class MealItem {
  constructor(mealItem = {}) {
    this.id = mealItem.id
    this.unit = mealItem.unit || 'g'
    this.value = isNaN(Number(mealItem.value)) ? 100 : Number(mealItem.value)
  }
}

export class Meal extends DailyItem {
  constructor(meal = {}) {
    const mark = meal.mark || 'apple'
    super({ ...meal, mark })
    this.type = 'meal'
    this.items = meal.items
      ? meal.items.map((item) => {
          return new MealItem(item)
        })
      : []
    this.files = meal.files || []
  }

  get isSaveAvailable() {
    return !!this.items.length
  }

  get timeText() {
    const date = new Date(this.time)
    const hours = date.getHours()
    const minutes = `0${date.getMinutes()}`.slice(-2)
    return `${hours}:${minutes}`
  }
}
