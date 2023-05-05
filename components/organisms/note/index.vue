<template lang="pug">
div
  h2(v-if='item.title') {{ item.title }}
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