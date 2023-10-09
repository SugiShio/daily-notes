<template lang="pug">
section.t-food-item(v-if='foodItem')
  a.t-food-item__head(:href='href', target='_blank')
    h2.t-food-item__title {{ foodItem.name }}
    i.el-icon-top-right

  .t-food-item__section
    .t-food-item__description(
      :class='{ isDescriptionShow }',
      @click='isDescriptionShow = !isDescriptionShow',
      v-html='description'
    )

  .t-food-item__section
    ul.t-food-item__labels
      li.t-food-item__label(v-for='label in labels')
        atoms-tag(htmlTag='a', removable, @remove-clicked='removeLabel(label)') {{ label }}
      li.t-food-item__label(v-if='!isLabelEditing')
        atoms-tag(htmlTag='button', @click='isLabelEditing = true')
          i.el-icon-plus
            | &nbsp;Add label

    .t-food-item__label-input-container(v-if='isLabelEditing')
      atoms-input-text(v-model='labelText')
      ul.t-food-item__candidates
        li.t-food-item__candidate(
          v-for='label in labelCandidates',
          @click='addFoodItemId(label)'
        )
          | {{ label }}
        li.t-food-item__candidate(v-if='!labelCandidates.length && labelText')
          button(@click='createNewLabel')
            | Create a new label "{{ labelText }}"

  section.t-food-item__section(v-if='unitsText.length')
    h3.t-food-item__title-secondary
      | 単位
    ul
      li.t-food-item__unit-item(v-for='text in unitsText')
        | {{ text }}

  section.t-food-item__section
    h3.t-food-item__title-secondary 栄養素
    .t-food-item__content
      atoms-input-number-with-unit(
        :value='value',
        :units='units',
        :unit='unit',
        size='small',
        @value-input='onValueInput($event)',
        @unit-changed='onUnitChanged($event)'
      )
      span.t-food-item__rate-text あたり
    .t-food-item__content
      atoms-graph(:graph-items='graphItems')
</template>

<script>
import DOMPurify from 'dompurify'
import { doc, updateDoc } from 'firebase/firestore'
import { NUTRIENTS } from '~/constants/nutrients'
import { FOOD_DATABASE_URL } from '~/constants/url'
import { db, getFirestoreFormat } from '~/plugins/firebase'

export default {
  name: 'TemplatesFoodItem',
  data() {
    const foodItem = this.$store.state.foodItem.foodItem
    const unit = foodItem.unitDefault || foodItem.units[0].unit
    const value = foodItem.unitDefault ? 1 : 100
    return {
      isDescriptionShow: false,
      isLabelEditing: false,
      labelText: '',
      value,
      unit,
    }
  },
  computed: {
    labels() {
      const usersLabels = this.user.foodItemLabels
      const foodItem = this.$store.state.foodItem.foodItem
      const labels = []
      usersLabels.forEach((label) => {
        if (label.foodItemIds.includes(foodItem.id)) labels.push(label.name)
      })
      return labels
    },

    labelCandidates() {
      return this.user.foodItemLabels
        .map((foodItemLabel) => foodItemLabel.name)
        .filter((label) => !this.labels.includes(label))
        .filter((label) => label.includes(this.labelText))
    },

    description() {
      return DOMPurify.sanitize(this.foodItem.description)
    },
    href() {
      return `${FOOD_DATABASE_URL}foodItems/${this.foodItem.id}`
    },
    foodItem() {
      return this.$store.state.foodItem.foodItem
    },
    graphItems() {
      return Object.keys(NUTRIENTS).map((key) => {
        const base = this.nutrientBasis[key]
        const rate = this.foodItem.units.find(
          (unit) => unit.unit === this.unit
        ).rate
        const value = (this.foodItem.nutrients[key] * this.value * rate) / 100
        return {
          title: NUTRIENTS[key].label,
          values: [value],
          base,
          unit: NUTRIENTS[key].unit,
        }
      })
    },
    nutrientBasis() {
      return this.$store.state.user.nutrientBasis
    },
    units() {
      return this.foodItem.units.map((u) => {
        return { label: u.unit, value: u.unit }
      })
    },
    unitsText() {
      return this.foodItem.units
        .slice(1)
        .map((unit) => `${unit.unit} (${unit.rate}g)`)
    },
    user() {
      return this.$store.state.user
    },
  },
  methods: {
    addFoodItemId(label) {
      this.$store.commit('setFoodItemLabel', {
        name: label,
        foodItemId: this.foodItem.id,
      })
      this.updateFoodItemLabels()
    },

    createNewLabel() {
      this.$store.commit('setFoodItemLabel', {
        name: this.labelText,
        foodItemId: this.foodItem.id,
      })
      this.updateFoodItemLabels()
    },

    async updateFoodItemLabels() {
      this.isLabelEditing = false
      const data = getFirestoreFormat({
        foodItemLabels: this.user.foodItemLabels,
        uid: this.user.uid,
      })
      try {
        await updateDoc(doc(db, 'users', this.user.uid), data)
      } catch (e) {
        console.error(e)
      }
      this.labelText = ''
    },
    removeLabel(label) {
      this.$store.commit('removeFoodItemLabel', {
        name: label,
        foodItemId: this.foodItem.id,
      })
      this.updateFoodItemLabels()
    },
    onCloseClicked() {
      this.$store.commit('foodItem/resetFoodItem')
      this.$store.commit('removeTemplateNames')
    },
    onValueInput(value) {
      this.value = value
    },
    onUnitChanged($event) {
      this.unit = $event.rate
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/stylesheets/variables';

.t-food-item {
  &__head {
    text-decoration: none;
  }

  &__title {
    font-size: 20px;
    display: inline;
    margin-right: 5px;
  }

  &__title-secondary {
    font-weight: bold;
    margin: 10px 0 5px;
  }

  &__section {
    margin: 20px 0;
  }

  &__content {
    margin: 10px 0;
  }

  &__labels {
    display: flex;
    margin: -3px;
  }

  &__label {
    padding: 3px;
  }

  &__rate-text {
    margin-left: 10px;
  }

  &__description::v-deep {
    overflow: hidden;

    &:not(.isDescriptionShow) {
      display: -webkit-box;
      overflow: hidden;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
    }

    p {
      margin: 10px 0;
    }

    a {
      color: $color-main-dark;
    }
  }

  &__label-input-container {
    position: relative;
  }

  &__candidates {
    background: rgba(#fff, 0.95);
    border-radius: 8px;
    box-shadow: 0 0 5px rgba($color-main-dark, 0.2);
    padding: 3px 0;
    position: absolute;
    top: calc(100% + 2px);
  }

  &__candidate {
    cursor: pointer;
    min-width: 120px;
    padding: 3px 10px;
    transition: background-color 0.3s;

    &:hover {
      background-color: $color-main-light;
    }
  }
}
</style>
