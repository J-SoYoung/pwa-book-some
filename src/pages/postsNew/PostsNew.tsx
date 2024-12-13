import styles from "./postNew.module.css";
export const PostsNew = () => {
  return (
    <div className={styles.posts}>
      <h2>새 다이어리 만들기</h2>

      <div className={styles.searchSection}>
        <button className={styles.searchButton}>
          <span role="img" aria-label="search">
            책
          </span>
        </button>
        <div className={styles.bookInfo}>
          <img src={"/"} className={styles.bookImage} />
          <div className={styles.bookDetails}></div>
        </div>
      </div>

      <form className={styles.form}>
        <label className={styles.label}>
          나만의 책 제목을 적어주세요.
          <input
            type="text"
            placeholder="책 다이어리 제목이 됩니다"
            className={styles.input}
          />
        </label>

        <label className={styles.label}>
          오늘의 독서 제목을 적어주세요.
          <input
            type="text"
            placeholder="오늘 작성된 감상평의 제목이 됩니다."
            className={styles.input}
          />
        </label>

        <label className={styles.label}>
          오늘 읽은 부분을 기록해보세요.
          <textarea placeholder="" className={styles.textarea}></textarea>
        </label>

        <button type="submit" className={styles.submitButton}>
          글작성
        </button>
      </form>
    </div>
  );
};
