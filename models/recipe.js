import { DailyItem } from './dailyItem'

export class Recipe extends DailyItem {
  constructor(recipe = {}) {
    super(recipe)
    this.type = 'recipe'
    this.title = recipe.title || ''
    this.ingredients = recipe.ingredients
      ? recipe.ingredients.map((ingredient) => new Ingredient(ingredient))
      : []
    this.note = recipe.note || ''
    this.steps = recipe.steps ? recipe.steps.map((step) => new Step(step)) : []
  }

  get isValid() {
    return !!(this.title && (this.ingredients.length || this.steps.length))
  }

  static sanitize(recipe) {
    const ingredients = recipe.ingredients
      .filter((ingredient) => {
        return !ingredient.isBlank
      })
      .map(
        (ingredient, index) =>
          new Ingredient({ ...ingredient, order: index + 1 })
      )
    const steps = recipe.steps
      .filter((step) => !step.isBlank)
      .map((step, index) => new Step({ ...step, order: index + 1 }))
    return new Recipe({ ...recipe, ingredients, steps })
  }
}

export class Ingredient {
  constructor(ingredient = {}) {
    this.name = ingredient.name || ''
    this.amountText = ingredient.amountText || ''
    this.order = ingredient.order
  }

  get isBlank() {
    return !this.name && !this.amountText
  }
}

export class Step {
  constructor(step = {}) {
    this.order = step.order
    this.description = step.description || ''
  }

  get isBlank() {
    return !this.description
  }
}
