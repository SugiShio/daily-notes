import { GraphItem } from '~/models/graphItem'

export const state = () => ({
  items: [],
})

export const mutations = {
  setItems(state, items) {
    state.items = []
    items.forEach((item) => {
      state.items.push(new GraphItem(item))
    })
  },
}
