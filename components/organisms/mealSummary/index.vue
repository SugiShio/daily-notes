<template lang="pug">
.o-meal-summary
  .o-meal-summary__block
    .o-meal-summary__label Energy
    .o-meal-summary__graph
      atoms-graph-circle(
        :size='120',
        :values='[nutrients.calorie]',
        :whole-value='nutrientBasis.calorie'
      )
      .o-meal-summary__values
        .o-meal-summary__calorie
          | {{ round(nutrients.calorie) }}
          span.o-meal-summary__unit kcal
        .o-meal-summary__percentage
          | {{ round((nutrients.calorie / nutrientBasis.calorie) * 100) }}
          span.o-meal-summary__unit %

  .o-meal-summary__block
    .o-meal-summary__label PCF
    .o-meal-summary__graph
      atoms-graph-circle(:values='Object.values(pcfBalance)', :size='120')
      .o-meal-summary__values
        .o-meal-summary__pcf
          dl.o-meal-summary__pcf-item
            dt P
            dd
              | {{ round(nutrients.protein) }}
              span.o-meal-summary__unit g
          dl.o-meal-summary__pcf-item
            dt F
            dd
              | {{ round(nutrients.fat) }}
              span.o-meal-summary__unit g
          dl.o-meal-summary__pcf-item
            dt C
            dd
              | {{ round(nutrients.carbohydrate) }}
              span.o-meal-summary__unit g
</template>

<script>
import { MAJOR_NUTRIENT_KEYS } from '~/constants/nutrients'

export default {
  name: 'OrganismsMealSummary',
  props: {
    meals: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    foodItems() {
      return this.$store.state.foodItems
    },
    nutrients() {
      const items = this.meals
        .map((meal) => meal.items)
        .flat()
        .map((mealItem) => {
          const foodItem = this.foodItems.find((fi) => fi.id === mealItem.id)
          const nutrients = {}
          if (foodItem) {
            const unit = foodItem.units.find((u) => u.unit === mealItem.unit)
            const rate = mealItem.unit === 'g' ? 1 : unit.rate
            MAJOR_NUTRIENT_KEYS.forEach((key) => {
              const value =
                (foodItem.nutrients[key] * mealItem.value * rate) / 100
              nutrients[key] = value
            })
          }
          return nutrients
        })
      const nutrients = {}
      MAJOR_NUTRIENT_KEYS.forEach((key) => {
        nutrients[key] = items.reduce((sum, current) => sum + current[key], 0)
      })
      return nutrients
    },
    nutrientBasis() {
      return this.$store.state.user.nutrientBasis
    },
    pcfBalance() {
      const protein = this.nutrients.protein * 4
      const fat = this.nutrients.fat * 9
      const carbohydrate = this.nutrients.carbohydrate * 4
      const total = protein + fat + carbohydrate

      return {
        protein: this.round((this.nutrients.protein * 400) / total),
        fat: this.round((this.nutrients.fat * 900) / total),
        carbohydrate: this.round((this.nutrients.carbohydrate * 400) / total),
      }
    },
  },
  methods: {
    round(value) {
      return Math.round(value * 10) / 10
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/stylesheets/variables';
.o-meal-summary {
  display: flex;
  justify-content: space-evenly;

  &__block {
    padding: 10px;
  }

  &__label {
    font-size: 12px;
    text-align: center;
    margin: 10px 0;
  }

  &__graph {
    position: relative;
  }

  &__values {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  &__calorie {
    font-weight: bold;
    font-size: 16px;
  }

  &__unit {
    font-weight: normal;
    font-size: 10px;
    margin-left: 2px;
  }

  &__percentage {
    color: $color-text-light;
    font-size: 10px;
  }

  &__pcf {
    width: 65px;
  }

  &__pcf-item {
    display: flex;
    justify-content: space-between;
    position: relative;
    padding-left: 14px;

    &::before {
      content: '';
      width: 10px;
      height: 10px;
      border-radius: 2px;
      position: absolute;
      left: 0;
      top: 0;
      bottom: 2px;
      margin: auto;
    }

    &:nth-child(1)::before {
      background-color: $color-green;
    }
    &:nth-child(2)::before {
      background-color: $color-blue;
    }
    &:nth-child(3)::before {
      background-color: $color-red;
    }

    dt,
    dd {
      line-height: 1.2;
      font-size: 13px;
    }

    dt {
      width: 20%;
    }
  }
}
</style>
