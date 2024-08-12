<template lang="pug">
.o-note-list
  h2.o-note-list__title Notes
  ul.o-note-list__list
    li.o-note-list__item(v-for='note in notesWithId')
      organisms-note-list-item(:note='note.note', :id='note.id')
</template>

<script>
export default {
  name: 'OrganismsNoteList',
  computed: {
    notesWithId() {
      return this.$store.getters['dailyNotes/notesWithId']
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/stylesheets/typography';
.o-note-list {
  padding: 15px 20px;

  &__title {
    @extend %section-title;
  }

  &__list {
    margin: 10px 0;
    border-top: 1px solid $color-border;
  }

  &__item {
    border-bottom: 1px solid $color-border;
  }

  &__icon {
    font-size: 12px;
    margin-right: 5px;
    width: 15px;
    text-align: center;
  }
}
</style>
