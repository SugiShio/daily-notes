<template lang="pug">
transition(name='showUp')
  .t-search-food-item
    button(@click='onCloseClicked') close
    atoms-search(v-model='string', @search-clicked='search')

    ul.t-search-food-item__list
      li.t-search-food-item__item(
        v-for='item in items',
        @click='showDetail(item.objectId)'
      )
        button.t-search-food-item__add-button(
          @click='$emit("food-item-selected", item.objectId)'
        )
          i.el-icon-circle-plus-outline
        a.t-search-food-item__detail-link(@click='showDetail(item.objectId)')
          | {{ item.name }}
          i.el-icon-top-right
</template>

<script>
import { client } from '~/plugins/algolia'

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
    onCloseClicked() {
      this.$store.commit('removeTemplateNames')
    },

    search() {
      const index = client.initIndex('index_fooditems')
      index
        .search(this.string)
        .then(({ hits }) => {
          this.items = hits.map((hit) => {
            return {
              name: hit.name,
              objectId: hit.objectID,
            }
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