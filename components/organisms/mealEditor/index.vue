<template lang="pug">
div
  ul
    li(v-for='(item, index) in items')
      | {{ item.name }}
      input(v-model='item.value')
      select(v-model='item.unit')
        option(v-for='unit in item.units') {{ unit.unit }}
      span(@click='deleteItem(index)') ×

  templates-search-food-item(@food-item-selected='onFoodItemSelected')
  atoms-button(@click='onSaveClicked', text='save')
</template>

<script>
import { Meal } from '~/models/meal'
import { doc, getDoc } from 'firebase/firestore'
import { dbFoodDatabase } from '~/plugins/firebase/foodDatabase'

export default {
  name: 'OrganismsMealEditor',
  data() {
    return {
      items: [],
    }
  },
  methods: {
    deleteItem(index) {
      this.items.splice(index, 1)
    },
    async onFoodItemSelected(id) {
      const snapshot = await getDoc(doc(dbFoodDatabase, 'foodItems', id))
      const item = snapshot.data()
      this.items.push({
        unit: item.units[0].unit,
        id: item.id,
        name: item.name,
        value: 100,
        units: item.units,
      })
    },
    onSaveClicked() {
      const meal = new Meal({ items: this.items })
      this.$store.dispatch('addItem', meal)
    },
  },
}
</script>