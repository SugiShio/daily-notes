<template lang="pug">
.o-note-editor
  .o-note-editor__item
    label.o-note-editor__label(for='date') Date
    .o-note-editor__content
      atoms-input-date(v-model='date')

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
import { convertDateToDateId, convertDateIdToDate } from '~/scripts/dateHelper'

export default {
  name: 'OrganismsNoteEditor',
  data() {
    return {
      content: '',
      date: new Date(),
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
      this.date = convertDateIdToDate(this.originalItem.date)
    } else {
      this.date = convertDateIdToDate(this.$store.state.dailyId)
    }
  },
  methods: {
    async onSaveClicked() {
      const item = new Note({
        ...this.originalItem,
        date: convertDateToDateId(this.date),
        title: this.title,
        content: this.content,
      })
      try {
        await this.$store.dispatch('dailyForm/onSaveClicked', item)
        this.$store.commit('resetTemplateNames')
        this.$store.dispatch('dailyNotes/fetchDailyNotes')
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
