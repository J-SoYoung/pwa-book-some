import { Link } from "react-router-dom";

import styles from "./diarySection.module.css";
import { DiaryWidthPostsType } from "@/services/types";


export const DiarySection = ({
  diaries
}: {
  diaries: DiaryWidthPostsType[];
}) => {
  return (
    <section className={styles.recommendationSection}>
      <h2>같은 책을 읽으신 분들의 책장이에요!</h2>
      <div className={styles.recommendationList}>
        {diaries.map((diary) => {
          return (
            <div key={diary.diaryId} className={styles.recommendationCard}>
              <div className={styles.imgBox}>
                <img src={diary.userAvatar} />
                <Link to={`/diaries/${diary.diaryId}`}>
                  {diary.username}님<br />
                  책장 구경가기
                </Link>
              </div>
              <div className={styles.cardContent}>
                <h3>{diary.diaryTitle}</h3>
                <p className={styles.subTitle}>{diary.postTitle}</p>
                <p className={styles.content}>{diary.postContent}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
