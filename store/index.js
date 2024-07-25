import { getAuth, signOut } from 'firebase/auth'
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  updateDoc,
  query,
  where,
} from 'firebase/firestore'
import { app, db } from '~/plugins/firebase'
import { dbFoodDatabase } from '~/plugins/firebase/foodDatabase'
import { FoodItem } from '~/models/foodItem'
import { Note } from '~/models/note'
import { Meal } from '~/models/meal'
import { User } from '~/models/user'
const auth = getAuth(app)

export const state = () => ({
  user: {},
  isSignin: false,
  colorConfig: {},
  dailyId: '',
  dailyNotes: {},
  fontConfig: {},
  foodItems: [],
  meal: null,
  originalItem: null,
  originalItemId: null,
  templateNames: [],
})

export const mutations = {
  setColorConfig(state, colorConfig) {
    state.colorConfig = colorConfig
  },

  setDailyId(state, dailyId) {
    state.dailyId = dailyId
  },

  setDailyNotes(state, dailyNotes) {
    state.dailyNotes = dailyNotes
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

  setMeal(state, meal) {
    state.meal = meal
  },

  setTemplateNames(state, templateName) {
    state.templateNames.push(templateName)
  },

  removeFoodItemLabel(state, { name, foodItemId }) {
    state.user.removeFoodItemLabelId({ name, foodItemId })
  },

  removeTemplateNames(state) {
    state.templateNames.pop()
  },

  resetTemplateNames(state) {
    state.templateNames = []
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
  async addItem({ state }, item) {
    try {
      await addDoc(collection(db, 'dailyNotes'), {
        ...item,
        uid: state.user.uid,
      })
    } catch (e) {
      console.error(e)
    }
  },

  async fetchDailyNotes({ commit, state }) {
    const q = query(
      collection(db, 'dailyNotes'),
      where('uid', '==', state.user.uid),
      where('date', '==', state.dailyId),
      orderBy('createdAt', 'asc')
    )
    const snapShots = await getDocs(q)

    const dailyNotes = {}
    snapShots.forEach((snapShot) => {
      const data = snapShot.data()
      switch (data.type) {
        case 'meal':
          dailyNotes[snapShot.id] = new Meal(data)
          break

        default:
          dailyNotes[snapShot.id] = new Note(data)
      }
    })

    commit('setDailyNotes', dailyNotes)
  },

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

  async updateItem({ state }, item) {
    const updated = {}
    Object.keys(item).forEach((key) => {
      if (item[key] !== state.originalItem[key]) {
        updated[key] = item[key]
      }
    })
    if (!Object.keys.length) return
    try {
      await updateDoc(doc(db, 'dailyNotes', state.originalItemId), {
        ...updated,
        updatedAt: new Date().getTime(),
      })
    } catch (e) {
      console.error(e)
    }
  },
}
