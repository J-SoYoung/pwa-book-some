import styles from "./home.module.css";
import Recommendations from "./recommendbooks/RecommedBooks";
import UserBooks from "./userBooks/UserBooks";

export const Home = () => {
  return (
    <main className={styles.home}>
      <h2>이 책을 추천합니다</h2>
      <Recommendations />

      <h2>다른 유저들은 이런 책을 읽고 있어요!</h2>
      <UserBooks />
    </main>
  );
};
