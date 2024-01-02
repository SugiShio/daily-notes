<template lang="pug">
.o-note
  h2.o-note__title(v-if='item.title') {{ item.title }}
  .o-note__content(v-html='item.markedContent')
  slot
</template>

<script>
import { Note } from '~/models/note'

export default {
  name: 'OrganismsNote',
  props: {
    item: { type: Note, default: () => new Note() },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/stylesheets/variables';

.o-note {
  padding: 15px 20px;

  &__title {
    font-family: $font-family-accent;
  }

  &__content:deep {
    ul,
    ol {
      margin: 5px 0;
      padding-left: 20px;
    }

    > ul > li {
      list-style-type: disc;
      > ul > li {
        list-style-type: square;
      }
    }
  }
}
</style>
