<template lang="pug">
transition(name='showUp')
  .t-search-food-item
    atoms-search(v-model='string', @search-clicked='search')

    ul.t-search-food-item__list(v-if='items.length')
      li.t-search-food-item__item(v-for='item in items')
        button.t-search-food-item__add-button(@click='onFoodItemClicked(item)')
          i.el-icon-circle-plus-outline
        a.t-search-food-item__detail-link(@click='showDetail(item)')
          | {{ item.name }}
          i.el-icon-top-right

    .t-search-food-item__text(v-else)
      | {{ resultText }}
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
      resultText: '',
    }
  },
  methods: {
    onFoodItemClicked(item) {
      this.$store.commit('searchFoodItem/setSelectedFoodItem', item)
    },

    async search() {
      this.resultText = '検索中...'
      this.items = []
      const index = client.initIndex('index_fooditems')
      await index
        .search(this.string)
        .then(({ hits }) => {
          if (hits.length) {
            this.items = hits.map((hit) => {
              return new FoodItem(hit.objectID, hit)
            })
          } else {
            this.resultText = '条件に合う食材が見つかりませんでした'
          }
        })
        .catch((error) => {
          console.error(error)
        })
    },

    showDetail(item) {
      this.$store.dispatch('foodItem/showFoodItemDetail', item.id)
    },
  },
}
</script>

<style lang="scss" scoped>
.t-search-food-item {
  &__list,
  &__text {
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