<template lang="pug">
.a-search
  input.a-search__input(
    :placeholder='placeholder',
    :value='value',
    @input='$emit("input", $event.target.value)'
  )
  button.a-search__button(@click='$emit("search-clicked", value)')
    i.el-icon-search
</template>

  <script>
export default {
  name: 'AtomsSearch',
  props: {
    placeholder: { type: String, default: 'Keyword...' },
    value: { type: [String, Number], default: '' },
  },
}
</script>

  <style lang="scss" scoped>
@import '~/assets/stylesheets/variables';
@import '~/assets/stylesheets/input';

.a-search {
  @extend %input;
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 0;

  &__input,
  &__button {
    @extend %input;
    background-color: transparent;
  }

  &__input {
    flex-grow: 1;
  }

  &__button {
    color: $color-main-dark;
  }
}
</style>