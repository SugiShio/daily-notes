<template lang="pug">
.o-bookmark-list
  h2.o-bookmark-list__title Bookmark
  ul.o-bookmark-list__list
    li.o-bookmark-list__item(v-for='bookmark in bookmarksWithId')
      organisms-bookmark-list-item(:bookmark='bookmark.bookmark', :id='bookmark.id')
</template>

<script>
export default {
  name: 'OrganismsBookmarkList',
  computed: {
    bookmarksWithId() {
      return this.$store.getters['dailyNotes/bookmarksWithId']
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/stylesheets/typography';
.o-bookmark-list {
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
