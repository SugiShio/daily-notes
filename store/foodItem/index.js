import { doc, getDoc } from 'firebase/firestore'
import { dbFoodDatabase } from '~/plugins/firebase/foodDatabase'

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

export const actions = {
  async showFoodItemDetail({ commit }, id) {
    const snapshot = await getDoc(doc(dbFoodDatabase, 'foodItems', id))
    commit('setFoodItem', snapshot.data())
    commit('setTemplateNames', 'templates-food-item', { root: true })
  },
}
