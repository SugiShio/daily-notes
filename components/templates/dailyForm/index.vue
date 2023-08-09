<template lang="pug">
.t-daily-form
  component(:is='componentEditor', :editing-item='editingItem')
  .t-daily-form__footer
    atoms-button(@click='cancel', text='Cancel', outline)
    atoms-button(
      :disabled='!editingItem.isSaveAvailable',
      text='Save',
      @click='onSaveClicked'
    )
</template>


<script>
export default {
  name: 'TemplatesDailyForm',
  data() {
    return {
      editingItem: null,
    }
  },
  computed: {
    componentEditor() {
      const type = this.editingItem.type
      return `organisms-${type}-editor`
    },
  },
  created() {
    this.editingItem = this.$store.state.originalItemId
      ? this.$store.state.originalItem
      : this.$store.state.editingItem
  },
  methods: {
    cancel() {
      this.$store.dispatch('closeForm')
    },
    onSaveClicked() {
      this.$store.dispatch('onSaveClicked', this.editingItem)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/stylesheets/variables';
@import '~/assets/stylesheets/form';

.t-daily-form {
  &__item {
    @extend %form__item;
  }

  &__label {
    @extend %form__label;
  }

  &__content {
    @extend %form__content;
  }

  &__footer {
    display: flex;
    justify-content: space-evenly;
  }
}
</style>