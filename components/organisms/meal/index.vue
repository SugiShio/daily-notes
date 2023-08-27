<template lang="pug">
.o-meal
  header.o-meal__head
    i(:class='`el-icon-${item.mark}`')
    time.o-meal__time {{ item.createdAtTimeText }}
  ul.o-meal__list
    li.o-meal__item(v-for='i in item.items', @click='showDetail(i)')
      | {{ i.name }} ({{ i.value }}{{ i.unit }})

  button.o-meal__button-graph(@click='onButtonClicked') グラフを見る
</template>

  <script>
import { NUTRIENTS } from '~/constants/nutrients'
import { Meal } from '~/models/meal'

export default {
  name: 'OrganismsMeal',
  props: {
    item: { type: Meal, default: new Meal() },
  },
  computed: {
    nutrientBasis() {
      return this.$store.state.user.nutrientBasis
    },
  },
  methods: {
    async onButtonClicked() {
      const foodItems = await this.item.getFoodItems()
      const items = Object.keys(NUTRIENTS).map((key) => {
        const values = this.item.items.map((i, index) => {
          const foodItem = foodItems[index]
          const unit = foodItem.units.find((u) => u.unit === i.unit)
          const rate = unit ? unit.rate : 1
          return Math.round(foodItem.nutrients[key] * i.value * rate) / 100
        })
        const base = this.nutrientBasis[key]
        return {
          title: NUTRIENTS[key].label,
          values,
          base,
          unit: NUTRIENTS[key].unit,
        }
      })
      this.$store.commit('setTemplateNames', 'templates-meal-graph')
      this.$store.commit('graph/setItems', items)
    },

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

  &__list {
    margin: 10px 0;
  }

  &__button-graph {
    color: $color-main-dark;
    font-size: 12px;
  }
}
</style>