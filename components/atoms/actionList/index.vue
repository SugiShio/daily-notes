<template lang="pug">
.a-action-list
  button.a-action-list__action(
    @click.stop.prevent='editItem'
  )
    i.el-icon-edit
  button.a-action-list__action(
    @click.stop.prevent='deleteItem'
  )
    i.el-icon-delete

</template>

<script>
import { Note } from '~/models/note'
import { Meal } from '~/models/meal'
import { Recipe } from '~/models/recipe'

export default {
  name: 'AtomsActionList',
  props: {
    dailyNote: { type: [Note, Meal, Recipe], default: () => new Note() },
    id: { type: String, required: true },
  },
  methods: {
    editItem() {
      this.$store.commit(
        'pager/setTemplateNames',
        `organisms-${this.dailyNote.type}-editor`
      )
      this.$store.commit('dailyForm/setOriginalItem', {
        item: this.dailyNote,
        id: this.id,
      })
    },
    async deleteItem() {
      if (confirm('削除します。よろしいですか？')) {
        await this.$store.dispatch('dailyForm/deleteItem', this.id)
        this.$store.dispatch('dailyNotes/fetchDailyNotes')
        this.$emit('delete-completed')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.a-action-list {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;

  &__action {
    padding: 2px 5px;
    margin: 0 5px;
  }
}
</style>
