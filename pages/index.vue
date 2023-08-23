<template lang="pug">
.p-index
  templates-daily-notes
</template>

<script>
import { convertDateToDateId } from '~/scripts/dateHelper'
import { TYPES } from '~/models/dailyItem'

const dailyId = convertDateToDateId(new Date())

export default {
  name: 'PagesIndex',
  computed: {
    uid() {
      return this.$store.state.user.uid
    },
    types() {
      return TYPES
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
    onCreateButtonClicked(index) {
      this.$store.commit(
        'setTemplateNames',
        `organisms-${TYPES[index].value}-editor`
      )
    },
  },
}
</script>

<style lang="scss" scoped>
</style>