<template lang="pug">
section
  div {{ dailyId }}

  ul(v-if='dailyNotes.length')
    li(v-for='(dailyNote, index) in dailyNotes')
      component(
        :is='`organisms-${dailyNote.type}`',
        :item='dailyNote',
        @item-updated='updateDailyNote($event)'
      )
</template>

<script>
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'
import { db } from '~/plugins/firebase'

const dateObject = new Date()
const year = dateObject.getFullYear()
const month = dateObject.getMonth() + 1
const date = dateObject.getDate()
const dailyId = `${year}${`0${month}`.slice(-2)}${`0${date}`.slice(-2)}`

export default {
  name: 'TemplatesDailyNotes',
  props: {
    dailyId: { type: String, default: dailyId },
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
        this.fetchDailyNotes()
      }
    },
  },
  created() {
    if (this.uid) {
      this.fetchDailyNotes()
    }
  },
  methods: {
    async fetchDailyNotes() {
      const q = query(
        collection(db, 'dailyNotes'),
        where('uid', '==', this.uid),
        where('date', '==', this.dailyId)
      )
      const snapShots = await getDocs(q)
      this.dailyNotes = []
      snapShots.forEach((snapshot) => {
        this.dailyNotes.push({ ...snapshot.data(), id: snapshot.id })
      })
    },

    async updateDailyNote($event) {
      await updateDoc(doc(db, 'dailyNotes', $event.id), $event.updated)
      this.fetchDailyNotes()
    },
  },
}
</script>