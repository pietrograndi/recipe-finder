import { Input } from './Input';
import styles from './style.module.css';
import { useSearchRecipe } from '@/hooks/useSearchRecipe';
import { Listbox } from './Listbox';
import { useEffect, useRef, useState } from 'react';
import useClickOutside from '@/hooks/useClickOutside';

export const Autocomplete = () => {
  const [showListbox, setShowListbox] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const {searchRecipes, data, searchTerm, error} = useSearchRecipe()

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
        <Input onChange={searchRecipes} inputId='search-input' />
      </div>
      {(data && showListbox) && <Listbox
        inputId='search-input'
        suggestions={data}
        showRecipes={true}
        searchTerm={searchTerm}
        onSelect={() => {}}
      />}
    </div>
  );
};
