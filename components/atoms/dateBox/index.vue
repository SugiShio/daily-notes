<template lang="pug">
.a-date-box
  nuxt-link.a-date-box__prev(:to='linkPrevious') Prev

  time.a-date-box__main(:datetime='`${year}-${month}-${date}`')
    span.a-date-box__year {{ year }}
    span.a-date-box__date {{ month }}.{{ date }}
      span.a-date-box__day {{ day }}

  nuxt-link.a-date-box__next(:to='linkNext') Next
</template>

<script>
import {
  convertDateIdToDate,
  convertDateToDateId,
  getDayText,
} from '~/scripts/dateHelper'

export default {
  name: 'AtomsDateBox',
  computed: {
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
}
</script>

<style lang="scss" scoped>
@import '~/assets/stylesheets/variables';

.a-date-box {
  align-items: center;
  display: flex;
  justify-content: space-between;

  &__main {
    display: block;
    font-family: $font-family-accent;
    text-align: center;
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
    font-family: $font-family-accent;
  }

  &__prev {
    transform: rotate(90deg);
  }

  &__next {
    transform: rotate(-90deg);
  }
}
</style>