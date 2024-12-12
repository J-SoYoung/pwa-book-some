
import styles from "./recommendations.module.css";

function Recommendations() {
  return (
    <section className={styles.recommendations}>
      <h2>이 책을 추천합니다</h2>
      <div className={styles.bookGrid}>
        <div className={styles.bookItem}></div>
        <div className={styles.bookItem}></div>
        <div className={styles.bookItem}></div>
      </div>
    </section>
  );
}

export default Recommendations;
