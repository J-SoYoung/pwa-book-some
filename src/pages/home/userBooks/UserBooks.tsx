import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./userBooks.module.css";

import { getAllkDiaries } from "@/services/apis";
import { AllDiariesType } from "@/services/types";
import { LikeButton } from "@/components/likeButton/LikeButton";

function UserBooks() {
  const navigate = useNavigate();
  const [allDiaries, setAllDiaries] = useState<AllDiariesType[]>([]);

  useEffect(() => {
    const fetchBookDiaries = async () => {
      const allDiaryData = await getAllkDiaries();
      setAllDiaries(allDiaryData as AllDiariesType[]);
    };
    fetchBookDiaries();
  }, []);

  return (
    <section className={styles.userBooks}>
      {allDiaries.map((diary) => {
        return (
          <div className={styles.bookCard} key={diary.diary.diaryId}>
            <div className={styles.imageBox}>
              <img
                className={styles.bookImage}
                src={diary.diary.bookImage}
                alt={diary.diary.bookTitle}
              />
              <img
                className={styles.userAvatar}
                src={diary.user.avatar}
                alt={`${diary.user.username}의 다이어리`}
              />
            </div>
            <div className={styles.likeBox}>
              <LikeButton diaryId={diary.diary.diaryId} />
            </div>

            <div
              className={styles.bookInfo}
              onClick={() => {
                navigate(`/diaries/${diary.diary.diaryId}`);
              }}
            >
              <h3>{diary.diary.diaryTitle}</h3>
              <p>{diary.diary.bookTitle}</p>
              <p>{diary.post.content}</p>
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default UserBooks;
