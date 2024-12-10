import { Link } from "react-router-dom";
import styles from "./home.module.css";

export const Home = () => {
  return (
    <div className={styles.container}>
      <h1>Booksome-home</h1>
      <div className={styles.bottomNavbar}>
        <Link to='/home'>HOME</Link>
        <Link to='/mybook'>MY BOOK</Link>
        <Link to='/posts'>글작성</Link>
      </div>
    </div>
  );
};
