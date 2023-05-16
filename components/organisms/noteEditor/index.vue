<template lang="pug">
.o-note-editor
  .o-note-editor__item
    label.o-note-editor__label(for='title') Title
    .o-note-editor__content
      atoms-input-text(v-model='localTitle')

  .o-note-editor__item
    label.o-note-editor__label(for='content') Content
    .o-note-editor__content
      atoms-markdown-editor(v-model='localContent')

  .o-note-editor__item
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

<style lang="scss" scoped>
@import '~/assets/stylesheets/form';
.o-note-editor {
  &__item {
    @extend %form__item;
  }

  &__label {
    @extend %form__label;
  }

  &__content {
    @extend %form__content;
  }
}
</style>