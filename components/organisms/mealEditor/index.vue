<template lang="pug">
.o-meal-editor
  .o-meal-editor__item
    label.o-meal-editor__label(for='mark') Mark
      .o-meal-editor__content
        atoms-mark-selector(v-model='mark', :marks='marks')

  .o-meal-editor__item
    label.o-meal-editor__label(for='date') Date
      .o-meal-editor__content
        atoms-input-time(v-model='time')

  .o-meal-editor__item
    .o-meal-editor__label(for='items') Items
      .o-meal-editor__content
        ul.o-meal-editor__food-items
          li.o-meal-editor__food-item(v-for='(item, index) in items')
            .o-meal-editor__food-item-name
              span {{ item.name }}
            atoms-input-number-with-unit(
              :value='item.value',
              :unit='item.unit',
              :units='unitOptions(item)',
              size='small',
              @value-input='onValueInput(index, $event)',
              @unit-changed='onUnitChanged(index, $event)'
            )
            button.o-meal-editor__button-delete(@click='deleteItem(index)')
              i.el-icon-delete

        button.o-meal-editor__button-add(
          :style='style'
          @click='$store.commit("pager/setTemplateNames", "templates-search-food-item")'
        )
          i.el-icon-circle-plus-outline
          | Add items

  .o-meal-editor__item
    label.o-meal-editor__label(for='date') Image
      .o-meal-editor__content
        atoms-input-image(
          :original-files='files',
          @delete-clicked='onImageDeleteClicked',
          @input='onImageInput'
        )

  .o-meal-editor__item
    .o-meal-editor__content
      atoms-button(
        :disabled='!items.length || !mark',
        text='Save',
        @click='onSaveClicked'
      )
</template>

<script>
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from '~/plugins/firebase'
import { MealItem, Meal } from '~/models/meal'

export default {
  name: 'OrganismsMealEditor',
  data() {
    return {
      addedFiles: [],
      time: new Date(),
      items: [],
      files: [],
      mark: '',
      marks: ['sunrise-1', 'sunny', 'moon', 'apple', 'coffee-cup'],
    }
  },
  computed: {
    style() {
      const colorConfig = this.$store.state.colorConfig
      return { color: colorConfig.mainDark }
    },
    selectedFoodItem() {
      return this.$store.state.searchFoodItem.selectedFoodItem
    },
    uid() {
      return this.$store.state.user.uid
    },
    originalItem() {
      return this.$store.state.dailyForm.originalItem
    },
  },
  watch: {
    selectedFoodItem(foodItem) {
      const unit = foodItem.unitDefault
      const value = unit === 'g' ? 100 : 1
      this.items.push({
        ...foodItem,
        unit,
        value,
      })
    },
  },
  created() {
    if (this.originalItem) {
      this.time = new Date(this.originalItem.time)
      this.mark = this.originalItem.mark

      const foodItems = this.$store.state.foodItems
      this.items = this.originalItem.items.map((item) => {
        const foodItem = foodItems.find((foodItem) => foodItem.id === item.id)
        return { ...foodItem, ...item }
      })
      this.files = [...this.originalItem.files]
    }
  },
  methods: {
    deleteItem(index) {
      this.items.splice(index, 1)
    },

    async onSaveClicked() {
      const addedFiles = await this.uploadFiles()
      const item = new Meal({
        ...this.originalItem,
        time: this.time.getTime(),
        items: this.items.map((item) => new MealItem(item)),
        files: [...this.files, ...addedFiles],
        mark: this.mark,
      })
      try {
        await this.$store.dispatch('dailyForm/onSaveClicked', item)
        this.$store.commit('pager/resetTemplateNames')
        this.$store.dispatch('dailyNotes/fetchDailyNotes')
      } catch (error) {
        console.error(error)
      }
    },

    onImageDeleteClicked(index) {
      if (index < this.files.length) {
        this.files.splice(index, 1)
      } else {
        this.addedFiles.splice(index - this.files.length, 1)
      }
    },
    onImageInput(file) {
      this.addedFiles.push(file)
    },

    onUnitChanged(index, { unit, oldUnit }) {
      const item = this.items[index]
      const newRate = item.units.find((u) => u.unit === unit).rate
      const oldRate = item.units.find((u) => u.unit === oldUnit).rate
      const value = (item.value / newRate) * oldRate
      this.items.splice(index, 1, { ...item, unit, value })
    },

    onValueInput(index, value) {
      const item = this.items[index]
      this.items.splice(index, 1, { ...item, value })
    },

    async uploadFiles() {
      return await Promise.all(
        this.addedFiles.map(async (file) => {
          const filePath = file.name.replace(
            /(.*?)\./,
            `uploads/images/${this.uid}/$1-${new Date().getTime()}.`
          )
          const fileRef = ref(storage, filePath)
          await uploadBytes(fileRef, file)
          const url = await getDownloadURL(fileRef)
          return url
        })
      )
    },

    unitOptions(item) {
      if (!item.units) return []
      return item.units.map((unit) => {
        return { value: unit.unit, label: unit.unit }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/stylesheets/variables';
@import '~/assets/stylesheets/form';
.o-meal-editor {
  &__item {
    @extend %form__item;
  }

  &__label {
    @extend %form__label;
  }

  &__content {
    @extend %form__content;
  }

  &__image {
    width: 100px;
  }

  &__image-input {
    display: none;
  }

  &__food-items {
    margin: 10px 0;
  }

  &__food-item {
    display: flex;
    align-items: center;

    & + & {
      margin-top: 10px;
    }
  }

  &__food-item-name {
    flex-grow: 1;
    overflow: hidden;

    span {
      display: block;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }

  &__button-delete {
    color: $color-red;
    padding: 5px 10px;
    margin-left: 5px;
  }

  &__button-add {
    padding: 5px 0;
  }
}
</style>
