<template lang="pug">
section.t-food-item(v-if='foodItem')
  h2.t-food-item__title {{ foodItem.name }}
  .t-food-item__description {{ foodItem.description }}
  atoms-graph(:graph-items='graphItems')
</template>

<script>
import { NUTRIENTS } from '~/constants/nutrients'
export default {
  name: 'TemplatesFoodItem',
  computed: {
    foodItem() {
      return this.$store.state.foodItem.foodItem
    },
    graphItems() {
      return Object.keys(NUTRIENTS).map((key) => {
        const base = this.nutrientBasis[key]
        return {
          title: NUTRIENTS[key].label,
          values: [this.foodItem.nutrients[key]],
          base,
          unit: NUTRIENTS[key].unit,
        }
      })
    },
    nutrientBasis() {
      return this.$store.state.user.nutrientBasis
    },
  },
  methods: {
    onCloseClicked() {
      this.$store.commit('foodItem/resetFoodItem')
      this.$store.commit('removeTemplateNames')
    },
  },
}
</script>

<style lang="scss" scoped>
.t-food-item {
  &__title {
    font-size: 20px;
  }

  &__description {
    margin: 15px 0;
  }
}
</style>