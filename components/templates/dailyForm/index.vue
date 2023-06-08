<template lang="pug">
.t-daily-form
  .t-daily-form__item
    .t-daily-form__label(for='date') Date
    .t-daily-form__content
      | {{ date }}

  .t-daily-form__item
    .t-daily-form__label(for='type') Type
    .t-daily-form__content
      atoms-selector(
        :disabled='!isNew',
        field-name='type',
        :options='typeOptions',
        :value='item.type',
        @input='onInput'
      )

  template(v-if='item.type')
    component(:is='`organisms-${item.type}-editor`', @cancel-clicked='cancel')
</template>


<script>
import { TYPES } from '~/models/dailyItem'
import { convertDateIdToDate } from '~/scripts/dateHelper'

export default {
  name: 'TemplatesDailyForm',
  computed: {
    date() {
      const dateObject = convertDateIdToDate(this.item.date)
      const year = dateObject.getFullYear()
      const month = dateObject.getMonth()
      const date = dateObject.getDate()
      return `${year}.${month + 1}.${date}`
    },
    item() {
      return this.$store.state.editingItem
    },
    isNew() {
      return !this.$store.state.editingItemId
    },
    typeOptions() {
      return TYPES.map((type) => {
        return { label: type.value, value: type.value, icon: type.icon }
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
@import '~/assets/stylesheets/variables';
@import '~/assets/stylesheets/form';

.t-daily-form {
  margin: 10px;
  background: rgba(#fff, 0.75);
  box-shadow: 0 0 5px rgba($color-main-dark, 0.2);
  padding: 15px 20px;
  border-radius: 8px;

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