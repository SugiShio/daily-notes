<template lang="pug">
section.t-daily-notes
  organisms-task-list
  time.t-daily-notes__title(:datetime='`${year}-${month}-${date}`')
    span.t-daily-notes__year {{ year }}
    span.t-daily-notes__date {{ month }}.{{ date }}
      span.t-daily-notes__day {{ day }}

  .t-daily-notes__selector
    nuxt-link.t-daily-notes__prev(:to='linkPrevious')
      i.el-icon-arrow-left
    nuxt-link.t-daily-notes__next(:to='linkNext')
      i.el-icon-arrow-right

  ul
    li.t-daily-notes__item(v-for='(dailyNote, id) in dailyNotes')
      component(
        :is='`organisms-${dailyNote.type}`',
        :item='dailyNote',
        @item-updated='updateDailyNote($event, id)'
      )
      .t-daily-notes__actions
        button.t-daily-notes__action(@click='editItem(dailyNote, id)')
          i.el-icon-edit
        button.t-daily-notes__action(@click='deleteItem(id)')
          i.el-icon-delete
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
    deleteItem(id) {
      if (confirm('削除します。よろしいですか？')) {
        this.$store.dispatch('deleteItem', id)
      }
    },
    editItem(dailyNote, id) {
      this.$emit('edit-clicked', { dailyNote, id })
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
    margin: 10px;
    background: rgba(#fff, 0.75);
    box-shadow: 0 0 5px rgba($color-main-dark, 0.2);
    padding: 15px 20px;
    border-radius: 8px;
  }

  &__actions {
    display: flex;
    justify-content: flex-end;
  }

  &__action {
    padding: 2px 5px;
    margin: 0 5px;
  }
}
</style>