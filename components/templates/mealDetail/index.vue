<template lang="pug">
.t-meal-detail
  organisms-meal-list(:meal-items='mealItems')
</template>

<script>
export default {
  name: 'TemplatesMealDetail',
  computed: {
    mealItems() {
      return this.$store.state.meal.items
    },
  },
}
</script>