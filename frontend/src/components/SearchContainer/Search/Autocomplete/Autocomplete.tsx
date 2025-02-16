import styles from './style.module.css';
import { useSearch } from '@/hooks/useSearch';
import { useEffect, useRef, useState } from 'react';
import useClickOutside from '@/hooks/useClickOutside';
import { Ingredient, Recipe } from '@/types/interface';
import { Input } from './Input';
import { Listbox } from './Listbox';

interface AutocompleteProps {
  ingredients: Ingredient[]
  onSelect: (subject: Ingredient | Recipe, type: 'ingredient' | 'recipe') => void
}

export const Autocomplete = (props: AutocompleteProps) => {
  const [showListbox, setShowListbox] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const {search, data, searchTerm, error} = useSearch()
  
  useEffect(() => {
    if (searchTerm.length > 0 && data && !error) {
      setShowListbox(true);
    } else {
      setShowListbox(false);
    }
  }, [searchTerm, data, error]);

  useClickOutside(ref, () => setShowListbox(false));
  
  return (
    <div ref={ref}>
      <div
        className={styles.autocomplete}
        role="combobox"
        aria-expanded={showListbox}
        aria-haspopup="listbox"
        aria-controls="listbox"
      >
        <Input onChange={search} inputId='search-input' />
      </div>
      {(data && showListbox) && <Listbox
        inputId='search-input'
        suggestions={data}
        showRecipes={true}
        searchTerm={searchTerm}
        onSelect={props.onSelect}
        ingredientsIds={props.ingredients.map((ingredient) => ingredient.id)}
      />}
    </div>
  );
};
