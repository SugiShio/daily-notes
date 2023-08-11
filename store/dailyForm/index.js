import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore'
import { db, getFirestoreFormat } from '~/plugins/firebase'

export const state = () => {
  return {
    originalItem: null,
    originalItemId: null,
  }
}

export const mutations = {
  setOriginalItem(state, { item, id }) {
    state.originalItem = item
    state.originalItemId = id
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

  async deleteItem(_, id) {
    try {
      await deleteDoc(doc(db, 'dailyNotes', id))
    } catch (e) {
      console.error(e)
    }
  },

  async updateItem({ commit, dispatch, state }, item) {
    const postItem = getFirestoreFormat(item)
    try {
      await updateDoc(doc(db, 'dailyNotes', state.originalItemId), {
        ...postItem,
        updatedAt: new Date().getTime(),
      })
    } catch (e) {
      console.error(e)
    }
  },

  async onSaveClicked({ commit, dispatch, state }, item) {
    try {
      await dispatch(state.originalItemId ? 'updateItem' : 'addItem', item)
    } catch (e) {
      console.error(e)
    }
  },
}
