export const state = () => {
  return {
    foodItem: null,
  }
}

export const mutations = {
  setFoodItem(state, foodItem) {
    state.foodItem = foodItem
  },
  resetFoodItem(state) {
    state.foodItem = null
  },
}
