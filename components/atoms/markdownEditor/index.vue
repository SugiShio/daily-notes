<template lang="pug">
.a-markdown-editor(:style='styleBorderColor')
  .a-markdown-editor__functions(:style='styleBorderColor')
    .a-markdown-editor__function
      button.a-markdown-editor__button-function(@click='onListClicked' :style='styleButtonFunction') *
  textarea.a-markdown-editor__textarea(
    ref='textarea',
    :rows='rows',
    :value='value',
    @input='$emit("input", $event.target.value)'
    @keydown.enter.prevent='onEnter'
    @keydown.tab.shift.prevent='onTabShift'
    @keydown.tab.prevent='onTab'
  )
  input
</template>

<script>
import {
  onEnter,
  onTab,
  onTabShift,
  toggleTermToHeadOfLine,
  TERMS,
} from '~/scripts/markdown'
export default {
  name: 'AtomsMarkdownEditor',
  props: {
    placeholder: { type: String, default: '' },
    rows: { type: Number, default: 5 },
    value: { type: [String, Number], default: '' },
  },
  mounted() {
    this.$textarea = this.$refs.textarea
  },
  computed: {
    colorConfig() {
      return this.$store.state.colorConfig
    },
    styleBorderColor() {
      return { borderColor: this.colorConfig.mainDark }
    },
    styleButtonFunction() {
      return { backgroundColor: this.colorConfig.grayLight }
    },
  },
  methods: {
    async updateValue({ string, newCursorPosition }) {
      await this.$emit('input', string)
      this.$textarea.setSelectionRange(newCursorPosition, newCursorPosition)
      this.$textarea.focus()
    },
    onListClicked() {
      const cursorPosition = this.$textarea.selectionStart
      const { string, newCursorPosition } = toggleTermToHeadOfLine({
        term: TERMS.LIST,
        string: this.value,
        cursorPosition,
      })
      this.updateValue({ string, newCursorPosition })
    },
    onEnter() {
      const cursorPosition = this.$textarea.selectionStart
      const { string, newCursorPosition } = onEnter({
        string: this.value,
        cursorPosition,
      })
      this.updateValue({ string, newCursorPosition })
    },
    onTab($event) {
      if ($event.shiftKey) return
      const cursorPosition = this.$textarea.selectionStart
      const { string, newCursorPosition } = onTab({
        string: this.value,
        cursorPosition,
      })
      this.updateValue({ string, newCursorPosition })
    },
    onTabShift() {
      const cursorPosition = this.$textarea.selectionStart
      const { string, newCursorPosition } = onTabShift({
        string: this.value,
        cursorPosition,
      })
      this.updateValue({ string, newCursorPosition })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/stylesheets/input';
.a-markdown-editor {
  @extend %input;
  padding: 0;

  &__functions {
    border-bottom: 1px dashed;
    padding: 2px 4px;
  }

  &__function {
    display: inline-block;
    padding: 4px;
  }

  &__button-function {
    line-height: 30px;
    width: 30px;
    border-radius: 3px;
    text-align: center;
  }

  &__textarea {
    padding: 10px 15px;
    resize: none;
    width: 100%;
  }
}
</style>
