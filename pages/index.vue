<template lang="pug">
.p-index
  templates-daily-notes(@edit-clicked='onEditClicked')
  ul.p-index__create-icons
    li.p-index__create-icon(v-for='(t, index) in types')
      atoms-pager(
        :icon='t.icon',
        :is-minimized='!isActive(index)',
        @pager-button-clicked='onPagerButtonClicked(index)'
      )
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
    typeIndex() {
      const editingItem = this.$store.state.editingItem
      if (!editingItem) return null
      return TYPES.findIndex(
        (t) => t.value === this.$store.state.editingItem.type
      )
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
    isActive(index) {
      return this.typeIndex === index
    },
    onEditClicked({ dailyNote, id }) {
      this.$store.dispatch('openEditForm', { dailyNote, id })
    },
    onPagerButtonClicked(index) {
      this.$store.dispatch('openNewForm', { type: TYPES[index].value })
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