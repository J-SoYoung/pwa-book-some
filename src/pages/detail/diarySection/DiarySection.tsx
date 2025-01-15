import styles from "./diarySection.module.css";
import { DiaryAndPostsType } from "../Detail";
import { Link } from "react-router-dom";

export const DiarySection = ({ diaries }: { diaries: DiaryAndPostsType[] }) => {
  return (
    <section className={styles.recommendationSection}>
      <h2>같은 책을 읽으신 분들의 책장이에요!</h2>
      <div className={styles.recommendationList}>
        {diaries.map((diary) => {
          return (
            <div key={diary.diaryId} className={styles.recommendationCard}>
              <div className={styles.imgBox}>
                <img src={diary.bookImage} />
                <Link to={`/diaries/${diary.diaryId}`}>책장 구경가기</Link>
              </div>
              <div className={styles.cardContent}>
                <h3>{diary.diaryTitle}</h3>
                <p className={styles.subTitle}>{diary.firstPost.title}</p>
                <p>{diary.firstPost.content}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
