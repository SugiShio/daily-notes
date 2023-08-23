<template lang="pug">
ul.o-create-icons
  li.o-create-icons__icon(v-for='(t, index) in types')
    button(@click='onCreateButtonClicked(index)')
      i(:class='`el-icon-${t.icon}`')
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

  &__icon {
    padding: 4px;
  }
}
</style>