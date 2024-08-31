<template lang="pug">
.a-input-tags
  input.a-input-tags__input(type='text' :style='style' @input='onInput' v-model='string')
  ul.a-input-tags__tags
    li.a-input-tags__tag(v-for='(tag,index) in value')
      atoms-tag(
        :removable='true'
        @remove-clicked='onRemoveClicked(index)'
      )
        | {{ tag }}
  ul.a-input-tags__candidates(v-if='string')
    template(v-if='candidates.length')
      li.a-input-tags__candidate(v-for='candidate in candidates' @click='onCandidateClicked(candidate)' )
        | {{ candidate }}
    template(v-else)
      li.a-input-tags__candidate(@click='createNewTag')
        | Create new tag: "{{ string }}"
</template>

<script>
export default {
  name: 'AtomsInputTags',
  props: {
    id: { type: String, default: undefined },
    candidates: { type: Array, default: () => [] },
    value: { type: Array, default: () => [] },
  },
  data() {
    return {
      string: '',
    }
  },
  computed: {
    style() {
      const colorConfig = this.$store.state.colorConfig
      return { borderColor: colorConfig.mainDark }
    },
  },
  methods: {
    createNewTag() {
      this.$emit('input', [...this.value, this.string])
      this.$emit('create-new-tag', this.string)
      this.string = ''
    },
    onCandidateClicked(value) {
      this.$emit('input', [...this.value, value])
      this.string = ''
    },
    onInput(event) {
      this.$emit('string-input', event.target.value)
    },
    onRemoveClicked(index) {
      const emitValue = [...this.value]
      emitValue.splice(index, 1)
      this.$emit('input', emitValue)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/stylesheets/input';
.a-input-tags {
  position: relative;

  &__input {
    @extend %input;
    width: 100%;
  }

  &__tags {
    margin: 5px 0;
    display: flex;
    gap: 3px;
  }

  &__candidates {
    position: absolute;
    top: 100%;
    background: rgba(#fff, 0.75);
    box-shadow: 0 0 3px rgba(#000, 0.2);
    border-radius: 5px;
    backdrop-filter: blur(3px);
    padding: 5px 10px;
    top: calc(100% + 5px);
    left: 0;
    min-width: 150px;
  }

  &__candidate {
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      opacity: 0.6;
    }
  }
}
</style>
