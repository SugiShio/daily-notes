<template lang="pug">
a.o-header-search-result(@click='emitClicked')
  i.o-header-search-result__type(:class='typeIcon')
  .o-header-search-result__content
    h2(v-if='item.title') {{item.title}}
    .o-header-search-result__text {{ item.text }}

</template>
<script>
import { doc, getDoc } from 'firebase/firestore'
import { TYPES } from '~/models/dailyItem'
import { db } from '~/plugins/firebase'
import { convertDateToDateId } from '~/scripts/dateHelper'

export class SearchResult {
  constructor(params = {}) {
    this.title = params.title
    this.text = params.content
    this.id = params.objectID
    this.type = params.type
  }
}

export default {
  name: 'OrganismsHeaderSearchResult',
  props: {
    item: { type: SearchResult, required: true },
  },
  computed: {
    typeIcon() {
      const type = TYPES.find((t) => t.value === this.item.type)
      return `el-icon-${type ? type.icon : 'question'}`
    },
  },
  methods: {
    async emitClicked() {
      const snapshot = await getDoc(doc(db, 'dailyNotes', this.item.id))
      if (snapshot.exists()) {
        this.isSearchOpen = false
        const dailyItem = snapshot.data()
        let id = ''
        if (dailyItem.date) id = dailyItem.date
        else if (dailyItem.doneAt) {
          id = convertDateToDateId(dailyItem.doneAt.seconds * 1000)
        }
        this.$emit('search-result-clicked', id)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/stylesheets/variables';

.o-header-search-result {
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    opacity: 0.6;
  }

  &__type {
    color: $color-main-dark;
    margin-right: 10px;
  }

  &__text {
    font-size: 10px;
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
}
</style>
