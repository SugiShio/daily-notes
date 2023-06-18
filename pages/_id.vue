<template lang="pug">
.p-id
  templates-daily-notes(@edit-clicked='onEditClicked')
  atoms-pager(@pager-button-clicked='onPagerButtonClicked')
</template>

<script>
export default {
  name: 'PagesId',
  validate({ params }) {
    return /^\d{8}$/.test(params.id)
  },
  data() {
    return {
      dailyId: this.$route.params.id,
    }
  },
  computed: {
    uid() {
      return this.$store.state.user.uid
    },
  },
  watch: {
    uid(uid) {
      if (uid) {
        this.$store.commit('setDailyId', this.dailyId)
        this.$store.dispatch('fetchDailyNotes')
      }
    },
  },
  created() {
    this.$store.commit('setDailyId', this.dailyId)
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
.p-id {
}
</style>