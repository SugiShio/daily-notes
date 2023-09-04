<template lang="pug">
.o-meal(@click='showDetail')
  header.o-meal__head
    i(:class='`el-icon-${item.mark}`')
    time.o-meal__time {{ item.createdAtTimeText }}
  organisms-meal-list(:meal-items='items', :show-count='5')
  slot
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
    showDetail() {
      this.$store.commit('setTemplateNames', 'templates-meal-detail')
      this.$store.commit('setMeal', this.item)
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
}
</style>