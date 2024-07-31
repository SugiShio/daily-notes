<template lang="pug">
.o-header-search(:class='{ isSearchOpen }' :style='styleBorderColor')
  input.o-header-search__input(
    ref='input',
    @change='search',
    v-model='searchKeyword'
  )
  .o-header-search__trigger
    i.el-icon-search(@click='onButtonSearchClicked')
  .o-header-search__results-container(v-if='isSearchOpen')
    p(v-if='isSearching') 検索中
    template(v-else)
      .o-header-search__result-title 検索結果：{{ searchHitCount }}件

      ul.o-header-search__results(v-if='searchResults.length')
        li.o-header-search__result(v-for='searchResult in searchResults',)
          organisms-header-search-result(:item='searchResult' @search-result-clicked='moveToDatePage')
      a.o-header-search__link(
        v-if='searchResults.length'
        :style='styleLink'
        @click='moveToSearch'
      )
        | 全ての検索結果を見る

</template>

<script>
import { SearchResult } from './searchResult'
import { client } from '~/plugins/algolia'

const index = client.initIndex('dailyNotes')

export default {
  name: 'OrganismsHeaderSearch',
  data() {
    return {
      isSearchOpen: false,
      isSearching: false,
      searchKeyword: '',
      searchResults: [],
      searchHitCount: 0,
    }
  },
  mounted() {
    window.addEventListener('click', ($event) => {
      const isTargetTrigger = $event.target.closest('.o-header-search')
      if (!isTargetTrigger) this.isSearchOpen = false
    })
  },
  computed: {
    colorConfig() {
      return this.$store.state.colorConfig || {}
    },
    styleBorderColor() {
      return {
        borderColor: this.isSearchOpen ? this.colorConfig.mainDark : undefined,
      }
    },
    styleLink() {
      return { color: this.colorConfig.mainDark }
    },
  },
  methods: {
    moveToDatePage(id) {
      this.isSearchOpen = false
      this.$router.push({ name: 'id', params: { id } })
    },
    moveToSearch() {
      this.isSearchOpen = false
      this.$router.push({
        name: 'search',
        query: { keyword: this.searchKeyword },
      })
    },
    onButtonSearchClicked() {
      this.isSearchOpen = true
      this.$refs.input.focus()
      this.search()
    },
    async search() {
      this.searchHitCount = 0
      this.searchResults = []
      this.isSearching = true
      await index
        .search(this.searchKeyword, {
          hitsPerPage: 5,
        })
        .then(({ hits, nbHits }) => {
          hits.forEach((hit) => {
            this.searchResults.push(new SearchResult(hit))
          })
          this.searchHitCount = nbHits
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {
          this.isSearching = false
        })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/stylesheets/input';
.o-header-search {
  align-items: center;
  border: 1px solid transparent;
  display: flex;
  padding: 0;
  position: relative;
  transition: 0.3s;

  &.isSearchOpen {
    @extend %input;
    padding: 0 10px;
    flex-grow: 1;
  }

  &__trigger {
    cursor: pointer;
    padding: 10px;
    text-decoration: none;
  }

  &__input {
    background-color: transparent;
    flex-grow: 1;
    width: 0;

    &.isSearchOpen {
      width: 100%;
    }
  }

  &__results-container {
    background: rgba(#fff, 0.75);
    box-shadow: 0 0 3px rgba(#000, 0.2);
    border-radius: 8px;
    backdrop-filter: blur(3px);
    padding: 20px;
    position: absolute;
    top: calc(100% + 5px);
    right: 0;
    left: 0;
    margin: auto;
    width: 80vw;
    z-index: $z-index-search-result;
  }

  &__results {
    margin: 20px 0;
  }

  &__result {
    margin: 10px 0;
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  &__result-title {
    font-weight: bold;
  }

  &__link {
    cursor: pointer;
  }
}
</style>
