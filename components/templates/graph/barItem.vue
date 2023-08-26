<template lang="pug">
.t-bar-item(:class='index')
  | bar
</template>
<script>
export default {
  name: 'TemplatesGraphBarItem',
  props: {
    value: { type: Number, default: 0 },
  },
  style(value) {
    const widthGraphContainer = this.$refs.barContainer[0].clientWidth
    const widthBase = widthGraphContainer * 0.7
    console.log('🍅', value)
    const base = 120
    const rate = value / base
    const width = widthBase * rate
    console.log('🍆', base, rate, widthBase, { width: `${width}px` })
    return { width: `${width}px` }
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/stylesheets/variables';
.t-bar-item {
  background-color: $color-green;
  height: 15px;
  z-index: 1;

  &:first-child {
    border-radius: 3px 0 0 3px;
  }

  &:last-child {
    border-radius: 0 3px 3px 0;
  }

  &:nth-child(n + 1) {
    background-color: #ffad69;
  }
  &:nth-child(n + 2) {
    background-color: #9c3848;
  }
  &:nth-child(n + 3) {
    background-color: $color-violet;
  }
  &:nth-child(n + 4) {
    background-color: $color-blue;
  }
}
</style>