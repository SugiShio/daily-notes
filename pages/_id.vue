<template lang="pug">
.p-id
  templates-daily-notes(@edit-clicked='onEditClicked')
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
        this.$store.dispatch('dailyNotes/fetchDailyNotes')
      }
    },
  },
  created() {
    this.$store.commit('setDailyId', this.dailyId)
    if (this.uid) {
      this.$store.dispatch('dailyNotes/fetchDailyNotes')
    }
  },
  methods: {
    onEditClicked({ dailyNote, id }) {
      this.$store.dispatch('openEditForm', { dailyNote, id })
    },
  },
}
</script>

<style lang="scss" scoped>
.p-id {
}
</style>
