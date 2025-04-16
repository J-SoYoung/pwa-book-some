import styles from "../styles/sidebar.module.css";
import { SearchBar } from "./SearchBar";

export const Sidebar = () => {
  return (
    <>
      <aside className={styles.sidebar}>
        <h1 className={styles.logo}>BOOKSOME</h1>
        <SearchBar />
        <ul className={styles.categoryList}>
          <li>IT</li>
          <li>문학</li>
          <li>자기계발</li>
          <li>심리</li>
          <li>인문</li>
          <li>기타</li>
        </ul>
      </aside>
    </>
  );
};
