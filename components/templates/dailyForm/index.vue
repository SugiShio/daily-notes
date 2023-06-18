<template lang="pug">
.t-daily-form
  .t-daily-form__item
    .t-daily-form__label(for='type') Type
    .t-daily-form__content
      atoms-selector(
        :disabled='!isNew',
        field-name='type',
        :options='typeOptions',
        v-model='type',
        @input='onTypeSelected'
      )

  template(v-if='type')
    component(
      :is='`organisms-${type}-editor`',
      :editing-item='editingItem',
      @cancel-clicked='cancel'
    )
  .t-daily-form__footer
    atoms-button(@click='cancel', text='Cancel', outline)
    atoms-button(
      v-if='type',
      :disabled='!editingItem.isSaveAvailable',
      text='Save',
      @click='onSaveClicked'
    )
</template>


<script>
import { TYPES } from '~/models/dailyItem'
import { Check } from '~/models/check'
import { Note } from '~/models/note'
import { Meal } from '~/models/meal'
import { convertDateIdToDate } from '~/scripts/dateHelper'

export default {
  name: 'TemplatesDailyForm',
  data() {
    return {
      editingItem: null,
      type: '',
    }
  },
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
      return !this.$store.state.originalItemId
    },
    typeOptions() {
      return TYPES.map((type) => {
        return { label: type.value, value: type.value, icon: type.icon }
      })
    },
  },
  created() {
    if (!this.isNew) {
      this.type = this.$store.state.originalItem.type
      const Obj = this.getObjectType(this.type)
      this.editingItem = new Obj(this.$store.state.originalItem)
    }
  },
  methods: {
    cancel() {
      this.$store.dispatch('closeForm')
    },
    getObjectType(type) {
      switch (type) {
        case 'check':
          return Check

        case 'meal':
          return Meal

        default:
          return Note
      }
    },
    onTypeSelected(type) {
      const Obj = this.getObjectType(type)
      this.editingItem = new Obj()
    },
    onSaveClicked() {
      this.$store.dispatch('onSaveClicked', this.editingItem)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/stylesheets/variables';
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

  &__footer {
    display: flex;
    justify-content: space-evenly;
  }
}
</style>