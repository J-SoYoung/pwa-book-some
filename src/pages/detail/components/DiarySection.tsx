import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import styles from "./diarySection.module.css";
import { DiaryWithPostsType } from "@/services/types";
import { getBookWithDiaryPost } from "@/services/apis";

export const DiarySection = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const [diaries, setDiaries] = useState<DiaryWithPostsType[] | []>([]);

  useEffect(() => {
    const fetchBookData = async () => {
      const diaryWidthPosts = await getBookWithDiaryPost(bookId as string);
      if (diaryWidthPosts) {
        setDiaries(diaryWidthPosts);
      }
    };
    fetchBookData();
  }, [bookId]);

  return (
    <div className={styles.diaryList}>
      {diaries.map((diary) => {
        return (
          <div key={diary.diaryId} className={styles.diary}>
            <div className={styles.imgBox}>
              <img src={diary.userAvatar} />
              <Link to={`/diaries/${diary.diaryId}`}>
                {diary.username}님<br />
                책장 구경가기
              </Link>
            </div>
            <div className={styles.contentBox}>
              <h3>{diary.diaryTitle}</h3>
              <p className={styles.subTitle}>{diary.postTitle}</p>
              <p className={styles.content}>{diary.postContent}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
