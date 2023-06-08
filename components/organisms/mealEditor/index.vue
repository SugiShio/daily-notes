<template lang="pug">
.o-meal-editor
  .o-meal-editor__label(for='items') Items
    ul.o-meal-editor__content
      li(v-for='(item, index) in items')
        | {{ item.name }}
        input(v-model='item.value')
        select(v-model='item.unit')
          option(v-for='unit in item.units') {{ unit.unit }}
        span(@click='deleteItem(index)') ×

  templates-search-food-item(@food-item-selected='onFoodItemSelected')
  atoms-button(@click='onCancelClicked', text='Cancel', outline)
  atoms-button(@click='onSaveClicked', text='Save')
</template>

<script>
import { doc, getDoc } from 'firebase/firestore'
import { dbFoodDatabase } from '~/plugins/firebase/foodDatabase'
import { Meal } from '~/models/meal'

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
    onCancelClicked() {
      this.$emit('cancel-clicked')
    },
    onSaveClicked() {
      const meal = new Meal({ items: this.items })
      this.$store.dispatch('addItem', meal)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/stylesheets/form';
.o-meal-editor {
  @extend %form__item;

  &__label {
    @extend %form__label;
  }

  &__content {
    @extend %form__content;
  }
}
</style>