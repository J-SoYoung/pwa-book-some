import styles from "./post.module.css";
export const Posts = () => {
  return (
    <div className={styles.posts}>
      <h2>BookDiary 작성</h2>

      <form className={styles.form}>
        <label className={styles.label}>
          다이어리 검색
          <div className={styles.selectWrapper}>
            <select className={styles.select}>
              <option value="" disabled selected>
                다이어리를 선택해주세요
              </option>
              <option value="diary1">다이어리 1</option>
              <option value="diary2">다이어리 2</option>
              <option value="diary3">다이어리 3</option>
            </select>
          </div>
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
