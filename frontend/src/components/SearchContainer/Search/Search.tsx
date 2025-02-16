import { Autocomplete } from './Autocomplete';
import { Chips } from '../../Chips';
import styles from './Search.module.css';
import { Ingredient, Recipe } from '@/types/interface';
import { ActionDispatch } from 'react';
import { Action, addAction, removeAction } from '../state';

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
    console.log(subject)
  }
  
  const handleIngredientDelete = (index: number) => {
    props.handleIngredient(removeAction(index))
  }

  return (
    <section className={styles.searchContainer}>
      <div>
        <Autocomplete onSelect={onSelect} />  
        { ingredients.length > 0 && <div className={styles.ingredientsContainer}>
          Ingredients:  
          <div>
            {ingredients.map((ingredient, index) => (
              <Chips key={ingredient.id} label={ingredient.name} onDelete={() => handleIngredientDelete(index)}/>
            ))}
          </div>
        </div> }
      </div>
    </section>
  )
};
  