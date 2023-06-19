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
      i.a-pager__icon.el-icon-plus

    template(v-else)
      component(:is='componentName')
</template>

<script>
export default {
  name: 'AtomsPager',
  computed: {
    componentNames() {
      return this.templateNames.length ? this.templateNames : ['']
    },
    isMinimized() {
      return !this.templateNames.length
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
    line-height: 40px;
  }

  &__page {
    background: rgba(#fff, 0.95);
    border-radius: 8px;
    bottom: 5px;
    box-shadow: 0 0 5px rgba($color-main-dark, 0.2);
    height: calc(100vh - 10px);
    padding: 15px 20px;
    position: fixed;
    left: 5px;
    transition: 0.3s;
    width: calc(100vw - 10px);

    &.isMinimized {
      border-radius: 20px;
      bottom: 10px;
      color: $color-main-dark;
      height: 40px;
      left: 10px;
      line-height: 40px;
      padding: 0;
      text-align: center;
      width: 40px;
    }
  }
}
</style>