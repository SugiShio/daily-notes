<template lang="pug">
.a-input-number-with-unit
  input.a-input-number-with-unit__input(
    type='number',
    @input='onValueInput',
    :value='value',
    :class='size',
    :style='styleInput'
    :unit='unit'
  )
  select.a-input-number-with-unit__selector(
    @change='onUnitChanged',
    :value='unit'
    :style='styleSelector'
  )
    option(v-for='unit in units', :value='unit.value') {{ unit.label }}
</template>

<script>
export default {
  name: 'AtomsInputNumberWithUnit',
  props: {
    size: { type: String, default: 'midium' },
    units: { type: Array, default: () => [] },
    unit: { type: String, default: '' },
    value: { type: [String, Number], default: '' },
  },
  data() {
    return {
      oldUnit: this.unit,
    }
  },
  computed: {
    colorConfig() {
      return this.$store.state.colorConfig || {}
    },
    styleInput() {
      return { borderColor: this.colorConfig.mainDark }
    },
    styleSelector() {
      return {
        backgroundColor: this.colorConfig.grayLight,
        color: this.colorConfig.mainDark,
        borderColor: this.colorConfig.mainDark,
      }
    },
  },
  methods: {
    onValueInput($event) {
      const value = Number($event.target.value)
      this.$emit('value-input', isNaN(value) ? '' : $event.target.value)
    },
    onUnitChanged($event) {
      this.$emit('unit-changed', {
        unit: $event.target.value,
        oldUnit: this.oldUnit,
      })
      this.oldUnit = $event.target.value
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
    padding: 0 5px 0 10px;
  }
}
</style>
