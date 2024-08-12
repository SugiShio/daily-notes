import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import { db } from '~/plugins/firebase'
import { Note } from '~/models/note'
import { Meal } from '~/models/meal'
import { Recipe } from '~/models/recipe'

export const state = () => ({
  dailyNotes: {},
})

export const mutations = {
  setDailyId(state, dailyId) {
    state.dailyId = dailyId
  },

  setDailyNotes(state, dailyNotes) {
    state.dailyNotes = dailyNotes
  },
}

export const actions = {
  async fetchDailyNotes({ commit, rootState }) {
    const q = query(
      collection(db, 'dailyNotes'),
      where('uid', '==', rootState.user.uid),
      where('date', '==', rootState.dailyId),
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

        case 'recipe':
          dailyNotes[snapShot.id] = new Recipe(data)
          break

        default:
          dailyNotes[snapShot.id] = new Note(data)
      }
    })

    commit('setDailyNotes', dailyNotes)
  },
}

export const getters = {
  mealsWithId(state) {
    return Object.keys(state.dailyNotes)
      .map((key) => {
        if (state.dailyNotes[key].type === 'meal')
          return { id: key, meal: state.dailyNotes[key] }
        return null
      })
      .filter((v) => v)
      .sort((a, b) => {
        return a.meal.time - b.meal.time
      })
  },

  notesWithId(state) {
    return Object.keys(state.dailyNotes)
      .map((key) => {
        if (state.dailyNotes[key].type === 'note')
          return { id: key, note: state.dailyNotes[key] }
        return null
      })
      .filter((v) => v)
      .sort((a, b) => {
        return a.note.time - b.note.time
      })
  },

  recipesWithId(state) {
    return Object.keys(state.dailyNotes)
      .map((key) => {
        if (state.dailyNotes[key].type === 'recipe')
          return { id: key, recipe: state.dailyNotes[key] }
        return null
      })
      .filter((v) => v)
      .sort((a, b) => {
        return a.recipe.time - b.recipe.time
      })
  },
}
