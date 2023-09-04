import { doc, getDoc } from 'firebase/firestore'
import { DailyItem } from './dailyItem'
import { dbFoodDatabase } from '~/plugins/firebase/foodDatabase'
import { FoodItem } from '~/models/foodItem'

export class MealItem {
  constructor(foodItem = {}) {
    this.id = foodItem.id
    this.name = foodItem.name
    this.unit = foodItem.unit || 'g'
    this.units = foodItem.units
    this.value = isNaN(Number(foodItem.value)) ? 100 : Number(foodItem.value)
  }

  async getFoodItem() {
    const snapshot = await getDoc(doc(dbFoodDatabase, 'foodItems', this.id))
    const data = snapshot.data()
    return new FoodItem(this.id, data)
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

  async getFoodItems() {
    return await Promise.all(
      this.items.map(async (item) => {
        return await item.getFoodItem()
      })
    )
  }
}
