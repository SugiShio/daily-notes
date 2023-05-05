<template lang="pug">
div
  div(v-for='t in types')
    input(
      type='radio',
      :id='t',
      :value='t',
      name='type',
      v-model='item.type',
      :disabled='!isNew'
    )
    label(:for='t') {{ t }}

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
    types() {
      return TYPES
    },
  },
  methods: {
    cancel() {
      this.$store.commit('resetEditingItem')
    },
  },
}
</script>