<template lang="pug">
input.a-input-text(
  :placeholder='placeholder',
  :value='value',
  @input='$emit("input", $event.target.value)'
)
</template>

<script>
export default {
  name: 'AtomsInputText',
  props: {
    placeholder: { type: String, default: '' },
    value: { type: [String, Number], default: '' },
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