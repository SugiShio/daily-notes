<template lang="pug">
section.t-daily-notes
  .t-daily-notes__block
    atoms-date-box

  .t-daily-notes__block
    organisms-create-icons
  organisms-task-list
  ul
    li.t-daily-notes__item(v-for='(dailyNote, id) in dailyNotes')
      component(
        :is='`organisms-${dailyNote.type}`',
        :item='dailyNote',
        @item-updated='updateDailyNote($event, id)'
      )
      .t-daily-notes__actions
        button.t-daily-notes__action(@click='editItem(dailyNote, id)')
          i.el-icon-edit
        button.t-daily-notes__action(@click='deleteItem(id)')
          i.el-icon-delete
</template>

<script>
export default {
  name: 'TemplatesDailyNotes',
  props: {
    dailyNotesChanged: { type: Boolean, default: false },
  },
  computed: {
    uid() {
      return this.$store.state.user.uid
    },
    dailyNotes() {
      return this.$store.state.dailyNotes
    },
  },
  methods: {
    async deleteItem(id) {
      if (confirm('削除します。よろしいですか？')) {
        await this.$store.dispatch('dailyForm/deleteItem', id)
        this.$store.dispatch('fetchDailyNotes')
      }
    },
    editItem(dailyNote, id) {
      this.$store.commit(
        'setTemplateNames',
        `organisms-${dailyNote.type}-editor`
      )
      this.$store.commit('dailyForm/setOriginalItem', { item: dailyNote, id })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/stylesheets/variables';

.t-daily-notes {
  &__block {
    margin: 20px 0;
  }

  &__item {
    margin: 10px;
    background: rgba(#fff, 0.75);
    box-shadow: 0 0 5px rgba($color-main-dark, 0.2);
    padding: 15px 20px;
    border-radius: 8px;
  }

  &__actions {
    display: flex;
    justify-content: flex-end;
  }

  &__action {
    padding: 2px 5px;
    margin: 0 5px;
  }
}
</style>