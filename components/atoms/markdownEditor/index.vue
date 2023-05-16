<template lang="pug">
.a-markdown-editor
  textarea.a-markdown-editor__textarea(
    :rows='rows',
    :value='value',
    @input='$emit("input", $event.target.value)'
  )
</template>

<script>
export default {
  name: 'AtomsMarkdownEditor',
  props: {
    placeholder: { type: String, default: '' },
    rows: { type: Number, default: 5 },
    value: { type: [String, Number], default: '' },
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