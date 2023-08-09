<template lang="pug">
.a-pager
  .a-pager__page(
    v-for='(componentName, index) in componentNames',
    :class='{ isMinimized }',
    :style='positionStyle(index)'
  )
    button.a-pager__button(
      v-if='isMinimized',
      @click='$emit("pager-button-clicked")'
    )
      i.a-pager__icon(:class='`el-icon-${icon}`')

    template(v-else)
      component(:is='componentName')
</template>

<script>
export default {
  name: 'AtomsPager',
  props: {
    icon: { type: String, default: 'plus' },
    isMinimized: { type: Boolean, default: true },
  },
  computed: {
    componentNames() {
      return this.templateNames.length ? this.templateNames : ['']
    },
    templateNames() {
      return this.$store.state.templateNames
    },
  },
  methods: {
    positionStyle(index) {
      const reversedIndex = this.templateNames.length - index
      return this.isMinimized
        ? {}
        : {
            transform: `scale(${0.95 ** reversedIndex}) translateX(${
              -(reversedIndex - 1) * 50
            }px)`,
          }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/stylesheets/variables';

.a-pager {
  &__button {
    line-height: 50px;
    font-size: 20px;
  }

  &__page {
    background: rgba(#fff, 0.95);
    border-radius: 8px;
    box-shadow: 0 0 5px rgba($color-main-dark, 0.2);
    height: calc(100vh - 10px);
    padding: 15px 20px;
    position: fixed;
    transition: 0.3s;
    width: calc(100vw - 10px);
    margin: auto;

    &:not(.isMinimized) {
      top: 5px;
      right: 5px;
      bottom: 5px;
      left: 5px;
    }

    &.isMinimized {
      border-radius: 5px;
      color: $color-main-dark;
      height: 50px;
      padding: 0;
      position: relative;
      text-align: center;
      width: 50px;
    }
  }
}
</style>