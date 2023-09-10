<template lang="pug">
.o-meal(@click='showDetail')
  header.o-meal__head
    i(:class='`el-icon-${meal.mark}`')
    time.o-meal__time {{ meal.createdAtTimeText }}

  ul.o-meal__image-list
    li.o-meal__image-item(v-for='src in meal.files')
      img.o-meal__image(:src='src')

  organisms-meal-list(:meal-items='meal.items', :show-count='5')
  slot
</template>

<script>
import { Meal } from '~/models/meal'

export default {
  name: 'OrganismsMeal',
  props: {
    meal: { type: Meal, default: new Meal() },
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

.o-meal {
  padding: 15px 20px;

  &__head {
    display: flex;
    align-items: center;
    margin: 5px 0;
  }

  &__time {
    font-size: 11px;
    margin-left: 5px;
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
    height: 100px;
    object-fit: cover;
    width: 100px;
  }
}
</style>