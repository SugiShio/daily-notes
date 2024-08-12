<template lang="pug">
.o-recipe-list-item(@click='showDetail')
  h3.o-recipe-list-item__title(v-if='recipe.title')
    | {{ recipe.title }}

  .o-recipe-list-item__text
    | {{ textIngredients }}

</template>

<script>
import { Recipe } from '~/models/recipe'

export default {
  name: 'OrganismsRecipeList',
  props: {
    recipe: { type: Recipe, default: () => new Recipe() },
    id: { type: String, required: true },
  },
  computed: {
    textIngredients() {
      return this.recipe.ingredients
        .map((ingredient) => ingredient.name)
        .join(' / ')
    },
  },
  methods: {
    showDetail() {
      this.$store.commit('pager/setTemplateNames', 'templates-recipe-detail')
      this.$store.commit('pager/setItem', this.recipe)
      this.$store.commit('pager/setId', this.id)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/stylesheets/variables';

.o-recipe-list-item {
  padding: 5px 0;

  &__text {
    color: $color-text-light;
    font-size: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
