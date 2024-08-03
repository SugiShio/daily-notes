<template lang="pug">
li.o-recipe-editor-input-step
  .o-recipe-editor-input-step__buttons
    button.o-recipe-editor-input-step__button-arrow(
      :disabled='!upAble'
      @click='$emit("up-clicked")'
      )
      i.el-icon-arrow-up

    button.o-recipe-editor-input-step__button-arrow(
      :disabled='!downAble'
      @click='$emit("down-clicked")'
      )
      i.el-icon-arrow-down

  .o-recipe-editor-input-step__description
    atoms-input-multi-line-text(
      v-model='value.description'
      :height='100'
      @input='onValueChanged'
      )

  .o-recipe-editor-input-step__action
    atoms-input-image(:max='1')

  .o-recipe-editor-input-step__action
    button.o-recipe-editor-input-step__button-delete(
      @click='$emit("remove-clicked")'
      :class='{removeAvailable}'
      )
      i.el-icon-delete

</template>

<script>
import { Step } from '~/models/recipe'

export default {
  name: 'OrganismsRecipeEditorInputStep',
  props: {
    order: { type: Number, default: 1 },
    value: {
      type: Step,
      default: () => new Step(),
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

.o-recipe-editor-input-step {
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
