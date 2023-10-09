import { Timestamp } from '~/models/timestamp'
import { NUTRIENT_BASIS } from '~/constants/nutrientBasis'

export class FoodItemLabel {
  constructor(foodItemLabel = {}) {
    this.name = foodItemLabel.name || ''
    this.foodItemIds = foodItemLabel.foodItemIds || []
  }

  addId(id) {
    if (!id) return
    if (!this.foodItemIds.includes(id)) this.foodItemIds.push(id)
  }

  removeId(id) {
    const index = this.foodItemIds.indexOf(id)
    if (index !== -1) this.foodItemIds.splice(index, 1)
  }
}

export class User extends Timestamp {
  constructor(user = {}) {
    super(user)
    this.uid = user.uid || ''
    this.authority = user.authority
    this.email = user.email || ''
    this.displayName = user.displayName || user.email
    this.birthDate = user.birthDate
    this.foodItemLabels =
      user.foodItemLabels.map(
        (foodItemLabel) => new FoodItemLabel(foodItemLabel)
      ) || []
    this.nutrientBasis = user.nutrientBasis || NUTRIENT_BASIS
  }

  get authorityText() {
    switch (this.authority) {
      case 'admin':
        return 'admin'
      default:
        return 'general'
    }
  }

  get birthDateText() {
    if (!this.birthDate) return 'Notset'

    const dateObject = new Date(this.birthDate)
    const year = dateObject.getFullYear()
    const month = dateObject.getMonth() + 1
    const date = dateObject.getDate()
    return `${year}/${month}/${date}`
  }

  addFoodItemLabelId({ name, foodItemId }) {
    const foodItemLabel = this.foodItemLabels.find(
      (foodItemLabel) => foodItemLabel.name === name
    )
    if (foodItemLabel) {
      foodItemLabel.addId(foodItemId)
    } else {
      this.foodItemLabels.push(
        new FoodItemLabel({ name, foodItemIds: [foodItemId] })
      )
    }
  }

  removeFoodItemLabelId({ name, foodItemId }) {
    const foodItemLabel = this.foodItemLabels.find(
      (foodItemLabel) => foodItemLabel.name === name
    )
    if (foodItemLabel) {
      foodItemLabel.removeId(foodItemId)
    } else {
      throw new Error(`No foodItemLabel with name "${name}"`)
    }
  }
}
