<template lang="pug">
.o-meal
  header.o-meal__head
    i(:class='`el-icon-${item.mark}`')
    time.o-meal__time {{ item.createdAtTimeText }}
  .o-meal__total
    .o-meal__total-title Total
    .o-meal__total-value
      strong {{ totalCarolie }}
      | kcal
  ul.o-meal__list
    li.o-meal__item(v-for='i in itemsToShow', @click='showDetail(i)')
      .o-meal__item-name
        span {{ i.name }}
      .o-meal__item-value {{ i.valueText }}
    li.o-meal__more-text(v-if='moreText') {{ moreText }}
</template>

  <script>
import { Meal } from '~/models/meal'

export default {
  name: 'OrganismsMeal',
  props: {
    item: { type: Meal, default: new Meal() },
  },
  data() {
    return {
      foodItems: [],
      items: [],
    }
  },
  computed: {
    itemsToShow() {
      return this.items.slice(0, 5)
    },
    moreText() {
      return this.items.length > 5 ? `more ${this.items.length - 5} items` : ''
    },
    nutrientBasis() {
      return this.$store.state.user.nutrientBasis
    },
    totalCarolie() {
      const total = this.items.reduce((a, c) => {
        return a + c.calorie
      }, 0)
      return Math.round(total * 100) / 100
    },
  },
  async created() {
    this.foodItems = await this.item.getFoodItems()
    this.items = this.item.items.map((item) => {
      const rate = item.units.find((u) => u.unit === item.unit).rate
      const foodItem = this.foodItems.find(
        (foodItem) => foodItem.id === item.id
      )
      if (!foodItem) return item
      const calorie =
        Math.round(foodItem.nutrients.calorie * item.value * rate) / 100
      const valueText = `${item.value}${item.unit} / ${calorie}kcal`

      return {
        ...item,
        calorie,
        valueText,
      }
    })
  },
  methods: {
    showDetail(item) {
      this.$store.dispatch('foodItem/showFoodItemDetail', item.id)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/stylesheets/variables';

.o-meal {
  &__head {
    display: flex;
    align-items: center;
    margin: 5px 0;
  }

  &__time {
    font-size: 11px;
    margin-left: 5px;
  }

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

  &__meal-item span {
    display: block;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
</style>