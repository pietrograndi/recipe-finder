export interface Recipe {
  id: number
  name: string
  description?: string
  image?: string
}

export interface Ingredient {
  id: number
  name: string
  description?: string
  image?: string
}

export  interface RecipeByIngredients {
  id: number,
  recipeName: string,
  ingredientName: string
}