<template lang="pug">
.o-recipe(@click='showDetail')
  header.o-recipe__head
    i(:class='`el-icon-${recipe.mark}`')
    time.o-recipe__time {{ recipe.timeText }}

  ul.o-recipe__image-list
    li.o-recipe__image-item(v-for='src in recipe.files')
      img.o-recipe__image(:src='src')

  slot
</template>

<script>
import { Recipe } from '~/models/recipe'

export default {
  name: 'OrganismsRecipe',
  props: {
    recipe: { type: Recipe, default: new Recipe() },
  },
  methods: {
    showDetail() {
      // this.$store.commit('pager/setTemplateNames', 'templates-recipe-detail')
      // this.$store.commit('setRecipe', this.recipe)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/stylesheets/variables';

.o-recipe {
  padding: 15px 20px;

  &__head {
    display: flex;
    align-items: center;
    margin: 5px 0;
  }

  &__time {
    font-size: 11px;
    margin-left: 5px;
  }

  &__image-list {
    display: flex;
    margin: -5px;
    flex-wrap: wrap;
  }

  &__image-item {
    padding: 5px;
  }

  &__image {
    border-radius: 5px;
    height: 90px;
    object-fit: cover;
    width: 90px;
  }
}
</style>
