<template lang="pug">
.o-create-icons(:class='{isOpen}' @click='isOpen = false')
  ul.o-create-icons__list(:class='{isOpen}')
    li.o-create-icons__item(v-for='(t, index) in types' :class='{isOpen}')
      button.o-create-icons__button(@click='onCreateButtonClicked(index)')
        span.o-create-icons__label.font-family-accent {{ t.value }}
        span.o-create-icons__icon(:style='styleShadow')
          i(:class='`el-icon-${t.icon}`')
  button.o-create-icons__trigger(@click.stop='isOpen = !isOpen' :style='styleTrigger') +
</template>

<script>
import { TYPES } from '~/models/dailyItem'
import { hex2rgb } from '~/scripts/colorHelper'

export default {
  name: 'OrganismsCreateIcons',
  data() {
    return {
      isOpen: false,
    }
  },
  computed: {
    types() {
      return TYPES.reverse()
    },
    colorConfig() {
      return this.$store.state.colorConfig
    },
    styleShadow() {
      const [r, g, b] = hex2rgb(this.colorConfig.mainDark)
      return {
        boxShadow: `0 0 5px rgba(${r}, ${g}, ${b}, 0.2)`,
      }
    },
    styleTrigger() {
      const [r, g, b] = hex2rgb(this.colorConfig.mainDark)
      return {
        backgroundColor: this.colorConfig.mainDark,
        boxShadow: `0 0 5px rgba(${r}, ${g}, ${b}, 0.2)`,
      }
    },
  },
  methods: {
    onCreateButtonClicked(index) {
      this.isOpen = false
      this.$store.commit(
        'setTemplateNames',
        `organisms-${TYPES[index].value}-editor`
      )
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/stylesheets/variables';
.o-create-icons {
  &__list {
    visibility: hidden;

    &.isOpen {
      backdrop-filter: blur(3px);
      background-color: rgba(#fff, 0.4);
      bottom: 0;
      left: 0;
      margin: auto;
      position: fixed;
      right: 0;
      top: 0;
      visibility: visible;
    }
  }

  &__trigger {
    border-radius: 25px;
    width: 50px;
    line-height: 50px;
    transition: 0.3s;
    right: 10px;
    bottom: 10px;
    position: fixed;
    color: #fff;

    &:hover {
      background: rgba(#fff, 0.75);
    }
  }

  &__item {
    position: fixed;
    right: 15px;
    bottom: 10px;
    transition: 0.3s;
    opacity: 0;
    transform: translateY(0);

    @for $i from 0 through 3 {
      &.isOpen:nth-child(#{$i}) {
        opacity: 1;
        // display: block;
        transform: translateY(#{$i * -50 - 20}px);
      }
    }
  }

  &__button {
    // padding: 5px;
  }

  &__label {
    text-transform: capitalize;
    font-size: 12px;
    margin-right: 10px;
  }

  &__icon {
    display: inline-block;
    text-align: center;
    width: 30px;
    font-size: 16px;
    line-height: 1;
    vertical-align: middle;
    line-height: 40px;
    width: 40px;
    background-color: #fff;
    border-radius: 20px;
  }
}
</style>
