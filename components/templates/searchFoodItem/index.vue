<template lang="pug">
transition(name='showUp')
  .t-search-food-item
    .t-search-food-item__form-item
      .t-search-food-item__content
        atoms-search(
          v-model='string',
          @clear-clicked='string = ""',
          @search-clicked='search'
        )

    .t-search-food-item__form-item
      .t-search-food-item__label タイプ
      .t-search-food-item__content
        ul.t-search-food-item__tags
          li.t-search-food-item__tag(
            v-for='(itemType, index) in itemTypes',
            @click='onItemTypeClicked(index)'
          )
            atoms-tag(:is-active='isItemTypeSelected(index)') {{ itemType.label }}

    .t-search-food-item__form-item
      .t-search-food-item__label ラベル
      .t-search-food-item__content
        ul.t-search-food-item__tags
          li.t-search-food-item__tag(
            v-for='(label, index) in labels',
            @click='onLabelsClicked(index)'
          )
            atoms-tag(:is-active='isLabelSelected(index)') {{ label.name }}

    .t-search-food-item__form-item
      .t-search-food-item__label タグ
      .t-search-food-item__content
        ul.t-search-food-item__tags
          li.t-search-food-item__tag(
            v-for='(tag, index) in tags',
            @click='onTagClicked(index)'
          )
            atoms-tag(:is-active='tag.isSelected') {{ tag.label }}

    ul.t-search-food-item__list
      li(v-for='(item, index) in items', :class='{ isAdded: isAdded(index) }')
        button.t-search-food-item__add-button(
          @click='onFoodItemClicked(item, index)',
          :disabled='isAdded(index)'
        )
          i.el-icon-circle-check(v-if='isAdded(index)')
          i.el-icon-circle-plus-outline(v-else)
        a.t-search-food-item__detail-link(@click='showDetail(item)')
          | {{ item.name }}
          i.el-icon-top-right

    .t-search-food-item__text(v-if='resultText')
      | {{ resultText }}
</template>

<script>
import { clientFoodDatabase } from '~/plugins/algolia'
import { FoodItem, TYPES } from '~/models/foodItem'
const TAGS = ['朝ごはん', '野菜', 'プロテイン']

export default {
  name: 'TemplatesSearchFoodItem',
  data() {
    return {
      addedIndexes: [],
      string: '',
      items: [],
      itemTypes: TYPES,
      detail: null,
      selectedItemTypeIndexes: Array(TYPES.length)
        .fill(null)
        .map((_, index) => index),
      selectedFoodItemLabels: [],
      tags: TAGS.map((tag) => {
        return { label: tag, isSelected: false }
      }),
      resultText: '',
    }
  },
  computed: {
    labels() {
      return this.$store.state.user.foodItemLabels
    },
  },
  methods: {
    isAdded(index) {
      return this.addedIndexes.includes(index)
    },

    isItemTypeSelected(index) {
      return this.selectedItemTypeIndexes.includes(index)
    },

    isLabelSelected(index) {
      return this.selectedFoodItemLabels.includes(index)
    },

    onFoodItemClicked(item, index) {
      this.addedIndexes.push(index)
      this.$store.commit('searchFoodItem/setSelectedFoodItem', item)
    },

    onItemTypeClicked(index) {
      const i = this.selectedItemTypeIndexes.indexOf(index)
      if (i === -1) this.selectedItemTypeIndexes.push(index)
      else this.selectedItemTypeIndexes.splice(i, 1)
      if (!this.selectedItemTypeIndexes.length) {
        this.selectedItemTypeIndexes = Array(TYPES.length)
          .fill(null)
          .map((_, index) => index)
      }
      this.search()
    },

    onLabelsClicked(index) {
      const i = this.selectedFoodItemLabels.indexOf(index)
      if (i === -1) this.selectedFoodItemLabels.push(index)
      else this.selectedFoodItemLabels.splice(i, 1)
      this.search()
    },

    onTagClicked(index) {
      this.tags[index].isSelected = !this.tags[index].isSelected
      this.search()
    },

    async search() {
      const index = clientFoodDatabase.initIndex('index_fooditems')
      const tagFilters = this.tags
        .filter((tag) => tag.isSelected)
        .map((tag) => tag.label)

      const itemTypeFilter = this.selectedItemTypeIndexes
        .map((index) => `type:${TYPES[index].value}`)
        .join(' OR ')

      const labelFilter = this.selectedFoodItemLabels
        .map((index) =>
          this.labels[index].foodItemIds
            .map((id) => `objectID:${id}`)
            .join(' OR ')
        )
        .join(' OR ')
      const filters = [itemTypeFilter, labelFilter]
        .filter((v) => v)
        .map((filter) => `(${filter})`)
        .join(' AND ')

      this.resultText = '検索中...'
      this.items = []
      await index
        .search(this.string, {
          tagFilters: [tagFilters],
          filters,
        })
        .then(({ hits }) => {
          if (hits.length) {
            this.resultText = ''
            this.addedIndexes = []
            this.items = hits.map((hit) => {
              return new FoodItem(hit.objectID, hit)
            })
          } else {
            this.resultText = '条件に合う食材が見つかりませんでした'
          }
        })
        .catch((error) => {
          this.resultText = 'エラー'
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
@import '~/assets/stylesheets/form';
@import '~/assets/stylesheets/input';

.t-search-food-item {
  &__form-item {
    @extend %form__item;
  }

  &__label {
    @extend %form__label;
  }

  &__content {
    @extend %form__content;
  }

  &__type.isSelected {
    font-weight: bold;
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    margin: -3px;
  }

  &__tag {
    padding: 3px;
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
