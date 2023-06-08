<template lang="pug">
.a-input-number-with-unit
  input.a-input-number-with-unit__input(
    type='number',
    @input='onValueInput',
    :value='value'
  )
  select.a-input-number-with-unit__selector(@change='onUnitChanged')
    option(v-for='unit in units', :value='unit.value') {{ unit.label }}
</template>

<script>
export default {
  name: 'AtomsInputNumberWithUnit',
  props: {
    units: { type: Array, default: () => [] },
    value: { type: [String, Number], default: '' },
  },
  methods: {
    onValueInput($event) {
      this.$emit('value-input', $event.target.value)
    },
    onUnitChanged($event) {
      this.$emit('unit-changed', $event.target.value)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/stylesheets/input';
.a-input-number-with-unit {
  display: inline-flex;

  &__input,
  &__selector {
    @extend %input;
  }

  &__input {
    width: 70px;
    border-right: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    padding-right: 0;
  }

  &__selector {
    width: 40px;
    border-left: 0;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    color: $color-main-dark;
    padding-left: 0;
    padding-right: 5px;
  }
}
</style>