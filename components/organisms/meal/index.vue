<template lang="pug">
.o-meal
  header.o-meal__head
    i(:class='`el-icon-${item.mark}`')
    time.o-meal__time {{ item.createdAtTimeText }}
  ul.o-meal__list
    li.o-meal__item(v-for='i in item.items')
      | {{ i.name }} ({{ i.value }}{{ i.unit }})

  button(@click='onButtonClicked') グラフを見る
</template>

  <script>
import { NUTRIENTS } from '~/constants/nutrients'
import { Meal } from '~/models/meal'

export default {
  name: 'OrganismsMeal',
  props: {
    item: { type: Meal, default: new Meal() },
  },
  methods: {
    async onButtonClicked() {
      const foodItems = await this.item.getFoodItems()
      const items = Object.keys(NUTRIENTS).map((key) => {
        const values = this.item.items.map((i, index) => {
          return Math.round(foodItems[index].nutrients[key] * i.value) / 100
        })
        return {
          title: NUTRIENTS[key].label,
          values,
          unit: NUTRIENTS[key].unit,
        }
      })
      this.$store.commit('setTemplateNames', 'templates-graph')
      this.$store.commit('graph/setItems', items)
    },
  },
}
</script>

<style lang="scss" scoped>
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
}
</style>