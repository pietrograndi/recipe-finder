import styles from './StateMessage.module.css';
import cx from 'classnames';

interface StateMessageProps {
  message: string;
  type?: 'error' | 'info' | 'loading';
  className?: string;
}

export const StateMessage = ({ 
  message, 
  type = 'info',
}: StateMessageProps) => {
  return (
    <div className={cx(styles.container, styles[type])}>
      {type === 'loading' && (
        <div className={styles.spinner} role="status">
          <span className={styles.visuallyHidden}>Loading...</span>
        </div>
      )}
      <p>{message}</p>
    </div>
  );
}; 