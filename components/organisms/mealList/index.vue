<template lang="pug">
.o-meal-list
  h2.o-meal-list__title Meal
  ul.o-meal-list__list
    li.o-meal-list__item(v-for='meal in mealsWithId')
      organisms-meal-list-item(:meal='meal.meal', :id='meal.id')

</template>

<script>
export default {
  name: 'OrganismsMealList',
  computed: {
    mealsWithId() {
      return this.$store.getters['dailyNotes/mealsWithId']
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/stylesheets/typography';

.o-meal-list {
  padding: 15px 20px;

  &__title {
    @extend %section-title;
  }

  &__list {
    margin: 10px 0;
    border-top: 1px solid $color-border;
  }

  &__item {
    border-bottom: 1px solid $color-border;
  }

  &__icon {
    font-size: 12px;
    margin-right: 5px;
    width: 15px;
    text-align: center;
  }
}
</style>
