import { Ingredient, Recipe } from "@/types/interface"
import styles from './style.module.css';
import { Suggestion } from "./Suggestion";

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
  const notFound = props.suggestions.ingredients.length === 0 && props.suggestions?.recipes.length === 0
  return (
    <div 
      className={styles.listbox}
      role="listbox" 
      aria-label="Suggerimenti ricerca"
      aria-owns={props.inputId}
    >
      <div className={styles.listboxContent}>
      {notFound && <div className={styles.notFound} role="status">Nessun risultato trovato</div>}
      {props.suggestions.ingredients.length > 0 && <section>
        <div className={styles.sectionTitle + ' ' + styles.ingredients}  role="presentation">🥬 Ingredienti</div>
        <div>
          {props.suggestions.ingredients
          .filter((_,index) => index < 5)
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
      { props.suggestions.recipes.length > 0 && props.showRecipes && <section>
        <div className={styles.sectionTitle} role="presentation">🍽️ Ricette</div>
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
    </div>
  )
}