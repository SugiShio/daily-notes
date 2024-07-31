<template lang="pug">
.a-input-time
  select.a-input-time__select(
    :style='style'
    v-model='year',
    @input='onYearChanged($event.target.value)'
  )
    option(v-for='yearOption in yearOptions', :value='yearOption') {{ yearOption }}
  | /
  select.a-input-time__select(
    :style='style'
    v-model='month',
    @input='onMonthChanged($event.target.value)'
  )
    option(v-for='monthOption in monthOptions', :value='monthOption') {{ monthOption }}
  | /
  select.a-input-time__select(
    :style='style'
    v-model='date',
    @input='onDateChanged($event.target.value)'
  )
    option(v-for='dateOption in dateOptions', :value='dateOption') {{ dateOption }}

  select.a-input-time__select(
    :style='style'
    v-model='hours',
    @input='onHoursChanged($event.target.value)'
  )
    option(v-for='hoursOption in hoursOptions', :value='hoursOption') {{ hoursOption }}
  | :
  select.a-input-time__select(
    :style='style'
    v-model='minutes',
    @input='onMinutesChanged($event.target.value)'
  )
    option(v-for='minutesOption in minutesOptions', :value='minutesOption') {{ minutesOption }}

  button(@click='clear')
    i.el-icon-error
</template>

<script>
export default {
  name: 'AtomsInputTime',
  props: {
    value: { type: Date, default: '' },
  },
  data() {
    return this.value
      ? {
          year: this.value.getFullYear(),
          month: this.value.getMonth() + 1,
          date: this.value.getDate(),
          hours: this.value.getHours(),
          minutes: this.value.getMinutes(),
        }
      : {
          year: null,
          month: null,
          date: null,
          hours: null,
          minutes: null,
        }
  },
  computed: {
    yearOptions() {
      const year = new Date().getFullYear()
      return Array(10)
        .fill(year)
        .map((_, index) => year + index)
    },
    monthOptions() {
      return Array(12)
        .fill(1)
        .map((month, index) => month + index)
    },
    dateOptions() {
      const lastDate = new Date(this.year, this.month, 0).getDate()
      return Array(lastDate)
        .fill(1)
        .map((date, index) => date + index)
    },
    hoursOptions() {
      return Array(24)
        .fill(0)
        .map((hour, index) => hour + index)
    },
    minutesOptions() {
      return Array(60)
        .fill(0)
        .map((minute, index) => `0${minute + index}`.slice(-2))
    },
    style() {
      const colorConfig = this.$store.state.colorConfig
      return { borderColor: colorConfig.mainDark }
    },
  },
  methods: {
    clear() {
      this.year = null
      this.month = null
      this.date = null
      this.hours = null
      this.minutes = null
      this.$emit('input', null)
    },
    emitDate() {
      const date = new Date(
        this.year,
        this.month - 1,
        this.date,
        this.hours,
        this.minutes
      )
      const isTimeNull = this.hours === null && this.minutes === null
      this.$emit('input', date, isTimeNull)
    },
    onYearChanged(year) {
      this.year = year
      this.month = this.month || 1
      this.date = this.date || 1
      this.emitDate()
    },
    onMonthChanged(month) {
      this.year = this.year || this.yearOptions[0]
      this.month = month
      this.date = this.date || 1
      this.emitDate()
    },
    onDateChanged(date) {
      this.year = this.year || this.yearOptions[0]
      this.month = this.month || 1
      this.date = date
      this.emitDate()
    },
    onHoursChanged(hour) {
      this.year = this.year || this.yearOptions[0]
      this.month = this.month || 1
      this.date = this.date || 1
      this.hours = hour
      this.minutes = this.minutes || '00'
      this.emitDate()
    },
    onMinutesChanged(minute) {
      this.year = this.year || this.yearOptions[0]
      this.month = this.month || 1
      this.date = this.date || 1
      this.hours = this.hours || 0
      this.minutes = minute
      this.emitDate()
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/stylesheets/input';
.a-input-time {
  &__select {
    @extend %input;
    appearance: none;
    padding: 5px 10px;
    margin: 0 5px;

    &:first-child {
      margin-left: 0;
    }
  }
}
</style>
