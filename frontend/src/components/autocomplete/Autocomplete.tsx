import { Input } from './Input';
import styles from './style.module.css';
import { useSearchRecipe } from '@/hooks/useSeachRecipe';
import { Listbox } from './Listibox';
import { useEffect, useState } from 'react';

export const Autocomplete = () => {
  const [showListbox, setShowListbox] = useState(false);
  const {searchRecipes, data, searchTerm, error} = useSearchRecipe()
  
  useEffect(() => {
    if (searchTerm.length > 0 && data && !error) {
      setShowListbox(true);
    } else {
      setShowListbox(false);
    }
  }, [searchTerm, data, error]);
  
  return (
    <>
      <div
        className={styles.autocomplete}
        role="combobox"
        aria-expanded={showListbox}
        aria-haspopup="listbox"
        aria-controls="listbox"
      >
        <Input onChange={searchRecipes} inputId='search-input' />
      </div>
      {(data && showListbox) && <Listbox
        inputId='search-input'
        suggestions={data}
        showRecipes={true}
        searchTerm={searchTerm}
        onSelect={() => {}}
      />}
    </>
  );
};
