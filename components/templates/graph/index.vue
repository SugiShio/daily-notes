<template lang="pug">
.t-graph
  span.t-graph__base-line(:style='stylePositionBaseLine')
  dl
    .t-graph__item(v-for='item in items')
      dt.t-graph__dt
        .t-graph__title {{ item.title }}
        .t-graph__value
          | {{ totalValue(item) }}
          span.t-graph__unit {{ item.unit }}
      dd.t-graph__dd
        ul.t-graph__bar
          li.t-graph__bar-item(
            v-for='value in item.values',
            :style='style(value, item.base)'
          )
</template>

<script>
export default {
  name: 'TemplatesGraph',
  data() {
    return {
      widthBarContainer: 100,
    }
  },
  computed: {
    items() {
      return this.$store.state.graph.items
    },
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
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/stylesheets/variables';

.t-graph {
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
    width: 100px;
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
    z-index: 1;
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