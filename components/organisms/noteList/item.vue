<template lang="pug">
.o-note-list-item
  h3.o-note-list-item__title(v-if='note.title')
    | {{ note.title }}

  ul.o-note-list-item__tags(v-if='note.tags.length')
    li.o-note-list-item__tag(v-for='tag in note.tags')
      | {{ `#${tag}` }}

  .o-note-list-item__container(
    :class='{ isClose }'
    @click.stop.prevent='isClose = !isClose'
    )
    .o-note-list-item__content(v-html='note.markedContent')

    atoms-action-list(
      v-if='!isClose'
      :daily-note='note'
      :id='id'
      )

    .o-note-list-item__gradation(
      v-if='isClose'
      :style='styleGradation'
      )

</template>

<script>
import { Note } from '~/models/note'
import { hex2rgb } from '~/scripts/colorHelper'

export default {
  name: 'OrganismsNoteListItem',
  props: {
    note: { type: Note, default: () => new Note() },
    id: { type: String, required: true },
  },
  data() {
    return {
      isClose: true,
    }
  },
  computed: {
    styleGradation() {
      const colorConfig = this.$store.state.colorConfig
      const [r, g, b] = hex2rgb(colorConfig.backgroundColor)
      return {
        background: `linear-gradient(rgb(${r} ${g} ${b} / 0), ${colorConfig.backgroundColor})`,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/stylesheets/variables';

.o-note-list-item {
  padding: 15px 0;

  &__title {
    font-weight: bold;
    margin-bottom: 5px;
  }

  &__tags {
    margin: 5px 0;
    display: flex;
    gap: 5px;
  }

  &__tag {
    font-size: 10px;
  }

  &__container {
    cursor: pointer;
    position: relative;

    &.isClose {
      max-height: 100px;
      overflow: hidden;
    }
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

  &__gradation {
    position: absolute;
    width: 100%;
    height: 30px;
    top: 70px;
  }
}
</style>
