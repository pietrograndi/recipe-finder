import { Input } from './Input';
import styles from './Autocomplete.module.css';

export const Autocomplete = () => {
  return (
    <div
      className={styles.autocomplete}
      role="combobox"
      aria-expanded={false}
      aria-haspopup="listbox"
      aria-controls="listbox"
    >
      <Input onChange={() => {}} />
    </div>
  );
};
