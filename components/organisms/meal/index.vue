<template lang="pug">
div
  | {{ item.createdAt }}
  div(v-for='mealItem in mealItems')
    | {{ mealItem.name }} ({{ mealItem.value }}{{ mealItem.unit }})
</template>

  <script>
import { Meal } from '~/models/meal'
import { doc, getDoc } from 'firebase/firestore'
import { dbFoodDatabase } from '~/plugins/firebase/foodDatabase'

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