<template lang="pug">
.p-index
  templates-daily-notes
  templates-daily-form(v-if='isEditing')
  button(v-if='!isEditing', @click='addItem') New
</template>

<script>
import { convertDateToDateId } from '~/scripts/dateHelper'

const dailyId = convertDateToDateId(new Date())

export default {
  name: 'PagesIndex',
  computed: {
    isEditing() {
      return this.$store.getters.isEditing
    },
    uid() {
      return this.$store.state.user.uid
    },
  },
  watch: {
    uid(uid) {
      if (uid) {
        this.$store.dispatch('fetchDailyNotes')
      }
    },
  },
  created() {
    this.$store.commit('setDailyId', dailyId)
    if (this.uid) {
      this.$store.dispatch('fetchDailyNotes')
    }
  },
  methods: {
    addItem() {
      this.$store.commit('setEditingItem')
    },
  },
}
</script>

<style lang="scss" scoped>
.p-index {
}
</style>