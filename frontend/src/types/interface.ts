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

export interface RecipeByIngredients {
  id: number,
  recipeName: string,
  ingredientName: string
}

export type RecipeResponse = {
  id:number
  recipeName: string
  ingredients: Ingredient[]
}[]