<template lang="pug">
section.t-daily-notes
  .t-daily-notes__block
    atoms-date-box

  .t-daily-notes__block
    organisms-create-icons

  organisms-task-list

  .t-daily-notes__item(
    v-if='shouldShowMealSummary'
   )
    organisms-meal-summary(:meals='meals')

    button.t-daily-notes__button(:style='styleColor' @click='showMealSummary')
      i.el-icon-s-data
      | &nbsp; Show detail
  ul
    li.t-daily-notes__item(
      v-for='meal in mealsWithId'
     )
      organisms-meal(:meal='meal.meal', :show-count='5')
        .t-daily-notes__actions
          button.t-daily-notes__action(
            @click.stop.prevent='editItem(meal.meal, meal.id)'
          )
            i.el-icon-edit
          button.t-daily-notes__action(
            @click.stop.prevent='deleteItem(meal.id)'
          )
            i.el-icon-delete
  ul
    li.t-daily-notes__item(v-for='(note, id) in notes')
      organisms-note(:item='note')
        .t-daily-notes__actions
          button.t-daily-notes__action(@click='editItem(note, id)')
            i.el-icon-edit
          button.t-daily-notes__action(@click='deleteItem(id)')
            i.el-icon-delete
</template>

<script>
import { NUTRIENTS } from '~/constants/nutrients'

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
      return this.$store.state.dailyNotes || []
    },
    meals() {
      return this.mealsWithId.map((mealWithId) => mealWithId.meal)
    },

    mealsWithId() {
      return Object.keys(this.dailyNotes)
        .map((key) => {
          if (this.dailyNotes[key].type === 'meal')
            return { id: key, meal: this.dailyNotes[key] }
          return null
        })
        .filter((v) => v)
        .sort((a, b) => {
          return a.meal.time - b.meal.time
        })
    },

    notes() {
      const notes = {}
      Object.keys(this.dailyNotes).forEach((key) => {
        if (this.dailyNotes[key].type === 'note')
          notes[key] = this.dailyNotes[key]
      })
      return notes
    },
    nutrientBasis() {
      return this.$store.state.user.nutrientBasis
    },
    shouldShowMealSummary() {
      return (
        Object.keys(this.meals).length && this.$store.state.foodItems.length
      )
    },
    colorConfig() {
      return this.$store.state.colorConfig
    },
    styleColor() {
      return {
        color: this.colorConfig.mainDark,
      }
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
    showMealSummary() {
      const foodItems = this.$store.state.foodItems
      const items = Object.keys(NUTRIENTS).map((key) => {
        const values = Object.values(this.meals).map((meal) => {
          return meal.items
            .map((item) => {
              const foodItem = foodItems.find((fi) => fi.id === item.id)
              const unit = foodItem.units.find((u) => u.unit === item.unit)
              const rate = unit ? unit.rate : 1
              return (
                Math.round(foodItem.nutrients[key] * item.value * rate) / 100
              )
            })
            .reduce((a, c) => a + c, 0)
        })
        const base = this.nutrientBasis[key]
        return {
          title: NUTRIENTS[key].label,
          values,
          base,
          unit: NUTRIENTS[key].unit,
        }
      })
      this.$store.commit('graph/setItems', items)
      this.$store.commit('setTemplateNames', 'templates-meal-graph')
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
    box-shadow: 0 0 3px rgba(#000, 0.2);
    border-radius: 8px;
  }

  &__button {
    display: block;
    width: 100%;
    padding: 10px;
    text-align: center;
  }

  &__actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }

  &__action {
    padding: 2px 5px;
    margin: 0 5px;
  }
}
</style>
