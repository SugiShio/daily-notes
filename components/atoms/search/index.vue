<template lang="pug">
.a-search
  input.a-search__input(
    :placeholder='placeholder',
    type='search',
    :value='value',
    @input='$emit("input", $event.target.value)',
    @keydown.enter='onEnter'
  )
  button.a-search__button-clear(@click='$emit("clear-clicked")')
    i.el-icon-error
  button.a-search__button-search(@click='$emit("search-clicked", value)')
    i.el-icon-search
</template>

  <script>
export default {
  name: 'AtomsSearch',
  props: {
    placeholder: { type: String, default: 'Keyword...' },
    value: { type: [String, Number], default: '' },
  },
  methods: {
    onEnter($event) {
      if (!$event.isComposing) this.$emit('search-clicked', this.value)
    },
  },
}
</script>

  <style lang="scss" scoped>
@import '~/assets/stylesheets/variables';
@import '~/assets/stylesheets/input';

.a-search {
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 0;

  &__input,
  &__button-clear,
  &__button-search {
    @extend %input;
    background-color: transparent;

    &::-webkit-search-cancel-button {
      display: none;
    }
  }

  &__input {
    flex-grow: 1;
    border-right: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  &__button-clear {
    border-left: 0;
    border-right: 0;
    border-radius: 0;
    color: $color-main-dark;
  }

  &__button-search {
    background-color: $color-gray-light;
    border-left: 0;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    color: $color-main-dark;
  }
}
</style>