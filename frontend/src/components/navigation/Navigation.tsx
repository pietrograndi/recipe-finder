import Link from "next/link";
import styles from './Navigation.module.css';
import cx from 'classnames';
import { useRouter } from "next/router";

export const Navigation = () => {
  const router = useRouter();
  console.log(router)
  return (
    <div className={cx(styles.navigation)}>
      <div>
        <Link href="/">
          logo
        </Link>
      </div>
      <nav>
          <Link href="/favorites"  className={cx({[styles.active]: router.pathname === '/favorites'})}>Favorites</Link>
          <Link href="/">About</Link>
          <Link href="/">Contact</Link>
      </nav>
    </div>
  );
};
