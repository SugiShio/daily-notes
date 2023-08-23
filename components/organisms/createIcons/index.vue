<template lang="pug">
ul.o-create-icons
  li.o-create-icons__item(v-for='(t, index) in types')
    button.o-create-icons__button(@click='onCreateButtonClicked(index)')
      i.o-create-icons__icon(:class='`el-icon-${t.icon}`')
</template>

<script>
import { TYPES } from '~/models/dailyItem'

export default {
  name: 'OrganismsCreateIcons',
  computed: {
    types() {
      return TYPES
    },
  },
  methods: {
    onCreateButtonClicked(index) {
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
  display: flex;
  justify-content: center;
  margin: -4px;
  padding: 0 $padding-h;

  &__item {
    margin: 4px;
  }

  &__button {
    border-radius: 20px;
    width: 40px;
    line-height: 40px;
    transition: 0.3s;

    &:hover {
      background: rgba(#fff, 0.75);
      box-shadow: 0 0 5px rgba($color-main-dark, 0.2);
    }
  }

  &__icon {
    color: $color-main-dark;
    font-size: 20px;
    line-height: 1;
    vertical-align: middle;
  }
}
</style>