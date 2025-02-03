import { Link, useParams } from "react-router-dom";

import styles from "./diarySection.module.css";
import { DiaryWidthPostsType } from "@/services/types";
import { useEffect, useState } from "react";
import { getBookAndDiaries } from "@/services/apis";
import { DetailDataType } from "../Detail";


export const DiarySection = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const [diaries, setDiaries] = useState<DiaryWidthPostsType[] | []>([]);

 useEffect(() => {
    const fetchBookData = async () => {
      const response = await getBookAndDiaries(bookId as string);
      if (response) {
        const { diaryWidthPosts }: DetailDataType = response;
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
