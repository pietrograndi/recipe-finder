import { useState } from 'react';
import { ClearIcon } from '../icons/clearIcons';
import styles from './Autocomplete.module.css';
import cx from 'classnames';

interface InputProps {
  onChange: (value: string) => void;
}

export const Input = ({ onChange }: InputProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setTimeout(() => {
      onChange(e.target.value);
    }, 300);
  };

  return (
    <>
      <input
        id="search-input"
        placeholder="Search..."
        type="text"
        value={inputValue}
        onChange={handleInputChange}
      />
      <div>
        <button
          id="clear-input"
          aria-controls="search-input"
          aria-label="Clear input"
          className={cx(styles.clearButton, {
            [styles.hidden]: inputValue.length === 0,
          })}
          type="button"
          aria-hidden={inputValue.length === 0}
          onClick={() => setInputValue('')}
        >
          <ClearIcon />
        </button>
      </div>
    </>
  );
};
