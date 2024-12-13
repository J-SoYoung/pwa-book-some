import { Link } from "react-router-dom";
import styles from "./recommendations.module.css";

function Recommendations() {
  return (
    <section className={styles.recommendations}>
      <h2>이 책을 추천합니다</h2>
      <div className={styles.bookGrid}>
        <Link to={"/detail"}>
          <div className={styles.bookItem}></div>
        </Link>
        <Link to={"/detail"}>
          <div className={styles.bookItem}></div>
        </Link>
        <Link to={"/detail"}>
          <div className={styles.bookItem}></div>
        </Link>
      </div>
    </section>
  );
}

export default Recommendations;
