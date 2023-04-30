<template lang="pug">
div
  div(v-if='isEditing')
    input(v-model='localTitle')
    textarea(v-model='localContent')
    button(@click='cancel') cancel
    button(@click='save') save
  template(v-else)
    h2(v-if='item.title') {{ item.title }}
    div(v-html='item.markedContent')
    button(@click='isEditing = true') edit
</template>

<script>
import { Note } from '~/models/note'

export default {
  name: 'OrganismsNote',
  props: {
    item: { type: Note, default: new Note() },
  },
  data() {
    const item = new Note(this.item || {})

    return {
      isEditing: item.isEmpty,
      localContent: item.content.replace(/\\n/g, '\n'),
      localTitle: item.title,
    }
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
        this.$emit('item-updated', updated)
      }
      this.isEditing = false
    },
  },
}
</script>