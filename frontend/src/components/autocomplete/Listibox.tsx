import { Ingredient, Recipe } from "@/types/interface"

interface SuggestionsProps {
  searchTerm: string
  suggestions: {
    ingredients:Ingredient[]
    recipes:Recipe[]
  }
  inputId: string
  showRecipes: boolean
  onSelect: (subject: Ingredient | Recipe, type: 'ingredient' | 'recipe') => void
}

export const Listbox = (props: SuggestionsProps) => {
  return (
    <div 
      role="listbox" 
      aria-label="Suggerimenti ricerca"
      aria-owns={props.inputId}
    >
      {props.suggestions.ingredients.length > 0 && <section>
        <div role="presentation">🥬 Ingredienti</div>
        <div>
          {props.suggestions.ingredients
          .filter((item,index) => index < 5)
          .map((ingredient) => (
            <div 
              key={`ingredient-${ingredient.id}`}
              tabIndex={-1}
              role="option"
            >{ingredient.name}</div>
          ))}
        </div>
      </section>}
        {props.suggestions.recipes.length > 0 && props.showRecipes && <section>
        <div role="presentation">🍽️ Ricette</div>
        <div>
          {props.suggestions.recipes
          .filter((item,index) => index < 5)
          .map((recipe) => (
            <div
              key={`recipe-${recipe.id}`}
              tabIndex={-1}
              role="option"
            >{recipe.name}</div>
          ))}
        </div>
      </section>}
    </div>
  )
}