<template lang="pug">
.o-meal-editor
  .o-meal-editor__label(for='items') Items
    ul.o-meal-editor__content
      li.o-meal-editor__item(v-for='(item, index) in items')
        .o-meal-editor__item-name
          span {{ item.name }}
        atoms-input-number-with-unit(
          :value='item.value',
          :units='unitOptions(item)',
          @value-input='onValueInput(index, $event)',
          @unit-changed='onUnitChanged(index, $event)'
        )
        span(@click='deleteItem(index)')
          i.el-icon-delete

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
    onUnitChanged(index, unit) {
      const item = this.items[index]
      this.items.splice(index, 1, { ...item, unit })
    },
    onValueInput(index, value) {
      const item = this.items[index]
      this.items.splice(index, 1, { ...item, value })
    },
    unitOptions(item) {
      return item.units.map((unit) => {
        return { value: unit.unit, label: unit.unit }
      })
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

  &__item {
    display: flex;
    align-items: center;

    & + & {
      margin-top: 5px;
    }
  }

  &__item-name {
    overflow: hidden;

    span {
      display: block;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      // width: 100%;
    }
  }
}
</style>