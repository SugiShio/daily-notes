<template lang="pug">
.a-markdown-editor
  textarea.a-markdown-editor__textarea(
    ref='textarea',
    :rows='rows',
    :value='value',
    @input='$emit("input", $event.target.value)'
  )
  button(@click='list') list
</template>

<script>
export default {
  name: 'AtomsMarkdownEditor',
  props: {
    placeholder: { type: String, default: '' },
    rows: { type: Number, default: 5 },
    value: { type: [String, Number], default: '' },
  },
  methods: {
    list() {
      this.$emit('input', `${this.value}* `)
      this.$refs.textarea.focus()
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/stylesheets/input';
.a-markdown-editor {
  &__textarea {
    @extend %input;
    width: 100%;
  }
}
</style>