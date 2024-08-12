import { getAuth, signOut } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { app, db } from '~/plugins/firebase'
import { dbFoodDatabase } from '~/plugins/firebase/foodDatabase'
import { FoodItem } from '~/models/foodItem'
import { User } from '~/models/user'
const auth = getAuth(app)

export const state = () => ({
  user: {},
  isSignin: false,
  colorConfig: {},
  dailyId: '',
  fontConfig: {},
  foodItems: [],
  originalItem: null,
  originalItemId: null,
})

export const mutations = {
  setColorConfig(state, colorConfig) {
    state.colorConfig = colorConfig
  },

  setDailyId(state, dailyId) {
    state.dailyId = dailyId
  },

  setFontConfig(state, fontConfig) {
    state.fontConfig = fontConfig
  },

  setFoodItemLabel(state, { name, foodItemId }) {
    state.user.addFoodItemLabelId({ name, foodItemId })
  },

  setFoodItems(state, foodItems) {
    state.foodItems = [...state.foodItems, ...foodItems]
  },

  setIsSignin(state) {
    state.isSignin = true
  },

  removeFoodItemLabel(state, { name, foodItemId }) {
    state.user.removeFoodItemLabelId({ name, foodItemId })
  },

  setUser(state, user) {
    state.user = new User(user)
  },

  resetIsSignin(state) {
    state.isSignin = false
  },

  resetUser(state) {
    state.user = {}
  },
}

export const actions = {
  async fetchFoodItem(_, id) {
    const snapshot = await getDoc(doc(dbFoodDatabase, 'foodItems', id))
    return new FoodItem(id, snapshot.data())
  },

  async fetchFoodItems({ commit, dispatch, state }, ids) {
    const idsToFetch = ids.filter((id) => {
      const isIdExist = state.foodItems
        .map((foodItem) => foodItem.id)
        .find((i) => i === id)
      return !isIdExist
    })
    const foodItems = await Promise.all(
      idsToFetch.map(async (id) => {
        return await dispatch('fetchFoodItem', id)
      })
    )
    commit('setFoodItems', foodItems)
  },

  async setUser({ commit, state }, uid) {
    const snapshot = await getDoc(doc(db, 'users', uid))
    if (snapshot.exists()) {
      await commit('setUser', { ...snapshot.data(), uid: snapshot.id })
      await commit('setColorConfig', snapshot.data().colorConfig)
      await commit('setFontConfig', snapshot.data().fontConfig)
      commit('setIsSignin')
      const elementHTML = document.querySelector('html')
      elementHTML.style.backgroundColor = state.colorConfig.backgroundColor
    }
  },

  async signout({ commit }) {
    try {
      await signOut(auth)
      commit('resetIsSignin')
      commit('resetUser')
    } catch (error) {
      console.error(error)
    }
  },
}
