import { Autocomplete } from './Autocomplete';
import { Chips } from '../../Chips';
import styles from './Search.module.css';
import { Ingredient, Recipe } from '@/types/interface';
import { ActionDispatch } from 'react';
import { Action, addAction, removeAction } from '../state';
import router from 'next/router';

interface SearchProps {
  ingredients: Ingredient[]
  handleIngredient: ActionDispatch<[action:Action]>
}

export const Search = ({ingredients = [], ...props}: SearchProps) => {
  const onSelect = (subject: Ingredient | Recipe, type: 'ingredient' | 'recipe') => {
    if (type === 'ingredient') {
      props.handleIngredient(addAction(subject))
      return
    }
    router.push(`/recipes/${encodeURIComponent(subject.name)}`)
  }
  
  const handleIngredientDelete = (index: number) => {
    props.handleIngredient(removeAction(index))
  }

  return (
    <section className={styles.searchContainer}>
      <div>
        <Autocomplete
          ingredients={ingredients}
          onSelect={onSelect}
        />
        { ingredients.length > 0 && <div className={styles.ingredientsContainer}>
          Ingredients:  
          <div>
            {ingredients.map((ingredient, index) => (
              <Chips 
                key={ingredient.id}
                label={ingredient.name}
                onDelete={() => handleIngredientDelete(index)}
              />
            ))}
          </div>
        </div> }
      </div>
    </section>
  )
};
