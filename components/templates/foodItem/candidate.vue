<template lang="pug">
li.t-food-item-candidate(
  :style='style'
  @click='onClick'
  @mouseenter='isHover = true'
  @mouseleave='isHover = false'
)
  | {{ label }}
</template>

<script>
export default {
  name: 'TemplatesFoodItemCandidate',
  props: {
    label: { type: String, default: '' },
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
        backgroundColor: this.isHover ? colorConfig.mainLight : undefined,
      }
    },
  },
  methods: {
    onClick() {
      this.$emit('candidate-clicked', this.label)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/stylesheets/variables';

.t-food-item-candidate {
  cursor: pointer;
  min-width: 120px;
  padding: 3px 10px;
  transition: background-color 0.3s;
}
</style>
