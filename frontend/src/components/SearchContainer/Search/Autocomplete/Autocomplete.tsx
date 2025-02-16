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
  const [activeIndex, setActiveIndex] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);
  const {search, data, searchTerm, error} = useSearch()
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!data || !showListbox) return;
    
    const suggestions = [
      ...data.ingredients.filter(i => !props.ingredients.map(ing => ing.id).includes(i.id)),
      ...data.recipes
    ].slice(0, 10); 

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : prev));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex(prev => (prev > 0 ? prev - 1 : prev));
        break;
      case 'Enter':
        e.preventDefault();
        if (activeIndex >= 0 && activeIndex < suggestions.length) {
          const item = suggestions[activeIndex];
          const type = activeIndex < data.ingredients.length ? 'ingredient' : 'recipe';
          props.onSelect(item, type);
          setShowListbox(false);
          setActiveIndex(-1);
        }
        break;
      case 'Escape':
        setShowListbox(false);
        setActiveIndex(-1);
        break;
    }
  };

  useEffect(() => {
    setActiveIndex(-1); // Reset active index when search results change
  }, [searchTerm]);

  useEffect(() => {
    if (searchTerm.length > 0 && data && !error) {
      setShowListbox(true);
    } else {
      setShowListbox(false);
    }
  }, [searchTerm, data, error]);

  useClickOutside(ref, () => setShowListbox(false));
  
  return (
    <div ref={ref} onKeyDown={handleKeyDown}>
      <div
        className={styles.autocomplete}
        onFocus={() => setShowListbox(true)}
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
        activeIndex={activeIndex}
      />}
    </div>
  );
};
