<template lang="pug">
.o-note
  h2.o-note__title(v-if='item.title') {{ item.title }}
  div(v-html='item.markedContent')
</template>

<script>
import { Note } from '~/models/note'

export default {
  name: 'OrganismsNote',
  props: {
    item: { type: Note, default: new Note() },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/stylesheets/variables';

.o-note {
  &__title {
    font-family: $font-family-accent;
  }
}
</style>