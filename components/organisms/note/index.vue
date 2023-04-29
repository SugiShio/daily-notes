<template lang="pug">
div
  div(v-if='isEditing')
    input(v-model='localTitle')
    textarea(v-model='localContent')
    button(@click='cancel') cancel
    button(@click='save') save
    h3 preview
    div(v-html='markedContent')
  template(v-else)
    h2(v-if='item.title') {{ item.title }}
    div(v-html='markedContent')
    button(@click='isEditing = true') edit
</template>

<script>
import { marked } from 'marked'
import DOMPurify from 'dompurify'

class Note {
  constructor(params = {}) {
    this.title = params.title || ''
    this.content = params.content || ''
  }
}
export default {
  name: 'OrganismsNote',
  props: {
    item: { type: Object, default: new Note() },
  },
  data() {
    return {
      isEditing: false,
      localContent: this.item.content.replace(/\\n/g, '\n'),
      localTitle: this.item.title,
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
      const updated = {}
      if (this.item.title !== this.localTitle) {
        updated.title = this.localTitle
      }
      if (this.item.content !== this.localContent) {
        updated.content = this.localContent
      }
      if (Object.keys(updated).length) {
        this.$emit('item-updated', {
          id: this.item.id,
          updated,
        })
      }
      this.isEditing = false
    },
  },
}
</script>