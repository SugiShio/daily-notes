<template lang="pug">
.t-daily-form
  .t-daily-form__item
    .t-daily-form__label(for='title') Type
    .t-daily-form__content
      atoms-selector(
        :disabled='!isNew',
        field-name='type',
        :options='typeOptions',
        :value='item.type',
        @input='onInput'
      )

  template(v-if='item.type')
    component(:is='`organisms-${item.type}-editor`')
    button(@click='cancel') cancel
</template>


<script>
import { TYPES } from '~/models/dailyItem'

export default {
  name: 'TemplatesDailyForm',
  computed: {
    item() {
      return this.$store.state.editingItem
    },
    isNew() {
      return !this.$store.state.editingItemId
    },
    typeOptions() {
      return TYPES.map((type) => {
        return { label: type, value: type }
      })
    },
  },
  methods: {
    cancel() {
      this.$store.commit('resetEditingItem')
    },
    onInput(value) {
      this.$store.commit('setDailyNoteType', value)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/stylesheets/form';
.t-daily-form {
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