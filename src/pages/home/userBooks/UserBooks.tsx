import styles from "./userBooks.module.css";

function UserBooks() {
  return (
    <section className={styles.userBooks}>
      <h2>다른 유저들은 이런 책을 읽고 있어요!</h2>
      <div>
        <div className={styles.bookCard}>
          <div className={styles.bookImage}></div>
          <div className={styles.bookInfo}>
            <h3>책제목 여기에 들어감</h3>
            <p>나만의 책제목 여기에 들어감</p>
            <p>유저가 쓴 글 랜덤으로 올라옴 어쨌든 생각해봄</p>
          </div>
        </div>
        <div className={styles.bookCard}>
          <div className={styles.bookImage}></div>
          <div className={styles.bookInfo}>
            <h3>책제목 여기에 들어감</h3>
            <p>나만의 책제목 여기에 들어감</p>
            <p>유저가 쓴 글 랜덤으로 올라옴 어쨌든 생각해봄</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UserBooks;
