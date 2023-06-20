<template lang="pug">
.o-task-editor
  .o-task-editor__item
    label.o-task-editor__label(for='title') Title
    .o-task-editor__content
      atoms-input-text(v-model='editingItem.title')

  .o-task-editor__item
    label.o-task-editor__label(for='limit') Limit
    .o-task-editor__content
      atoms-input-time(v-model='limit', @input='onLimitInput')

  .o-task-editor__item
    label.o-task-editor__label(for='description') Description
    .o-task-editor__content
      atoms-markdown-editor(v-model='editingItem.description')
</template>

<script>
import { Task } from '~/models/task'

export default {
  name: 'OrganismTaskditor',
  props: {
    editingItem: {
      type: Task,
      default: () => {
        return new Task()
      },
    },
  },
  data() {
    return {
      limit: { type: Date, default: null },
    }
  },
  methods: {
    onLimitInput(datetime, isTimeNull) {
      this.editingItem.setLimit(datetime)
      this.editingItem.setIsTimeNull(isTimeNull)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/stylesheets/form';
.o-task-editor {
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