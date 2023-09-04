
<template lang="pug">
.o-meal-list
  .o-meal-list__total
    .o-meal-list__total-title Total
    .o-meal-list__total-value
      strong {{ totalCarolie }}
      | kcal

  ul.o-meal-list__list
    li.o-meal-list__item(v-for='i in itemsToShow')
      .o-meal-list__item-name
        span {{ i.name }}
      .o-meal-list__item-value {{ i.valueText }}
    li.o-meal-list__more-text(v-if='moreText') {{ moreText }}
</template>

<script>
export default {
  name: 'OrganismsMealList',
  props: {
    mealItems: { type: Array, default: () => [] },
    showCount: { type: Number, default: null },
  },
  computed: {
    itemsToShow() {
      return this.showCount
        ? this.mealItems.slice(0, this.showCount)
        : this.mealItems
    },
    moreText() {
      return this.showCount && this.mealItems.length > this.showCount
        ? `more ${this.mealItems.length - this.showCount} items`
        : ''
    },
    totalCarolie() {
      const total = this.mealItems.reduce((a, c) => {
        return a + c.calorie
      }, 0)
      return Math.round(total * 100) / 100
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/stylesheets/variables';
.o-meal-list {
  &__total {
    display: flex;
    justify-content: space-between;
    margin: 15px 0 10px;
  }

  &__total-title {
    font-weight: bold;
  }

  &__total-value strong {
    font-size: 16px;
    margin-right: 5px;
  }

  &__list {
    margin: 10px 0;
  }

  &__item {
    display: flex;
    justify-content: space-between;
    margin: 5px 0;
    width: 100%;
  }

  &__more-text {
    color: $color-text-light;
    font-size: 10px;
  }

  &__item-name {
    flex-grow: 1;
    margin-right: 10px;
    overflow: hidden;

    span {
      display: block;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }

  &__item-value {
    color: $color-text-light;
    font-size: 12px;
    white-space: nowrap;
  }
}
</style>