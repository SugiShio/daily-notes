<template lang="pug">
.a-graph
  span.a-graph__base-line(:style='stylePositionBaseLine')
  dl
    .a-graph__item(v-for='item in graphItems')
      dt.a-graph__dt
        .a-graph__title {{ item.title }}
        .a-graph__value
          | {{ valueText(item) }}

      dd.a-graph__dd
        ul.a-graph__bar
          li.a-graph__bar-item(
            v-for='value in item.values',
            :style='style(value, item.base)'
          )
</template>

<script>
export default {
  name: 'AtomsGraph',
  props: {
    graphItems: { type: Array, default: () => [] },
  },
  data() {
    return {
      widthBarContainer: 100,
    }
  },
  computed: {
    stylePositionBaseLine() {
      const left = 100 + this.widthBarContainer * 0.7
      return { left: `${left}px` }
    },
  },
  mounted() {
    const widthGraphContainer = this.$el.clientWidth
    this.widthBarContainer = widthGraphContainer - 100
  },
  methods: {
    style(value, base) {
      const widthBase = this.widthBarContainer * 0.7
      const rate = value / base
      const width = widthBase * rate
      return { width: `${width}px` }
    },
    totalValue(item) {
      const totalValue = item.values.reduce((a, b) => {
        return a + b
      }, 0)

      return Math.round(totalValue * 100) / 100
    },
    valueText(item) {
      const value = this.totalValue(item)
      const percentage = Math.round((value / item.base) * 1000) / 10
      return `${value}${item.unit} / ${percentage}%`
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/stylesheets/variables';

.a-graph {
  position: relative;

  &__base-line {
    width: 1px;
    background-color: $color-border;
    position: absolute;
    height: calc(100% + 10px);
  }

  &__item {
    align-items: center;
    display: flex;
    margin: 10px 0;
  }

  &__dt {
    flex-shrink: 0;
    width: 110px;
  }

  &__dd {
    flex-grow: 1;
    line-height: 1;
  }

  &__value {
    font-size: 10px;
  }

  &__bar {
    border-radius: 3px;
    display: inline-flex;
    height: 15px;
    overflow: hidden;
    vertical-align: bottom;
  }

  &__bar-item {
    background-color: $color-violet;

    &:nth-child(5n + 1) {
      background-color: $color-red-light;
    }
    &:nth-child(5n + 2) {
      background-color: $color-orange;
    }
    &:nth-child(5n + 3) {
      background-color: $color-green;
    }
    &:nth-child(5n + 4) {
      background-color: $color-blue;
    }
  }
}
</style>
