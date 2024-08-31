<template lang="pug">
.o-bookmark-editor
  .o-bookmark-editor__head
    template(v-if='ogp')
      atoms-ogp-card(:ogp='ogp')
    template(v-else-if='textProcess')
      | {{ textProcess }}
  .o-bookmark-editor__item
    label.o-bookmark-editor__label(for='title') URL
      .o-bookmark-editor__content
        atoms-input-text(v-model='url' @input='onUrlInput')
      .o-bookmark-editor__error
        |{{ textUrlError }}

  .o-bookmark-editor__item
    .o-bookmark-editor__label(for='title') Title
      .o-bookmark-editor__content
        atoms-input-text(v-model='title')

  .o-bookmark-editor__item
    .o-bookmark-editor__label(for='tags') Tags
      .o-bookmark-editor__content
        atoms-input-tags(v-model='tags' :candidates='candidates' @string-input='onStringInput')

  .o-bookmark-editor__item
    .o-bookmark-editor__label(for='ingredients') Memo
      .o-bookmark-editor__content
        atoms-input-multi-line-text(
        v-model='description'
        :height='100'
      )
        //- @input='onValueChanged'

  .o-bookmark-editor__item
      .o-bookmark-editor__content
        atoms-button(text='Save', @click='onSaveClicked')

</template>

<script>
import { Bookmark } from '~/models/bookmark'
import { Ogp } from '~/models/ogp'
import { clientBookmarkDatabase } from '~/plugins/algolia'
const indexBookmarks = clientBookmarkDatabase.initIndex('bookmarks')
const indexTags = clientBookmarkDatabase.initIndex('tags')
let urlTimeout = null
let tagTimeout = null

export default {
  name: 'OrganismsBookmarkEditor',
  data() {
    return {
      url: '',
      title: '',
      tags: [],
      description: '',
      candidates: [],
      textUrlError: '',
      textProcess: '',
      ogp: null,
    }
  },
  computed: {
    originalItem() {
      return this.$store.state.dailyForm.originalItem
    },
  },
  methods: {
    async onStringInput(value) {
      clearTimeout(tagTimeout)
      tagTimeout = setTimeout(async () => {
        this.candidates = []
        await indexTags
          .search(value)
          .then(({ hits }) => {
            if (hits.length) {
              this.candidates = hits.map((hit) => hit.name)
            }
          })
          .catch((error) => {
            console.error(error)
          })
      }, 500)
    },
    async onSaveClicked() {
      const item = new Bookmark({
        ...this.originalItem,
        title: this.title,
        tags: this.tags,
        url: this.url,
        description: this.description,
      })
      try {
        await this.$store.dispatch('dailyForm/onSaveClicked', item)
        this.$store.commit('pager/resetTemplateNames')
        this.$store.dispatch('dailyNotes/fetchDailyNotes')
      } catch (error) {
        console.error(error)
      }
    },
    onUrlInput(value) {
      clearTimeout(urlTimeout)
      urlTimeout = setTimeout(async () => {
        this.textUrlError = ''
        this.ogp = null
        this.title = ''
        this.textProcess = ''

        if (!value) return

        const isUrlValid = Bookmark.isUrlValid(value)
        if (!isUrlValid) {
          this.textUrlError = 'URLの形式で入力してください'
          return
        }

        try {
          const hits = await indexBookmarks.search('', {
            filters: `url:"${value}"`,
          })

          if (hits.length) {
            this.textUrlError = 'すでにブックマークされているURLです'
            return
          }
        } catch (error) {
          console.error(error)
        }

        this.textProcess = 'OGP取得中'
        try {
          const ogp = await this.$axios.$get('/api/getOgp', {
            params: { url: value },
          })
          this.ogp = new Ogp(ogp)
          this.title = this.ogp.title
        } catch (error) {
          this.textUrlError = 'ページが見つかりませんでした'
          this.textProcess = ''
          throw error
        }
      }, 300)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/stylesheets/variables';
@import '~/assets/stylesheets/form';
.o-bookmark-editor {
  &__head {
    margin-bottom: 10px;
  }

  &__item {
    @extend %form__item;
  }

  &__label {
    @extend %form__label;
  }

  &__content {
    @extend %form__content;
  }

  &__error {
    @extend %form__error;
  }
}
</style>
