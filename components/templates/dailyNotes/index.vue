<template lang="pug">
section
  div {{ dailyId }}

  ul(v-if='dailyNotes.length')
    li(v-for='dailyNote in dailyNotes')
      organisms-note(:item='dailyNote')
</template>

<script>
import { getDocs, collection } from 'firebase/firestore'
import { db } from '~/plugins/firebase'

export default {
  name: 'TemplatesDailyNotes',
  props: {
    dailyId: { type: String },
  },
  data() {
    return { dailyNotes: [] }
  },
  computed: {
    uid() {
      return this.$store.state.user.uid
    },
  },
  watch: {
    uid(uid) {
      if (uid) {
        this.fetchDailyNote()
      }
    },
  },
  created() {
    if (this.uid) {
      this.fetchDailyNote()
    }
  },
  methods: {
    async fetchDailyNote() {
      const snapShots = await getDocs(
        collection(db, 'dailyNotes', this.uid, this.dailyId)
      )
      snapShots.forEach((snapshot) => {
        this.dailyNotes.push(snapshot.data())
      })
    },
  },
}
</script>