<template lang="pug">
ul.a-mark-selector
  li.a-mark-selector__item(
    v-for='mark in marks',
    @click='$emit("input", mark)'
  )
    i.a-mark-selector__icon(
      :class='[`el-icon-${mark}`, { isSelected: mark === value }]'
    )
</template>

<script>
export default {
  name: 'AtomsMarkSelector',
  props: {
    value: { type: String, default: 'apple' },
    marks: { type: Array, default: () => ['apple'] },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/stylesheets/variables';
.a-mark-selector {
  display: flex;
  margin: -10px;

  &__item {
    padding: 10px;
  }

  &__icon {
    font-size: 16px;
    &.isSelected {
      color: $color-main-dark;
    }
  }
}
</style>