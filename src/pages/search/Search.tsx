import SearchBar from "@/components/searchBar/SearchBar";
import styles from "./search.module.css";

export const Search = () => {
  return (
    <div>
      <h1 className={styles.title}>검색</h1>
      <SearchBar />
      <div className={styles.content}>
        dddddddddddddddddddddddddddddddddddddddd
      </div>
    </div>
  );
};
