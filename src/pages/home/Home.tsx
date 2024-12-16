import { useEffect } from "react";
import styles from "./home.module.css";

import SearchBar from "@/components/searchBar/SearchBar";
import Recommendations from "./recommendbooks/RecommedBooks";
import UserBooks from "./userBooks/UserBooks";
import { searchBooks } from "@/apis/book";

export const Home = () => {
  useEffect(() => {
    console.log("미리보기중");
    searchBooks();
  }, []);

  return (
    <main className={styles.home}>
      <SearchBar />
      <Recommendations />
      <UserBooks />
    </main>
  );
};
