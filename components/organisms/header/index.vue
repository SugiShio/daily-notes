<template lang="pug">
header.o-header
  .o-header__search(:class='{ isSearchOpen }')
    input.o-header__input(
      ref='input',
      @change='search',
      v-model='searchKeyword'
    )
    .o-header__button
      i.el-icon-search(@click='onButtonSearchClicked')
    .o-header__search-results-container(v-if='isSearchOpen')
      p(v-if='isSearching') 検索中
      template(v-else)
        .o-header__search-result-title 検索結果：{{ searchHitCount }}件

        ul.o-header__search-results(v-if='searchResults.length')
          li.o-header__search-result(
            v-for='searchResult in searchResults',
            @click='moveToDatePage(searchResult.id)'
          )
            i.o-header__search-result-type(:class='typeIcon(searchResult.type)')
            | {{ searchResult.label }}
        a.o-header__link-search(
          v-if='searchResults.length'
          @click='moveToSearch'
        )
          | 全ての検索結果を見る

  nuxt-link.o-header__button(
    v-if='$store.state.isSignin',
    :to='{ name: "user" }'
  )
    i.o-header__user-icon.el-icon-user

  //- button.o-header__button(v-else, type='button', @click='showSigninForm') Signin
</template>

<script>
import { doc, getDoc } from 'firebase/firestore'
import { client } from '~/plugins/algolia'
import { db } from '~/plugins/firebase'
import { TYPES } from '~/models/dailyItem'

const index = client.initIndex('dailyNotes')

class SearchResult {
  constructor(params = {}) {
    this.label = params.title || params.content
    this.id = params.objectID
    this.type = params.type
  }
}
export default {
  name: 'OrganismsHeader',
  data() {
    return {
      isSearchOpen: false,
      isSearching: false,
      searchKeyword: '',
      searchResults: [],
      searchHitCount: 0,
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    },
  },
  mounted() {
    window.addEventListener('click', ($event) => {
      const isTargetTrigger = $event.target.closest('.o-header__search')
      if (!isTargetTrigger) this.isSearchOpen = false
    })
  },
  methods: {
    async moveToDatePage(id) {
      const snapshot = await getDoc(doc(db, 'dailyNotes', id))
      if (snapshot.exists()) {
        this.isSearchOpen = false
        const dailyItem = snapshot.data()
        this.$router.push({ name: 'id', params: { id: dailyItem.date } })
      }
    },
    moveToSearch() {
      this.isSearchOpen = false
      this.$router.push({
        name: 'search',
        query: { keyword: this.searchKeyword },
      })
    },
    showSigninForm() {
      this.$store.commit('setTemplateNames', 'templates-signin-form')
    },
    typeIcon(value) {
      const type = TYPES.find((t) => t.value === value)
      return `el-icon-${type ? type.icon : 'question'}`
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

.o-header {
  align-items: center;
  display: flex;
  justify-content: flex-end;
  padding: 5px 10px;

  &__button {
    cursor: pointer;
    padding: 10px;
    text-decoration: none;
  }

  &__search {
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
  }

  &__input {
    background-color: transparent;
    flex-grow: 1;
    width: 0;

    &.isSearchOpen {
      width: 100%;
    }
  }

  &__search-results-container {
    background: rgba(#fff, 0.75);
    box-shadow: 0 0 5px rgba($color-main-dark, 0.2);
    border-radius: 8px;
    backdrop-filter: blur(3px);
    padding: 20px;
    position: absolute;
    top: 100%;
    right: 0;
    left: 0;
    margin: auto;
    width: 80vw;
  }

  &__search-results {
    margin: 20px 0;
  }

  &__search-result {
    margin: 10px 0;
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  &__search-result-title {
    font-weight: bold;
  }

  &__search-result-type {
    color: $color-main-dark;
    margin-right: 5px;
  }

  &__link-search {
    color: $color-main-dark;
    cursor: pointer;
  }
}
</style>
