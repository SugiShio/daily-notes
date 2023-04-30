<template lang="pug">
section.t-daily-notes
  time.t-daily-notes__title(:datetime='`${year}-${month}-${date}`')
    span.t-daily-notes__year {{ year }}
    span.t-daily-notes__date {{ month }}.{{ date }}
      span.t-daily-notes__day {{ day }}

  .t-daily-notes__selector
    nuxt-link.t-daily-notes__prev(:to='linkPrevious') Prev
    nuxt-link.t-daily-notes__next(:to='linkNext') Next

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
import {
  convertDateIdToDate,
  convertDateToDateId,
  getDayText,
} from '~/scripts/dateHelper'

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
    dateObject() {
      return convertDateIdToDate(this.dailyId)
    },
    year() {
      return this.dateObject.getFullYear()
    },
    month() {
      return this.dateObject.getMonth() + 1
    },
    date() {
      return this.dateObject.getDate()
    },
    day() {
      return getDayText(this.dateObject)
    },
    linkNext() {
      const nextDate = new Date(this.dateObject)
      nextDate.setDate(this.dateObject.getDate() + 1)
      const id = convertDateToDateId(nextDate)

      return { name: 'id', params: { id } }
    },
    linkPrevious() {
      const previousDate = new Date(this.dateObject)
      previousDate.setDate(this.dateObject.getDate() - 1)
      const id = convertDateToDateId(previousDate)

      return { name: 'id', params: { id } }
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
    margin: 50px 0 10px;
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

  &__selector {
    display: flex;
    justify-content: space-between;
    margin: 10px 0 30px;
  }

  &__prev,
  &__next {
    text-decoration: none;
    font-size: 14px;
  }
}
</style>