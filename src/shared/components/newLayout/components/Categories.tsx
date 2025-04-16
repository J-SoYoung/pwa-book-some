import styles from "../styles/categories.module.css";
import { SearchBar } from "./SearchBar";

export const Categories = () => {
  return (
    <nav className={styles.top__navbar}>
      <ul className={styles.categories}>
        <li>홈</li>
        <li>IT</li>
        <li>문학</li>
        <li>자기계발</li>
        <li>심리</li>
        <li>인문</li>
      </ul>
      <SearchBar />
    </nav>
  );
};
