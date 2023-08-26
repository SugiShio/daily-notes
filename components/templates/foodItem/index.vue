<template lang="pug">
section.t-food-item(v-if='foodItem')
  h2.t-food-item {{ foodItem.name }}
  ul
    li(v-for='nutrient in foodItem.nutrients')
      | {{ nutrient }}
  button(@click='onCloseClicked') Close
</template>

<script>
export default {
  name: 'TemplatesFoodItem',
  computed: {
    foodItem() {
      return this.$store.state.foodItem.foodItem
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

<style lang="sass" scoped>
</style>