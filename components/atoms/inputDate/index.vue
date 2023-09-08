<template lang="pug">
.a-input-date
  select.a-input-date__year(
    v-model='year',
    @input='onYearChanged($event.target.value)'
  )
    option(v-for='yearOption in yearOptions', :value='yearOption') {{ yearOption }}
  | /
  select.a-input-date__month(
    v-model='month',
    @input='onMonthChanged($event.target.value)'
  )
    option(v-for='monthOption in monthOptions', :value='monthOption') {{ monthOption }}
  | /
  select.a-input-date__date(
    v-model='date',
    @input='onDateChanged($event.target.value)'
  )
    option(v-for='dateOption in dateOptions', :value='dateOption') {{ dateOption }}

  button(@click='clear')
    i.el-icon-error
</template>

    <script>
export default {
  name: 'AtomsInputTime',
  props: {
    value: { type: Date, default: null },
  },
  data() {
    const today = new Date()
    return {
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      date: today.getDate(),
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
  },
  created() {
    if (this.value) {
      console.log(this.value)
      this.year = this.value.getFullYear()
      this.month = this.value.getMonth() + 1
      this.date = this.value.getDate()
    }
  },
  methods: {
    clear() {
      this.year = null
      this.month = null
      this.date = null
      this.$emit('input', null)
    },
    emitDate() {
      const date = new Date(this.year, this.month - 1, this.date)
      this.$emit('input', date)
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
  },
}
</script>

    <style lang="scss" scoped>
@import '~/assets/stylesheets/input';
.a-input-date {
  @extend %input;
  padding: 0;

  &__year,
  &__month,
  &__date {
    appearance: none;
    background-color: transparent;
    padding: 8px 10px;
    text-align: right;
  }

  &__year {
  }
}
</style>