<template lang="pug">
button.a-button(
  :class='{ outline }',
  :disabled='disabled',
  @click='$emit("click")'
) {{ text }}
</template>
<script>
export default {
  name: 'AtomsButton',
  props: {
    disabled: { type: Boolean, default: false },
    outline: { type: Boolean, default: false },
    text: { type: String, default: '' },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/stylesheets/variables';

.a-button {
  text-align: center;
  padding: 5px 15px;
  background-color: $color-main-dark;
  border-radius: 8px;
  border: 1px solid $color-main-dark;
  color: #fff;

  &[disabled] {
    border-color: $color-main-light;
    background-color: $color-main-light;
  }

  &.outline {
    background-color: transparent;
    color: $color-main-dark;

    &[disabled] {
      color: $color-main-light;
    }
  }
}
</style>