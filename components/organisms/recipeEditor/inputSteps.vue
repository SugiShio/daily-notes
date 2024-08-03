<template lang="pug">
ul.o-recipe-editor-input-steps
  organisms-recipe-editor-input-step(
    v-for='(step, index) in value'
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
  name: 'OrganismsRecipeEditorInputSteps',
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
      const step = [...this.value]
      const [item] = step.splice(index, 1)
      step.splice(index - 1, 0, item)
      this.$emit('input', step)
    },
    onDownClicked(index) {
      if (this.value.length <= index) return
      const step = [...this.value]
      const [item] = step.splice(index, 1)
      step.splice(index + 1, 0, item)
      this.$emit('input', step)
    },
    removeIngredient(index) {
      const step = [...this.value]
      step.splice(index, 1)
      this.$emit('input', step)
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
