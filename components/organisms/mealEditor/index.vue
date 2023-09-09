<template lang="pug">
.o-meal-editor
  .o-meal-editor__item
    label.o-meal-editor__label(for='date') Date
      .o-meal-editor__content
        atoms-input-date(v-model='date')

  .o-meal-editor__item
    label.o-meal-editor__label(for='date') Image
      .o-meal-editor__content
        ul.o-meal-editor__images
          li.o-meal-editor__image-item(v-for='src in srcs')
            img.o-meal-editor__image(:src='src')
          li.o-meal-editor__image-item
            label
              input.o-meal-editor__image-input(
                type='file',
                accept='image/*',
                capture='camera',
                @input='addFile'
              )
              i.el-icon-circle-plus-outline
                | Add photo

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
          @click='$store.commit("setTemplateNames", "templates-search-food-item")'
        )
          i.el-icon-circle-plus-outline
          | Add items

  .o-meal-editor__item
    .o-meal-editor__content
      atoms-button(
        :disabled='!items.length',
        text='Save',
        @click='onSaveClicked'
      )
</template>

<script>
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from '~/plugins/firebase'
import { MealItem, Meal } from '~/models/meal'
import { convertDateToDateId, convertDateIdToDate } from '~/scripts/dateHelper'

export default {
  name: 'OrganismsMealEditor',
  data() {
    return {
      date: new Date(),
      items: [],
      files: [],
      srcs: [],
    }
  },
  computed: {
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
      this.date = convertDateIdToDate(this.originalItem.date)

      const foodItems = this.$store.state.foodItems
      this.items = this.originalItem.items.map((item) => {
        const foodItem = foodItems.find((foodItem) => foodItem.id === item.id)
        return { ...foodItem, ...item }
      })
      this.files = this.originalItem.files
    }
  },
  methods: {
    addFile($event) {
      const file = $event.target.files[0]
      this.files.push(file)
      const reader = new FileReader()
      reader.onload = (_) => {
        this.srcs.push(reader.result)
      }
      reader.readAsDataURL(file)
    },
    deleteItem(index) {
      this.items.splice(index, 1)
    },

    async onSaveClicked() {
      const files = await this.uploadFiles()
      const item = new Meal({
        ...this.originalItem,
        date: convertDateToDateId(this.date),
        items: this.items.map((item) => new MealItem(item)),
        files,
      })
      try {
        await this.$store.dispatch('dailyForm/onSaveClicked', item)
        this.$store.commit('resetTemplateNames')
        this.$store.dispatch('fetchDailyNotes')
      } catch (error) {
        console.error(error)
      }
    },

    onUnitChanged(index, unit) {
      this.items[index].unit = unit
    },

    onValueInput(index, value) {
      this.items[index].value = value
    },

    async uploadFiles() {
      return await Promise.all(
        this.files.map(async (file) => {
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
    color: $color-main-dark;
    padding: 5px 0;
  }
}
</style>