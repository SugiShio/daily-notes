<template lang="pug">
.o-meal
  header.o-meal__head
    i(:class='`el-icon-${item.mark}`')
    time.o-meal__time {{ item.createdAtTimeText }}

  ul.o-meal__list
    li.o-meal__item(v-for='mealItem in mealItems')
      | {{ mealItem.name }} ({{ mealItem.value }}{{ mealItem.unit }})
</template>

  <script>
import { doc, getDoc } from 'firebase/firestore'
import { dbFoodDatabase } from '~/plugins/firebase/foodDatabase'
import { Meal } from '~/models/meal'

export default {
  name: 'OrganismsMeal',
  props: {
    item: { type: Meal, default: new Meal() },
  },
  data() {
    return {
      mealItems: [],
    }
  },
  created() {
    this.item.items.forEach(async (item) => {
      const snapshot = await getDoc(doc(dbFoodDatabase, 'foodItems', item.id))
      const data = snapshot.data()
      this.mealItems.push({
        name: data.name,
        value: item.value,
        unit: item.unit,
      })
    })
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