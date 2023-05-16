import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
  query,
  where,
} from 'firebase/firestore'
import { db } from '~/plugins/firebase'
import { DailyItem } from '~/models/dailyItem'
import { Note } from '~/models/note'

export const state = () => ({
  user: {},
  isSignin: false,
  dailyId: '',
  dailyNotes: {},
  editingItem: null,
  editingItemId: null,
})

export const mutations = {
  setDailyId(state, dailyId) {
    state.dailyId = dailyId
  },

  setDailyNotes(state, dailyNotes) {
    state.dailyNotes = {}
    dailyNotes.forEach((dailyNote) => {
      // todo typeによってモデル変える
      state.dailyNotes[dailyNote.id] = new Note(dailyNote.data())
    })
  },

  setDailyNoteType(state, type) {
    state.editingItem.setType(type)
  },

  setEditingItem(state, item) {
    state.editingItem = item || new DailyItem()
  },

  setEditingItemId(state, id) {
    state.editingItemId = id
  },

  resetEditingItem(state) {
    state.editingItem = null
  },

  setIsSignin(state) {
    state.isSignin = true
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
  async addItem({ commit, dispatch, state }, item) {
    try {
      await addDoc(collection(db, 'dailyNotes'), {
        ...item,
        uid: state.user.uid,
      })
      commit('resetEditingItem')
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

  async updateItem({ commit, dispatch, state }, updated) {
    try {
      await updateDoc(doc(db, 'dailyNotes', state.editingItemId), {
        ...updated,
        updatedAt: new Date().getTime(),
      })
      commit('resetEditingItem')
      dispatch('fetchDailyNotes')
    } catch (e) {
      console.error(e)
    }
  },
}

export const getters = {
  isEditing(state) {
    return !!state.editingItem
  },
}
