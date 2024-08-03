<template lang="pug">
textarea.a-input-multi-line-text(
  :id='id'
  :placeholder='placeholder',
  :style='style'
  :height='height - 2'
  :value='value',
  :rows='rows'
  @input='$emit("input", $event.target.value)'
)
</template>

<script>
export default {
  name: 'AtomsInputMultiLineText',
  props: {
    id: { type: String, default: undefined },
    height: { type: Number, default: null },
    placeholder: { type: String, default: '' },
    rows: { type: Number, default: 5 },
    type: { type: String, default: '' },
    value: { type: [String, Number], default: '' },
  },
  computed: {
    style() {
      const colorConfig = this.$store.state.colorConfig
      return {
        borderColor: colorConfig.mainDark,
        height: this.height ? `${this.height - 2}px` : null,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/stylesheets/input';
.a-input-multi-line-text {
  @extend %input;
  width: 100%;
  vertical-align: middle;
}
</style>
