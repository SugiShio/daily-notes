<template lang="pug">
.o-meal-list-item(@click='showDetail')
  header.o-meal-list-item__head
  i(:class='`el-icon-${meal.mark}`')
  time.o-meal-list-item__time {{ meal.timeText }}

  organisms-meal-item-list(:meal-items='meal.items', :show-count='5')

  ul.o-meal-list-item__image-list
    li.o-meal-list-item__image-item(v-for='src in meal.files')
      img.o-meal-list-item__image(:src='src')

  atoms-action-list(
    :daily-note='meal'
    :id='id'
    )
</template>

<script>
import { Meal } from '~/models/meal'

export default {
  name: 'OrganismsMealListItem',
  props: {
    meal: { type: Meal, default: () => new Meal() },
    id: { type: String, required: true },
  },
  methods: {
    showDetail() {
      this.$store.commit('setTemplateNames', 'templates-meal-detail')
      this.$store.commit('setMeal', this.meal)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/stylesheets/variables';

.o-meal-list-item {
  padding: 15px 0;

  &__title {
    font-weight: bold;
    margin-bottom: 5px;
  }

  &__image-list {
    display: flex;
    margin: -5px;
    flex-wrap: wrap;
  }

  &__image-item {
    padding: 5px;
  }

  &__image {
    border-radius: 5px;
    height: 90px;
    object-fit: cover;
    width: 90px;
  }
}
</style>
