
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
  data() {
    return {
      mealItemsWithData: [],
    }
  },
  computed: {
    itemsToShow() {
      return this.showCount
        ? this.mealItemsWithData.slice(0, this.showCount)
        : this.mealItemsWithData
    },
    moreText() {
      return this.showCount && this.mealItems.length > this.showCount
        ? `more ${this.mealItems.length - this.showCount} items`
        : ''
    },
    totalCarolie() {
      const total = this.mealItemsWithData.reduce((a, c) => {
        return a + c.calorie
      }, 0)
      return Math.round(total * 100) / 100
    },
  },
  watch: {
    async mealItems() {
      await this.fetchMealItemData()
    },
  },
  async created() {
    await this.fetchMealItemData()
  },
  methods: {
    async fetchMealItemData() {
      const ids = this.mealItems.map((mealItem) => mealItem.id)
      await this.$store.dispatch('fetchFoodItems', ids)
      const foodItems = this.$store.state.foodItems

      this.mealItemsWithData = this.mealItems.map((item) => {
        const foodItem = foodItems.find((foodItem) => foodItem.id === item.id)

        const rate = foodItem.units.find((u) => u.unit === item.unit).rate

        const calorie =
          Math.round(foodItem.nutrients.calorie * item.value * rate) / 100
        const valueText = `${item.value}${item.unit} / ${calorie}kcal`

        return {
          ...item,
          name: foodItem.name,
          units: foodItem.units,
          calorie,
          valueText,
        }
      })
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