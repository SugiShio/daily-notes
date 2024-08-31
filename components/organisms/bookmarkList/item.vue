<template lang="pug">
.o-bookmark-list-item
  .o-bookmark-list-item__title
    |{{ bookmark.title }}
  a.o-bookmark-list-item__link(:href='bookmark.url' target="_blank")
    i.el-icon-top-right

</template>

<script>
import { Bookmark } from '~/models/bookmark'
export default {
  name: 'OrganismsBookmarkListItem',
  props: {
    bookmark: { type: Bookmark, default: () => new Bookmark() },
    id: { type: String, required: true },
  },

  computed: {
    bookmarksWithId() {
      return this.$store.getters['dailyNotes/bookmarksWithId']
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/stylesheets/typography';
.o-bookmark-list-item {
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 5px 0;

  &__title {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  &__link {
    padding: 5px;
    margin-left: 5px;
  }
}
</style>
