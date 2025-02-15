import { Autocomplete } from '../autocomplete';
import styles from './Search.module.css';

export const Search = () => {
  return (
    <section className={styles.searchContainer}>
      <div>
        <Autocomplete />  
        <div>
          result
        </div>
      </div> 
    </section>
  )
};
  