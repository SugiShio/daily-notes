<template lang="pug">
.p-id
  templates-daily-notes
  templates-daily-form(v-if='isEditing')
  button(v-if='!isEditing', @click='addItem') New
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
        this.$store.commit('setDailyId', this.dailyId)
        this.$store.dispatch('fetchDailyNotes')
      }
    },
  },
  created() {
    if (this.uid) {
      this.$store.commit('setDailyId', this.dailyId)
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
.p-id {
  padding: 0 20px;
}
</style>