<template lang="pug">
.o-daily-summary
  .o-daily-summary__title Summary

  ul.o-daily-summary__list
    li(v-if='notesWithId.length')
      i.el-icon-document.o-daily-summary__icon
      | {{ notesWithId.length }} notes recorded

    li(v-if='mealsWithId.length')
      i.el-icon-apple.o-daily-summary__icon
      | {{ mealsWithId.length }} meals recorded

    li(v-if='recipesWithId.length')
      i.el-icon-fork-spoon.o-daily-summary__icon
      | {{ recipesWithId.length }} recipe added
</template>

<script>
export default {
  name: 'OrganismsDailySummary',
  computed: {
    dailyNotes() {
      return this.$store.state.dailyNotes.dailyNotes
    },
    mealsWithId() {
      return this.$store.getters['dailyNotes/mealsWithId']
    },
    notesWithId() {
      return this.$store.getters['dailyNotes/notesWithId']
    },
    recipesWithId() {
      return this.$store.getters['dailyNotes/recipesWithId']
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/stylesheets/typography';

.o-daily-summary {
  padding: 15px 20px;

  &__title {
    @extend %section-title;
  }

  &__list {
    margin: 10px 0;
  }

  &__icon {
    font-size: 12px;
    margin-right: 5px;
    width: 15px;
    text-align: center;
  }
}
</style>
