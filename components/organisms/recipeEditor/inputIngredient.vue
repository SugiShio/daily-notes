<template lang="pug">
li.o-recipe-editor-input-ingredient
  .o-recipe-editor-input-ingredient__buttons
    button.o-recipe-editor-input-ingredient__button-arrow(
      :disabled='!upAble'
      @click='$emit("up-clicked")'
      )
      i.el-icon-arrow-up

    button.o-recipe-editor-input-ingredient__button-arrow(
      :disabled='!downAble'
      @click='$emit("down-clicked")'
      )
      i.el-icon-arrow-down

  .o-recipe-editor-input-ingredient__ingredient
    atoms-input-text(
      v-model='value.name'
      placeholder='材料・調味料'
      @input='onValueChanged'
      )

  .o-recipe-editor-input-ingredient__amount
    atoms-input-text(
      v-model='value.amountText'
      placeholder='分量'
      @input='onValueChanged'
      )

  .o-recipe-editor-input-ingredient__action
    button.o-recipe-editor-input-ingredient__button-link
      i.el-icon-link

  .o-recipe-editor-input-ingredient__action
    button.o-recipe-editor-input-ingredient__button-delete(
      @click='$emit("remove-clicked")'
      :class='{removeAvailable}'
      )
      i.el-icon-delete

</template>

<script>
import { Ingredient } from '~/models/recipe'

export default {
  name: 'OrganismsRecipeEditorInputIngredient',
  props: {
    value: {
      type: Ingredient,
      default: () => new Ingredient(),
    },
    upAble: { type: Boolean, default: true },
    downAble: { type: Boolean, default: true },
    removeAvailable: { type: Boolean, default: true },
  },
  methods: {
    onValueChanged() {
      this.$emit('input', this.value)
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
  margin: 10px 0;

  &__button-arrow {
    padding: 0 10px;
    display: block;

    &[disabled] {
      opacity: 0.3;
    }
  }

  &__button-delete {
    cursor: default;
    color: $color-gray-light;
    padding: 2px 5px;
    line-height: 20px;

    &.removeAvailable {
      color: $color-red;
      cursor: pointer;
    }
  }
}
</style>
