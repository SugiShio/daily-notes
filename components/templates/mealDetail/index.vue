<template lang="pug">
.t-meal-detail
  organisms-meal-item-list(:meal-items='mealItems')
  button.t-meal-detail__button-graph(@click='onButtonClicked') グラフを見る
</template>

<script>
import { NUTRIENTS } from '~/constants/nutrients'
export default {
  name: 'TemplatesMealDetail',
  computed: {
    mealItems() {
      return this.$store.state.meal.items
    },
    nutrientBasis() {
      return this.$store.state.user.nutrientBasis
    },
  },
  methods: {
    onButtonClicked() {
      const foodItems = this.$store.state.foodItems
      const items = Object.keys(NUTRIENTS).map((key) => {
        const values = this.mealItems.map((i, index) => {
          const foodItem = foodItems[index]
          const unit = foodItem.units.find((u) => u.unit === i.unit)
          const rate = unit ? unit.rate : 1
          return Math.round(foodItem.nutrients[key] * i.value * rate) / 100
        })
        const base = this.nutrientBasis[key]
        return {
          title: NUTRIENTS[key].label,
          values,
          base,
          unit: NUTRIENTS[key].unit,
        }
      })
      this.$store.commit('setTemplateNames', 'templates-meal-graph')
      this.$store.commit('graph/setItems', items)
    },
  },
}
</script>
