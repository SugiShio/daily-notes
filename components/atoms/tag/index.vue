<template lang="pug">
component.a-tag(
  :is='htmlTag'
  @click='$emit("click")'
  :class='{ isActive }'
  :style='style'
  @mouseenter='isHover = true'
  @mouseleave='isHover = false'
  )
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
  data() {
    return {
      isHover: false,
    }
  },
  computed: {
    style() {
      const colorConfig = this.$store.state.colorConfig
      return {
        backgroundColor:
          this.isActive || this.isHover ? colorConfig.mainDark : undefined,
        borderColor: colorConfig.mainDark,
        color: this.isActive || this.isHover ? '#fff' : colorConfig.mainDark,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/stylesheets/variables';

.a-tag {
  border-radius: 2px;
  border: 1px solid;
  cursor: pointer;
  line-height: 1;
  padding: 2px 6px;
  text-decoration: none;
  transition: 0.3s;
}
</style>
