<template lang="pug">
.t-search-food-item
  atoms-input-text(v-model='string')
  atoms-button(@click='search', text='search')
  ul
    li(v-for='item in items', @click='showDetail(item.objectId)')
      span(@click='$emit("food-item-selected", item.objectId)') ＋
      | {{ item.name }}
      span(@click='showDetail(item.objectId)') detail
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
    async showDetail(id) {
      this.$store.dispatch('foodItem/showFoodItemDetail', id)
    },
  },
}
</script>