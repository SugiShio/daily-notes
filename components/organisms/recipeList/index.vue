<template lang="pug">
.o-recipe-list
  h2.o-recipe-list__title Recipes
  ul.o-recipe-list__list
    li.o-recipe-list__item(v-for='recipe in recipesWithId')
      organisms-recipe-list-item(:recipe='recipe.recipe', :id='recipe.id')

</template>

<script>
export default {
  name: 'OrganismsRecipeList',
  computed: {
    recipesWithId() {
      return this.$store.getters['dailyNotes/recipesWithId']
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/stylesheets/typography';

.o-recipe-list {
  padding: 15px 20px;

  &__title {
    @extend %section-title;
  }

  &__list {
    border-top: 1px solid $color-border;
    border-bottom: 1px solid $color-border;
    margin: 10px 0;
    padding: 10px 0;
  }
}
</style>
