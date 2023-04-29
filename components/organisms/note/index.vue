<template lang="pug">
div
  div(v-if='isEditing')
    textarea(v-model='localContent')
    button(@click='cancel') cancel
    button(@click='save') save
    h3 preview
    div(v-html='markedContent')
  template(v-else)
    div(v-html='markedContent')
    button(@click='isEditing = true') edit
</template>

<script>
import { marked } from 'marked'
import DOMPurify from 'dompurify'

export default {
  name: 'OrganismsNote',
  props: {
    item: { type: Object },
  },
  data() {
    return {
      isEditing: false,
      localContent: this.item.content.replace(/\\n/g, '\n'),
    }
  },
  computed: {
    markedContent() {
      return DOMPurify.sanitize(
        marked.parse(this.item.content.replace(/\\n/g, '\n'))
      )
    },
  },
  methods: {
    cancel() {
      this.localContent = this.item.content.replace(/\\n/g, '\n')
      this.isEditing = false
    },
    save() {
      this.$emit('item-updated', {
        id: this.item.id,
        updated: {
          content: this.localContent,
        },
      })
      this.isEditing = false
    },
  },
}
</script>