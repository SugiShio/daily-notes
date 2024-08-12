<template lang="pug">
.o-recipe-editor
  .o-recipe-editor__item
    label.o-recipe-editor__label(for='title') Title
      .o-recipe-editor__content
        atoms-input-text(v-model='title')

  .o-recipe-editor__item
    .o-recipe-editor__label(for='ingredients') Image
      .o-recipe-editor__content
        atoms-input-image(:max='1')

  .o-recipe-editor__item
    .o-recipe-editor__label(for='ingredients') Ingredients
      .o-recipe-editor__content
        organisms-recipe-editor-input-ingredients(
          v-model='ingredients'
        )

        button.o-recipe-editor__button-add(:style='styleColor'
          @click='addIngredient'
        )
          i.el-icon-circle-plus-outline
          | Add ingredient

  .o-recipe-editor__item
    .o-recipe-editor__label(for='steps') Steps
      .o-recipe-editor__content
        organisms-recipe-editor-input-steps(
          v-model='steps'
        )

        button.o-recipe-editor__button-add(
          :style='styleColor'
          @click='addStep'
          )
          i.el-icon-circle-plus-outline
          | Add step


  .o-recipe-editor__item
    .o-recipe-editor__content
      atoms-button(
        text='Save',
        @click='onSaveClicked'
      )
</template>

<script>
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from '~/plugins/firebase'
import { Recipe, Ingredient, Step } from '~/models/recipe'

export default {
  name: 'OrganismsRecipeEditor',
  data() {
    return {
      title: '',
      ingredients: [
        new Ingredient({ name: 'にんじん' }),
        new Ingredient({ name: 'かぼちゃ' }),
      ],
      steps: [new Step()],
    }
  },
  computed: {
    styleColor() {
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
      this.title = this.originalItem.title
      this.ingredients = this.originalItem.ingredients.map(
        (ingredient) => new Ingredient(ingredient)
      )
      this.steps = this.originalItem.steps.map((step) => new Step(step))
    }
  },
  methods: {
    addIngredient() {
      this.ingredients.push(new Ingredient())
    },

    addStep() {
      this.steps.push(new Step())
    },

    removeIngredient(index) {
      if (this.ingredients.length > 1) this.ingredients.splice(index, 1)
    },

    async onSaveClicked() {
      // const addedFiles = await this.uploadFiles()
      const recipe = Recipe.sanitize({
        ...this.originalItem,
        title: this.title,
        ingredients: this.ingredients.map(
          (ingredient) => new Ingredient(ingredient)
        ),
        steps: this.steps.map((step) => new Step(step)),
      })

      try {
        if (!recipe.isValid) throw new Error('Recipe is invalid')
        await this.$store.dispatch('dailyForm/onSaveClicked', recipe)
        this.$store.commit('resetTemplateNames')
        this.$store.dispatch('dailyNotes/fetchDailyNotes')
      } catch (error) {
        console.error(error)
      }
    },

    onImageInput(file) {
      this.addedFiles.push(file)
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
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/stylesheets/variables';
@import '~/assets/stylesheets/form';
.o-recipe-editor {
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
