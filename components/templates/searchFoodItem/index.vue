<template lang="pug">
transition(name='showUp')
  .t-search-food-item
    atoms-search(v-model='string', @search-clicked='search')

    ul.t-search-food-item__list
      li.t-search-food-item__item(v-for='item in items')
        button.t-search-food-item__add-button(@click='onFoodItemClicked(item)')
          i.el-icon-circle-plus-outline
        a.t-search-food-item__detail-link(@click='showDetail(item)')
          | {{ item.name }}
          i.el-icon-top-right
</template>

<script>
import { client } from '~/plugins/algolia'
import { FoodItem } from '~/models/foodItem'

export default {
  name: 'TemplatesSearchFoodItem',
  data() {
    return {
      string: '',
      items: [],
      detail: null,
    }
  },
  methods: {
    onFoodItemClicked(item) {
      this.$store.commit('searchFoodItem/setSelectedFoodItem', item)
    },

    async search() {
      const index = client.initIndex('index_fooditems')
      await index
        .search(this.string)
        .then(({ hits }) => {
          this.items = hits.map((hit) => {
            return new FoodItem(hit.objectID, hit)
          })
        })
        .catch((error) => {
          console.error(error)
        })
    },

    showDetail(id) {
      this.$store.dispatch('foodItem/showFoodItemDetail', id)
    },
  },
}
</script>

<style lang="scss" scoped>
.t-search-food-item {
  &__list {
    margin: 20px 0;
  }

  &__item {
    margin: 10px 0;
  }
  &__add-button {
    padding: 3px 5px;
  }
}
</style>