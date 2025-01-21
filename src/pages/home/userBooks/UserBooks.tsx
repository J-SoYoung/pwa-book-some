import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./userBooks.module.css";

import { getAllBookDiaries } from "@/services/apis";
import { DiariesWithPostsType } from "@/services/types";
import { LikeButton } from "@/components/likeButton/LikeButton";

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
            <div className={styles.bookCard} key={diary.diaryId}>
              <img src={diary.bookImage} className={styles.bookImage} />
              <div className={styles.likeBox}>
                <LikeButton diaryId={diary.diaryId} />
              </div>

              <div
                className={styles.bookInfo}
                onClick={() => {
                  navigate(`/diaries/${diary.diaryId}`);
                }}
              >
                <h3>{diary.diaryTitle}</h3>
                <p>{diary.bookTitle}</p>
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
