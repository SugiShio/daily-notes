<template lang="pug">
button.a-button(
  :style='style'
  :disabled='disabled',
  @click.prevent='$emit("click")'
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
  computed: {
    colorConfig() {
      return this.$store.state.colorConfig || {}
    },
    style() {
      if (this.outline) {
        if (this.disabled) {
          return {
            borderColor: this.colorConfig.mainLight,
            color: this.colorConfig.mainLight,
          }
        }
        return {
          borderColor: this.colorConfig.mainDark,
          color: this.colorConfig.mainDark,
        }
      }
      if (this.disabled) {
        return {
          borderColor: this.colorConfig.mainLight,
          backgroundColor: this.colorConfig.mainLight,
        }
      }
      return {
        backgroundColor: this.colorConfig.mainDark,
        borderColor: this.colorConfig.mainDark,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/stylesheets/variables';

.a-button {
  text-align: center;
  padding: 5px 15px;
  border-radius: 8px;
  border: 1px solid;
  color: #fff;
  transition: opacity 0.3s;

  &:hover:not([disabled]) {
    opacity: 0.6;
  }
}
</style>
