<template lang="pug">
.p-index
  atoms-pager

  ul.p-index__create-icons
    li.p-index__create-icon(v-for='(t, index) in types')
      button(@click='onCreateButtonClicked(index)')
        i(:class='`el-icon-${t.icon}`')
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
@import '~/assets/stylesheets/variables';
.p-index {
  &__create-icons {
    display: flex;
    justify-content: center;
    margin: -4px;
    padding: 0 $padding-h;
  }

  &__create-icon {
    padding: 4px;
  }
}
</style>