import { Autocomplete } from '../autocomplete';
import { Chips } from '../Chips';
import styles from './Search.module.css';

export const Search = () => {
  return (
    <section className={styles.searchContainer}>
      <div>
        <Autocomplete />  
        <div className={styles.ingredientsContainer}>
          Ingredients:  
          <div>
            <Chips label="Ingredient 1" onDelete={() => {}}/>
            <Chips label="Ingredient 2" onDelete={() => {}}/>
            <Chips label="Ingredient 3" onDelete={() => {}}/>
            <Chips label="Ingredient 3" onDelete={() => {}}/>
            <Chips label="Ingredient 3" onDelete={() => {}}/>
            <Chips label="Ingredient 3" onDelete={() => {}}/>
            <Chips label="Ingredient 3" onDelete={() => {}}/>
            <Chips label="Ingredient 3" onDelete={() => {}}/>
            <Chips label="Ingredient 3" onDelete={() => {}}/>
            <Chips label="Ingredient 3" onDelete={() => {}}/>
            <Chips label="Ingredient 3" onDelete={() => {}}/>
            <Chips label="Ingredient 3" onDelete={() => {}}/>
            <Chips label="Ingredient 3" onDelete={() => {}}/>
          </div>
        </div>
      </div> 
    </section>
  )
};
  