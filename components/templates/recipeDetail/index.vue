<template lang="pug">
.t-recipe-detail
  h2.t-recipe-detail__title
    | {{ recipe.title }}

  .t-recipe-detail__block(v-if='recipe.ingredients.length')
    h3.t-recipe-detail__head Ingredients
    ul
      li.t-recipe-detail__ingredient(v-for='ingredient in recipe.ingredients')
        span {{ ingredient.name }}
        span {{ ingredient.amountText }}

  .t-recipe-detail__block(v-if='recipe.steps.length')
    h3.t-recipe-detail__head Steps
    ul
      li.t-recipe-detail__step(v-for='step in recipe.steps')
        | {{ step.order }}
        .t-recipe-detail__description
          | {{ step.description }}

  .t-recipe-detail__block(v-if='recipe.note')
    h3.t-recipe-detail__head Note
    .t-recipe-detail__note
      | {{ recipe.note }}

  atoms-action-list(
    :daily-note='recipe'
    :id='id'
    )

</template>

<script>
export default {
  name: 'TemplatesRecipeDetail',
  computed: {
    id() {
      return this.$store.state.pager.id
    },
    recipe() {
      return this.$store.state.pager.item
    },
  },
}
</script>

<style lang="scss" scoped>
.t-recipe-detail {
  &__title {
    font-size: 16px;
  }

  &__head {
    margin: 5px 0;
    font-size: 12px;
  }

  &__block {
    margin: 15px 0;
  }

  &__ingredient {
    display: flex;
    justify-content: space-between;
    margin: 5px 0;
  }

  &__step {
    margin: 5px 0;
  }
}
</style>
