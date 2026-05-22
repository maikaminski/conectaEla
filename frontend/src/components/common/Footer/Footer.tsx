import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.brand}>✦ ConectaEla</p>
        <p className={styles.copy}>
          © {new Date().getFullYear()} ConectaEla · Feito com carinho para mulheres em transição de carreira na tecnologia.
        </p>
      </div>
    </footer>
  );
}
