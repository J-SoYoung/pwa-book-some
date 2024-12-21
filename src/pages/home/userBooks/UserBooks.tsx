import { useEffect, useState } from "react";
import styles from "./userBooks.module.css";
import { getBookDiaries } from "@/services/apis";
import { DiariesWithPostsType } from "@/types";

function UserBooks() {
  const [bookDiaries, setBookDiaries] = useState<DiariesWithPostsType[]>([]);

  useEffect(() => {
    const fetchBookDiariess = async () => {
      const diary = await getBookDiaries();
      setBookDiaries(diary);
    };
    fetchBookDiariess();
  }, []);
  console.log(bookDiaries);
  return (
    <section className={styles.userBooks}>
      <h2>다른 유저들은 이런 책을 읽고 있어요!</h2>
      <div>
        {bookDiaries.map((diary) => {
          return (
            <div className={styles.bookCard}>
              <img src={diary.bookImage} className={styles.bookImage} />

              <div className={styles.bookInfo}>
                <h3>{diary.diaryTitle}</h3>
                <p>{diary.bookTitle}</p>
                <div className={styles.likeBox}>
                  <p>❤️📒</p>
                </div>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt
                  explicabo magnam dolorem temporibus accusantium ipsam dolorum
                  eligendi quas eius, doloribus totam consequuntur! Minus
                  pariatur odit dolor iste perferendis accusamus totam.
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default UserBooks;
