<template lang="pug">
input.a-input-text(
  :id='id'
  :placeholder='placeholder',
  :style='style'
  :type='type'
  :value='value',
  @input='$emit("input", $event.target.value)'
)
</template>

<script>
export default {
  name: 'AtomsInputText',
  props: {
    id: { type: String, default: undefined },
    placeholder: { type: String, default: '' },
    value: { type: [String, Number], default: '' },
    type: { type: String, default: '' },
  },
  computed: {
    style() {
      const colorConfig = this.$store.state.colorConfig
      return { borderColor: colorConfig.mainDark }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/stylesheets/input';
.a-input-text {
  @extend %input;
  width: 100%;
}
</style>
