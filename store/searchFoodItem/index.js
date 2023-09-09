export const state = () => {
  return { selectedFoodItem: null }
}

export const mutations = {
  setSelectedFoodItem(state, foodItem) {
    state.selectedFoodItem = foodItem
  },
}
