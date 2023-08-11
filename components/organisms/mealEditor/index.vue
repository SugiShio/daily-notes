<template lang="pug">
.o-meal-editor
  atoms-button(
    @click='$store.commit("setTemplateNames", "templates-search-food-item")',
    text='Search'
  )
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
    .o-meal-editor__content
      atoms-button(
        :disabled='!items.length',
        text='Save',
        @click='onSaveClicked'
      )
</template>

<script>
import { Item, Meal } from '~/models/meal'

export default {
  name: 'OrganismsMealEditor',
  data() {
    return {
      editingItem: new Meal(),
      items: [],
    }
  },
  computed: {
    selectedFoodItem() {
      return this.$store.state.searchFoodItem.selectedFoodItem
    },
    originalItem() {
      return this.$store.state.dailyForm.originalItem
    },
  },
  watch: {
    selectedFoodItem(foodItem) {
      this.items.push(new Item(foodItem))
    },
  },
  created() {
    if (this.originalItem) {
      this.originalItem.items.forEach((item) => {
        this.items.push(new Item(item))
      })
    }
  },
  methods: {
    deleteItem(index) {
      this.items.splice(index, 1)
    },

    async onSaveClicked() {
      const item = new Meal({ items: this.items })
      try {
        await this.$store.dispatch('dailyForm/onSaveClicked', item)
        this.$store.commit('resetTemplateNames')
        this.$store.dispatch('fetchDailyNotes')
      } catch (error) {
        console.error(error)
      }
    },

    onUnitChanged(index, unit) {
      this.items[index].unit = unit
    },

    onValueInput(index, value) {
      this.items[index].value = value
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
    }
  }
}
</style>