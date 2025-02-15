import Link from "next/link";
import styles from './Navigation.module.css';
import cx from 'classnames';

export const Navigation = () => {
  return (
    <div className={cx(styles.navigation)}>
      <h1>Recipedia</h1>
      <nav>
          <Link href="/">Home</Link>
          <Link href="/">About</Link>
          <Link href="/">Contact</Link>
      </nav>
    </div>
  );
};
