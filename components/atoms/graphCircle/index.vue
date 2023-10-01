<template lang="pug">
canvas.a-graph-circle(:width='size', :height='size')
</template>

<script>
const COLORS = ['#748b75', '#5c80bc', '#e95635', '#ffad69']
export default {
  name: 'AtomsGraphCircle',
  props: {
    lineWidth: { type: Number, default: 10 },
    size: { type: Number, default: 100 },
    values: { type: Array, default: () => [] },
    wholeValue: { type: Number, default: null },
  },
  watch: {
    values() {
      this.drawGraph()
    },
    wholeValue() {
      this.drawGraph()
    },
  },
  mounted() {
    this.drawGraph()
  },
  methods: {
    drawGraph() {
      const canvas = this.$el
      const context = canvas.getContext('2d')

      const total = this.values.reduce((previous, current) => {
        return previous + current
      }, 0)

      const values = this.values
      const wholeValue = this.wholeValue || total
      const strokeStyles = this.values.map(
        (_, index) => COLORS[index % COLORS.length]
      )
      if (total < this.wholeValue) {
        values.push(this.wholeValue - total)
        strokeStyles.push('rgba(0, 0, 0, 0.05')
      }

      values.reduce((previous, current, index) => {
        context.lineWidth = this.lineWidth
        context.strokeStyle = strokeStyles[index]
        context.beginPath()
        context.arc(
          this.size / 2,
          this.size / 2,
          (this.size - this.lineWidth) / 2,
          Math.PI * (-0.5 + (previous / wholeValue) * 2),
          Math.PI * (-0.5 + ((current + previous) / wholeValue) * 2 - 0.01),
          false
        )
        context.stroke()
        return current + previous
      }, 0)
    },
  },
}
</script>

<style lang="scss" scoped>
.a-graph-circle {
  // width: 100px;
  // height: 100px;
}
</style>