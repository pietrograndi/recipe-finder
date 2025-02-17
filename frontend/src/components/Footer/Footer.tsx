import styles from './Footer.module.css';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.copyright}>
        <p>© {currentYear} Recipe App. All rights reserved.</p>
      </div>
    </footer>
  );
}; 