import { addDoc, collection } from 'firebase/firestore'
import { db, getFirestoreFormat } from '~/plugins/firebase'
import { Note } from '~/models/note'
import { Meal } from '~/models/meal'
import { Task } from '~/models/task'
export const state = () => {
  return {
    originalItem: null,
  }
}

export const mutations = {
  setOriginalItem(state, item) {
    state.originalItem = item
  },
}

export const actions = {
  async addItem({ rootState }, item) {
    const postItem = getFirestoreFormat(item)
    try {
      await addDoc(collection(db, 'dailyNotes'), {
        ...postItem,
        uid: rootState.user.uid,
      })
    } catch (e) {
      console.error(e)
    }
  },

  async onSaveClicked({ commit, dispatch, state }, item) {
    try {
      await dispatch('addItem', item)
    } catch (e) {
      console.error(e)
    }
  },

  openNewForm({ commit }, { type }) {
    const Obj = getObject(type)
    commit('setOriginalItem', new Obj())
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
