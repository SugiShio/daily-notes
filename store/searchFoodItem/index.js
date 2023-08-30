import { MealItem } from '~/models/meal'
export const state = () => {
  return { selectedFoodItem: null }
}

export const mutations = {
  setSelectedFoodItem(state, foodItem) {
    state.selectedFoodItem = new MealItem(foodItem)
  },
}
