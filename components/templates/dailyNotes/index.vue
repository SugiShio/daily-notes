<template lang="pug">
section.t-daily-notes
  time.t-daily-notes__title(:datetime='`${year}-${month}-${date}`')
    span.t-daily-notes__year {{ year }}
    span.t-daily-notes__date {{ month }}.{{ date }}
      span.t-daily-notes__day {{ day }}

  ul
    li(v-for='(dailyNote, id) in dailyNotes')
      component(
        :is='`organisms-${dailyNote.type}`',
        :item='dailyNote',
        @item-updated='updateDailyNote($event, id)'
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
import { Note } from '~/models/note'

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
    return {
      dailyNotes: {},
      isTypeSelectorOpen: false,
    }
  },
  computed: {
    uid() {
      return this.$store.state.user.uid
    },
    year() {
      return Number(this.dailyId.slice(0, 4))
    },
    month() {
      return Number(this.dailyId.slice(4, 6))
    },
    date() {
      return Number(this.dailyId.slice(6, 8))
    },
    day() {
      const date = new Date(this.year, this.month - 1, this.date)
      const dayText = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      return dayText[date.getDay()]
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
      this.dailyNotes = {}
      snapShots.forEach((snapshot) => {
        this.dailyNotes[snapshot.id] = new Note(snapshot.data())
      })
    },

    async updateDailyNote($event, id) {
      await updateDoc(doc(db, 'dailyNotes', id), $event)
      this.fetchDailyNotes()
    },
  },
}
</script>

<style lang="scss" scoped>
.t-daily-notes {
  &__title {
    display: block;
    margin: 50px 0;
  }

  &__year {
    display: block;
  }

  &__date {
    display: block;
    font-size: 24px;
  }

  &__day {
    margin-left: 10px;
  }
}
</style>