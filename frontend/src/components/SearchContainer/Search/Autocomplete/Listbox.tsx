import { Ingredient, Recipe } from "@/types/interface"
import styles from './style.module.css';
import { Suggestion } from "./Suggestion";

interface SuggestionsProps {
  ingredientsIds: number[]
  searchTerm: string
  suggestions: {
    ingredients:Ingredient[]
    recipes:Recipe[]
  }
  inputId: string
  showRecipes: boolean
  onSelect: (subject: Ingredient | Recipe, type: 'ingredient' | 'recipe') => void
  activeIndex: number
}

export const Listbox = (props: SuggestionsProps) => {
  const notFound = props.suggestions.ingredients.length === 0 && props.suggestions?.recipes.length === 0
  
  const filteredIngredients = props.suggestions.ingredients
    .filter((ingredient) => !props.ingredientsIds.includes(ingredient.id))
    .filter((_, index) => index < 5);
  
  const filteredRecipes = props.suggestions.recipes
    .filter((_, index) => index < 5);

  return (
    <div 
      className={styles.listbox}
      role="listbox" 
      aria-label="Suggerimenti ricerca"
      aria-owns={props.inputId}
    >
      <div className={styles.listboxContent}>
      {notFound && <div className={styles.notFound} role="status">Nessun risultato trovato</div>}
      {filteredIngredients.length > 0 && <section>
        <div className={styles.sectionTitle + ' ' + styles.ingredients} role="presentation">🥬 ingredients</div>
        <div>
          {filteredIngredients.map((ingredient, index) => (
            <Suggestion
              key={`ingredient-${ingredient.id}`}
              suggestion={ingredient}
              type="ingredient"
              onSelect={props.onSelect}
              searchTerm={props.searchTerm}
              isActive={index === props.activeIndex}
            />
          ))}
        </div>
      </section>}
      {filteredRecipes.length > 0 && props.showRecipes && <section>
        <div className={styles.sectionTitle} role="presentation">🍽️ recipes</div>
        <div>
          {filteredRecipes.map((recipe, index) => (
            <Suggestion
              key={`recipe-${recipe.id}`}
              suggestion={recipe}
              type="recipe"
              onSelect={props.onSelect}
              searchTerm={props.searchTerm}
              isActive={index + filteredIngredients.length === props.activeIndex}
            />
          ))}
        </div>
      </section>}
    </div>
    </div>
  )
}