<template lang="pug">
.a-input-image
  label
    slot
    input(
      type='file',
      accept='image/*',
      capture='camera',
      :value='value',
      @input='$emit("input", $event.target.value)'
    )
</template>

<script>
export default {
  name: 'AtomsInputImage',
  props: {
    value: { type: [String, Number], default: '' },
  },
}
</script>

<style lang="scss" scoped>
.a-input-image {
  input {
    display: none;
  }
}
</style>