<template lang="pug">
ul.o-recipe-editor-input-ingredients
  organisms-recipe-editor-input-ingredient(
    v-for='(ingredient, index) in value'
    v-model='value[index]'
    :key='index'
    :up-able='index > 0'
    :down-able='index < value.length - 1'
    :remove-available='value.length > 1'
    @up-clicked='onUpClicked(index)'
    @down-clicked='onDownClicked(index)'
    @remove-clicked='removeIngredient(index)'
  )

</template>

<script>
export default {
  name: 'OrganismsRecipeEditorInputIngredients',
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    removeAvailable: { type: Boolean, default: true },
  },
  methods: {
    onUpClicked(index) {
      if (index <= 0) return
      const ingredients = [...this.value]
      const [item] = ingredients.splice(index, 1)
      ingredients.splice(index - 1, 0, item)
      this.$emit('input', ingredients)
    },
    onDownClicked(index) {
      if (this.value.length <= index) return
      const ingredients = [...this.value]
      const [item] = ingredients.splice(index, 1)
      ingredients.splice(index + 1, 0, item)
      this.$emit('input', ingredients)
    },
    removeIngredient(index) {
      const ingredients = [...this.value]
      ingredients.splice(index, 1)
      this.$emit('input', ingredients)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/stylesheets/variables';
.o-recipe-editor-input-ingredient {
  display: flex;
  align-items: center;
  gap: 10px;

  &__button-delete,
  &__button-icon {
    padding: 2px 5px;
    line-height: 20px;
  }

  &__button-delete {
    cursor: default;
    color: $color-gray-light;

    &.removeAvailable {
      color: $color-red;
      cursor: pointer;
    }
  }
}
</style>
