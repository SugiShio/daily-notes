<template lang="pug">
.p-index
  templates-daily-notes(@edit-clicked='onEditClicked')
  atoms-pager(@pager-button-clicked='onPagerButtonClicked')
</template>

<script>
import { convertDateToDateId } from '~/scripts/dateHelper'

const dailyId = convertDateToDateId(new Date())

export default {
  name: 'PagesIndex',
  computed: {
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
    onEditClicked({ dailyNote, id }) {
      this.$store.dispatch('openEditForm', { dailyNote, id })
    },
    onPagerButtonClicked() {
      this.$store.dispatch('openNewForm')
    },
  },
}
</script>

<style lang="scss" scoped>
.p-index {
}
</style>