export const state = () => ({
  id: null,
  item: null,
  templateNames: [],
})

export const mutations = {
  setId(state, id) {
    state.id = id
  },

  setItem(state, item) {
    state.item = item
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
}

export const actions = {}
