<template lang="pug">
.a-selector
  .a-selector__item(v-for='option in options')
    input.a-selector__input(
      type='radio',
      :checked='value === option.value',
      :disabled='disabled',
      :id='option.value',
      :value='option.value',
      :name='fieldName',
      @input='onInput'
    )
    label.a-selector__label(:for='option.value') {{ option.label }}
</template>

<script>
export default {
  name: 'AtomsSelector',
  props: {
    disabled: { type: Boolean, default: false },
    fieldName: { type: String, required: true, default: '' },
    options: { type: Array, default: () => [] },
    value: { type: String, default: '' },
  },
  methods: {
    onInput($event) {
      this.$emit('input', $event.target.value)
    },
  },
}
</script>

<style lang="scss" scoped>
.a-selector {
  display: flex;
  &__item {
    & + & {
      margin-left: 10px;
    }
  }
  &__input {
    appearance: none;
  }

  &__input:checked + &__label {
    font-weight: bold;
  }
}
</style>