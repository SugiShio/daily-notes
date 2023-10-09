<template lang="pug">
component.a-tag(:is='htmlTag', @click='$emit("click")', :class='{ isActive }')
  slot
  span(v-if='removable')
    i.el-icon-close(@click='$emit("remove-clicked")')
</template>

<script>
export default {
  name: 'AtomsTag',
  props: {
    htmlTag: { type: String, default: 'span' },
    isActive: { type: Boolean, default: false },
    removable: { type: Boolean, default: false },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/stylesheets/variables';

.a-tag {
  border-radius: 2px;
  border: 1px solid $color-main-dark;
  color: $color-main-dark;
  cursor: pointer;
  line-height: 1;
  padding: 2px 6px;
  text-decoration: none;
  transition: 0.3s;

  &.isActive {
    background-color: $color-main-dark;
    color: #fff;
  }

  &:hover {
    background-color: $color-main-dark;
    color: #fff;
  }
}
</style>
