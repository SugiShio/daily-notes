<template lang="pug">
input.a-input-text(
  :id='id'
  :placeholder='placeholder',
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
}
</script>

<style lang="scss" scoped>
@import '~/assets/stylesheets/input';
.a-input-text {
  @extend %input;
  width: 100%;
}
</style>
