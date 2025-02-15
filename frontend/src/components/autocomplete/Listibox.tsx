import { Ingredient, Recipe } from "@/types/interface"
import { Suggestion } from "./Suggestion"

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
            <Suggestion
              key={`ingredient-${ingredient.id}`}
              suggestion={ingredient}
              type="ingredient"
              onSelect={props.onSelect}
              searchTerm={props.searchTerm}
            />
          ))}
        </div>
      </section>}
        {props.suggestions.recipes.length > 0 && props.showRecipes && <section>
        <div role="presentation">🍽️ Ricette</div>
        <div>
          {props.suggestions.recipes
          .filter((item,index) => index < 5)
          .map((recipe) => (
            <Suggestion
              key={`recipe-${recipe.id}`}
              suggestion={recipe}
              type="recipe"
              onSelect={props.onSelect}
              searchTerm={props.searchTerm}
            />
          ))}
        </div>
      </section>}
    </div>
  )
}