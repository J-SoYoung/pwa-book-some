import styles from './home.module.css'
import SearchBar from "@/components/searchBar/SearchBar";
import Recommendations from "./recommendbooks/RecommedBooks";
import UserBooks from "./userBooks/UserBooks";

export const Home = () => {
  return (
    <main className={styles.home}>
      <SearchBar />
      <Recommendations />
      <UserBooks />
    </main>
  );
};
