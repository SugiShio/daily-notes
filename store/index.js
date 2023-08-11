import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
  query,
  where,
} from 'firebase/firestore'
import { db } from '~/plugins/firebase'
import { DailyItem } from '~/models/dailyItem'
import { Note } from '~/models/note'
import { Meal } from '~/models/meal'
import { ShoppingList } from '~/models/shoppingList'
import { Task } from '~/models/task'

export const state = () => ({
  user: {},
  isSignin: false,
  dailyId: '',
  dailyNotes: {},
  originalItem: null,
  originalItemId: null,
  templateNames: [],
})

export const mutations = {
  setDailyId(state, dailyId) {
    state.dailyId = dailyId
  },

  setDailyNotes(state, dailyNotes) {
    state.dailyNotes = {}
    dailyNotes.forEach((dailyNote) => {
      const data = dailyNote.data()
      switch (data.type) {
        case 'meal':
          state.dailyNotes[dailyNote.id] = new Meal(data)
          break

        default:
          state.dailyNotes[dailyNote.id] = new Note(data)
      }
    })
  },

  setIsSignin(state) {
    state.isSignin = true
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

  async deleteItem({ dispatch }, id) {
    try {
      await deleteDoc(doc(db, 'dailyNotes', id))
      dispatch('fetchDailyNotes')
    } catch (e) {
      console.error(e)
    }
  },

  async fetchDailyNotes({ commit, state }) {
    const q = query(
      collection(db, 'dailyNotes'),
      where('uid', '==', state.user.uid),
      where('date', '==', state.dailyId)
    )
    const snapShots = await getDocs(q)
    commit('setDailyNotes', snapShots)
  },

  async updateItem({ commit, dispatch, state }, item) {
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

const getObject = (type) => {
  switch (type) {
    case 'task':
      return Task

    case 'meal':
      return Meal

    default:
      return Note
  }
}
