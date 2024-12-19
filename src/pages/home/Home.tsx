import styles from "./home.module.css";
import { useRecoilValue } from "recoil";

import { userState } from "@/recoil/atoms";
import SearchBar from "@/components/searchBar/SearchBar";
import Recommendations from "./recommendbooks/RecommedBooks";
import UserBooks from "./userBooks/UserBooks";
import { UserType } from "@/types";

export const Home = () => {
  const user = useRecoilValue<UserType | null>(userState);

  return (
    <main className={styles.home}>
      <SearchBar />
      <p>{user?.username}님</p>
      <Recommendations />
      <UserBooks />
    </main>
  );
};
