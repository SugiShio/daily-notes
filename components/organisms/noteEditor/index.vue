<template lang="pug">
.o-note-editor
  .o-note-editor__item
    label.o-note-editor__label(for='title') Title
    .o-note-editor__content
      atoms-input-text(v-model='title')

  .o-note-editor__item
    label.o-note-editor__label(for='content') Content
    .o-note-editor__content
      atoms-markdown-editor(v-model='content')

  .o-note-editor__item
    .o-note-editor__content
      atoms-button(text='Save', @click='onSaveClicked')
</template>

<script>
import { Note } from '~/models/note'

export default {
  name: 'OrganismsNoteEditor',
  data() {
    return {
      content: '',
      title: '',
    }
  },
  computed: {
    originalItem() {
      return this.$store.state.dailyForm.originalItem
    },
  },
  created() {
    if (this.originalItem) {
      this.title = this.originalItem.title
      this.content = this.originalItem.content
    }
  },
  methods: {
    async onSaveClicked() {
      const item = new Note({
        title: this.title,
        content: this.content,
      })
      try {
        await this.$store.dispatch('dailyForm/onSaveClicked', item)
        this.$store.commit('resetTemplateNames')
        this.$store.dispatch('fetchDailyNotes')
      } catch (error) {
        console.error(error)
      }
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