import { Link } from "react-router-dom";
import styles from "./searchBar.module.css";

function SearchBar() {
  return (
    <>
      <div className={styles.searchBar}>
        <span className={styles.placeholder}>Search</span>
        <Link to={"/search"} className={styles.searchIcon}>
          🔍
        </Link>
      </div>
    </>
  );
}

export default SearchBar;
