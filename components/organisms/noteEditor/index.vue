<template lang="pug">
.o-note-editor
  .o-note-editor__item
    label.o-note-editor__label(for='title') Title
    .o-note-editor__content
      atoms-input-text(v-model='editingItem.title')

  .o-note-editor__item
    label.o-note-editor__label(for='content') Content
    .o-note-editor__content
      atoms-markdown-editor(v-model='editingItem.content')
</template>

<script>
import { Note } from '~/models/note'

export default {
  name: 'OrganismsNoteEditor',
  props: {
    editingItem: { type: Note },
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