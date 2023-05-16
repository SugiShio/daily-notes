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
    li.t-daily-notes__item(v-for='(dailyNote, id) in dailyNotes')
      component(
        :is='`organisms-${dailyNote.type}`',
        :item='dailyNote',
        @item-updated='updateDailyNote($event, id)'
      )
      button(@click='editItem(dailyNote, id)') Edit
</template>

<script>
import {
  convertDateIdToDate,
  convertDateToDateId,
  getDayText,
} from '~/scripts/dateHelper'

export default {
  name: 'TemplatesDailyNotes',
  props: {
    dailyNotesChanged: { type: Boolean, default: false },
  },
  computed: {
    uid() {
      return this.$store.state.user.uid
    },
    dailyNotes() {
      return this.$store.state.dailyNotes
    },
    dateObject() {
      return convertDateIdToDate(this.$store.state.dailyId)
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
  methods: {
    editItem(dailyNote, id) {
      this.$store.commit('setEditingItem', dailyNote)
      this.$store.commit('setEditingItemId', id)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/stylesheets/variables';

.t-daily-notes {
  &__title {
    display: block;
    font-family: $font-family-accent;
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

  &__item {
    margin: 20px 0;
  }
}
</style>