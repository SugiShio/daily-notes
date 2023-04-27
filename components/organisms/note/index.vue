<template lang="pug">
div
  div(v-html='content')
</template>

<script>
import { marked } from 'marked'
import DOMPurify from 'dompurify'

export default {
  name: 'OrganismsNote',
  props: {
    item: { type: Object },
  },
  computed: {
    content() {
      return DOMPurify.sanitize(
        marked.parse(this.item.content.replace(/\\n/g, '\n'))
      )
    },
  },
}
</script>