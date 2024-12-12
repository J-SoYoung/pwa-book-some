
import styles from "./header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <h1>BOOKSOME</h1>
      <div className={styles.searchBar}>
        <span className={styles.placeholder}>Search</span>
        <span className={styles.searchIcon}>🔍</span>
      </div>
    </header>
  );
}

export default Header;
