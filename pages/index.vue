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
        this.$store.dispatch('dailyNotes/fetchDailyNotes')
      }
    },
  },
  created() {
    this.$store.commit('setDailyId', dailyId)
    if (this.uid) {
      this.$store.dispatch('dailyNotes/fetchDailyNotes')
    }
  },
  methods: {
    onCreateButtonClicked(index) {
      this.$store.commit(
        'pager/setTemplateNames',
        `organisms-${TYPES[index].value}-editor`
      )
    },
  },
}
</script>

<style lang="scss" scoped></style>
