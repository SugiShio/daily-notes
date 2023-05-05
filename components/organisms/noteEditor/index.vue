<template lang="pug">
div
  input(v-model='localTitle')
  textarea(v-model='localContent')
  button(@click='onSaveClicked', :disabled='!isSaveAvailable') save
</template>

<script>
import { Note } from '~/models/note'

export default {
  name: 'OrganismsNoteEditor',
  data() {
    return {
      localTitle: '',
      localContent: '',
    }
  },
  computed: {
    isSaveAvailable() {
      return !!(this.localTitle || this.localContent)
    },
    item() {
      return this.$store.state.editingItem
    },
  },
  created() {
    this.localTitle = this.$store.state.editingItem.title
    this.localContent = this.$store.state.editingItem.content
  },
  methods: {
    onSaveClicked() {
      this.$store.state.editingItemId ? this.updateItem() : this.addItem()
    },
    addItem() {
      this.$store.dispatch(
        'addItem',
        new Note({
          title: this.localTitle,
          content: this.localContent,
        })
      )
    },
    updateItem() {
      const updated = {}
      if (this.localTitle !== this.$store.state.editingItem.title) {
        updated.title = this.localTitle
      }
      if (this.localContent !== this.$store.state.editingItem.content) {
        updated.content = this.localContent
      }
      this.$store.dispatch('updateItem', updated)
    },
  },
}
</script>