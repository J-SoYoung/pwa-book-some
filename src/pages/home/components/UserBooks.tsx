import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./userBooks.module.css";

import { getAllkDiaries } from "@/services/apis";
import { LikeButton } from "@/components/likeButton/LikeButton";
import { AllDiariesDataType } from "@/services/types/dataTypes";

function UserBooks() {
  const navigate = useNavigate();
  const [allDiaries, setAllDiaries] = useState<AllDiariesDataType[]>([]);

  useEffect(() => {
    const fetchBookDiaries = async () => {
      const allDiaryData = await getAllkDiaries();
      setAllDiaries(allDiaryData);
    };
    fetchBookDiaries();
  }, []);

  return (
    <section className={styles.userBooks}>
      {allDiaries.map((diaryData) => {
        const {book, diary, post, user} = diaryData
        return (
          <div className={styles.bookCard} key={diary.diaryId}>
            <div className={styles.imageBox}>
              <img
                className={styles.bookImage}
                src={book.image}
                alt={book.title}
              />
              <img
                className={styles.userAvatar}
                src={user.avatar}
                alt={`${user.username}의 다이어리`}
              />
            </div>
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
              <p>{post.title}</p>
              <p>{post.content}</p>
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default UserBooks;
