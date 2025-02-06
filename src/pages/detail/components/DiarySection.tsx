import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import styles from "./diarySection.module.css";
import { DiaryWithPostsType } from "@/services/types/dataTypes";
import { getBookWithDiaryPost } from "@/services/apis";

export const DiarySection = () => {
  const { bookIsbn } = useParams<{ bookIsbn: string }>();
  const [diaries, setDiaries] = useState<DiaryWithPostsType[] | []>([]);

  useEffect(() => {
    const fetchBookData = async () => {
      const diaryWidthPosts = await getBookWithDiaryPost(bookIsbn as string);
      if (diaryWidthPosts) {
        setDiaries(diaryWidthPosts);
      }
    };
    fetchBookData();
  }, [bookIsbn]);
  return (
    <div className={styles.diaryList}>
      {diaries.map((diaryData) => {
        const { diary, post, user } = diaryData;
        return (
          <div key={diary.diaryId} className={styles.diary}>
            <div className={styles.imgBox}>
              <img src={user.avatar} />
              <Link to={`/diaries/${diary.diaryId}`}>
                {user.username}님<br />
                책장 구경가기
              </Link>
            </div>
            <div className={styles.contentBox}>
              <h3>{diary.diaryTitle}</h3>
              <p className={styles.subTitle}>{post.title}</p>
              <p className={styles.content}>{post.content}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
