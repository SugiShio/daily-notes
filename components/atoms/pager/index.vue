<template lang="pug">
.a-pager
  .a-pager__page(
    v-for='(templateName, index) in templateNames',
    :style='positionStyle(index)'
  )
    button(@click='onBackClicked') <
    component(:is='templateName')
</template>

<script>
export default {
  name: 'AtomsPager',
  computed: {
    templateNames() {
      return this.$store.state.templateNames
    },
  },
  methods: {
    onBackClicked() {
      this.$store.commit('removeTemplateNames')
      if (!this.templateNames.length) {
        this.$store.commit('dailyForm/resetOriginalItem')
      }
    },
    positionStyle(index) {
      const reversedIndex = this.templateNames.length - index
      return {
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
  position: relative;
  z-index: $z-index-pager;

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
  }
}
</style>