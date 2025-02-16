import { ClearIcon } from "../icons/clearIcons";
import styles from './Chips.module.css';

interface ChipsProps {
  label: string;
  onDelete: () => void;
}

export const Chips = ({ label, onDelete }: ChipsProps) => {
  return <div className={styles.chipsContainer}>
    {label}
    <button 
      onClick={onDelete}
      aria-label={`delete ${label} option`}
    >
      <ClearIcon />
    </button>
  </div>;
};
