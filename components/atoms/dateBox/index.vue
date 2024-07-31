<template lang="pug">
.a-date-box(:style='style')
  time.a-date-box__main(:datetime='`${year}-${month}-${date}`')
    span.a-date-box__year.font-family-accent {{ year }}
    span.a-date-box__date.font-family-accent {{ month }}.{{ date }}
      span.a-date-box__day.font-family-accent {{ day }}
  .a-date-box__nav
    nuxt-link.a-date-box__prev(:to='linkPrevious') prev
    nuxt-link.a-date-box__today(v-if='!isToday' :to='{ name: "index"}')
    nuxt-link.a-date-box__next(:to='linkNext') next
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
    isToday() {
      return this.$store.state.dailyId === convertDateToDateId(new Date())
    },
    style() {
      return { fontFamily: 'Playwrite PE' }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/stylesheets/variables';

.a-date-box {
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;

  &__main {
    display: block;
  }

  &__year {
    display: block;
    font-size: 12px;
    margin-bottom: 8px;
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

  &__nav {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &__prev,
  &__next {
    display: block;
    font-size: 14px;
    line-height: 1.2;
    position: relative;
    text-decoration: none;
    width: 70px;

    &::before,
    &::after {
      background-color: $color-text;
      content: '';
      display: inline-block;
      height: 1px;
      position: absolute;
    }

    &::before {
      bottom: 3px;
      width: 25px;
    }

    &::after {
      bottom: 3px;
      width: 5px;
    }
  }

  &__prev {
    text-align: right;

    &::before {
      left: 0;
    }

    &::after {
      left: 0;
      transform-origin: left;
      transform: rotate(-45deg);
    }
  }

  &__next {
    &::before {
      right: 0;
    }

    &::after {
      right: 0;
      transform-origin: right;
      transform: rotate(45deg);
    }
  }

  &__today {
    position: relative;

    &::after {
      background-color: $color-text;
      content: '';
      display: block;
      height: 6px;
      left: 0;
      margin: auto;
      position: absolute;
      right: 0;
      transform: rotate(45deg);
      width: 6px;
    }
  }
}
</style>
