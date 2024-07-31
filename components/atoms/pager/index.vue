<template lang="pug">
.a-pager
  .a-pager__page(
    v-for='(templateName, index) in templateNames',
    :style='style(index)'
  )
    .a-pager__head
      button.a-pager__button(@click='onBackClicked')
        i.el-icon-close(v-if='index === 0')
        i.el-icon-arrow-left(v-else)
    .a-pager__content
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
    style(index) {
      const reversedIndex = this.templateNames.length - index
      return {
        transform: `scale(${0.95 ** (reversedIndex - 1)}) translateX(${
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
    box-shadow: 0 0 3px rgba(#000, 0.2);
    height: calc(100vh - 20px);
    overflow: scroll;
    position: fixed;
    transition: 0.3s;
    width: calc(100vw - 20px);
    margin: 10px;
  }
  &__head {
    padding: 15px 10px 5px;
  }

  &__button {
    padding: 5px 10px;
  }

  &__content {
    padding: 15px 20px;
    overflow: hidden;
  }
}
</style>
