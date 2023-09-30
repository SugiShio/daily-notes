<template lang="pug">
section.t-food-item(v-if='foodItem')
  a.t-food-item__head(:href='href', target='_blank')
    h2.t-food-item__title {{ foodItem.name }}
    i.el-icon-top-right

  .t-food-item__section
    .t-food-item__description(v-html='description')

  section.t-food-item__section(v-if='unitsText.length')
    h3.t-food-item__title-secondary
      | 単位
    ul
      li.t-food-item__unit-item(v-for='text in unitsText')
        | {{ text }}

  section.t-food-item__section
    h3.t-food-item__title-secondary 栄養素
    .t-food-item__content
      atoms-input-number-with-unit(
        :value='value',
        :units='units',
        :unit='unit',
        size='small',
        @value-input='onValueInput($event)',
        @unit-changed='onUnitChanged($event)'
      )
      span.t-food-item__rate-text あたり
    .t-food-item__content
      atoms-graph(:graph-items='graphItems')
</template>

<script>
import DOMPurify from 'dompurify'
import { NUTRIENTS } from '~/constants/nutrients'
import { FOOD_DATABASE_URL } from '~/constants/url'

export default {
  name: 'TemplatesFoodItem',
  data() {
    const foodItem = this.$store.state.foodItem.foodItem
    const unit = foodItem.unitDefault || foodItem.units[0].unit
    const value = foodItem.unitDefault ? 1 : 100
    return {
      value,
      unit,
    }
  },
  computed: {
    description() {
      return DOMPurify.sanitize(this.foodItem.description)
    },
    href() {
      return `${FOOD_DATABASE_URL}foodItems/${this.foodItem.id}`
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
    unitsText() {
      return this.foodItem.units
        .slice(1)
        .map((unit) => `${unit.unit} (${unit.rate}g)`)
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
    onUnitChanged($event) {
      this.unit = $event.rate
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/stylesheets/variables';

.t-food-item {
  &__head {
    text-decoration: none;
  }

  &__title {
    font-size: 20px;
    display: inline;
    margin-right: 5px;
  }

  &__title-secondary {
    font-weight: bold;
    margin: 10px 0 5px;
  }

  &__section {
    margin: 20px 0;
  }

  &__content {
    margin: 10px 0;
  }

  &__rate-text {
    margin-left: 10px;
  }

  &__description::v-deep {
    p {
      margin: 10px 0;
    }

    a {
      color: $color-main-dark;
    }
  }
}
</style>