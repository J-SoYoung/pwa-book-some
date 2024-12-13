import styles from "./searchBar.module.css";

function SearchBar() {
  return (
    <>
      <div className={styles.searchBar}>
        <span className={styles.placeholder}>Search</span>
        <span className={styles.searchIcon}>🔍</span>
      </div>
    </>
  );
}

export default SearchBar;
