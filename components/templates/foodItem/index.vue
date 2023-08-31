<template lang="pug">
section.t-food-item(v-if='foodItem')
  h2.t-food-item__title {{ foodItem.name }}
  .t-food-item__description(v-html='description')
  atoms-input-number-with-unit(
    :value='value',
    :units='units',
    size='small',
    @value-input='onValueInput($event)',
    @unit-changed='onUnitChanged($event)'
  )
  | あたり
  atoms-graph(:graph-items='graphItems')
</template>

<script>
import DOMPurify from 'dompurify'
import { NUTRIENTS } from '~/constants/nutrients'

export default {
  name: 'TemplatesFoodItem',
  data() {
    return {
      value: 100,
      unit: 'g',
    }
  },
  computed: {
    description() {
      return DOMPurify.sanitize(this.foodItem.description)
    },
    foodItem() {
      return this.$store.state.foodItem.foodItem
    },
    graphItems() {
      return Object.keys(NUTRIENTS).map((key) => {
        const base = this.nutrientBasis[key]
        const rate = this.foodItem.units.find(
          (unit) => unit.unit === this.unit
        ).rate
        const value = (this.foodItem.nutrients[key] * this.value * rate) / 100
        return {
          title: NUTRIENTS[key].label,
          values: [value],
          base,
          unit: NUTRIENTS[key].unit,
        }
      })
    },
    nutrientBasis() {
      return this.$store.state.user.nutrientBasis
    },
    units() {
      return this.foodItem.units.map((u) => {
        return { label: u.unit, value: u.unit }
      })
    },
  },
  methods: {
    onCloseClicked() {
      this.$store.commit('foodItem/resetFoodItem')
      this.$store.commit('removeTemplateNames')
    },
    onValueInput(value) {
      this.value = value
    },
    onUnitChanged(unit) {
      this.unit = unit
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/stylesheets/variables';

.t-food-item {
  &__title {
    font-size: 20px;
  }

  &__description::v-deep {
    margin: 15px 0;

    p {
      margin: 10px 0;
    }

    a {
      color: $color-main-dark;
    }
  }
}
</style>