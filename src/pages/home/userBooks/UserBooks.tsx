import { useEffect, useState } from "react";
import styles from "./userBooks.module.css";
import { getAllBookDiaries } from "@/services/apis";
import { DiariesWithPostsType } from "@/services/types";
import { useNavigate } from "react-router-dom";

function UserBooks() {
  const navigate = useNavigate();
  const [bookDiaries, setBookDiaries] = useState<DiariesWithPostsType[]>([]);

  useEffect(() => {
    const fetchBookDiaries = async () => {
      const diary = await getAllBookDiaries();
      setBookDiaries(diary);
    };
    fetchBookDiaries();
  }, []);

  return (
    <section className={styles.userBooks}>
      <div>
        {bookDiaries.map((diary) => {
          return (
            <div
              className={styles.bookCard}
              key={diary.diaryId}
              onClick={() => {
                navigate(`/diaries/${diary.diaryId}`);
              }}
            >
              <img src={diary.bookImage} className={styles.bookImage} />

              <div className={styles.bookInfo}>
                <h3>{diary.diaryTitle}</h3>
                <p>{diary.bookTitle}</p>
                <div className={styles.likeBox}>
                  <p>❤️📒</p>
                </div>
                <p>{diary.posts[0].content}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default UserBooks;
