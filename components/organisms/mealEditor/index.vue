<template lang="pug">
.o-meal-editor
  .o-meal-editor__item
    label.o-meal-editor__label(for='date') Date
      .o-meal-editor__content
        | {{ editingItem.dateText }}

  .o-meal-editor__item
    .o-meal-editor__label(for='items') Items
      .o-meal-editor__content
        ul.o-meal-editor__food-items
          li.o-meal-editor__food-item(v-for='(item, index) in items')
            .o-meal-editor__food-item-name
              span {{ item.name }}
            atoms-input-number-with-unit(
              :value='item.value',
              :units='unitOptions(item)',
              size='small',
              @value-input='onValueInput(index, $event)',
              @unit-changed='onUnitChanged(index, $event)'
            )
            button.o-meal-editor__button-delete(@click='deleteItem(index)')
              i.el-icon-delete

        button.o-meal-editor__button-add(
          @click='$store.commit("setTemplateNames", "templates-search-food-item")'
        )
          i.el-icon-circle-plus-outline
          | Add items

  .o-meal-editor__item
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
      const item = new Meal({ ...this.originalItem, items: this.items })
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
      if (!item.units) return []
      return item.units.map((unit) => {
        return { value: unit.unit, label: unit.unit }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/stylesheets/variables';
@import '~/assets/stylesheets/form';
.o-meal-editor {
  &__item {
    @extend %form__item;
  }

  &__label {
    @extend %form__label;
  }

  &__content {
    @extend %form__content;
  }

  &__food-items {
    margin: 10px 0;
  }

  &__food-item {
    display: flex;
    align-items: center;

    & + & {
      margin-top: 10px;
    }
  }

  &__food-item-name {
    flex-grow: 1;
    overflow: hidden;

    span {
      display: block;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }

  &__button-delete {
    color: $color-red;
    padding: 5px 10px;
    margin-left: 5px;
  }

  &__button-add {
    color: $color-main-dark;
    padding: 5px 0;
  }
}
</style>