<template lang="pug">
transition(name='showUp')
  .t-search-food-item
    atoms-search(
      v-model='string',
      @clear-clicked='string = ""',
      @search-clicked='search'
    )

    ul.t-search-food-item__tab
      li.t-search-food-item__tab-item(
        v-for='(itemType, index) in itemTypes',
        @click='indexItemType = index',
        :class='{ isSelected: indexItemType === index }'
      )
        | {{ itemType.label }}

    ul.t-search-food-item__list
      li(
        v-for='(item, index) in itemsToShow',
        :class='{ isAdded: isAdded(index) }'
      )
        button.t-search-food-item__add-button(
          @click='onFoodItemClicked(item, index)',
          :disabled='isAdded(index)'
        )
          i.el-icon-circle-check(v-if='isAdded(index)')
          i.el-icon-circle-plus-outline(v-else)
        a.t-search-food-item__detail-link(@click='showDetail(item)')
          | {{ item.name }}
          i.el-icon-top-right

    //- .t-search-food-item__text(v-else)
      | {{ resultText }}
</template>

<script>
import { client } from '~/plugins/algolia'
import { FoodItem } from '~/models/foodItem'
const ITEM_TYPES = [
  { key: 'foodItems', label: 'Food items', indexName: 'index_fooditems' },
  { key: 'recipes', label: 'Recipes', indexName: 'index_recipes' },
]

const initItems = () => {
  const items = {}
  ITEM_TYPES.forEach((itemType) => {
    items[itemType.key] = []
  })
  return items
}

export default {
  name: 'TemplatesSearchFoodItem',
  data() {
    return {
      addedIndexes: [],
      string: '',
      indexItemType: 0,
      items: initItems(),
      itemTypes: ITEM_TYPES,
      detail: null,
      resultText: '',
    }
  },
  computed: {
    itemsToShow() {
      const selectedItemTypeKey = ITEM_TYPES[this.indexItemType].key
      return this.items[selectedItemTypeKey]
    },
  },
  methods: {
    isAdded(index) {
      return this.addedIndexes.includes(index)
    },
    onFoodItemClicked(item, index) {
      this.addedIndexes.push(index)
      this.$store.commit('searchFoodItem/setSelectedFoodItem', item)
    },

    async search() {
      this.resultText = '検索中...'
      this.items = initItems()
      await this.searchFoodItems()
      await this.searchRecipes()
    },

    async searchFoodItems() {
      const index = client.initIndex('index_fooditems')
      await index
        .search(this.string)
        .then(({ hits }) => {
          if (hits.length) {
            this.addedIndexes = []
            this.items.foodItems = hits.map((hit) => {
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

    async searchRecipes() {
      const index = client.initIndex('index_recipes')
      await index
        .search(this.string)
        .then(({ hits }) => {
          if (hits.length) {
            this.addedIndexes = []
            this.items.recipes = hits.map((hit) => {
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
@import '~/assets/stylesheets/variables';

.t-search-food-item {
  &__tab {
    display: flex;
    margin: 10px 0;
  }

  &__tab-item {
    border-bottom: 3px solid transparent;
    padding: 5px 10px;

    &.isSelected {
      border-color: $color-main;
    }

    &:not(.isSelected) {
      cursor: pointer;
      transition: 0.3s;

      &:hover {
        opacity: 0.6;
      }
    }
  }
  &__list,
  &__text {
    margin: 20px 0;
  }

  &__item {
    margin: 10px 0;

    &.isAdded {
      color: $color-main-dark;
    }
  }

  &__add-button {
    padding: 3px 5px;
  }
}
</style>