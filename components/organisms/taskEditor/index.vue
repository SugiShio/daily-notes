<template lang="pug">
.o-task-editor
  .o-task-editor__item
    label.o-task-editor__label(for='title') Title
    .o-task-editor__content
      atoms-input-text(v-model='title')

  .o-task-editor__item
    label.o-task-editor__label(for='limit') Limit
    .o-task-editor__content
      atoms-input-time(v-model='limit', @input='onLimitInput')

  .o-task-editor__item
    label.o-task-editor__label(for='description') Description
    .o-task-editor__content
      atoms-markdown-editor(v-model='description')

  .o-note-editor__item
    .o-note-editor__content
      atoms-button(text='Save', @click='onSaveClicked')
</template>

<script>
import { Task } from '~/models/task'

export default {
  name: 'OrganismTaskEditor',
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
      description: '',
      limit: new Date(),
      isTimeNull: true,
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
      this.description = this.originalItem.description
      this.limit = this.originalItem.limit
      this.isTimeNull = this.originalItem.isTimeNull
      this.title = this.originalItem.title
    }
  },

  methods: {
    onLimitInput(datetime, isTimeNull) {
      this.limit = datetime
      this.isTimeNull = isTimeNull
    },
    async onSaveClicked() {
      const item = new Task({
        description: this.description,
        limit: this.limit,
        isTimeNull: this.isTimeNull,
        title: this.title,
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