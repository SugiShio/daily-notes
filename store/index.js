import {
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  updateDoc,
  query,
  where,
} from 'firebase/firestore'
import { db } from '~/plugins/firebase'
import { Note } from '~/models/note'
import { Meal } from '~/models/meal'

export const state = () => ({
  user: {},
  isSignin: false,
  dailyId: '',
  dailyNotes: {},
  meal: null,
  originalItem: null,
  originalItemId: null,
  templateNames: [],
})

export const mutations = {
  setDailyId(state, dailyId) {
    state.dailyId = dailyId
  },

  setDailyNotes(state, dailyNotes) {
    state.dailyNotes = dailyNotes
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

  removeTemplateNames(state) {
    state.templateNames.pop()
  },

  resetTemplateNames(state) {
    state.templateNames = []
  },

  setUser(state, user = {}) {
    state.user = { ...user }
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
